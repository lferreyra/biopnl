import React from 'react';
import { Logo } from './Logo';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Estamos consultando la base de conocimiento...',
  submessage = 'Analizando interpretaciones de biodecodificación y protocolos pertinentes.'
}) => {
  return (
    <div className="lumina-glass rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto border border-white/70 dark:border-white/10 shadow-sm animate-fade-in my-8">
      {/* Official BioPNL Brand Logo with gentle breathing pulse */}
      <div className="relative flex flex-col items-center justify-center mb-6">
        <div className="relative p-2 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#DE673D]/15 dark:bg-[#F47A45]/20 blur-md animate-pulse" />
          <Logo size="lg" showText={true} />
        </div>
      </div>

      <div className="w-16 h-1 bg-[#DE673D]/20 rounded-full mx-auto mb-4 overflow-hidden">
        <div className="w-full h-full bg-[#DE673D] rounded-full animate-pulse" />
      </div>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2A211E] dark:text-[#FFF4ED] mb-2 tracking-tight">
        {message}
      </h3>
      <p className="text-xs sm:text-sm text-[#7E716D] dark:text-[#BDB0A8] leading-relaxed max-w-sm mx-auto">
        {submessage}
      </p>
    </div>
  );
};
