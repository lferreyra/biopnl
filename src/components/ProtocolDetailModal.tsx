import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Protocol } from '../types';
import { renderProtocolIcon } from './ProtocolCard';
import { X, Clock, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';
import { premiumEase } from '../utils/motionPresets';

interface ProtocolDetailModalProps {
  protocol: Protocol | null;
  onClose: () => void;
}

export const ProtocolDetailModal: React.FC<ProtocolDetailModalProps> = ({
  protocol,
  onClose
}) => {
  if (!protocol) return null;

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(protocol.durationMinutes * 60);

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(protocol.durationMinutes * 60);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.35, ease: premiumEase }}
        className="relative w-full max-w-2xl bg-[#FFF9F5] dark:bg-[#1E1612] text-[#111111] dark:text-[#FFF4ED] rounded-[32px] sm:rounded-[36px] shadow-2xl border border-white/95 dark:border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with warm ambient glow and inner presence artwork backdrop */}
        <div className="relative p-5 sm:p-7 bg-gradient-to-br from-[#F6E7DF] dark:from-[#2B1F18] via-[#FFF9F5] dark:via-[#1E1612] to-[#E8B8A6]/40 dark:to-[#191209] border-b border-[#E8B8A6]/40 dark:border-[#E8B8A6]/10 overflow-hidden">
          {/* Subtle contemplative artwork overlay */}
          <div className="absolute right-0 top-0 w-64 h-full opacity-20 dark:opacity-25 pointer-events-none overflow-hidden mix-blend-multiply dark:mix-blend-screen">
            <img
              src="/src/assets/images/lumina_inner_presence_card_1790534397513.jpg"
              alt="Atmósfera de introspección"
              className="w-full h-full object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FFF9F5] dark:to-[#1E1612]" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white dark:bg-white/10 hover:bg-[#F6E7DF] dark:hover:bg-white/20 text-[#111111] dark:text-[#FFF4ED] transition-colors cursor-pointer z-10 shadow-2xs border border-[#E8B8A6]/40"
            aria-label="Cerrar protocolo"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-[#8F3722] dark:text-[#E07853] font-bold uppercase tracking-wider mb-2">
            <span>{protocol.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {protocol.durationMinutes} minutos sugeridos
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8F3722] text-white flex items-center justify-center shadow-md shadow-[#8F3722]/20 shrink-0">
              {renderProtocolIcon(protocol.iconName, protocol.category, 'w-6 h-6')}
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight">
                {protocol.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#262626] dark:text-[#BDB0A8] mt-1 leading-relaxed font-normal">
                {protocol.objective}
              </p>
            </div>
          </div>

          {/* Integrated contemplative timer bar */}
          <div className="mt-4 pt-3 border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/10 flex items-center justify-between text-xs">
            <span className="text-[#374151] dark:text-[#BDB0A8] font-semibold">Cronómetro de acompañamiento:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-[#111111] dark:text-[#FFF4ED] tabular-nums">
                {formatTimer(secondsRemaining)}
              </span>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-2.5 py-1 rounded-lg bg-[#8F3722] text-white font-bold flex items-center gap-1 hover:opacity-90 cursor-pointer shadow-2xs"
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isTimerRunning ? 'Pausar' : 'Iniciar'}</span>
              </button>
              <button
                type="button"
                onClick={handleResetTimer}
                className="p-1 rounded-lg text-[#374151] dark:text-[#BDB0A8] hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                title="Reiniciar cronómetro"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable body content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-[#111111] dark:text-[#FFF4ED]">
          {/* Preparation card */}
          <div className="lumina-glass-warm rounded-2xl p-4 border border-[#E8B8A6]/40 dark:border-[#E8B8A6]/15">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F3722] dark:text-[#E8B8A6] mb-1">
              Preparación previa
            </h4>
            <p className="text-xs sm:text-sm text-[#262626] dark:text-[#FFF4ED]/90 leading-relaxed font-normal">
              {protocol.preparation}
            </p>
          </div>

          {/* Step by step interactive sequence */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#111111] dark:text-[#FFF4ED]">
                Paso a paso guiado
              </h3>
              <span className="text-xs text-[#374151] dark:text-[#BDB0A8] font-bold">
                Paso {activeStepIndex + 1} de {protocol.steps.length}
              </span>
            </div>

            {/* Stepper progress indicator */}
            <div className="flex gap-1.5 mb-4">
              {protocol.steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                    idx === activeStepIndex
                      ? 'bg-[#8F3722]'
                      : idx < activeStepIndex
                      ? 'bg-[#E8B8A6]'
                      : 'bg-black/15 dark:bg-white/15'
                  }`}
                  aria-label={`Ir al paso ${idx + 1}`}
                />
              ))}
            </div>

            {/* Current Step Content */}
            <div className="lumina-glass rounded-2xl p-5 border border-white/95 dark:border-white/10 shadow-xs relative">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8F3722] dark:text-[#E07853] mb-2">
                <span className="w-5 h-5 rounded-full bg-[#8F3722]/15 flex items-center justify-center text-[11px] font-bold">
                  {protocol.steps[activeStepIndex].stepNumber}
                </span>
                <span>{protocol.steps[activeStepIndex].title}</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#111111] dark:text-[#FFF4ED] font-normal">
                {protocol.steps[activeStepIndex].instruction}
              </p>

              {/* Navigation buttons inside step */}
              <div className="mt-4 pt-3 border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/10 flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold text-[#374151] dark:text-[#BDB0A8] hover:text-black dark:hover:text-[#FFF4ED] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                {activeStepIndex < protocol.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((prev) => Math.min(protocol.steps.length - 1, prev + 1))}
                    className="px-4 py-1.5 rounded-xl bg-[#8F3722] text-white text-xs font-bold flex items-center gap-1 hover:opacity-90 cursor-pointer shadow-xs"
                  >
                    <span>Siguiente paso</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Pasos completados
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Closure */}
          <div className="border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/15 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F3722] dark:text-[#E07853] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Cierre e integración
            </h4>
            <p className="text-xs sm:text-sm text-[#262626] dark:text-[#FFF4ED]/90 leading-relaxed italic bg-white/70 dark:bg-white/5 p-3.5 rounded-2xl border border-[#E8B8A6]/30 dark:border-white/5">
              "{protocol.closure}"
            </p>
          </div>

          {/* Reflection questions */}
          {protocol.reflectionQuestions && protocol.reflectionQuestions.length > 0 && (
            <div className="border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/15 pt-4">
              <h4 className="font-serif text-base sm:text-lg text-[#111111] dark:text-[#FFF4ED] font-bold mb-2.5">
                Preguntas para tu cuaderno personal
              </h4>
              <ul className="space-y-2">
                {protocol.reflectionQuestions.map((q, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#111111] dark:text-[#BDB0A8] flex items-start gap-2.5 bg-white/70 dark:bg-white/5 p-3 rounded-xl border border-[#E8B8A6]/30 dark:border-white/10"
                  >
                    <span className="text-[#8F3722] dark:text-[#E07853] font-serif font-bold text-sm shrink-0">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed font-normal">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white/80 dark:bg-[#191209]/80 border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/15 flex items-center justify-between">
          <p className="text-[11px] text-[#374151] dark:text-[#BDB0A8] font-medium">
            Este ejercicio es de reflexión personal y no sustituye la terapia clínica.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] text-xs font-bold shadow-sm hover:opacity-95 cursor-pointer"
          >
            Finalizar sesión
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
