import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Heart, Shield, Sparkles, CheckCircle2, ChevronRight, Wind } from 'lucide-react';

interface SomaticSOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SOSTechnique = 'physiological_sigh' | '4-7-8';

export const SomaticSOSModal: React.FC<SomaticSOSModalProps> = ({ isOpen, onClose }) => {
  const [technique, setTechnique] = useState<SOSTechnique>('physiological_sigh');
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cyclePhase, setCyclePhase] = useState<'inhale1' | 'inhale2' | 'exhale' | 'hold'>('inhale1');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(2.5);

  // Trigger gentle haptic vibration if supported
  const triggerHaptic = (pattern: number[] = [60, 40, 60]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // non-fatal
      }
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setSecondsRemaining(60);
      setIsActive(true);
      setIsCompleted(false);
      setCyclePhase('inhale1');
      setPhaseSecondsLeft(2.5);
      triggerHaptic([100]);
    }
  }, [isOpen]);

  // Total 60s countdown
  useEffect(() => {
    if (!isOpen || !isActive || isCompleted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          setIsActive(false);
          triggerHaptic([120, 80, 120]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isActive, isCompleted]);

  // Breathing cycle cadence
  useEffect(() => {
    if (!isOpen || !isActive || isCompleted) return;

    let timeoutId: any;

    if (technique === 'physiological_sigh') {
      // Physiological Sigh: Inhale 1 (2.5s) -> Inhale 2 top-up (1s) -> Long Exhale (4.5s)
      if (cyclePhase === 'inhale1') {
        timeoutId = setTimeout(() => {
          setCyclePhase('inhale2');
          triggerHaptic([40]);
        }, 2500);
      } else if (cyclePhase === 'inhale2') {
        timeoutId = setTimeout(() => {
          setCyclePhase('exhale');
          triggerHaptic([70]);
        }, 1200);
      } else if (cyclePhase === 'exhale') {
        timeoutId = setTimeout(() => {
          setCyclePhase('inhale1');
          triggerHaptic([60]);
        }, 4800);
      }
    } else {
      // 4-7-8: Inhale (4s) -> Hold (7s) -> Exhale (8s)
      if (cyclePhase === 'inhale1') {
        timeoutId = setTimeout(() => {
          setCyclePhase('hold');
          triggerHaptic([50]);
        }, 4000);
      } else if (cyclePhase === 'hold') {
        timeoutId = setTimeout(() => {
          setCyclePhase('exhale');
          triggerHaptic([70]);
        }, 7000);
      } else if (cyclePhase === 'exhale') {
        timeoutId = setTimeout(() => {
          setCyclePhase('inhale1');
          triggerHaptic([60]);
        }, 8000);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, isActive, isCompleted, cyclePhase, technique]);

  if (!isOpen) return null;

  const getPhaseInstruction = () => {
    if (technique === 'physiological_sigh') {
      switch (cyclePhase) {
        case 'inhale1':
          return {
            title: 'Inhalá profundo',
            sub: 'Llená los pulmones por la nariz',
            scale: 1.15
          };
        case 'inhale2':
          return {
            title: 'Un sorbo más al tope',
            sub: 'Inhalá un poquito más para abrir alvéolos',
            scale: 1.25
          };
        case 'exhale':
          return {
            title: 'Exhalá largo y despacio',
            sub: 'Soltá todo el aire por la boca como un suspiro',
            scale: 0.85
          };
        default:
          return { title: 'Respirá', sub: 'Calma', scale: 1 };
      }
    } else {
      switch (cyclePhase) {
        case 'inhale1':
          return { title: 'Inspirá despacio', sub: 'Inhalá en 4 tiempos', scale: 1.2 };
        case 'hold':
          return { title: 'Sostené en quietud', sub: 'Mantené el aire sin forzar', scale: 1.2 };
        case 'exhale':
          return { title: 'Soltá parejo', sub: 'Exhalá en 8 tiempos', scale: 0.85 };
        default:
          return { title: 'Respirá', sub: 'Calma', scale: 1 };
      }
    }
  };

  const instruction = getPhaseInstruction();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="relative w-full max-w-lg rounded-[36px] p-6 sm:p-8 bg-[#FAF3EE] dark:bg-[#1E1715] border border-[#E8B8A6]/70 dark:border-white/15 shadow-2xl text-[#1A1412] dark:text-[#FFF7F2] overflow-hidden"
        >
          {/* Subtle warm glow background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#8F3722]/15 dark:bg-[#F47A45]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#3D3532]/70 dark:text-white/70"
            aria-label="Cerrar reseteo SOS"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top SOS Header */}
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#8F3722] text-white text-xs font-bold tracking-wide uppercase shadow-xs">
              Reseteo SOS · 60s
            </span>
            <span className="text-xs text-[#3D3532] dark:text-[#E2D7D1] font-semibold">
              Desactivación del sistema de alerta
            </span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mb-1">
            Estás a salvo aquí y ahora
          </h2>
          <p className="text-xs text-[#3D3532] dark:text-[#E2D7D1] leading-relaxed mb-4">
            La doble inhalación fisiológica es el mecanismo biológico más rápido para reducir pulsaciones y desacelerar la amígdala cerebral.
          </p>

          {/* Technique Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-black/5 dark:bg-white/10 mb-5">
            <button
              type="button"
              onClick={() => {
                setTechnique('physiological_sigh');
                setCyclePhase('inhale1');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                technique === 'physiological_sigh'
                  ? 'bg-white dark:bg-[#2B201C] text-[#8F3722] dark:text-[#F47A45] shadow-xs'
                  : 'text-[#3D3532]/70 dark:text-white/60'
              }`}
            >
              Doble Suspiro Fisiológico
            </button>
            <button
              type="button"
              onClick={() => {
                setTechnique('4-7-8');
                setCyclePhase('inhale1');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                technique === '4-7-8'
                  ? 'bg-white dark:bg-[#2B201C] text-[#8F3722] dark:text-[#F47A45] shadow-xs'
                  : 'text-[#3D3532]/70 dark:text-white/60'
              }`}
            >
              Respiración 4-7-8
            </button>
          </div>

          {/* Central Pacing Circle */}
          {!isCompleted ? (
            <div className="relative flex flex-col items-center justify-center my-6 py-4">
              {/* Outer Pulsing Halo */}
              <motion.div
                animate={{
                  scale: instruction.scale,
                  opacity: cyclePhase === 'exhale' ? 0.35 : 0.75
                }}
                transition={{ duration: cyclePhase === 'inhale2' ? 1.2 : 2.5, ease: 'easeInOut' }}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#8F3722]/15 dark:bg-[#F47A45]/20 flex items-center justify-center border border-[#8F3722]/30 dark:border-[#F47A45]/30"
              >
                {/* Core Breathing Orb */}
                <motion.div
                  animate={{
                    scale: instruction.scale,
                    backgroundColor: cyclePhase === 'exhale' ? '#C87242' : '#8F3722'
                  }}
                  transition={{ duration: cyclePhase === 'inhale2' ? 1.2 : 2.5, ease: 'easeInOut' }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center text-white p-3 text-center shadow-xl"
                >
                  <Wind className="w-6 h-6 mb-1 opacity-90" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider leading-tight">
                    {instruction.title}
                  </span>
                </motion.div>
              </motion.div>

              {/* Subtitle guidance */}
              <p className="mt-4 text-xs sm:text-sm font-semibold text-center text-[#1A1412] dark:text-[#FFF7F2]">
                {instruction.sub}
              </p>

              {/* Remaining seconds bar */}
              <div className="w-full max-w-xs mt-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#8F3722] dark:text-[#F47A45]">
                  <span>Tiempo restante</span>
                  <span>{secondsRemaining}s</span>
                </div>
                <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#8F3722] dark:bg-[#F47A45] rounded-full"
                    style={{ width: `${(secondsRemaining / 60) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="my-8 py-6 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#8F3722]/15 dark:bg-[#F47A45]/20 text-[#8F3722] dark:text-[#F47A45] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-xl font-bold text-[#1A1412] dark:text-[#FFF7F2]">
                  Reseteo completado
                </h3>
                <p className="text-xs text-[#3D3532] dark:text-[#E2D7D1] max-w-sm mx-auto leading-relaxed">
                  Tu frecuencia cardíaca se ha estabilizado. Sentí tus pies en el suelo, aflojá la lengua del paladar y retomá tu día con calma.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#8F3722] hover:bg-[#7A2818] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Volver a la calma
              </button>
            </motion.div>
          )}

          {/* Somatic grounding tips at bottom */}
          <div className="pt-3 border-t border-[#E8B8A6]/40 dark:border-white/10 flex items-center justify-between text-[11px] text-[#3D3532]/70 dark:text-white/60">
            <span>✨ Aflojá los hombros y la mandíbula</span>
            <button
              type="button"
              onClick={() => {
                setSecondsRemaining(60);
                setIsActive(true);
                setIsCompleted(false);
                setCyclePhase('inhale1');
              }}
              className="hover:text-[#8F3722] dark:hover:text-[#F47A45] flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar 60s</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
