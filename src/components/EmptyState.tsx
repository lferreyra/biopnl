import React from 'react';
import { HelpCircle, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  resetText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No encontramos información suficiente en la fuente consultada',
  message = 'Probá reformulando el término o explorando alguna de las condiciones sugeridas en la biblioteca.',
  onReset,
  resetText = 'Explorar otros temas'
}) => {
  return (
    <div className="lumina-glass rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-white/70 dark:border-white/10 shadow-sm animate-fade-in my-8">
      <div className="w-14 h-14 rounded-2xl bg-[#E8B8A6]/20 text-[#D96C45] flex items-center justify-center mx-auto mb-4">
        <HelpCircle className="w-7 h-7" />
      </div>

      <h3 className="font-serif text-2xl font-medium text-[#2A211E] dark:text-[#FFF4ED] mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#7E716D] dark:text-[#BDB0A8] leading-relaxed mb-6 max-w-md mx-auto">
        {message}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#D96C45] to-[#A94A32] text-white text-xs sm:text-sm font-medium shadow-sm hover:opacity-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{resetText}</span>
        </button>
      )}
    </div>
  );
};
