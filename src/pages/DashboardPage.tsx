import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile, SearchRecord, Protocol } from '../types';
import { SearchBar } from '../components/SearchBar';
import { RecentSearches } from '../components/RecentSearches';
import { ProtocolCard } from '../components/ProtocolCard';
import { Disclaimer } from '../components/Disclaimer';
import { AppImages } from '../assets/images';
import { Sparkles, BookOpen, Compass, ArrowRight } from 'lucide-react';
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
            <span>Espacio de introspección personal</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#111111] dark:text-[#FFF4ED] tracking-tight leading-tight">
            Hola, {user.name}
          </h1>

          <p className="mt-2 text-base sm:text-xl text-[#262626] dark:text-[#BDB0A8] font-normal leading-relaxed">
            ¿Qué te gustaría explorar hoy?
          </p>

          <p className="mt-1.5 text-xs sm:text-sm text-[#374151] dark:text-[#BDB0A8] max-w-lg leading-relaxed">
            Consultá posibles interpretaciones desde la biodecodificación y descubrí ejercicios de PNL para acompañar tu proceso.
          </p>
        </div>

        {/* Large Floating Glass Search Bar */}
        <div className="relative z-10 mt-6 sm:mt-8">
          <SearchBar
            onSearch={onSearch}
            isLoading={isSearching}
            size="hero"
            placeholder="Buscá una condición, síntoma o diagnóstico..."
          />
        </div>
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

      {/* Contemplative Moment Card featuring the adapted artwork & frosted glass */}
      <motion.section variants={fadeInUpVariants}>
        <div className="relative bio-glass-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 overflow-hidden flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Framed Artwork Column with glowing pastel aura */}
          <div className="relative w-full md:w-64 h-56 md:h-72 rounded-[24px] sm:rounded-[28px] overflow-hidden shrink-0 shadow-md group border border-white/80 dark:border-white/10">
            <img
              src={AppImages.inicioPortrait}
              alt="Hacia el sol interior - Práctica de calma BioPNL"
              className="w-full h-full object-cover object-[center_40%] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-md">
                Enfoque del día
              </span>
              <p className="font-heading text-lg font-semibold leading-tight mt-1">
                Presencia & Calma
              </p>
            </div>
          </div>

          {/* Description and Action Column */}
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8F3722]/10 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pausa contemplativa</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#111111] dark:text-[#FFF4ED] tracking-tight">
              Alineá tu respiración antes de explorar
            </h3>

            <p className="text-xs sm:text-sm text-[#333333] dark:text-[#BDB0A8] leading-relaxed max-w-xl font-normal">
              Cuando el cuerpo experimenta un síntoma, la mente suele acelerarse buscando respuestas urgentes. Tomate unos minutos para bajar el ritmo cardíaco y abrir espacio a una comprensión más profunda y afectiva.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const breathProtocol = featuredProtocols.find((p) => p.id === 'relajacion-478') || featuredProtocols[0];
                  if (breathProtocol) onOpenProtocol(breathProtocol);
                }}
                className="min-h-[44px] px-6 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer"
              >
                <span>Iniciar Respiración 4-7-8</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onNavigateToProtocols}
                className="min-h-[44px] px-5 rounded-full bio-pill-capsule text-xs sm:text-sm font-bold text-[#111111] dark:text-[#FFF4ED] hover:border-[#8F3722]/50 transition-colors cursor-pointer"
              >
                Explorar todos los protocolos
              </button>
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
