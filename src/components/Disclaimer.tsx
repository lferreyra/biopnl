import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface DisclaimerProps {
  variant?: 'compact' | 'full' | 'emergency' | 'warning';
  customMessage?: string;
  className?: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({
  variant = 'compact',
  customMessage,
  className = ''
}) => {
  if (variant === 'emergency') {
    return (
      <div
        className={`rounded-2xl p-4 bg-[#8F3722]/10 border border-[#8F3722]/40 text-[#111111] flex items-start gap-3.5 shadow-sm ${className}`}
        role="alert"
      >
        <div className="p-2 rounded-xl bg-[#8F3722] text-white shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm leading-relaxed space-y-1">
          <p className="font-bold text-sm text-[#8F3722] dark:text-[#E07853]">
            Atención prioritaria y seguridad
          </p>
          <p className="text-[#111111] dark:text-[#FFF4ED]/90 font-medium">
            {customMessage ||
              'Si vos o alguien cercano está experimentando síntomas intensos, repentinos o potencialmente graves (como dolor en el pecho, dificultad respiratoria súbita, pérdida del conocimiento o riesgo vital), por favor acudí de inmediato a una guardia médica o llamá a emergencias. BioPNL no es un servicio de urgencias médicas ni de diagnóstico.'}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'warning') {
    return (
      <div
        className={`rounded-2xl p-4 bg-[#D96C45]/15 border border-[#8F3722]/30 text-[#111111] dark:text-[#FFF4ED] flex items-start gap-3.5 ${className}`}
      >
        <div className="p-2 rounded-xl bg-[#8F3722] text-white shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm leading-relaxed space-y-1">
          <p className="font-bold text-xs tracking-wide uppercase text-[#8F3722] dark:text-[#E07853]">
            Aviso de bienestar complementario
          </p>
          <p className="text-[#111111] dark:text-[#FFF4ED]/90 font-medium">
            {customMessage ||
              'Esta información es exclusivamente complementaria y reflexiva. No permite determinar la causa de una condición médica ni sustituye las pautas clínicas de tu equipo de salud.'}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div
        className={`lumina-glass-warm rounded-3xl p-5 sm:p-6 border border-[#E8B8A6]/50 dark:border-[#E8B8A6]/15 text-[#111111] dark:text-[#BDB0A8] text-xs sm:text-sm leading-relaxed ${className}`}
      >
        <div className="flex items-center gap-2.5 text-[#8F3722] dark:text-[#E07853] mb-2 font-bold text-xs tracking-wide uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Marco ético y de salud responsable</span>
        </div>
        <p className="text-[#262626] dark:text-[#FFF4ED]/90 leading-relaxed font-normal">
          BioPNL ofrece un espacio de indagación personal y bienestar basado en bibliotecas de biodecodificación y ejercicios de PNL. Los contenidos, preguntas e interpretaciones no constituyen un diagnóstico, pronóstico ni tratamiento médico, y no reemplazan bajo ninguna circunstancia la evaluación de un profesional de la salud matriculado.
        </p>
      </div>
    );
  }

  // Compact variant (discreet footer / card note)
  return (
    <div
      className={`text-center text-[11px] sm:text-xs text-[#262626] dark:text-[#BDB0A8] font-medium leading-relaxed max-w-xl mx-auto py-2 ${className}`}
    >
      <p>
        {customMessage ||
          'Esta aplicación ofrece información complementaria y no reemplaza la consulta con profesionales de la salud.'}
      </p>
    </div>
  );
};
