import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import {
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  HeartHandshake,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';

interface EthicalFrameworkModalProps {
  isOpen: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onClose?: () => void;
  isMandatory?: boolean; // When true: required on login (Aceptar vs Rechazar)
}

export const EthicalFrameworkModal: React.FC<EthicalFrameworkModalProps> = ({
  isOpen,
  onAccept,
  onDecline,
  onClose,
  isMandatory = true
}) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [checkedPillars, setCheckedPillars] = useState({
    noSustituto: false,
    noSuspender: false,
    autoconocimiento: false
  });

  if (!isOpen) return null;

  const allChecked =
    checkedPillars.noSustituto &&
    checkedPillars.noSuspender &&
    checkedPillars.autoconocimiento;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 40) {
      setHasScrolledToBottom(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/65 backdrop-blur-md animate-fade-in">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          onClick={() => {
            if (!isMandatory && onClose) onClose();
          }}
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#FFF9F5] dark:bg-[#1C1410] border border-[#DE673D]/30 dark:border-[#DE673D]/25 rounded-3xl sm:rounded-[36px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 text-[#281E19] dark:text-[#FFF7F2]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 sm:pb-4 border-b border-[#E26A40]/15 dark:border-white/10 flex items-start justify-between gap-4 bg-gradient-to-b from-[#DE673D]/10 to-transparent">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DE673D]/15 text-[#DE673D] text-[11px] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Compromiso de Salud</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#241915] dark:text-[#FFF7F2] leading-tight">
                  Marco Ético y de Salud
                </h2>
              </div>
            </div>

            {!isMandatory && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-[#7E716D] hover:text-[#241915] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Scrollable Content Body */}
          <div
            onScroll={handleScroll}
            className="p-5 sm:p-7 overflow-y-auto space-y-5 text-xs sm:text-sm leading-relaxed text-[#4A3B32] dark:text-[#E8DDD5] scrollbar-thin"
          >
            {/* Introductory Callout */}
            <div className="p-4 rounded-2xl bg-[#DE673D]/10 border border-[#DE673D]/20 text-[#241915] dark:text-[#FFF4ED] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#DE673D] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-xs uppercase tracking-wider text-[#DE673D]">
                  Lectura obligatoria para el uso de BioPNL
                </p>
                <p className="text-xs sm:text-[13px] leading-relaxed">
                  Para nosotros tu salud y bienestar son la máxima prioridad. Antes de acceder a tu perfil y herramientas, necesitamos que comprendas con total claridad el alcance y los límites éticos de este espacio.
                </p>
              </div>
            </div>

            {/* Pillar 1: Propósito */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2.5 text-[#241915] dark:text-white font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-full bg-[#DE673D]/15 text-[#DE673D] flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </div>
                <h3>Espacio de Autoconocimiento e Introspección</h3>
              </div>
              <p className="pl-9 text-xs sm:text-sm text-[#5D4E45] dark:text-[#D5C7BD]">
                BioPNL es una herramienta educativa y de desarrollo personal para explorar las conexiones emocionales, biológicas y del lenguaje (biodecodificación y PNL). Su objetivo es acompañar tu propia reflexión sobre cómo vivís tus emociones y el estrés cotidiano.
              </p>
            </div>

            {/* Pillar 2: No sustituto médico */}
            <div className="p-4 rounded-2xl bg-[#DE673D]/5 dark:bg-[#DE673D]/10 border border-[#DE673D]/20 space-y-2">
              <div className="flex items-center gap-2.5 text-[#B84E28] dark:text-[#F47A45] font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-full bg-[#DE673D] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <h3>No constituye Diagnóstico ni Tratamiento Médico</h3>
              </div>
              <p className="pl-9 text-xs sm:text-sm text-[#4A3B32] dark:text-[#E8DDD5]">
                Ningún contenido, resultado de búsqueda, interpretación o protocolo ofrecido por esta aplicación es ni debe considerarse diagnóstico médico, tratamiento clínico, terapia psicológica formal o prescripción de medicamentos. La biodecodificación <strong>no sustituye la consulta médica oportuna con profesionales matriculados</strong>.
              </p>
            </div>

            {/* Pillar 3: Continuidad estricta */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2.5 text-[#241915] dark:text-white font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-full bg-[#DE673D]/15 text-[#DE673D] flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </div>
                <h3>Prohibición de Suspender o Modificar Tratamientos Médicos</h3>
              </div>
              <p className="pl-9 text-xs sm:text-sm text-[#5D4E45] dark:text-[#D5C7BD]">
                Bajo ninguna circunstancia debes suspender, posponer, interrumpir o alterar tratamientos farmacológicos, cirugías, estudios de diagnóstico o recomendaciones indicadas por tus médicos. La biodecodificación se concibe únicamente como una mirada complementaria de bienestar, <strong>nunca alternativa ni excluyente de la medicina científica</strong>.
              </p>
            </div>

            {/* Pillar 4: Responsabilidad personal */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2.5 text-[#241915] dark:text-white font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-full bg-[#DE673D]/15 text-[#DE673D] flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <h3>Responsabilidad y Criterio Personal</h3>
              </div>
              <p className="pl-9 text-xs sm:text-sm text-[#5D4E45] dark:text-[#D5C7BD]">
                Al utilizar BioPNL, asumís voluntariamente la responsabilidad de reflexionar con sentido crítico sobre tu proceso personal. Si experimentás síntomas intensos, agudos o dolor repentino, debés acudir de inmediato a una guardia o centro de salud.
              </p>
            </div>

            {/* Checkboxes de comprensión activa para mayor solidez ética */}
            {isMandatory && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#DE673D]/8 dark:bg-white/5 border border-[#DE673D]/25 space-y-3">
                <p className="font-bold text-xs uppercase tracking-wider text-[#DE673D]">
                  Por favor confirmá tu comprensión antes de continuar:
                </p>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checkedPillars.noSustituto}
                    onChange={(e) =>
                      setCheckedPillars((prev) => ({ ...prev, noSustituto: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-[#DE673D] focus:ring-[#DE673D] border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <span className="text-xs leading-normal">
                    Comprendo que BioPNL <strong>no proporciona diagnósticos médicos ni psicológicos</strong>.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checkedPillars.noSuspender}
                    onChange={(e) =>
                      setCheckedPillars((prev) => ({ ...prev, noSuspender: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-[#DE673D] focus:ring-[#DE673D] border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <span className="text-xs leading-normal">
                    Me comprometo a <strong>no suspender ni alterar ningún tratamiento médico</strong> ni medicación recetada.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checkedPillars.autoconocimiento}
                    onChange={(e) =>
                      setCheckedPillars((prev) => ({ ...prev, autoconocimiento: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-[#DE673D] focus:ring-[#DE673D] border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <span className="text-xs leading-normal">
                    Acepto utilizar la app como herramienta <strong>complementaria de autoconocimiento y reflexión</strong>.
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-[#E26A40]/15 dark:border-white/10 bg-white/40 dark:bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            {isMandatory ? (
              <>
                <button
                  type="button"
                  onClick={onDecline}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-gray-300 dark:border-white/20 text-[#7E716D] dark:text-[#BDB0A8] hover:text-[#241915] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center order-2 sm:order-1"
                >
                  Rechazar marco ético
                </button>

                <button
                  type="button"
                  onClick={onAccept}
                  disabled={!allChecked}
                  className={`w-full sm:w-auto px-7 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all order-1 sm:order-2 cursor-pointer ${
                    allChecked
                      ? 'bg-gradient-to-r from-[#E26A40] to-[#D45A2F] text-white hover:brightness-105 active:scale-95 shadow-[#DE673D]/30'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aceptar y acceder a mi perfil</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto ml-auto px-6 py-2.5 rounded-full bg-[#DE673D] text-white font-bold text-xs sm:text-sm hover:brightness-105 transition-all cursor-pointer"
              >
                Cerrar y volver
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
