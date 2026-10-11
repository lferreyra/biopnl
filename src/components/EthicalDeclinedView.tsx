import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import {
  ShieldAlert,
  Heart,
  Stethoscope,
  LogOut,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface EthicalDeclinedViewProps {
  userEmail: string;
  userName?: string;
  onReopenModal: () => void;
  onSignOut: () => void;
}

export const EthicalDeclinedView: React.FC<EthicalDeclinedViewProps> = ({
  userEmail,
  userName,
  onReopenModal,
  onSignOut
}) => {
  return (
    <div className="min-h-screen bg-[#FFF9F5] dark:bg-[#140C08] text-[#281E19] dark:text-[#FFF7F2] flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4">
        <Logo size="md" showText={true} />
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DE673D]/30 text-xs sm:text-sm font-semibold text-[#7E716D] dark:text-[#BDB0A8] hover:text-[#DE673D] hover:bg-[#DE673D]/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </button>
      </header>

      {/* Main Content Centerpiece */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bio-glass-panel bg-white/80 dark:bg-white/5 border border-[#DE673D]/25 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-xl space-y-7"
        >
          {/* Emblem Icon with protective halo */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#DE673D]/20 blur-xl scale-125" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#DE673D]/15 dark:bg-[#DE673D]/20 border border-[#DE673D]/40 flex items-center justify-center text-[#DE673D]">
                <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-[#DE673D]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DE673D]/15 text-[#DE673D] text-xs font-bold uppercase tracking-wider">
              <span>Acceso en pausa por cuidado responsable</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#241915] dark:text-[#FFF7F2] tracking-tight max-w-lg">
              Para ingresar a tu perfil es necesario aceptar el Marco Ético y de Salud
            </h1>

            <p className="text-xs sm:text-sm text-[#7E716D] dark:text-[#BDB0A8]">
              Cuenta activa: <span className="font-semibold text-[#241915] dark:text-[#FFF4ED]">{userEmail}</span>
            </p>
          </div>

          {/* Explanation Cards */}
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#4A3B32] dark:text-[#E8DDD5]">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#DE673D]/8 dark:bg-white/5 border border-[#DE673D]/20 space-y-2">
              <h3 className="font-bold text-sm text-[#DE673D] flex items-center gap-2">
                <Heart className="w-4 h-4 shrink-0" />
                ¿Por qué pausamos tu ingreso?
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                Respetamos plenamente tu decisión. Sin embargo, para BioPNL <strong>tu salud física y mental es la máxima prioridad</strong>. Esta aplicación aborda el sentido biológico y emocional de los síntomas exclusivamente como una herramienta de introspección complementaria.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-black/20 border border-black/5 dark:border-white/5 space-y-2">
              <h3 className="font-bold text-sm text-[#241915] dark:text-[#FFF4ED] flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#DE673D] shrink-0" />
                Por qué no recomendamos usar la app si no se comprende este marco
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#5D4E45] dark:text-[#D5C7BD]">
                La biodecodificación <strong>nunca debe sustituir a la medicina clínica</strong> ni utilizarse como motivo para demorar consultas profesionales o suspender medicamentos. Si no compartís o no comprendés este límite ético, <strong>por responsabilidad y cuidado mutuo no recomendamos el uso de la aplicación</strong>.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onReopenModal}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#E26A40] to-[#D45A2F] text-white font-bold text-xs sm:text-sm hover:brightness-105 active:scale-95 shadow-lg shadow-[#DE673D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Revisar y aceptar el marco ético</span>
            </button>

            <button
              type="button"
              onClick={onSignOut}
              className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-gray-300 dark:border-white/20 text-[#7E716D] dark:text-[#BDB0A8] hover:text-[#241915] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer reassurance note */}
      <footer className="max-w-4xl w-full mx-auto py-4 text-center text-xs text-[#7E716D] dark:text-[#8D807A]">
        BioPNL • Compromiso irrestricto con la salud responsable y el autoconocimiento consciente.
      </footer>
    </div>
  );
};
