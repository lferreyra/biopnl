import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types';
import { UserAvatar } from '../components/UserAvatar';
import { Disclaimer } from '../components/Disclaimer';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Calendar, Mail, Database, BookOpen, Moon, Sun, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

interface ProfilePageProps {
  user: UserProfile;
  onSignOut: () => void;
  searchesCount: number;
  onNavigateToAdmin?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onSignOut,
  searchesCount,
  onNavigateToAdmin
}) => {
  const { theme, setTheme } = useTheme();
  const isAdmin = user.role === 'admin' || user.email.toLowerCase() === 'lucas.ferreyra@gmail.com';
  const [sosEnabled, setSosEnabled] = useState(() => localStorage.getItem('biopnl_show_sos_button') === 'true');

  const memberSince = new Date(user.createdAt).toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto space-y-6 py-4"
    >
      {/* Header */}
      <motion.div variants={fadeInUpVariants} className="space-y-1">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight">
          Tu Perfil
        </h1>
        <p className="text-xs sm:text-sm text-[#374151] dark:text-[#BDB0A8] font-medium">
          Información de tu cuenta, rol, privacidad y apariencia en BioPNL.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={fadeInUpVariants}
        className="bio-glass-panel rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <UserAvatar name={user.name} size="lg" />
            <div className="min-w-0">
              <h2 className="font-heading text-2xl font-bold text-[#111111] dark:text-[#FFF4ED] truncate">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#374151] dark:text-[#BDB0A8] font-semibold flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
                <span className="truncate">{user.email}</span>
              </p>
            </div>
          </div>

          {/* Role Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isAdmin
                ? 'bg-[#8F3722]/15 text-[#8F3722] dark:text-[#E07853] border border-[#8F3722]/30'
                : 'bg-black/5 dark:bg-white/10 text-[#374151] dark:text-[#BDB0A8]'
            }`}
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
            <span>{isAdmin ? 'Administrador' : 'Usuario'}</span>
          </span>
        </div>

        {/* Admin Shortcut Banner */}
        {isAdmin && onNavigateToAdmin && (
          <div className="p-4 rounded-2xl bg-[#8F3722]/10 dark:bg-[#E07853]/15 border border-[#8F3722]/20 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#111111] dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
                <span>Privilegios de Administrador Activos</span>
              </h4>
              <p className="text-[11px] text-[#374151] dark:text-[#BDB0A8]">
                Podés ver métricas de usuarios, correos registrados y consultas del sistema.
              </p>
            </div>

            <button
              onClick={onNavigateToAdmin}
              className="px-4 py-2 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Abrir Panel Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Theme Preference Selector */}
        <div className="pt-2 border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/10">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#BDB0A8] mb-2.5">
            Ambiente & Luz de Interfaz
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white dark:bg-white/10 border-[#8F3722] shadow-xs ring-1 ring-[#8F3722]'
                  : 'bg-white/50 dark:bg-white/5 border-transparent hover:border-white/50 text-[#374151]'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#F6E7DF] text-[#8F3722] flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111111] dark:text-[#FFF4ED]">
                  Modo Cálido
                </p>
                <p className="text-[10px] text-[#4B5563] dark:text-[#BDB0A8] font-medium">
                  Luz & letras oscuras
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#191209] border-[#E07853] shadow-xs ring-1 ring-[#E07853]'
                  : 'bg-white/50 dark:bg-white/5 border-transparent hover:border-white/50 text-[#374151]'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#2A1F1A] text-[#F47A45] flex items-center justify-center shrink-0 border border-white/10">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111111] dark:text-[#FFF4ED]">
                  Café Profundo
                </p>
                <p className="text-[10px] text-[#4B5563] dark:text-[#BDB0A8] font-medium">
                  Espresso & orbes ámbar
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/10">
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/90 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-[#374151] dark:text-[#BDB0A8] font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
              <span>Miembro desde</span>
            </div>
            <p className="text-sm font-bold text-[#111111] dark:text-[#FFF4ED] capitalize">
              {memberSince}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/90 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-[#374151] dark:text-[#BDB0A8] font-semibold mb-1">
              <Database className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
              <span>Historial activo</span>
            </div>
            <p className="text-sm font-bold text-[#111111] dark:text-[#FFF4ED]">
              {searchesCount} de 5 consultas guardadas
            </p>
          </div>
        </div>

        {/* Anxiety SOS Setting (Configurable per user) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8F3722] dark:text-[#E07853] uppercase tracking-wider block">
                Acompañamiento en momentos de ansiedad
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#FFF4ED]">
                ¿Tenés tendencia a la ansiedad o sobrecarga emocional?
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#BDB0A8] leading-relaxed">
                Activá esta opción si deseás tener a mano el botón flotante de reseteo rápido en 60 segundos ("Doble Suspiro Fisiológico") para momentos de pánico o estrés intenso.
              </p>
            </div>

            {/* Big toggle button */}
            <button
              type="button"
              onClick={() => {
                const nextVal = !(localStorage.getItem('biopnl_show_sos_button') === 'true');
                localStorage.setItem('biopnl_show_sos_button', nextVal ? 'true' : 'false');
                window.dispatchEvent(new Event('storage'));
                // Force component re-render
                setSosEnabled(nextVal);
              }}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                sosEnabled ? 'bg-[#8F3722] dark:bg-[#E07853]' : 'bg-black/20 dark:bg-white/20'
              }`}
              role="switch"
              aria-checked={sosEnabled}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  sosEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Source citation info */}
        <div className="bio-glass-card rounded-2xl p-4 border border-[#E8B8A6]/30 dark:border-[#E8B8A6]/10 text-xs sm:text-sm space-y-1.5">
          <div className="flex items-center gap-1.5 text-[#8F3722] dark:text-[#E07853] font-bold uppercase tracking-wider text-xs">
            <BookOpen className="w-4 h-4" />
            <span>Fundamentos de Biodecodificación & PNL</span>
          </div>
          <p className="text-[#111111] dark:text-[#FFF4ED]/80 font-normal leading-relaxed">
            Las lecturas se basan en literatura consolidada de biodecodificación biológica y programación neurolingüística para el autoconocimiento y la serenidad física.
          </p>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2">
          <button
            onClick={onSignOut}
            className="w-full min-h-[46px] rounded-full border border-[#8F3722]/40 text-[#8F3722] dark:text-[#E07853] hover:bg-[#8F3722]/10 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeInUpVariants}>
        <Disclaimer variant="compact" />
      </motion.div>
    </motion.div>
  );
};
