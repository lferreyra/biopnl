import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile, SearchRecord, Protocol } from '../types';
import { SearchBar } from '../components/SearchBar';
import { RecentSearches } from '../components/RecentSearches';
import { ProtocolCard } from '../components/ProtocolCard';
import { Disclaimer } from '../components/Disclaimer';
import { AppImages } from '../assets/images';
import { DailyReflectionCard } from '../components/DailyReflectionCard';
import { BreathingProgressChart } from '../components/BreathingProgressChart';
import { Sparkles, BookOpen, Compass, ArrowRight, Wind } from 'lucide-react';
import { premiumEase, fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

interface DashboardPageProps {
  user: UserProfile;
  searches: SearchRecord[];
  onSearch: (query: string) => void;
  onSelectSearch: (record: SearchRecord) => void;
  onDeleteSearch: (e: React.MouseEvent, recordId: string) => void;
  onNavigateToProtocols: () => void;
  onOpenProtocol: (protocol: Protocol) => void;
  featuredProtocols: Protocol[];
  isSearching?: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  searches,
  onSearch,
  onSelectSearch,
  onDeleteSearch,
  onNavigateToProtocols,
  onOpenProtocol,
  featuredProtocols,
  isSearching = false
}) => {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 sm:space-y-12"
    >
      {/* Hero Welcome Card with High-Contrast Solid Scrims and Horizon Artwork */}
      <motion.section
        variants={fadeInUpVariants}
        className="group relative bg-[#FFF9F5] dark:bg-[#191209] rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 border border-[#E8B8A6]/50 dark:border-[#E8B8A6]/20 overflow-hidden shadow-md lumina-glow-subtle"
      >
        {/* Background Artwork - Solitary figure walking towards radiant sun portal */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={AppImages.inicioBanner}
            alt="Silueta contemplativa hacia el horizonte luminoso de BioPNL"
            className="w-full h-full object-cover object-[78%_center] sm:object-[72%_35%] scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
          />
          {/* Robust non-transparent scrims ensuring WCAG AAA contrast for text & search bar */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#FFF9F5] via-[#FFF9F5]/98 via-55% to-[#FFF9F5]/45 dark:from-[#191209] dark:via-[#191209]/96 dark:via-55% dark:to-[#191209]/40 transition-colors duration-300" />
          <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#FFF9F5] via-[#FFF9F5]/96 to-[#FFF9F5]/80 dark:from-[#191209] dark:via-[#191209]/95 dark:to-[#191209]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F5] via-transparent to-transparent dark:from-[#191209] opacity-80" />
        </div>

        {/* Ambient warmth orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#F47A45]/30 via-[#E8B8A6]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-[#D96C45]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#241A15] text-[#8F3722] dark:text-[#E07853] text-xs font-bold border border-[#E8B8A6]/50 dark:border-white/10 mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tu espacio de bienestar y calma</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1A1412] dark:text-[#FFF7F2] tracking-tight leading-tight">
            Hola, {user.name}
          </h1>

          <p className="mt-2 text-base sm:text-xl text-[#2E2420] dark:text-[#EAE0D9] font-normal leading-relaxed">
            ¿Qué molestia o dolor sentís hoy?
          </p>

          <p className="mt-1.5 text-sm sm:text-base text-[#3D3532] dark:text-[#E2D7D1] max-w-lg leading-relaxed">
            Escribí lo que te pasa para conocer qué emoción puede estar detrás y descubrí ejercicios simples para aflojar tensiones.
          </p>
        </div>

        {/* Large Floating Glass Search Bar */}
        <div className="relative z-10 mt-6 sm:mt-8">
          <SearchBar
            onSearch={onSearch}
            isLoading={isSearching}
            size="hero"
            placeholder="¿Qué molestia o dolor sentís hoy? (ej. dolor de cuello, acidez, insomnio)..."
          />
        </div>
      </motion.section>

      {/* Daily Reflection Feature Card */}
      <motion.section variants={fadeInUpVariants}>
        <DailyReflectionCard
          onStartBreathing={() => {
            const el = document.getElementById('breathing-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              const breathProtocol = featuredProtocols.find((p) => p.id === 'relajacion-478') || featuredProtocols[0];
              if (breathProtocol) onOpenProtocol(breathProtocol);
            }
          }}
        />
      </motion.section>

      {/* Últimas Búsquedas (Strict maximum of 5) */}
      <motion.section variants={fadeInUpVariants}>
        <RecentSearches
          searches={searches}
          onSelectSearch={onSelectSearch}
          onDeleteSearch={onDeleteSearch}
          onExploreClick={() => {
            const searchInput = document.querySelector('input');
            if (searchInput) searchInput.focus();
          }}
        />
      </motion.section>

      {/* Semicircular Breathing Progress Chart & Calma Section */}
      <motion.section id="breathing-section" variants={fadeInUpVariants}>
        <div className="relative bio-glass-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Description and Info */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8F3722]/10 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-xs font-bold">
                <Wind className="w-3.5 h-3.5" />
                <span>Pausa Guiada en Vivo</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1A1412] dark:text-[#FFF7F2] tracking-tight">
                Hacé una pausa para respirar
              </h3>

              <p className="text-sm sm:text-base text-[#3D3532] dark:text-[#E2D7D1] leading-relaxed font-normal">
                Seguí el ritmo del gráfico semicircular: inspirá para llenar tus pulmones, contené en calma y exhalá suavemente para aflojar tensiones.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const breathProtocol = featuredProtocols.find((p) => p.id === 'relajacion-478') || featuredProtocols[0];
                    if (breathProtocol) onOpenProtocol(breathProtocol);
                  }}
                  className="min-h-[42px] px-5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer"
                >
                  <span>Ver pasos detallados</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateToProtocols}
                  className="min-h-[42px] px-4 rounded-full bio-pill-capsule text-xs sm:text-sm font-bold text-[#111111] dark:text-[#FFF4ED] hover:border-[#8F3722]/50 transition-colors cursor-pointer"
                >
                  Otros ejercicios
                </button>
              </div>
            </div>

            {/* Right: Live Semicircular Breathing Progress Chart */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <BreathingProgressChart initialTechniqueId="4-7-8" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Explorá tus herramientas */}
      <motion.section variants={fadeInUpVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
            <h2 className="font-heading text-xl sm:text-2xl text-[#111111] dark:text-[#FFF4ED] font-semibold tracking-tight">
              Explorá tus herramientas
            </h2>
          </div>

          <button
            onClick={onNavigateToProtocols}
            className="text-xs sm:text-sm text-[#8F3722] dark:text-[#E07853] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Ver biblioteca completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Big Banner Card: Protocolos */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.25, ease: premiumEase } }}
          onClick={onNavigateToProtocols}
          className="group relative bio-glass-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 hover:border-[#8F3722]/40 shadow-xs hover:shadow-[0_16px_40px_rgba(201,88,50,0.14)] transition-all cursor-pointer overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          {/* Subtle abstract wave asset */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-15 pointer-events-none overflow-hidden">
            <img
              src={AppImages.organicWaves}
              alt="Ondas orgánicas"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-lg space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#E8B8A6]/40 dark:bg-[#E8B8A6]/15 text-[#8F3722] dark:text-[#E07853] flex items-center justify-center border border-white/80 dark:border-white/10 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#FFF4ED]">
              Protocolos de PNL y Mindfulness
            </h3>
            <p className="text-xs sm:text-sm text-[#333333] dark:text-[#BDB0A8] leading-relaxed">
              Ejercicios y protocolos estructurados para acompañar tu proceso personal: reencuadres de intención positiva, anclajes de serenidad y respiración consciente.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              type="button"
              className="px-6 py-2.5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm group-hover:scale-102 transition-transform cursor-pointer"
            >
              <span>Abrir biblioteca</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* 2 Featured protocol cards preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {featuredProtocols.slice(0, 2).map((proto) => (
            <ProtocolCard
              key={proto.id}
              protocol={proto}
              onOpen={onOpenProtocol}
              compact
            />
          ))}
        </div>
      </motion.section>

      {/* Subtle safety disclaimer */}
      <motion.div variants={fadeInUpVariants}>
        <Disclaimer variant="compact" />
      </motion.div>
    </motion.div>
  );
};
