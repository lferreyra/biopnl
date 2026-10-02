import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types';
import { UserAvatar } from '../components/UserAvatar';
import { Disclaimer } from '../components/Disclaimer';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Calendar, Mail, Database, BookOpen, ExternalLink, Moon, Sun, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
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

        {/* NotebookLM info */}
        <div className="bio-glass-card rounded-2xl p-4 border border-[#E8B8A6]/30 dark:border-[#E8B8A6]/10 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-[#8F3722] dark:text-[#E07853] font-bold uppercase tracking-wider text-[11px]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biblioteca de referencia activa</span>
          </div>
          <p className="text-[#111111] dark:text-[#FFF4ED]/80 font-normal">
            Tus consultas se procesan a través de la arquitectura de la biblioteca de biodecodificación y PNL.
          </p>
          <a
            href="https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#8F3722] dark:text-[#E07853] font-bold hover:underline pt-1"
          >
            <span>Explorar cuaderno de NotebookLM</span>
            <ExternalLink className="w-3 h-3" />
          </a>
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
