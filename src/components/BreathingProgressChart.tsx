import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Wind, Sparkles, CheckCircle2 } from 'lucide-react';

export type BreathingTechniqueId = '4-7-8' | 'cuadrada' | 'coherencia';

interface BreathingPhase {
  name: string;
  action: 'inspirar' | 'contener' | 'exhalar' | 'pausa';
  durationSeconds: number;
  label: string;
  instruction: string;
}

interface BreathingTechnique {
  id: BreathingTechniqueId;
  name: string;
  tagline: string;
  cycles: number;
  phases: BreathingPhase[];
}

export const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: '4-7-8',
    name: 'Respiración 4-7-8',
    tagline: 'Desactiva la ansiedad y relaja el cuerpo para descansar',
    cycles: 4,
    phases: [
      { name: 'Inspirar', action: 'inspirar', durationSeconds: 4, label: 'Inhalá por la nariz', instruction: 'Llená los pulmones con calma y serenidad.' },
      { name: 'Contener', action: 'contener', durationSeconds: 7, label: 'Sostené el aire', instruction: 'Mantené la quietud sin tensar cuello ni hombros.' },
      { name: 'Exhalar', action: 'exhalar', durationSeconds: 8, label: 'Soltá por la boca', instruction: 'Exhalá suavemente soltando cualquier preocupación.' }
    ]
  },
  {
    id: 'cuadrada',
    name: 'Respiración Cuadrada (4-4-4-4)',
    tagline: 'Equilibrio mental y foco ante momentos de sobrecarga',
    cycles: 4,
    phases: [
      { name: 'Inspirar', action: 'inspirar', durationSeconds: 4, label: 'Inhalá despacio', instruction: 'Sentí cómo el aire expande tu pecho.' },
      { name: 'Contener', action: 'contener', durationSeconds: 4, label: 'Sostené lleno', instruction: 'Permanece en presencia tranquila.' },
      { name: 'Exhalar', action: 'exhalar', durationSeconds: 4, label: 'Soltá parejo', instruction: 'Vaciá suavemente tus pulmones.' },
      { name: 'Contener', action: 'pausa', durationSeconds: 4, label: 'Sostené en calma', instruction: 'Disfrutá el silencio antes de volver a inhalar.' }
    ]
  },
  {
    id: 'coherencia',
    name: 'Coherencia Cardíaca (5-5)',
    tagline: 'Sintoniza el ritmo de tu corazón y reduce el estrés',
    cycles: 5,
    phases: [
      { name: 'Inspirar', action: 'inspirar', durationSeconds: 5, label: 'Inhalá en 5 tiempos', instruction: 'Respiración suave, continua y relajada.' },
      { name: 'Exhalar', action: 'exhalar', durationSeconds: 5, label: 'Exhalá en 5 tiempos', instruction: 'Soltá el aire como una ola que se retira.' }
    ]
  }
];

interface BreathingProgressChartProps {
  initialTechniqueId?: BreathingTechniqueId;
  onComplete?: () => void;
  compact?: boolean;
}

export const BreathingProgressChart: React.FC<BreathingProgressChartProps> = ({
  initialTechniqueId = '4-7-8',
  onComplete,
  compact = false
}) => {
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<BreathingTechniqueId>(initialTechniqueId);
  const technique = BREATHING_TECHNIQUES.find((t) => t.id === selectedTechniqueId) || BREATHING_TECHNIQUES[0];

  const [isRunning, setIsRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseSecondsRemaining, setPhaseSecondsRemaining] = useState(technique.phases[0].durationSeconds);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Total session target seconds
  const oneCycleDuration = technique.phases.reduce((acc, p) => acc + p.durationSeconds, 0);
  const totalSessionTargetSeconds = oneCycleDuration * technique.cycles;

  const currentPhase = technique.phases[currentPhaseIndex] || technique.phases[0];

  // Reset when technique changes
  useEffect(() => {
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setPhaseSecondsRemaining(technique.phases[0].durationSeconds);
    setCurrentCycle(1);
    setTotalElapsedSeconds(0);
    setIsFinished(false);
  }, [selectedTechniqueId]);

  // Main high-precision animation loop
  useEffect(() => {
    if (!isRunning) return;

    const intervalMs = 50;
    const stepSeconds = intervalMs / 1000;

    const timer = setInterval(() => {
      setTotalElapsedSeconds((prev) => prev + stepSeconds);

      setPhaseSecondsRemaining((prevRemaining) => {
        const nextRemaining = prevRemaining - stepSeconds;

        if (nextRemaining <= 0) {
          // Move to next phase
          const nextIndex = currentPhaseIndex + 1;

          if (nextIndex < technique.phases.length) {
            setCurrentPhaseIndex(nextIndex);
            return technique.phases[nextIndex].durationSeconds;
          } else {
            // End of a full cycle
            if (currentCycle < technique.cycles) {
              setCurrentCycle((c) => c + 1);
              setCurrentPhaseIndex(0);
              return technique.phases[0].durationSeconds;
            } else {
              // Entire session finished!
              setIsRunning(false);
              setIsFinished(true);
              if (onComplete) onComplete();
              return 0;
            }
          }
        }
        return nextRemaining;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isRunning, currentPhaseIndex, currentCycle, technique, onComplete]);

  // Phase progress fraction (0 to 1)
  const currentPhaseTotalDuration = currentPhase.durationSeconds;
  const phaseProgress = Math.max(
    0,
    Math.min(1, (currentPhaseTotalDuration - phaseSecondsRemaining) / currentPhaseTotalDuration)
  );

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const m = Math.floor(s / 60);
    const remS = s % 60;
    return `${m}:${remS.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (isFinished) {
      handleReset();
      setIsRunning(true);
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setPhaseSecondsRemaining(technique.phases[0].durationSeconds);
    setCurrentCycle(1);
    setTotalElapsedSeconds(0);
    setIsFinished(false);
  };

  // SVG Arch Geometry calculations:
  // Semicircle of 180 degrees from left (35, 125) to right (225, 125) with radius 95
  // Arc length = PI * 95 = 298.45
  const arcRadius = 95;
  const arcLength = Math.PI * arcRadius;
  const strokeOffset = arcLength * (1 - phaseProgress);

  return (
    <div className="w-full max-w-md mx-auto text-[#1A1412] dark:text-[#FFF7F2] select-none">
      {/* Technique tabs selector */}
      <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10 mb-4 shadow-2xs">
        {BREATHING_TECHNIQUES.map((tech) => (
          <button
            key={tech.id}
            type="button"
            onClick={() => setSelectedTechniqueId(tech.id)}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer truncate ${
              selectedTechniqueId === tech.id
                ? 'bg-[#8F3722] dark:bg-[#F47A45] text-white dark:text-[#181311] shadow-xs'
                : 'text-[#3D3532] dark:text-[#E2D7D1] hover:bg-black/5 dark:hover:bg-white/10'
            }`}
          >
            {tech.id === '4-7-8' ? '4-7-8 Relajante' : tech.id === 'cuadrada' ? 'Cuadrada (4-4)' : 'Coherencia (5-5)'}
          </button>
        ))}
      </div>

      {/* Main Glass Pod Container - Adapts to Light & Dark Mode according to project palette */}
      <div className="relative rounded-[32px] p-6 sm:p-7 bg-[#FAF3EE]/95 dark:bg-[#1E1715]/95 text-[#1A1412] dark:text-[#FFF7F2] shadow-xl border border-[#E8B8A6]/60 dark:border-white/10 overflow-hidden backdrop-blur-xl transition-colors duration-300">
        {/* Ambient atmospheric glow in terracotta */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none bg-[#8F3722] dark:bg-[#F47A45]" />

        {/* Top Header: Phase Title & Cycle counter */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#3D3532] dark:text-white/75 mb-1">
          <span className="font-bold uppercase tracking-wider text-[#8F3722] dark:text-[#F47A45]">
            {technique.name}
          </span>
          <span className="bg-[#8F3722]/10 dark:bg-white/10 text-[#8F3722] dark:text-white/90 px-2.5 py-0.5 rounded-full font-medium">
            Ciclo {currentCycle} de {technique.cycles}
          </span>
        </div>

        {/* Phase Action Banner */}
        <div className="relative z-10 text-center my-2 space-y-0.5">
          <motion.div
            key={currentPhase.action}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-[#1A1412] dark:text-[#FFF7F2]">
              {currentPhase.name}
            </h3>
            <p className="text-xs text-[#3D3532] dark:text-white/80 font-medium">
              {currentPhase.instruction}
            </p>
          </motion.div>
        </div>

        {/* THE SEMICIRCULAR 180° PROGRESS CHART (Terracotta & Sand Palette, No Greens) */}
        <div className="relative z-10 flex flex-col items-center justify-center my-3">
          <div className="relative w-[260px] h-[145px] flex items-center justify-center">
            {/* SVG Semicircle Arch (180 degrees) */}
            <svg
              viewBox="0 0 260 145"
              className="w-full h-full overflow-visible"
            >
              {/* Background Arch Track (Terracotta Sandstone in Light / Translucent White in Dark) */}
              <path
                d="M 35 125 A 95 95 0 0 1 225 125"
                fill="none"
                className="stroke-[#EAD6CD] dark:stroke-white/15 transition-colors duration-300"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Active Filled Progress Arch (180deg stroke dash, Terracotta primary) */}
              <path
                d="M 35 125 A 95 95 0 0 1 225 125"
                fill="none"
                className="stroke-[#8F3722] dark:stroke-[#F47A45] transition-colors duration-300"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={arcLength}
                strokeDashoffset={strokeOffset}
                style={{
                  transition: isRunning ? 'stroke-dashoffset 0.05s linear' : 'none'
                }}
              />
            </svg>

            {/* Central Round Play / Pause Button */}
            <div className="absolute top-[82px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-16 h-16 rounded-full bg-[#8F3722] hover:bg-[#7A2818] dark:bg-[#F47A45] dark:hover:bg-[#E06835] active:scale-95 text-white dark:text-[#181311] flex items-center justify-center shadow-lg transition-all cursor-pointer group"
                aria-label={isRunning ? 'Pausar ejercicio' : 'Iniciar ejercicio'}
              >
                {isFinished ? (
                  <RotateCcw className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform" />
                ) : isRunning ? (
                  /* Pause || icon */
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-6 bg-white dark:bg-[#181311] rounded-full" />
                    <div className="w-1.5 h-6 bg-white dark:bg-[#181311] rounded-full" />
                  </div>
                ) : (
                  /* Play ▶ icon */
                  <Play className="w-6 h-6 fill-white dark:fill-[#181311] ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Bottom Timers (Elapsed Time, Active Phase Countdown, Total Target) */}
          <div className="w-full max-w-[240px] flex items-center justify-between text-[#1A1412] dark:text-[#FFF7F2] text-base sm:text-lg font-bold font-mono tracking-tight px-1 mt-1">
            {/* Left: Elapsed Time */}
            <div className="text-left">
              <span className="block leading-none">{formatTime(totalElapsedSeconds)}</span>
              <span className="text-[10px] font-sans text-[#3D3532]/60 dark:text-white/50 block mt-0.5 font-normal">Transcurrido</span>
            </div>

            {/* Center: Active phase countdown seconds badge */}
            <div className="text-center">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#8F3722]/10 dark:bg-white/15 text-[#8F3722] dark:text-[#F47A45] font-mono font-bold">
                {Math.ceil(phaseSecondsRemaining)}s
              </span>
            </div>

            {/* Right: Total Target Session Time */}
            <div className="text-right">
              <span className="block leading-none text-[#8F3722] dark:text-[#F47A45]">{formatTime(totalSessionTargetSeconds)}</span>
              <span className="text-[10px] font-sans text-[#3D3532]/60 dark:text-white/50 block mt-0.5 font-normal">Total</span>
            </div>
          </div>
        </div>

        {/* Phase Breadcrumbs indicator */}
        <div className="relative z-10 flex items-center justify-center gap-2 mt-4 pt-3 border-t border-[#E8B8A6]/40 dark:border-white/10">
          {technique.phases.map((ph, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                idx === currentPhaseIndex
                  ? 'bg-[#8F3722] dark:bg-[#F47A45] text-white dark:text-[#181311] shadow-xs'
                  : 'bg-black/5 dark:bg-white/10 text-[#3D3532]/70 dark:text-white/60'
              }`}
            >
              <span>{ph.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({ph.durationSeconds}s)</span>
            </div>
          ))}
        </div>

        {/* Bottom controls & reset */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#3D3532]/80 dark:text-white/70 mt-3 pt-2 border-t border-[#E8B8A6]/30 dark:border-white/5">
          <span>
            {isRunning ? '⏳ En curso...' : isFinished ? '✨ ¡Sesión completada!' : '⏸️ En pausa'}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="hover:text-[#8F3722] dark:hover:text-[#F47A45] flex items-center gap-1 cursor-pointer transition-colors font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
