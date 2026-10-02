import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Estamos consultando la base de conocimiento...',
  submessage = 'Analizando interpretaciones de biodecodificación y protocolos pertinentes.'
}) => {
  return (
    <div className="lumina-glass rounded-3xl p-10 sm:p-16 text-center max-w-lg mx-auto border border-white/70 dark:border-white/10 shadow-sm animate-fade-in my-8">
      {/* Breathing halo orb */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D96C45]/20 via-[#F47A45]/30 to-[#E8B8A6]/20 animate-ping opacity-60" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#D96C45] to-[#A94A32] flex items-center justify-center text-white shadow-lg shadow-[#D96C45]/30">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>

      <h3 className="font-serif text-2xl font-medium text-[#2A211E] dark:text-[#FFF4ED] mb-2 tracking-tight">
        {message}
      </h3>
      <p className="text-xs sm:text-sm text-[#7E716D] dark:text-[#BDB0A8] leading-relaxed max-w-sm mx-auto">
        {submessage}
      </p>
    </div>
  );
};
