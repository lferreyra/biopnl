import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialQuery?: string;
  placeholder?: string;
  autoFocus?: boolean;
  size?: 'normal' | 'hero';
}

const QUICK_EXPLORATIONS = [
  'Dolor de cuello',
  'Acidez y estómago',
  'Ansiedad',
  'Migraña',
  'Dolor lumbar',
  'Insomnio'
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
  initialQuery = '',
  placeholder = '¿Qué molestia o dolor sentís hoy? (ej. dolor de cuello, acidez, insomnio)...',
  autoFocus = false,
  size = 'hero'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Por favor escribí qué molestia o dolor sentís.');
      return;
    }
    setError(null);
    onSearch(trimmed);
  };

  const handleChipClick = (suggestion: string) => {
    setQuery(suggestion);
    setError(null);
    onSearch(suggestion);
  };

  const isHero = size === 'hero';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`relative bio-pill-capsule rounded-full transition-all duration-300 ${
          isHero
            ? 'p-2 sm:p-2.5 shadow-[0_16px_40px_rgba(201,88,50,0.12)] hover:shadow-[0_20px_48px_rgba(201,88,50,0.16)] border border-white/95 dark:border-white/15'
            : 'p-1.5 shadow-sm border border-white/90 dark:border-white/10'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 pr-1 py-1">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#8F3722] dark:text-[#E07853] shrink-0" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={isLoading}
            className={`w-full bg-transparent border-none outline-none font-sans text-[#111111] dark:text-[#FFF4ED] placeholder:text-[#4B5563] dark:placeholder:text-[#BDB0A8]/70 font-medium ${
              isHero ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`min-h-[44px] px-5 sm:px-6 rounded-full bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shrink-0 disabled:opacity-50`}
            aria-label="Buscar en biblioteca de conocimiento"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Buscando...</span>
              </>
            ) : (
              <>
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-2 text-xs text-[#8F3722] pl-4 font-bold" role="alert">
          {error}
        </p>
      )}

      {/* Suggested exploration topics */}
      <div className="mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
        <span className="text-[11px] uppercase tracking-wider text-[#374151] dark:text-[#BDB0A8] font-bold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#8F3722] dark:text-[#E07853]" />
          Sugerencias:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
          {QUICK_EXPLORATIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleChipClick(item)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/80 dark:bg-[#2A1F1A]/80 hover:bg-white dark:hover:bg-[#382B24] text-[#111111] dark:text-[#FFF4ED] font-semibold border border-[#E8B8A6]/40 dark:border-white/10 transition-colors whitespace-nowrap cursor-pointer min-h-[36px] shadow-2xs"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
