import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Wind, Heart, Sparkles, Volume2, VolumeX, CheckCircle2, Music } from 'lucide-react';
import { ambientAudio, SOUNDTRACKS, SoundtrackId } from '../services/ambientAudioService';

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

  // Ambient soundtrack integration
  const [ambientTrack, setAmbientTrack] = useState<SoundtrackId | 'silence'>('olas');
  const [audioState, setAudioState] = useState(() => ambientAudio.getState());

  useEffect(() => {
    return ambientAudio.subscribe(() => {
      setAudioState(ambientAudio.getState());
    });
  }, []);

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

  // Main countdown ticker (interval runs every 100ms for smooth progress)
  useEffect(() => {
    if (!isRunning || isFinished) return;

    const interval = setInterval(() => {
      setPhaseSecondsRemaining((prevRemaining) => {
        if (prevRemaining <= 0.1) {
          // Transition to next phase
          const nextPhaseIdx = currentPhaseIndex + 1;
          if (nextPhaseIdx < technique.phases.length) {
            setCurrentPhaseIndex(nextPhaseIdx);
            return technique.phases[nextPhaseIdx].durationSeconds;
          } else {
            // Next cycle or completion
            if (currentCycle < technique.cycles) {
              setCurrentCycle((c) => c + 1);
              setCurrentPhaseIndex(0);
              return technique.phases[0].durationSeconds;
            } else {
              // Finished exercise
              setIsRunning(false);
              setIsFinished(true);
              if (onComplete) onComplete();
              return 0;
            }
          }
        }
        return Math.max(0, prevRemaining - 0.1);
      });

      setTotalElapsedSeconds((prev) => Math.min(totalSessionTargetSeconds, prev + 0.1));
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, isFinished, currentPhaseIndex, currentCycle, technique, totalSessionTargetSeconds, onComplete]);

  // Phase progress for the semicircular gauge (0 to 1)
  const phaseTotal = currentPhase.durationSeconds;
  const phaseElapsed = phaseTotal - phaseSecondsRemaining;
  const phaseProgress = Math.min(1, Math.max(0, phaseElapsed / phaseTotal));

  // Format mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (isFinished) {
      // Restart
      setCurrentPhaseIndex(0);
      setPhaseSecondsRemaining(technique.phases[0].durationSeconds);
      setCurrentCycle(1);
      setTotalElapsedSeconds(0);
      setIsFinished(false);
      setIsRunning(true);
      if (ambientTrack !== 'silence') {
        ambientAudio.play(ambientTrack);
      }
    } else {
      const willRun = !isRunning;
      setIsRunning(willRun);
      if (willRun && ambientTrack !== 'silence' && !audioState.isPlaying) {
        ambientAudio.play(ambientTrack);
      }
    }
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
  // Semicircle from left (35, 125) to right (225, 125) with radius 95
  // Arc length = PI * 95 = 298.45
  const arcRadius = 95;
  const arcLength = Math.PI * arcRadius;
  const strokeOffset = arcLength * (1 - phaseProgress);

  // Phase colors for visual grounding
  const getPhaseColor = () => {
    switch (currentPhase.action) {
      case 'inspirar':
        return '#3D7A5A'; // Fresh calming forest green
      case 'contener':
      case 'pausa':
        return '#C87242'; // Warm steady amber terracotta
      case 'exhalar':
        return '#4B6B94'; // Serene soft indigo release
      default:
        return '#3D7A5A';
    }
  };

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
                ? 'bg-[#1A1412] dark:bg-[#FFF7F2] text-white dark:text-[#1A1412] shadow-xs'
                : 'text-[#3D3532] dark:text-[#E2D7D1] hover:bg-black/5 dark:hover:bg-white/10'
            }`}
          >
            {tech.id === '4-7-8' ? '4-7-8 Relajante' : tech.id === 'cuadrada' ? 'Cuadrada (4-4)' : 'Coherencia (5-5)'}
          </button>
        ))}
      </div>

      {/* Main Glass Pod Container */}
      <div className="relative rounded-[32px] p-6 sm:p-7 bg-[#1A1C19] text-white shadow-xl border border-white/15 overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl opacity-35 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: getPhaseColor() }}
        />

        {/* Top Header: Phase Title & Cycle counter */}
        <div className="relative z-10 flex items-center justify-between text-xs text-white/75 mb-1">
          <span className="font-bold uppercase tracking-wider text-[#A8C5B0]">
            {technique.name}
          </span>
          <span className="bg-white/10 px-2.5 py-0.5 rounded-full font-medium">
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
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white">
              {currentPhase.name}
            </h3>
            <p className="text-xs text-white/80 font-medium">
              {currentPhase.instruction}
            </p>
          </motion.div>
        </div>

        {/* THE SEMICIRCULAR PROGRESS CHART (Matching user's reference image) */}
        <div className="relative z-10 flex flex-col items-center justify-center my-3">
          <div className="relative w-[260px] h-[145px] flex items-center justify-center">
            {/* SVG Semicircle Arch */}
            <svg
              viewBox="0 0 260 145"
              className="w-full h-full overflow-visible"
            >
              {/* Background Arch Track (Dark muted sage green matching image) */}
              <path
                d="M 35 125 A 95 95 0 0 1 225 125"
                fill="none"
                stroke="#37523F"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Active Filled Progress Arch (Clean glowing white matching image) */}
              <path
                d="M 35 125 A 95 95 0 0 1 225 125"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={arcLength}
                strokeDashoffset={strokeOffset}
                style={{
                  transition: isRunning ? 'stroke-dashoffset 0.1s linear' : 'none'
                }}
              />
            </svg>

            {/* Central Round Play / Pause Button (Exactly centered inside the arch) */}
            <div className="absolute top-[82px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-16 h-16 rounded-full bg-[#4A6D53] hover:bg-[#567E60] active:scale-95 text-white flex items-center justify-center shadow-lg border-2 border-white/20 transition-all cursor-pointer group"
                aria-label={isRunning ? 'Pausar ejercicio' : 'Iniciar ejercicio'}
              >
                {isFinished ? (
                  <RotateCcw className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform" />
                ) : isRunning ? (
                  /* Pause || icon */
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-6 bg-white rounded-full" />
                    <div className="w-1.5 h-6 bg-white rounded-full" />
                  </div>
                ) : (
                  /* Play ▶ icon */
                  <Play className="w-6 h-6 fill-white ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Bottom Timers (Bottom-left & Bottom-right exactly like the image) */}
          <div className="w-full max-w-[240px] flex items-center justify-between text-white text-base sm:text-lg font-bold font-mono tracking-tight px-1 mt-1">
            {/* Left: Elapsed Time */}
            <div className="text-left">
              <span className="block leading-none">{formatTime(totalElapsedSeconds)}</span>
              <span className="text-[10px] font-sans text-white/50 block mt-0.5 font-normal">Transcurrido</span>
            </div>

            {/* Center: Active phase countdown seconds badge */}
            <div className="text-center">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white font-mono font-bold">
                {Math.ceil(phaseSecondsRemaining)}s
              </span>
            </div>

            {/* Right: Total Target Session Time */}
            <div className="text-right">
              <span className="block leading-none text-[#A8C5B0]">{formatTime(totalSessionTargetSeconds)}</span>
              <span className="text-[10px] font-sans text-white/50 block mt-0.5 font-normal">Total</span>
            </div>
          </div>
        </div>

        {/* Phase Breadcrumbs indicator */}
        <div className="relative z-10 flex items-center justify-center gap-2 mt-4 pt-3 border-t border-white/10">
          {technique.phases.map((ph, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                idx === currentPhaseIndex
                  ? 'bg-white text-[#1A1C19] shadow-xs'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              <span>{ph.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({ph.durationSeconds}s)</span>
            </div>
          ))}
        </div>

        {/* Ambient Sound Selector Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/10 text-xs">
          <span className="flex items-center gap-1.5 text-white/70 font-semibold text-[11px]">
            <Music className="w-3.5 h-3.5 text-[#A8C5B0]" />
            <span>Sonido ambiente:</span>
          </span>
          <div className="flex items-center gap-1">
            {SOUNDTRACKS.map((t) => {
              const isSelected = ambientTrack === t.id && (audioState.isPlaying || isRunning);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setAmbientTrack(t.id);
                    if (isRunning || audioState.isPlaying) {
                      ambientAudio.play(t.id);
                    }
                  }}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A6D53] text-white font-bold shadow-2xs'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  title={t.name}
                >
                  <span className="mr-0.5">{t.icon}</span>
                  <span className="hidden sm:inline">{t.name.split(' ')[0]}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setAmbientTrack('silence');
                ambientAudio.pause();
              }}
              className={`p-1 px-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                ambientTrack === 'silence'
                  ? 'bg-white/20 text-white font-bold'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
              title="Silenciar sonido de fondo"
            >
              <VolumeX className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom controls & reset */}
        <div className="relative z-10 flex items-center justify-between text-xs text-white/70 mt-2.5 pt-2 border-t border-white/5">
          <span>
            {isRunning ? '🟢 En curso...' : isFinished ? '✅ ¡Sesión completada!' : '⏸️ En pausa'}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
