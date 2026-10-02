import React from 'react';
import { SearchRecord } from '../types';
import { SearchCard } from './SearchCard';
import { History, Compass } from 'lucide-react';

interface RecentSearchesProps {
  searches: SearchRecord[];
  onSelectSearch: (record: SearchRecord) => void;
  onDeleteSearch?: (e: React.MouseEvent, recordId: string) => void;
  onExploreClick?: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelectSearch,
  onDeleteSearch,
  onExploreClick
}) => {
  if (searches.length === 0) {
    return (
      <div className="bio-glass-panel rounded-[28px] p-8 text-center max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#E8B8A6]/30 dark:bg-[#E8B8A6]/20 text-[#8F3722] dark:text-[#E07853] flex items-center justify-center mx-auto mb-3.5">
          <History className="w-6 h-6" />
        </div>
        <h4 className="font-heading text-lg text-[#111111] dark:text-[#FFF4ED] font-bold mb-1">
          No realizaste búsquedas todavía
        </h4>
        <p className="text-xs sm:text-sm text-[#333333] dark:text-[#BDB0A8] mb-4">
          Cuando explores un síntoma, condición o concepto, aparecerán acá tus últimas 5 consultas.
        </p>
        {onExploreClick && (
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] text-xs font-bold shadow-sm hover:opacity-90 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Comenzar una exploración</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
          <h2 className="font-heading text-xl sm:text-2xl text-[#111111] dark:text-[#FFF4ED] font-bold tracking-tight">
            Últimas búsquedas
          </h2>
        </div>
        <span className="text-xs text-[#374151] dark:text-[#BDB0A8] font-semibold">
          {searches.length} de 5 guardadas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {searches.map((record) => (
          <SearchCard
            key={record.id}
            record={record}
            onClick={onSelectSearch}
            onDelete={onDeleteSearch}
          />
        ))}
      </div>
    </div>
  );
};
