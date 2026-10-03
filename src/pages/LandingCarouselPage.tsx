import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfile } from "../types";
import { AuthService } from "../services/authService";
import { Logo } from "../components/Logo";
import { ThemeToggle } from "../components/ThemeToggle";
import { MockupDevicesShowcase } from "../components/landing/MockupDevicesShowcase";
import { AppImages } from "../assets/images";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Compass,
  Wind
} from "lucide-react";

interface LandingCarouselPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

const TOTAL_SLIDES = 5;

export const LandingCarouselPage: React.FC<LandingCarouselPageProps> = ({
  onLoginSuccess
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auth Form State for Slide 4
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const goToSlide = (newIndex: number) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    try {
      let user: UserProfile;
      if (isSignUp) {
        if (!name.trim()) {
          setAuthError("Por favor ingresá tu nombre y apellido completos.");
          setIsLoading(false);
          return;
        }
        user = await AuthService.signUp(email, password, name.trim());
      } else {
        user = await AuthService.signInWithEmail(email, password);
      }
      onLoginSuccess(user);
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : "Error de autenticación.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const user = await AuthService.signInWithGoogle();
      onLoginSuccess(user);
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : "No se pudo iniciar sesión con Google.");
    } finally {
      setIsLoading(false);
    }
  };

  // Smooth slide motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeOut" as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.16, ease: "easeIn" as const }
    })
  };

  const slideTitles = [
    "Bienvenida",
    "Comprender tu cuerpo",
    "Ejercicios de calma",
    "100% Gratis",
    "Acceso"
  ];

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between text-[#1A1412] dark:text-white relative select-none transition-colors duration-300">
      {/* Dynamic Background Image: Adapted for Light and Dark modes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* LIGHT MODE BACKGROUND: Luminous, warm morning arch edition */}
        <img
          src={AppImages.portalArchLight}
          alt="Portal de luz y calma BioPNL"
          className="w-full h-full object-cover object-[center_35%] scale-105 block dark:hidden transition-transform duration-700"
        />
        {/* LIGHT MODE ATMOSPHERIC OVERLAY: Gentle warm blur & soft gradient for maximum legibility */}
        <div className="absolute inset-0 block dark:hidden bg-gradient-to-b from-[#FAF3EE]/60 via-[#FAF3EE]/45 to-[#FAF3EE]/80 backdrop-blur-[1.5px]" />

        {/* DARK MODE BACKGROUND: Mysterious, glowing deep amber arch & silhouette */}
        <img
          src={AppImages.portalArchDark}
          alt="Portal de luz y calma interior"
          className="w-full h-full object-cover object-[center_35%] scale-105 hidden dark:block transition-transform duration-700"
        />
        {/* DARK MODE ATMOSPHERIC OVERLAY: Deep cinematic chiaroscuro & golden glow */}
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-black/60 via-black/45 to-black/80 backdrop-blur-[1px]" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between shrink-0 z-40 border-b border-[#E8B8A6]/30 dark:border-white/15 bg-[#FAF3EE]/75 dark:bg-black/45 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="hidden sm:inline-block text-xs text-[#3D3532] dark:text-white/80 font-medium pl-2 border-l border-[#E8B8A6]/40 dark:border-white/20">
            Bienestar & Escucha Corporal
          </span>
        </div>

        {/* Right side: Free badge & Skip to login & theme toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/40">
            100% Gratis
          </span>

          {currentSlide < TOTAL_SLIDES - 1 && (
            <button
              onClick={() => goToSlide(TOTAL_SLIDES - 1)}
              className="text-xs font-bold text-[#8F3722] dark:text-white hover:text-[#7A2818] dark:hover:text-[#F47A45] px-3 py-1 rounded-full bg-white/90 dark:bg-white/15 hover:bg-white dark:hover:bg-white/25 border border-[#E8B8A6]/60 dark:border-white/25 transition-all cursor-pointer shadow-2xs backdrop-blur-md"
            >
              Entrar
            </button>
          )}

          <ThemeToggle />
        </div>
      </header>

      {/* Main Viewport Content Area - Responsive, scroll-safe, never truncated */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 min-h-0 flex flex-col justify-center relative z-20 overflow-y-auto sm:overflow-hidden py-2 sm:py-3">
        <AnimatePresence custom={direction} mode="wait">

          {/* SLIDE 0: BIENVENIDA */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full my-auto flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center w-full">
                <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-white/15 backdrop-blur-md text-[#8F3722] dark:text-[#F47A45] text-xs font-bold border border-[#E8B8A6]/50 dark:border-white/20 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>BioPNL · Bienestar Cotidiano</span>
                  </div>

                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1A1412] dark:text-white leading-tight drop-shadow-xs">
                    Aprendé a escuchar <br className="hidden sm:inline" />
                    <span className="text-[#8F3722] dark:text-[#F47A45]">lo que tu cuerpo siente.</span>
                  </h1>

                  <p className="text-sm sm:text-base text-[#3D3532] dark:text-white/90 leading-relaxed max-w-md mx-auto lg:mx-0 font-normal">
                    Descubrí qué emoción expresa cada dolor o molestia y recuperá la calma con ejercicios simples de respiración.
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 text-xs font-medium backdrop-blur-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>100% Gratuito · Sin tarjetas ni cobros</span>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                    <button
                      onClick={nextSlide}
                      className="min-h-[40px] px-5 sm:px-6 rounded-full bg-[#181311] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-[#140A07] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
                    >
                      <span>Descubrir cómo funciona</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => goToSlide(TOTAL_SLIDES - 1)}
                      className="min-h-[40px] px-4 rounded-full bg-white/85 dark:bg-white/15 hover:bg-white dark:hover:bg-white/25 backdrop-blur-md text-[#181311] dark:text-white border border-[#E8B8A6]/60 dark:border-white/30 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Ir al acceso
                    </button>
                  </div>
                </div>

                <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
                  <div className="scale-90 origin-center drop-shadow-2xl">
                    <MockupDevicesShowcase activeSlide={0} onExploreClick={nextSlide} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 1: COMPRENDER TU CUERPO */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full my-auto flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8F3722]/10 dark:bg-[#F47A45]/20 backdrop-blur-md text-[#8F3722] dark:text-[#F47A45] text-xs font-bold border border-[#8F3722]/20 dark:border-[#F47A45]/30">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Paso 1 · Buscador de Síntomas</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1412] dark:text-white leading-tight drop-shadow-xs">
                    ¿Qué emoción hay detrás de lo que sentís?
                  </h2>

                  <p className="text-sm sm:text-base text-[#3D3532] dark:text-white/90 leading-relaxed max-w-md mx-auto lg:mx-0 font-normal">
                    Escribí cualquier molestia —como cuello, espalda o acidez— y descubrí qué situación o preocupación la está causando, con palabras simples.
                  </p>

                  <div className="pt-1 flex justify-center lg:justify-start">
                    <button
                      onClick={nextSlide}
                      className="min-h-[40px] px-5 sm:px-6 rounded-full bg-[#181311] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-[#140A07] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Ver ejercicios de calma</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center w-full">
                  <div className="w-full max-w-sm rounded-[24px] p-4 sm:p-5 bg-white/85 dark:bg-black/65 backdrop-blur-xl border border-[#E8B8A6]/40 dark:border-white/20 shadow-2xl space-y-2.5 text-left text-[#1A1412] dark:text-white">
                    <div className="flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#F47A45]">
                      <span className="uppercase tracking-wider">Ejemplo común</span>
                      <span className="text-[#3D3532]/70 dark:text-white/60 text-[11px] font-normal">Consulta frecuente</span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#1A1412] dark:text-white">
                      Dolor de cuello y hombros
                    </h3>

                    <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/15 text-xs sm:text-sm text-[#1A1412] dark:text-white/95 leading-relaxed">
                      <strong>Significado:</strong> Cargar con responsabilidades de otros y dificultad para decir que no o pedir ayuda.
                    </div>

                    <p className="text-xs text-[#8F3722] dark:text-[#F47A45] italic">
                      "¿Qué carga pesada estás llevando hoy que podrías soltar?"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: EJERCICIOS SENCILLOS DE CALMA */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full my-auto flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8F3722]/10 dark:bg-[#F47A45]/20 backdrop-blur-md text-[#8F3722] dark:text-[#F47A45] text-xs font-bold border border-[#8F3722]/20 dark:border-[#F47A45]/30">
                    <Wind className="w-3.5 h-3.5" />
                    <span>Paso 2 · Pausas de Calma</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1412] dark:text-white leading-tight drop-shadow-xs">
                    Ejercicios guiados de 3 minutos.
                  </h2>

                  <p className="text-sm sm:text-base text-[#3D3532] dark:text-white/90 leading-relaxed max-w-md mx-auto lg:mx-0 font-normal">
                    Pausas simples con cronómetro para aflojar la tensión en el pecho y los hombros, bajar la ansiedad y recuperar tu centro.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-white/15 backdrop-blur-md text-xs font-semibold text-[#1A1412] dark:text-white border border-[#E8B8A6]/40 dark:border-white/20">
                      🫁 Respiración 4-7-8
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-white/15 backdrop-blur-md text-xs font-semibold text-[#1A1412] dark:text-white border border-[#E8B8A6]/40 dark:border-white/20">
                      💡 Cambiar la mirada
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-white/15 backdrop-blur-md text-xs font-semibold text-[#1A1412] dark:text-white border border-[#E8B8A6]/40 dark:border-white/20">
                      🕊️ Aflojar el cuerpo
                    </span>
                  </div>

                  <div className="pt-1 flex justify-center lg:justify-start">
                    <button
                      onClick={nextSlide}
                      className="min-h-[40px] px-5 sm:px-6 rounded-full bg-[#181311] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-[#140A07] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Ver privacidad y acceso</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center w-full">
                  <div className="w-full max-w-sm rounded-[24px] p-4 sm:p-5 bg-white/85 dark:bg-black/65 backdrop-blur-xl border border-[#E8B8A6]/40 dark:border-white/20 shadow-2xl space-y-2.5 text-left text-[#1A1412] dark:text-white">
                    <div className="flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#F47A45]">
                      <span>Práctica guiada</span>
                      <span className="bg-black/5 dark:bg-white/15 px-2 py-0.5 rounded-full text-[11px] text-[#1A1412] dark:text-white">
                        ⏱️ 4 min
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#1A1412] dark:text-white">
                      Respiración 4-7-8
                    </h3>

                    <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/15 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#F47A45]">
                        <span>Paso 2: Retener el aire</span>
                        <span className="font-mono bg-[#8F3722]/15 dark:bg-[#F47A45]/20 px-1.5 py-0.5 rounded-xs text-[#8F3722] dark:text-white">07s</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#1A1412] dark:text-white/95 leading-relaxed">
                        Sostené el aire en calma sin forzar. Notá cómo se afloja la mandíbula.
                      </p>
                    </div>

                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
                      ✓ Cronómetro guiado incluido
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 3: 100% GRATIS & PRIVADO */}
          {currentSlide === 3 && (
            <motion.div
              key="slide-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full my-auto flex items-center justify-center"
            >
              <div className="w-full max-w-md mx-auto text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-500/40 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sin costo · 100% Gratuito</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1412] dark:text-white leading-tight drop-shadow-xs">
                  Tu espacio seguro y sin sorpresas.
                </h2>

                <p className="text-sm sm:text-base text-[#3D3532] dark:text-white/90 leading-relaxed max-w-sm mx-auto font-normal">
                  BioPNL es libre y accesible para todos. Sin muros de pago, sin publicidad y con absoluta privacidad para tus consultas.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-3 rounded-xl bg-white/85 dark:bg-black/65 backdrop-blur-xl border border-[#E8B8A6]/40 dark:border-emerald-500/40">
                    <p className="text-xs font-bold text-[#1A1412] dark:text-white">Búsquedas</p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">Ilimitadas</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/85 dark:bg-black/65 backdrop-blur-xl border border-[#E8B8A6]/40 dark:border-emerald-500/40">
                    <p className="text-xs font-bold text-[#1A1412] dark:text-white">Ejercicios</p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">Acceso total</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/85 dark:bg-black/65 backdrop-blur-xl border border-[#E8B8A6]/40 dark:border-emerald-500/40">
                    <p className="text-xs font-bold text-[#1A1412] dark:text-white">Privacidad</p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">100% segura</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={nextSlide}
                    className="min-h-[40px] px-6 rounded-full bg-[#8F3722] dark:bg-[#F47A45] hover:bg-[#7A2818] dark:hover:bg-[#E06835] text-white font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Crear mi cuenta gratis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 4: ACCESO & LOGIN DIRECTO */}
          {currentSlide === 4 && (
            <motion.div
              key="slide-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full my-auto flex items-center justify-center"
            >
              <div className="w-full max-w-sm mx-auto">
                <div className="rounded-[24px] p-4 sm:p-5 bg-white/90 dark:bg-black/70 backdrop-blur-2xl border border-[#E8B8A6]/50 dark:border-white/25 shadow-2xl text-[#1A1412] dark:text-white">
                  <div className="text-center mb-2.5">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#1A1412] dark:text-white">
                      {isSignUp ? "Crear cuenta gratis" : "Iniciar sesión"}
                    </h3>
                    <p className="text-xs text-[#3D3532] dark:text-white/70 mt-0.5">
                      {isSignUp ? "Empezá en segundos" : "Bienvenido de vuelta a tu espacio"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full min-h-[36px] px-4 rounded-xl bg-white hover:bg-neutral-50 dark:hover:bg-neutral-100 text-neutral-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs border border-black/10 dark:border-transparent cursor-pointer mb-2"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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

                  <div className="flex items-center my-1.5">
                    <div className="flex-1 border-t border-black/10 dark:border-white/20" />
                    <span className="px-2 text-[10px] text-[#3D3532]/70 dark:text-white/60 uppercase tracking-wider font-semibold">
                      o con tu correo
                    </span>
                    <div className="flex-1 border-t border-black/10 dark:border-white/20" />
                  </div>

                  {authError && (
                    <div className="mb-2 p-2 rounded-xl bg-red-100 dark:bg-red-950/70 border border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-200 text-xs">
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleAuthSubmit} className="space-y-2">
                    {isSignUp && (
                      <div>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3532]/50 dark:text-white/50" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre y apellido completos"
                            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8F3722] dark:focus:ring-[#F47A45] text-[#1A1412] dark:text-white placeholder:text-[#3D3532]/50 dark:placeholder:text-white/40"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3532]/50 dark:text-white/50" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@email.com"
                          className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8F3722] dark:focus:ring-[#F47A45] text-[#1A1412] dark:text-white placeholder:text-[#3D3532]/50 dark:placeholder:text-white/40"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3532]/50 dark:text-white/50" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña (mínimo 6 caracteres)"
                          minLength={6}
                          className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8F3722] dark:focus:ring-[#F47A45] text-[#1A1412] dark:text-white placeholder:text-[#3D3532]/50 dark:placeholder:text-white/40"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full min-h-[38px] mt-1.5 py-2 rounded-xl bg-[#8F3722] dark:bg-[#F47A45] hover:bg-[#7A2818] dark:hover:bg-[#E06835] text-white font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{isLoading ? "Conectando..." : isSignUp ? "Registrarme gratis" : "Entrar a BioPNL"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setAuthError(null);
                        }}
                        className="text-xs text-[#8F3722] dark:text-[#F47A45] hover:underline font-semibold cursor-pointer"
                      >
                        {isSignUp
                          ? "¿Ya tenés cuenta? Iniciar sesión"
                          : "¿Primera vez aquí? Crear cuenta gratis"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Carousel Controls Footer Bar */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between shrink-0 z-40 border-t border-[#E8B8A6]/30 dark:border-white/15 bg-[#FAF3EE]/75 dark:bg-black/45 backdrop-blur-md transition-colors duration-300">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="min-h-[34px] px-3 rounded-full bg-white/80 dark:bg-white/10 text-[#1A1412] dark:text-white text-xs sm:text-sm font-semibold flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-white/20 border border-[#E8B8A6]/50 dark:border-white/20 transition-all cursor-pointer shadow-2xs backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx
                    ? "w-5 bg-[#8F3722] dark:bg-[#F47A45]"
                    : "w-2 bg-black/20 dark:bg-white/30 hover:bg-black/40 dark:hover:bg-white/50"
                }`}
                aria-label={`Ir al paso ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-xs text-[#3D3532] dark:text-white/80 font-semibold">
            {currentSlide + 1} de {TOTAL_SLIDES} · {slideTitles[currentSlide]}
          </span>
        </div>

        {currentSlide < TOTAL_SLIDES - 1 ? (
          <button
            onClick={nextSlide}
            className="min-h-[34px] px-4 rounded-full bg-[#181311] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-[#140A07] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => goToSlide(0)}
            className="min-h-[34px] px-3 rounded-full bg-white/80 dark:bg-white/15 text-[#1A1412] dark:text-white hover:bg-white dark:hover:bg-white/25 border border-[#E8B8A6]/50 dark:border-white/25 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
          >
            Inicio
          </button>
        )}
      </footer>
    </div>
  );
};
