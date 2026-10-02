import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Protocol, ProtocolCategory } from '../types';
import { ProtocolService } from '../services/protocolService';
import { ProtocolCard } from '../components/ProtocolCard';
import { Sparkles, Filter } from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

interface ProtocolsPageProps {
  onOpenProtocol: (protocol: Protocol) => void;
}

const CATEGORIES: ('Todos' | ProtocolCategory)[] = [
  'Todos',
  'PNL',
  'Relajación',
  'Mindfulness',
  'Visualización',
  'Reflexión'
];

export const ProtocolsPage: React.FC<ProtocolsPageProps> = ({
  onOpenProtocol
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | ProtocolCategory>('Todos');

  const protocols = ProtocolService.getByCategory(selectedCategory);

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12"
    >
      {/* Editorial Hero Banner with Inner Presence Artwork */}
      <motion.div
        variants={fadeInUpVariants}
        className="group relative rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 border border-[#E8B8A6]/50 dark:border-[#E8B8A6]/15 overflow-hidden shadow-md lumina-glow-subtle bg-[#FFF9F5] dark:bg-[#191209]"
      >
        {/* Background Image - Motion blur meditation artwork */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/lumina_inner_presence_banner_1790534408170.jpg"
            alt="Presencia interior y meditación BioPNL"
            className="w-full h-full object-cover object-[center_35%] scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
          />
          {/* Gradients ensuring readability and warm atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F5]/98 via-[#FFF9F5]/90 via-55% to-[#FFF9F5]/40 dark:from-[#191209]/98 dark:via-[#191209]/85 dark:via-55% dark:to-[#191209]/35 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F5]/95 via-transparent to-transparent dark:from-[#191209]/90" />
        </div>

        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#2A1F1A]/85 backdrop-blur-md text-[#8F3722] dark:text-[#E07853] text-xs font-bold border border-white/80 dark:border-white/10 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biblioteca de Herramientas & PNL</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight leading-tight">
            Protocolos de Escucha Interior
          </h1>

          <p className="text-sm sm:text-base text-[#262626] dark:text-[#BDB0A8] font-normal leading-relaxed">
            Ejercicios estructurados para conectar con tu sabiduría corporal, reencuadrar intenciones positivas y anclar estados de serenidad cuando el cuerpo te envía señales.
          </p>

          <div className="pt-1 flex items-center gap-3 text-xs text-[#374151] dark:text-[#BDB0A8] font-medium">
            <span className="font-bold text-[#8F3722] dark:text-[#E07853]">7 prácticas guiadas</span>
            <span aria-hidden="true">·</span>
            <span>Regulación somática</span>
            <span aria-hidden="true">·</span>
            <span>Sin prescripción médica</span>
          </div>
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div variants={fadeInUpVariants} className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs text-[#111111] dark:text-[#BDB0A8] font-bold mr-1 hidden sm:flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
          Filtrar:
        </span>
        <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 rounded-2xl border border-[#E8B8A6]/40 dark:border-white/10 shadow-2xs">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] shadow-xs'
                    : 'text-[#262626] dark:text-[#BDB0A8] hover:text-black dark:hover:text-[#FFF4ED] hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Protocols Grid with stagger */}
      <motion.div
        layout
        variants={staggerContainerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {protocols.map((protocol) => (
            <motion.div
              layout
              key={protocol.id}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ProtocolCard
                protocol={protocol}
                onOpen={onOpenProtocol}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
