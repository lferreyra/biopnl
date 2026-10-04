import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Protocol, ProtocolCategory } from '../types';
import { ProtocolService } from '../services/protocolService';
import { ProtocolCard } from '../components/ProtocolCard';
import { BreathingProgressChart } from '../components/BreathingProgressChart';
import { Sparkles, Filter, Wind, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isBreathingOpen, setIsBreathingOpen] = useState(true);

  const protocols = ProtocolService.getByCategory(selectedCategory);

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12 max-w-5xl mx-auto"
    >
      {/* Editorial Header */}
      <motion.div variants={fadeInUpVariants} className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F3722]/10 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-sm font-bold border border-[#8F3722]/20">
          <Sparkles className="w-4 h-4" />
          <span>Área de Calma & Alivio</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1A1412] dark:text-[#FFF7F2] tracking-tight">
          Ejercicios Guiados para Aliviar el Cuerpo
        </h1>

        <p className="text-base sm:text-lg text-[#3D3532] dark:text-[#E2D7D1] max-w-xl mx-auto font-medium leading-relaxed">
          Prácticas sencillas y guiadas paso a paso para aflojar tensiones, regular la respiración y recuperar la tranquilidad.
        </p>
      </motion.div>

      {/* Semicircular Breathing Exercise Pod (Collapsible or directly usable) */}
      <motion.div
        variants={fadeInUpVariants}
        className="rounded-[32px] p-5 sm:p-7 bio-glass-card border border-[#E8B8A6]/60 dark:border-white/10 shadow-md"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8F3722] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1A1412] dark:text-[#FFF7F2]">
                Guía de Respiración (Arco Semicircular)
              </h2>
              <p className="text-xs sm:text-sm text-[#3D3532] dark:text-[#E2D7D1]">
                Presioná el botón central para comenzar a respirar al ritmo del arco.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsBreathingOpen(!isBreathingOpen)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-[#8F3722] dark:text-[#E07853] transition-colors cursor-pointer"
            aria-label={isBreathingOpen ? 'Contraer respirador' : 'Expandir respirador'}
          >
            {isBreathingOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isBreathingOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pt-2"
            >
              <BreathingProgressChart />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Section Divider */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#E8B8A6]/30 dark:border-white/10">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1A1412] dark:text-[#FFF7F2]">
            Protocolos y Prácticas Paso a Paso
          </h3>
          <p className="text-xs sm:text-sm text-[#3D3532] dark:text-[#E2D7D1]">
            Elegí un ejercicio para leer su explicación y seguirlo con calma.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/90 dark:bg-white/5 rounded-2xl border border-[#E8B8A6]/40 dark:border-white/10 shadow-2xs overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#8F3722] dark:bg-[#F47A45] text-white dark:text-[#181311] shadow-xs'
                    : 'text-[#262626] dark:text-[#BDB0A8] hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

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
