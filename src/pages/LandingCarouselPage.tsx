import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types';
import { AuthService } from '../services/authService';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { MockupDevicesShowcase } from '../components/landing/MockupDevicesShowcase';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Brain,
  Wind,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Heart,
  Compass,
  Check,
  Clock,
  Sparkle
} from 'lucide-react';

interface LandingCarouselPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  initialSlide?: number;
}

export const LandingCarouselPage: React.FC<LandingCarouselPageProps> = ({
  onLoginSuccess,
  initialSlide = 0
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [direction, setDirection] = useState(1);

  // Auth Form State for the final slide
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const TOTAL_SLIDES = 5;

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setAuthError(null);
  };

  const nextSlide = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      setAuthError(null);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
      setAuthError(null);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Auth Handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      let user: UserProfile;
      if (isSignUp) {
        if (!name.trim()) {
          setAuthError('Por favor ingresá tu nombre completo.');
          setIsLoading(false);
          return;
        }
        user = await AuthService.signUpWithEmail(email, password, name);
      } else {
        user = await AuthService.signInWithEmail(email, password);
      }
      onLoginSuccess(user);
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'Error al autenticar.');
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
      setAuthError(err instanceof Error ? err.message : 'Error al conectar con Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const user = await AuthService.signInAsDemoUser();
      onLoginSuccess(user);
    } catch {
      setAuthError('No se pudo acceder con la cuenta de demostración.');
    } finally {
      setIsLoading(false);
    }
  };

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.22, ease: 'easeIn' as const }
    })
  };

  const slideTitles = [
    'Bienvenida',
    'Biodecodificación',
    'Protocolos PNL',
    '100% Gratis',
    'Acceso / Login'
  ];

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between text-[#111111] dark:text-[#FFF4ED] relative select-none transition-colors duration-300">
      {/* Master Ambient Background Canvas */}
      <div className="biopnl-ambient-canvas" />

      {/* Top Header Bar: Clean & separated (No middle clutter that interferes with titles) */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between shrink-0 z-40 border-b border-[#E8B8A6]/25 dark:border-white/10 bg-[#FAF3EE]/40 dark:bg-[#140A07]/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="hidden sm:inline-block text-[10px] text-[#374151] dark:text-[#BDB0A8] uppercase tracking-wider font-bold pl-1 border-l border-[#E8B8A6]/40 dark:border-white/10">
            Biodecodificación & PNL
          </span>
        </div>

        {/* Right side: Step badge & skip to login & theme toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800/40">
            100% Gratis
          </span>

          {currentSlide < TOTAL_SLIDES - 1 && (
            <button
              onClick={() => goToSlide(TOTAL_SLIDES - 1)}
              className="text-xs font-bold text-[#8F3722] dark:text-[#E07853] hover:underline px-3 py-1 rounded-full bg-white/90 dark:bg-white/10 border border-[#E8B8A6]/50 dark:border-white/10 transition-colors cursor-pointer shadow-2xs"
            >
              Iniciar sesión
            </button>
          )}

          <ThemeToggle />
        </div>
      </header>

      {/* Main Viewport Content Area: Generous top headroom so titles never touch the header */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex-1 min-h-0 flex items-center justify-center relative z-20 overflow-hidden pt-2 pb-1">
        <AnimatePresence custom={direction} mode="wait">

          {/* ============================================================== */}
          {/* SLIDE 0: HERO WELCOME & 3D FLOATING DEVICES SHOWCASE           */}
          {/* ============================================================== */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full max-h-full flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                {/* Left: Concise Value Proposition */}
                <div className="lg:col-span-6 space-y-2.5 sm:space-y-3.5 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-white/10 text-[#8F3722] dark:text-[#E07853] text-[10px] font-bold border border-[#E8B8A6]/50 dark:border-white/15 shadow-2xs">
                    <Sparkles className="w-3 h-3" />
                    <span>Autoconocimiento somático & PNL</span>
                  </div>

                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED] leading-[1.12]">
                    Tu cuerpo habla. <br />
                    <span className="text-[#8F3722] dark:text-[#E07853]">Aprendé a escucharlo</span> sin juicios.
                  </h1>

                  <p className="text-xs sm:text-sm text-[#262626] dark:text-[#D1C7BD] leading-relaxed max-w-sm font-normal">
                    Comprendé qué emoción o vivencia refleja tu síntoma físico según la biodecodificación, y regulá tu calma con protocolos interactivos de PNL.
                  </p>

                  {/* 100% Free Guarantee Pill */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 dark:bg-white/5 border border-emerald-500/40 flex items-center gap-2 shadow-2xs max-w-sm">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#111111] dark:text-[#FFF4ED] leading-tight">
                        100% Gratuito y Libre
                      </p>
                      <p className="text-[10px] text-[#374151] dark:text-[#BDB0A8] truncate">
                        Sin tarjeta, sin suscripciones ocultas ni publicidad.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-0.5 flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={nextSlide}
                      className="min-h-[38px] px-5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                    >
                      <span>Conocer beneficios</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => goToSlide(TOTAL_SLIDES - 1)}
                      className="min-h-[38px] px-4 rounded-full bio-pill-capsule font-bold text-xs text-[#111111] dark:text-[#FFF4ED] hover:border-[#8F3722]/50 transition-colors cursor-pointer"
                    >
                      Acceder gratis
                    </button>
                  </div>
                </div>

                {/* Right: Floating Devices Mockup (calibrated size) */}
                <div className="lg:col-span-6 flex justify-center items-center">
                  <MockupDevicesShowcase activeSlide={0} onExploreClick={nextSlide} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 1: BENEFIT 1 - BIODECODIFICACIÓN CONSCIENTE              */}
          {/* ============================================================== */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full max-h-full flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                {/* Left: Summary */}
                <div className="lg:col-span-6 space-y-2.5 sm:space-y-3 text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8F3722]/15 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-[10px] font-bold">
                    <Compass className="w-3 h-3" />
                    <span>Beneficio 1 · Comprensión Somática</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED] leading-tight">
                    Descubrí qué emoción expresa tu cuerpo
                  </h2>

                  <p className="text-xs text-[#262626] dark:text-[#D1C7BD] leading-relaxed font-normal">
                    Cada molestia o tensión reiterada (como migrañas, dolor lumbar o pesadez digestiva) suele conectar con vivencias retenidas. BioPNL te ayuda a descifrarlo con lecturas respetuosas.
                  </p>

                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <p className="text-xs text-[#262626] dark:text-[#D1C7BD]">
                        <strong>Nodos emocionales:</strong> Identificá sobreexigencia, límites no expresados o temor.
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <p className="text-xs text-[#262626] dark:text-[#D1C7BD]">
                        <strong>Preguntas fértiles:</strong> Autoindagación para reflexionar en tu cuaderno.
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <p className="text-xs text-[#262626] dark:text-[#D1C7BD]">
                        <strong>Enfoque complementario:</strong> Sin culpas ni dogmatismos. La medicina atiende el cuerpo; acá acompañamos lo emocional.
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={nextSlide}
                      className="min-h-[38px] px-5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95 cursor-pointer"
                    >
                      <span>Ver protocolos de PNL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Live Symptom Exploration Preview Card */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm bio-glass-card rounded-[24px] p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-lg space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] text-[#8F3722] dark:text-[#E07853] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Lectura de ejemplo
                      </span>
                      <span className="text-[#374151] dark:text-[#BDB0A8]">
                        Caso real
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-[#374151] dark:text-[#BDB0A8] uppercase font-bold">
                        Síntoma consultado
                      </span>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
                        Migrañas y Cefaleas Tensionales
                      </h3>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10 text-xs text-[#111111] dark:text-[#FFF4ED] leading-relaxed">
                      <strong>Resumen:</strong> Vinculada frecuentemente a hipercontrol mental, temor al error y necesidad de solucionar imprevistos en soledad.
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-[#8F3722] dark:text-[#E07853] uppercase tracking-wider">
                        Nodos emocionales:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-white dark:bg-white/10 text-[9px] font-bold text-[#111111] dark:text-white border border-[#E8B8A6]/40">
                          Hipervigilancia
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white dark:bg-white/10 text-[9px] font-bold text-[#111111] dark:text-white border border-[#E8B8A6]/40">
                          Autoexigencia
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white dark:bg-white/10 text-[9px] font-bold text-[#111111] dark:text-white border border-[#E8B8A6]/40">
                          Soltar el control
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#8F3722]/10 dark:bg-[#E07853]/15 border border-[#8F3722]/20 text-[10px] text-[#111111] dark:text-[#FFF4ED] italic">
                      "¿Qué situación presente sentís que debés resolver mentalmente vos solo/a?"
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 2: BENEFIT 2 - PROTOCOLOS DE PNL & SOMÁTICA              */}
          {/* ============================================================== */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full max-h-full flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                {/* Left: Summary */}
                <div className="lg:col-span-6 space-y-2.5 sm:space-y-3 text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8F3722]/15 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-[10px] font-bold">
                    <Brain className="w-3 h-3" />
                    <span>Beneficio 2 · Herramientas Aplicadas</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED] leading-tight">
                    Protocolos guiados para calmar el cuerpo
                  </h2>

                  <p className="text-xs text-[#262626] dark:text-[#D1C7BD] leading-relaxed font-normal">
                    La comprensión teórica se transforma cuando el cuerpo lo experimenta. BioPNL incluye ejercicios interactivos paso a paso con cronómetro para regular el sistema nervioso.
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-0.5">
                    <div className="p-2 rounded-xl bg-white/85 dark:bg-white/5 border border-white/90 dark:border-white/10 shadow-2xs text-center">
                      <Wind className="w-4 h-4 text-teal-700 dark:text-teal-400 mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-[#111111] dark:text-[#FFF4ED] leading-tight">Respiración 4-7-8</p>
                      <p className="text-[8px] text-[#374151] dark:text-[#BDB0A8] mt-0.5">Calma en 4 min</p>
                    </div>

                    <div className="p-2 rounded-xl bg-white/85 dark:bg-white/5 border border-white/90 dark:border-white/10 shadow-2xs text-center">
                      <Sparkle className="w-4 h-4 text-[#8F3722] dark:text-[#E07853] mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-[#111111] dark:text-[#FFF4ED] leading-tight">Reencuadre PNL</p>
                      <p className="text-[8px] text-[#374151] dark:text-[#BDB0A8] mt-0.5">Intención positiva</p>
                    </div>

                    <div className="p-2 rounded-xl bg-white/85 dark:bg-white/5 border border-white/90 dark:border-white/10 shadow-2xs text-center">
                      <Heart className="w-4 h-4 text-rose-700 dark:text-rose-400 mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-[#111111] dark:text-[#FFF4ED] leading-tight">Anclaje Somático</p>
                      <p className="text-[8px] text-[#374151] dark:text-[#BDB0A8] mt-0.5">Asociación de paz</p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={nextSlide}
                      className="min-h-[38px] px-5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95 cursor-pointer"
                    >
                      <span>¿Por qué es 100% gratis?</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Interactive Protocol Preview Card */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm bio-glass-card rounded-[24px] p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-lg space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#8F3722] dark:text-[#E07853] uppercase tracking-wider flex items-center gap-1 text-[10px]">
                        <Wind className="w-3 h-3" />
                        Protocolo Interactivo
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#111111] dark:text-white bg-white/80 dark:bg-white/10 px-2 py-0.5 rounded-full text-[9px]">
                        <Clock className="w-2.5 h-2.5 text-[#8F3722]" /> 4 min
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
                        Respiración 4-7-8 para Alivio
                      </h3>
                      <p className="text-[10px] text-[#374151] dark:text-[#BDB0A8]">
                        Estimulación del nervio vago y desaceleración del pulso.
                      </p>
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-1">
                      <div className="h-1 flex-1 rounded-full bg-[#8F3722]" />
                      <div className="h-1 flex-1 rounded-full bg-[#8F3722]" />
                      <div className="h-1 flex-1 rounded-full bg-black/15 dark:bg-white/20" />
                      <div className="h-1 flex-1 rounded-full bg-black/15 dark:bg-white/20" />
                    </div>

                    {/* Step instruction */}
                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-white/90 dark:border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#8F3722] dark:text-[#E07853]">
                        <span>Paso 2 de 4: Retención en calma</span>
                        <span className="font-mono bg-[#8F3722]/15 px-1.5 py-0.5 rounded-xs">07s</span>
                      </div>
                      <p className="text-xs text-[#111111] dark:text-[#FFF4ED] leading-relaxed">
                        "Sostené el aire en los pulmones sin forzar. Notá cómo la quietud se expande hacia hombros y mandíbula."
                      </p>
                    </div>

                    <div className="pt-0.5 flex items-center justify-between text-[10px] font-bold text-[#8F3722]">
                      <span>✓ Cronómetro integrado</span>
                      <span>✓ Secuencias guiadas</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 3: BENEFIT 3 - 100% GRATIS & PRIVACIDAD TOTAL            */}
          {/* ============================================================== */}
          {currentSlide === 3 && (
            <motion.div
              key="slide-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full max-h-full flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                {/* Left: 100% Free explanation */}
                <div className="lg:col-span-6 space-y-2.5 sm:space-y-3 text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Sin costo · 100% Gratuito garantizado</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED] leading-tight">
                    Acceso libre para todos. Sin muros de pago.
                  </h2>

                  <p className="text-xs text-[#262626] dark:text-[#D1C7BD] leading-relaxed font-normal">
                    Muchas apps te exigen tarjeta o te bloquean tras unos días con cobros mensuales. <strong>BioPNL es 100% libre y gratuito</strong>: creemos que el autoconocimiento debe ser accesible.
                  </p>

                  <div className="space-y-1.5 pt-0.5">
                    <div className="p-2 rounded-xl bg-white/90 dark:bg-white/5 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#111111] dark:text-[#FFF4ED]">Consultas de síntomas ilimitadas</span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full text-[9px]">Gratis siempre</span>
                    </div>

                    <div className="p-2 rounded-xl bg-white/90 dark:bg-white/5 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#111111] dark:text-[#FFF4ED]">Todos los protocolos PNL desbloqueados</span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full text-[9px]">Acceso total</span>
                    </div>

                    <div className="p-2 rounded-xl bg-white/90 dark:bg-white/5 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#111111] dark:text-[#FFF4ED]">Exportación de resúmenes en PDF</span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full text-[9px]">Sin costo extra</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={nextSlide}
                      className="min-h-[38px] px-5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95 cursor-pointer"
                    >
                      <span>Ingresar a la app (Último paso)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Trust & Privacy Card */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm bio-glass-card rounded-[24px] p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-lg space-y-2.5 text-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
                        Confidencialidad Garantizada
                      </h3>
                      <p className="text-[11px] text-[#262626] dark:text-[#BDB0A8] mt-0.5 leading-relaxed">
                        Tus consultas y reflexiones quedan guardadas de manera privada. No hay publicidad ni venta de datos.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-white/80 dark:border-white/10 text-left text-[10px] space-y-0.5">
                      <div className="flex items-center gap-1 font-bold text-[#111111] dark:text-white">
                        <Lock className="w-3 h-3 text-[#8F3722]" />
                        <span>Formas de acceso:</span>
                      </div>
                      <p className="text-[#374151] dark:text-[#BDB0A8]">
                        Con Google en 1 clic, con email y contraseña, o como usuario demo de prueba (Amelia).
                      </p>
                    </div>

                    <button
                      onClick={nextSlide}
                      className="w-full py-2 rounded-full bg-[#8F3722] hover:bg-[#7A2818] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                    >
                      Crear mi cuenta gratis ahora →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 4: FINAL SLIDE - FULL LOGIN & SIGN UP EXPERIENCE        */}
          {/* ============================================================== */}
          {currentSlide === 4 && (
            <motion.div
              key="slide-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full max-h-full flex items-center justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                {/* Left: Summary Panel */}
                <div className="hidden lg:flex lg:col-span-6 flex-col gap-3">
                  <div className="relative rounded-[24px] p-5 overflow-hidden bio-glass-panel flex flex-col justify-between min-h-[250px] shadow-lg">
                    {/* Glowing orb */}
                    <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-tr from-[#F47A45] via-[#E8B8A6] to-[#F6E7DF] opacity-75 blur-[2px] pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between">
                      <Logo size="sm" />
                      <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300">
                        100% Gratis
                      </span>
                    </div>

                    <div className="relative z-10 my-auto py-1 space-y-1">
                      <h2 className="font-heading text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED] leading-tight">
                        Tu espacio <br />
                        <span className="text-[#8F3722] dark:text-[#E07853]">de paz diaria.</span>
                      </h2>
                      <p className="text-xs text-[#262626] dark:text-[#BDB0A8] font-normal leading-relaxed">
                        Consultá síntomas cuando lo necesites, realizá ejercicios de respiración y guardá tus reflexiones personales.
                      </p>
                    </div>

                    <div className="relative z-10 pt-2 border-t border-[#E8B8A6]/40 dark:border-white/10 flex items-center justify-between text-[10px] text-[#262626] dark:text-[#BDB0A8]">
                      <span className="italic">"El cuerpo expresa lo que las palabras callan."</span>
                      <span className="text-[8px] font-bold text-[#8F3722] uppercase tracking-wider">
                        PNL Consciente
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Demo Button */}
                  <div className="bio-dark-card rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">¿Querés probarla de inmediato?</h4>
                      <p className="text-[10px] text-white/70">Ingresá con 1 clic con el usuario de prueba.</p>
                    </div>
                    <button
                      onClick={handleDemoSignIn}
                      disabled={isLoading}
                      className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                    >
                      Entrar como Amelia →
                    </button>
                  </div>
                </div>

                {/* Right: Compact Auth Form (Fits strictly without scroll) */}
                <div className="lg:col-span-6 w-full flex justify-center">
                  <div className="w-full max-w-sm bio-glass-card rounded-[24px] p-4 sm:p-5 relative overflow-hidden shadow-xl border border-white/95">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#8F3722] tracking-wider block">
                          Acceso 100% Gratuito
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED]">
                          {isSignUp ? 'Crear cuenta gratis' : 'Iniciar sesión'}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setAuthError(null);
                        }}
                        className="text-[11px] font-bold text-[#8F3722] dark:text-[#E07853] hover:underline px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-white/10 border border-[#E8B8A6]/40 cursor-pointer"
                      >
                        {isSignUp ? 'Ya tengo cuenta' : 'Crear cuenta'}
                      </button>
                    </div>

                    {/* Auth Error */}
                    {authError && (
                      <div className="mb-2.5 p-2 rounded-xl bg-[#8F3722]/15 border border-[#8F3722]/30 text-[#8F3722] text-xs font-bold">
                        {authError}
                      </div>
                    )}

                    {/* Google 1-Click Button */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full min-h-[38px] px-3.5 rounded-full bio-pill-capsule text-[#111111] dark:text-[#FFF4ED] font-bold text-xs flex items-center justify-center gap-2 hover:border-[#8F3722]/50 active:scale-[0.99] transition-all cursor-pointer mb-2.5 shadow-2xs border border-[#E8B8A6]/40"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continuar con Google</span>
                    </button>

                    <div className="relative flex items-center justify-center my-2">
                      <div className="border-t border-[#E8B8A6]/40 dark:border-white/10 w-full" />
                      <span className="px-2 text-[8px] uppercase tracking-wider text-[#374151] dark:text-[#BDB0A8] shrink-0 font-bold">
                        o con email
                      </span>
                    </div>

                    {/* Email / Password Form */}
                    <form onSubmit={handleAuthSubmit} className="space-y-2">
                      {isSignUp && (
                        <div className="relative flex items-center">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-white/10 flex items-center justify-center absolute left-1.5 text-[#374151] dark:text-[#BDB0A8] shadow-2xs">
                            <User className="w-3 h-3" />
                          </div>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre completo"
                            className="w-full pl-9 pr-3 py-1.5 rounded-full bio-pill-capsule text-xs outline-none focus:border-[#8F3722] transition-all text-[#111111] dark:text-[#FFF4ED] placeholder:text-[#4B5563] font-medium border border-[#E8B8A6]/50"
                          />
                        </div>
                      )}

                      <div className="relative flex items-center">
                        <div className="w-6 h-6 rounded-full bg-white dark:bg-white/10 flex items-center justify-center absolute left-1.5 text-[#374151] dark:text-[#BDB0A8] shadow-2xs">
                          <Mail className="w-3 h-3" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu.email@ejemplo.com"
                          className="w-full pl-9 pr-3 py-1.5 rounded-full bio-pill-capsule text-xs outline-none focus:border-[#8F3722] transition-all text-[#111111] dark:text-[#FFF4ED] placeholder:text-[#4B5563] font-medium border border-[#E8B8A6]/50"
                        />
                      </div>

                      <div className="relative flex items-center">
                        <div className="w-6 h-6 rounded-full bg-white dark:bg-white/10 flex items-center justify-center absolute left-1.5 text-[#374151] dark:text-[#BDB0A8] shadow-2xs">
                          <Lock className="w-3 h-3" />
                        </div>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          className="w-full pl-9 pr-3 py-1.5 rounded-full bio-pill-capsule text-xs outline-none focus:border-[#8F3722] transition-all text-[#111111] dark:text-[#FFF4ED] placeholder:text-[#4B5563] font-medium border border-[#E8B8A6]/50"
                        />
                      </div>

                      <div className="pt-1 flex items-center justify-between gap-2">
                        <p className="text-[8px] text-[#374151] dark:text-[#BDB0A8] leading-tight font-medium">
                          100% Gratuito y confidencial.
                        </p>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0"
                        >
                          <span>{isSignUp ? 'Crear gratis' : 'Entrar'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </form>

                    {/* Instant Demo Button */}
                    <div className="mt-2.5 pt-2 border-t border-[#E8B8A6]/30 dark:border-white/10 text-center">
                      <button
                        type="button"
                        onClick={handleDemoSignIn}
                        className="text-[11px] text-[#8F3722] dark:text-[#E07853] hover:underline font-bold cursor-pointer"
                      >
                        O probá con 1 clic como demo (Amelia) →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Carousel Controls Footer Bar: Clean & ergonomic */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between shrink-0 z-40 border-t border-[#E8B8A6]/25 dark:border-white/10 bg-[#FAF3EE]/40 dark:bg-[#140A07]/40 backdrop-blur-md">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="min-h-[34px] px-3 rounded-full bio-pill-capsule text-xs font-bold flex items-center gap-1.5 disabled:opacity-25 disabled:cursor-not-allowed hover:border-[#8F3722]/40 transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Center: Stepper Dots & Current step label (Moved to footer for 100% clean top header) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'w-5 bg-[#8F3722] dark:bg-[#E07853]'
                    : 'w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40'
                }`}
                aria-label={`Ir al paso ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-[#374151] dark:text-[#BDB0A8] font-bold">
            {currentSlide + 1}/{TOTAL_SLIDES} · {slideTitles[currentSlide]}
          </span>
        </div>

        {/* Next / Proceed Button */}
        {currentSlide < TOTAL_SLIDES - 1 ? (
          <button
            onClick={nextSlide}
            className="min-h-[34px] px-4 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] text-xs font-bold flex items-center gap-1.5 shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => goToSlide(0)}
            className="min-h-[34px] px-3 rounded-full bio-pill-capsule text-xs font-bold text-[#8F3722] dark:text-[#E07853] hover:border-[#8F3722]/40 transition-all cursor-pointer shadow-2xs"
          >
            Volver al inicio
          </button>
        )}
      </footer>
    </div>
  );
};
