import React from 'react';
import { motion } from 'framer-motion';
import { SearchRecord } from '../types';
import { SearchService } from '../services/searchService';
import { Clock, ChevronRight, Sparkles, Trash2 } from 'lucide-react';
import { premiumEase } from '../utils/motionPresets';

interface SearchCardProps {
  record: SearchRecord;
  onClick: (record: SearchRecord) => void;
  onDelete?: (e: React.MouseEvent, recordId: string) => void;
}

export const SearchCard: React.FC<SearchCardProps> = ({
  record,
  onClick,
  onDelete
}) => {
  const relativeTime = SearchService.formatRelativeTime(record.createdAt);

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.22, ease: premiumEase } }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onClick(record)}
      className="group relative bio-glass-card rounded-[24px] p-4 sm:p-5 hover:border-[#8F3722]/50 shadow-xs hover:shadow-[0_12px_32px_rgba(201,88,50,0.14)] transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Background soft organic abstract ambient glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br from-[#E8B8A6]/30 dark:from-[#D96C45]/15 to-[#F6E7DF]/30 dark:to-[#191209]/40 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      
      {/* Abstract organic mini wave contour */}
      <svg
        className="absolute bottom-0 right-0 w-24 h-16 opacity-[0.08] dark:opacity-[0.12] text-[#8F3722] pointer-events-none"
        viewBox="0 0 100 60"
        fill="currentColor"
      >
        <path d="M0 60 Q 25 10 50 40 T 100 20 L 100 60 Z" />
      </svg>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-[#374151] dark:text-[#BDB0A8] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
            <span>Explorado {relativeTime}</span>
          </div>

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e, record.id);
              }}
              title="Quitar de historial"
              className="opacity-0 group-hover:opacity-100 text-[#374151] dark:text-[#BDB0A8] hover:text-[#8F3722] p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Quitar de historial"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight group-hover:text-[#8F3722] transition-colors line-clamp-1">
          {record.title || record.query}
        </h3>

        {record.resultSummary && (
          <p className="mt-1.5 text-xs sm:text-sm text-[#333333] dark:text-[#D1C7BD] line-clamp-2 leading-relaxed font-normal">
            {record.resultSummary}
          </p>
        )}
      </div>

      <div className="relative z-10 mt-3 pt-3 border-t border-[#E8B8A6]/25 dark:border-[#E8B8A6]/10 flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#E07853]">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Ver exploración
        </span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};
