import React from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { Disclaimer } from '../components/Disclaimer';
import { Sparkles, Compass, HeartHandshake } from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

interface SearchPageProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onSearch,
  isSearching
}) => {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto space-y-10 py-4"
    >
      {/* Header */}
      <motion.div variants={fadeInUpVariants} className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 text-[#8F3722] dark:text-[#E07853] text-xs font-bold border border-[#E8B8A6]/50 dark:border-white/10 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Indagación Personal</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight">
          ¿Qué querés explorar?
        </h1>

        <p className="text-sm sm:text-base text-[#262626] dark:text-[#BDB0A8] max-w-lg mx-auto font-normal leading-relaxed">
          Escribí un síntoma físico, molestia o diagnóstico para acceder a interpretaciones desde la biodecodificación y ejercicios de PNL recomendados.
        </p>
      </motion.div>

      {/* Main Search Bar */}
      <motion.div variants={fadeInUpVariants} className="pt-2">
        <SearchBar
          onSearch={onSearch}
          isLoading={isSearching}
          size="hero"
          autoFocus
          placeholder="Escribí un diagnóstico, síntoma o condición..."
        />
      </motion.div>

      {/* Guiding Principles Card */}
      <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <div className="bio-glass-panel rounded-[28px] p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#E8B8A6]/40 dark:bg-[#E8B8A6]/15 text-[#8F3722] dark:text-[#E07853] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
            Enfoque no directivo
          </h3>
          <p className="text-xs sm:text-sm text-[#333333] dark:text-[#BDB0A8] leading-relaxed">
            Las lecturas no imponen certezas absolutas; proponen preguntas fértiles para que vos encuentres tus propias respuestas y significados.
          </p>
        </div>

        <div className="bio-glass-panel rounded-[28px] p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#E8B8A6]/40 dark:bg-[#E8B8A6]/15 text-[#8F3722] dark:text-[#E07853] flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
            Protocolos aplicados
          </h3>
          <p className="text-xs sm:text-sm text-[#333333] dark:text-[#BDB0A8] leading-relaxed">
            Cada exploración sugiere ejercicios prácticos de PNL, visualización guiada o mindfulness corporal adaptados a la temática consultada.
          </p>
        </div>
      </motion.div>

      {/* Responsible health note */}
      <motion.div variants={fadeInUpVariants} className="pt-2">
        <Disclaimer
          variant="full"
          customMessage="Recordatorio: BioPNL no emite juicios causales sobre la enfermedad ni reemplaza tratamientos médicos o farmacológicos. La salud física debe ser evaluada siempre por un profesional competente."
        />
      </motion.div>
    </motion.div>
  );
};
