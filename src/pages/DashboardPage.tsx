import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile, SearchRecord, Protocol } from '../types';
import { SearchBar } from '../components/SearchBar';
import { InteractiveBodyMap } from '../components/InteractiveBodyMap';
import { Sparkles, Heart } from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

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
  onSearch,
  onOpenProtocol,
  featuredProtocols,
  isSearching = false
}) => {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-2 sm:py-4 select-none"
    >
      {/* Friendly, Senior-Accessible Welcome Header */}
      <motion.section variants={fadeInUpVariants} className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8F3722]/10 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-xs sm:text-sm font-bold border border-[#8F3722]/20">
          <Heart className="w-4 h-4 fill-current" />
          <span>Espacio de alivio y serenidad corporal</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1412] dark:text-[#FFF7F2] tracking-tight leading-tight">
          Hola, {user.name}
        </h1>

        <p className="text-lg sm:text-xl text-[#3D3532] dark:text-[#EAE0D9] font-medium max-w-xl mx-auto leading-relaxed">
          ¿En qué parte del cuerpo sentís molestia hoy?
        </p>

        <p className="text-sm sm:text-base text-[#5C4D46] dark:text-[#C5B7AF] max-w-md mx-auto">
          Podés tocar el dibujo del cuerpo o escribir lo que te pasa en el buscador:
        </p>
      </motion.section>

      {/* Prominent, High-Legibility Search Bar */}
      <motion.section variants={fadeInUpVariants} className="max-w-2xl mx-auto">
        <SearchBar
          onSearch={onSearch}
          isLoading={isSearching}
          size="hero"
          placeholder="Escribí aquí tu dolor o molestia (ej: dolor de rodilla, acidez, cuello)..."
        />
      </motion.section>

      {/* Main Somatosensory Body Map (Touch zone to discover meaning & protocols) */}
      <motion.section variants={fadeInUpVariants} className="pt-2">
        <InteractiveBodyMap
          onSelectSymptomSearch={onSearch}
          onOpenProtocolById={(protocolId) => {
            const proto = featuredProtocols.find((p) => p.id === protocolId) || featuredProtocols[0];
            if (proto) onOpenProtocol(proto);
          }}
        />
      </motion.section>
    </motion.div>
  );
};
