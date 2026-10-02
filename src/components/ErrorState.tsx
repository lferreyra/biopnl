import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'No pudimos completar la búsqueda',
  message = 'Ocurrió una interrupción temporal al conectar con la base de datos o el proveedor de conocimiento. Por favor intentá nuevamente.',
  onRetry
}) => {
  return (
    <div className="lumina-glass rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-[#A94A32]/20 dark:border-[#A94A32]/40 shadow-sm animate-fade-in my-8">
      <div className="w-14 h-14 rounded-2xl bg-[#A94A32]/10 text-[#A94A32] dark:text-[#E07853] flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <h3 className="font-serif text-2xl font-medium text-[#2A211E] dark:text-[#FFF4ED] mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#7E716D] dark:text-[#BDB0A8] leading-relaxed mb-6 max-w-md mx-auto">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#D96C45] text-white text-xs sm:text-sm font-medium shadow-sm hover:opacity-90 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Intentar nuevamente</span>
        </button>
      )}
    </div>
  );
};
