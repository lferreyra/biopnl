import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types';
import { AuthService } from '../services/authService';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { Disclaimer } from '../components/Disclaimer';
import { Lock, Mail, User, ArrowRight, ArrowUpRight } from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let user: UserProfile;
      if (isSignUp) {
        if (!name.trim()) {
          setError('Por favor ingresá tu nombre completo.');
          setIsLoading(false);
          return;
        }
        user = await AuthService.signUpWithEmail(email, password, name);
      } else {
        user = await AuthService.signInWithEmail(email, password);
      }
      onLoginSuccess(user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado al autenticar.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await AuthService.signInWithGoogle();
      onLoginSuccess(user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al conectar con Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await AuthService.signInAsDemoUser();
      onLoginSuccess(user);
    } catch {
      setError('No se pudo acceder con la cuenta de demostración.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 text-[#111111] dark:text-[#FFF4ED] transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background wallpaper (matches uploaded light beam & terracotta aura) */}
      <div className="biopnl-ambient-canvas" />

      {/* Main Container - Animated with Framer Motion */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-6"
      >
        {/* Left Column: Glassmorphism Art & Minimalist Typography Showcase */}
        <motion.div variants={fadeInUpVariants} className="hidden lg:flex lg:col-span-6 flex-col gap-6">
          {/* Top Glass Panel with Glowing Sphere behind it */}
          <div className="relative rounded-[32px] p-8 sm:p-10 overflow-hidden bio-glass-panel flex flex-col justify-between min-h-[380px]">
            {/* The circular glowing pastel sphere passing behind frosted glass pane */}
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-tr from-[#F47A45] via-[#E8B8A6] to-[#F6E7DF] opacity-80 blur-[2px] pointer-events-none" />

            {/* Top Bar inside glass */}
            <div className="relative z-10 flex items-center justify-between">
              <Logo size="md" />
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-[#374151] dark:text-[#BDB0A8] font-bold block">
                  Minimalism style
                </span>
                <span className="text-[11px] text-[#8F3722] dark:text-[#E07853] font-bold">
                  Typography & Biodecodificación
                </span>
              </div>
            </div>

            {/* Central Typography Showcase in Urbanist */}
            <div className="relative z-10 my-auto py-6 max-w-xs space-y-2">
              <div className="font-heading text-5xl xl:text-6xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED] leading-none">
                Bio
                <span className="text-[#8F3722] dark:text-[#E07853] font-light block mt-1">2025</span>
              </div>

              <p className="text-xs text-[#262626] dark:text-[#BDB0A8] font-medium leading-relaxed pt-2">
                {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
              </p>
            </div>

            {/* Bottom Insight Quote inside glass pane */}
            <div className="relative z-10 pt-4 border-t border-[#E8B8A6]/40 dark:border-white/10 flex items-center justify-between text-xs text-[#262626] dark:text-[#BDB0A8]">
              <span className="italic line-clamp-1 font-normal">
                "El cuerpo expresa lo que las palabras callan."
              </span>
              <span className="text-[10px] font-bold text-[#8F3722] dark:text-[#E07853] shrink-0 uppercase tracking-wider pl-2">
                PNL Consciente
              </span>
            </div>
          </div>

          {/* Bottom Obsidian Card */}
          <div className="bio-dark-card rounded-[28px] p-6 sm:p-7 flex items-center justify-between transition-transform duration-300 hover:scale-[1.01]">
            <div className="space-y-1">
              <h3 className="font-heading text-2xl font-bold tracking-tight text-white">
                Biblioteca BioPNL
              </h3>
              <p className="text-xs text-white/80 font-normal">
                Indagación simbólica, cartografías somáticas y protocolos
              </p>
            </div>

            <button
              onClick={handleDemoSignIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/25 transition-all cursor-pointer shadow-xs"
            >
              <span>Explorar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E8B8A6]" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Frosted Glass Form Card */}
        <motion.div variants={fadeInUpVariants} className="lg:col-span-6 w-full">
          <div className="bio-glass-card rounded-[32px] p-7 sm:p-10 relative overflow-hidden shadow-xl border border-white/95">
            {/* Ambient internal light */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#F47A45]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Card Header matching reference "Creativestyle_ / Sign up" */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-['Comfortaa',sans-serif] font-bold text-sm tracking-tight text-[#111111] dark:text-[#BDB0A8] lowercase">
                biopnl_
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError(null);
                  }}
                  className="text-xs font-bold text-[#111111] dark:text-[#FFF4ED] hover:text-[#8F3722] transition-colors cursor-pointer"
                >
                  {isSignUp ? 'Iniciar sesión' : 'Registrarse'}
                </button>
                <ThemeToggle />
              </div>
            </div>

            {/* Title */}
            <div className="mb-6 space-y-1">
              <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED]">
                {isSignUp ? 'Crear cuenta' : 'Log in'}
              </h1>
              <p className="text-xs sm:text-sm text-[#262626] dark:text-[#BDB0A8] font-medium">
                {isSignUp
                  ? 'Comenzá tu exploración consciente de síntomas'
                  : 'Ingresá a tu espacio de claridad y bienestar'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-[#8F3722]/15 border border-[#8F3722]/30 text-[#8F3722] text-xs font-bold">
                {error}
              </div>
            )}

            {/* Google Pill Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full min-h-[46px] px-5 rounded-full bio-pill-capsule text-[#111111] dark:text-[#FFF4ED] font-bold text-xs sm:text-sm flex items-center justify-center gap-3 hover:border-[#8F3722]/50 active:scale-[0.99] transition-all cursor-pointer mb-5 shadow-2xs border border-[#E8B8A6]/40"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar con Google</span>
            </button>

            <div className="relative flex items-center justify-center my-5">
              <div className="border-t border-[#E8B8A6]/40 dark:border-white/10 w-full" />
              <span className="px-3 text-[10px] uppercase tracking-wider text-[#374151] dark:text-[#BDB0A8] shrink-0 font-bold">
                o con email
              </span>
            </div>

            {/* Pill Capsule Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isSignUp && (
                <div className="relative flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center absolute left-2 text-[#374151] dark:text-[#BDB0A8] shadow-2xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="tu nombre"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full bio-pill-capsule text-sm outline-none focus:border-[#8F3722] transition-all text-[#111111] dark:text-[#FFF4ED] placeholder:text-[#4B5563] font-medium border border-[#E8B8A6]/50"
                  />
                </div>
              )}

              {/* Email capsule */}
              <div className="relative flex items-center">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center absolute left-2 text-[#374151] dark:text-[#BDB0A8] shadow-2xs">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e-mail address"
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bio-pill-capsule text-sm outline-none focus:border-[#8F3722] transition-all text-[#111111] dark:text-[#FFF4ED] placeholder:text-[#4B5563] font-medium border border-[#E8B8A6]/50"
                />
              </div>

              {/* Password capsule */}
              <div className="relative flex items-center">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center absolute left-2 text-[#374151] dark:text-[#BDB0A8] shadow-2xs">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full pl-12 pr-24 py-3.5 rounded-full bio-pill-capsule text-sm outline-none focus:border-[#8F3722] transition-all text-[#111111] dark:text-[#FFF4ED] placeholder:text-[#4B5563] font-medium border border-[#E8B8A6]/50"
                />
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => alert('Para la versión demo, podés ingresar directamente con el botón de usuario de prueba.')}
                    className="absolute right-2 px-2.5 py-1 rounded-full text-[11px] text-[#374151] hover:text-[#8F3722] bg-white/90 dark:bg-white/10 border border-[#E8B8A6]/50 dark:border-white/10 transition-colors font-semibold"
                  >
                    olvidé
                  </button>
                )}
              </div>

              {/* Action row with minimalist descriptive text & dark pill button */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <p className="text-[11px] text-[#374151] dark:text-[#BDB0A8] leading-tight line-clamp-2 max-w-[210px] font-medium">
                  {isSignUp
                    ? 'Al registrarte aceptás el marco de confidencialidad y respeto ético.'
                    : 'Información confidencial para tu proceso personal.'}
                </p>

                {/* Minimalist Pill Button with circular arrow */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0"
                >
                  <span>{isSignUp ? 'Crear' : 'Acceder'}</span>
                  <div className="w-7 h-7 rounded-full bg-white/25 dark:bg-black/10 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </form>

            {/* Quick Demo Access */}
            <div className="mt-6 pt-4 border-t border-[#E8B8A6]/30 dark:border-white/10 text-center">
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="text-xs text-[#8F3722] dark:text-[#E07853] hover:underline font-bold cursor-pointer"
              >
                Click aquí para probar como demo (Amelia) →
              </button>
            </div>
          </div>

          {/* Minimalist Medical Disclaimer at bottom */}
          <div className="mt-4">
            <Disclaimer variant="compact" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
