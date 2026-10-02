import React from 'react';
import { motion } from 'framer-motion';
import { Protocol } from '../types';
import {
  Clock,
  Sparkles,
  Brain,
  Wind,
  Heart,
  Sun,
  Moon,
  BookOpen,
  ArrowRight,
  Compass,
  Activity,
  Feather,
  Eye,
  Layers
} from 'lucide-react';
import { premiumEase } from '../utils/motionPresets';

interface ProtocolCardProps {
  protocol: Protocol;
  onOpen: (protocol: Protocol) => void;
  compact?: boolean;
  customIcon?: React.ReactNode;
}

export interface CategoryTheme {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badgeClass: string;
  iconBgClass: string;
  iconColorClass: string;
  auraClass: string;
}

/**
 * Returns customized visual theme and icon matching the protocol's category.
 * Ensures 'Relajación' uses 'Wind', 'PNL' uses cognitive/sparkle glyphs,
 * 'Mindfulness' uses heart/somatic, 'Visualización' uses sun, etc.
 */
export const getCategoryTheme = (category: string, iconName?: string): CategoryTheme => {
  const normalized = (category || '').toLowerCase().trim();

  if (normalized.includes('relajaci') || normalized.includes('respiraci') || iconName === 'Wind') {
    return {
      icon: Wind,
      label: 'Relajación',
      badgeClass:
        'bg-teal-50 dark:bg-teal-950/40 text-teal-950 dark:text-teal-300 border-teal-300 dark:border-teal-800/40 font-bold',
      iconBgClass:
        'bg-gradient-to-tr from-teal-100 via-[#FFF9F5] to-teal-50 dark:from-teal-950/60 dark:via-[#221712] dark:to-[#191209]',
      iconColorClass: 'text-teal-700 dark:text-teal-400',
      auraClass: 'from-teal-400/15 to-transparent'
    };
  }

  if (normalized.includes('mindful') || normalized.includes('somat') || iconName === 'Heart') {
    return {
      icon: Heart,
      label: 'Mindfulness',
      badgeClass:
        'bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800/40 font-bold',
      iconBgClass:
        'bg-gradient-to-tr from-rose-100 via-[#FFF9F5] to-rose-50 dark:from-rose-950/60 dark:via-[#221712] dark:to-[#191209]',
      iconColorClass: 'text-rose-700 dark:text-rose-400',
      auraClass: 'from-rose-400/15 to-transparent'
    };
  }

  if (normalized.includes('visualiz') || iconName === 'Sun') {
    return {
      icon: Sun,
      label: 'Visualización',
      badgeClass:
        'bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800/40 font-bold',
      iconBgClass:
        'bg-gradient-to-tr from-amber-100 via-[#FFF9F5] to-amber-50 dark:from-amber-950/60 dark:via-[#221712] dark:to-[#191209]',
      iconColorClass: 'text-amber-700 dark:text-amber-400',
      auraClass: 'from-amber-400/15 to-transparent'
    };
  }

  if (normalized.includes('reflexi') || normalized.includes('escritura') || iconName === 'Moon' || iconName === 'BookOpen') {
    return {
      icon: iconName === 'Moon' ? Moon : BookOpen,
      label: 'Reflexión',
      badgeClass:
        'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800/40 font-bold',
      iconBgClass:
        'bg-gradient-to-tr from-indigo-100 via-[#FFF9F5] to-indigo-50 dark:from-indigo-950/60 dark:via-[#221712] dark:to-[#191209]',
      iconColorClass: 'text-indigo-700 dark:text-indigo-400',
      auraClass: 'from-indigo-400/15 to-transparent'
    };
  }

  // Default: PNL / Neuroasociaciones
  const pnlIcon = iconName === 'Brain' ? Brain : iconName === 'Compass' ? Compass : Sparkles;
  return {
    icon: pnlIcon,
    label: 'PNL',
    badgeClass:
      'bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-300 dark:border-orange-800/40 font-bold',
    iconBgClass:
      'bg-gradient-to-tr from-[#E8B8A6]/40 via-[#FFF9F5] to-orange-50 dark:from-[#D96C45]/20 dark:via-[#221712] dark:to-[#191209]',
    iconColorClass: 'text-[#8F3722] dark:text-[#E07853]',
    auraClass: 'from-[#D96C45]/20 to-transparent'
  };
};

/**
 * Helper to render individual lucide icon component dynamically with consistent sizing
 */
export const renderProtocolIcon = (iconName?: string, category?: string, className: string = 'w-5 h-5') => {
  switch (iconName) {
    case 'Wind':
      return <Wind className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Moon':
      return <Moon className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Feather':
      return <Feather className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    default:
      if (category && category.toLowerCase().includes('relajaci')) {
        return <Wind className={className} />;
      }
      return <Sparkles className={className} />;
  }
};

export const ProtocolCard: React.FC<ProtocolCardProps> = ({
  protocol,
  onOpen,
  compact = false,
  customIcon
}) => {
  const theme = getCategoryTheme(protocol.category, protocol.iconName);
  const CategoryIcon = theme.icon;

  if (compact) {
    return (
      <motion.div
        whileHover={{ y: -2.5, transition: { duration: 0.2, ease: premiumEase } }}
        whileTap={{ scale: 0.985 }}
        onClick={() => onOpen(protocol)}
        className="bg-white dark:bg-[#201611] rounded-2xl p-4 border border-[#E8B8A6]/50 dark:border-white/10 hover:border-[#8F3722]/50 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group shadow-2xs"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Custom icon or category-matched icon */}
          <div
            className={`w-10 h-10 rounded-xl ${theme.iconBgClass} ${theme.iconColorClass} flex items-center justify-center shrink-0 border border-white/80 dark:border-white/10 shadow-2xs group-hover:scale-105 transition-transform`}
          >
            {customIcon || renderProtocolIcon(protocol.iconName, protocol.category, 'w-5 h-5')}
          </div>
          <div className="min-w-0">
            <h4 className="font-heading text-base font-bold text-[#111111] dark:text-[#FFF4ED] group-hover:text-[#8F3722] transition-colors truncate">
              {protocol.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-[#374151] dark:text-[#BDB0A8] mt-0.5 font-medium">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${theme.badgeClass}`}
              >
                <CategoryIcon className="w-2.5 h-2.5" />
                {protocol.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[11px] text-[#262626] dark:text-[#BDB0A8] font-semibold">
                <Clock className="w-3 h-3 text-[#8F3722] dark:text-[#E07853]" />
                {protocol.durationMinutes} min
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="shrink-0 p-2 text-[#8F3722] dark:text-[#E07853] group-hover:translate-x-1 transition-transform cursor-pointer"
          aria-label={`Ver protocolo ${protocol.title}`}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3.5, transition: { duration: 0.25, ease: premiumEase } }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onOpen(protocol)}
      className="group relative bio-glass-card rounded-[28px] p-5 sm:p-6 hover:border-[#8F3722]/50 shadow-2xs hover:shadow-[0_16px_40px_rgba(201,88,50,0.15)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Category ambient glow aura */}
      <div
        className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${theme.auraClass} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
      />

      <div>
        {/* Header with custom category-matched icon & category pill badge */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div
            className={`w-12 h-12 rounded-2xl ${theme.iconBgClass} ${theme.iconColorClass} flex items-center justify-center border border-white/80 dark:border-white/10 shadow-xs group-hover:scale-105 transition-transform`}
          >
            {customIcon || renderProtocolIcon(protocol.iconName, protocol.category, 'w-6 h-6')}
          </div>

          <div className="flex items-center gap-2">
            {/* Category badge with dedicated icon */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${theme.badgeClass} shadow-2xs`}
            >
              <CategoryIcon className="w-3 h-3" />
              <span>{protocol.category}</span>
            </span>

            {/* Duration pill */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-[#262626] dark:text-[#BDB0A8] bg-white/80 dark:bg-white/10 border border-white/90 dark:border-white/10">
              <Clock className="w-3 h-3 text-[#8F3722] dark:text-[#E07853]" />
              <span>{protocol.durationMinutes}m</span>
            </span>
          </div>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight group-hover:text-[#8F3722] transition-colors mb-2">
          {protocol.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#333333] dark:text-[#D1C7BD] leading-relaxed line-clamp-3 mb-4 font-normal">
          {protocol.shortDescription}
        </p>
      </div>

      <div className="pt-3 border-t border-[#E8B8A6]/30 dark:border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-[#8F3722] dark:text-[#E07853] flex items-center gap-1 group-hover:underline">
          Iniciar protocolo guiado
        </span>
        <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-[#E8B8A6]/50 dark:border-white/10 flex items-center justify-center text-[#8F3722] dark:text-[#E07853] group-hover:translate-x-1 group-hover:bg-[#8F3722] group-hover:text-white transition-all shadow-2xs">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};
