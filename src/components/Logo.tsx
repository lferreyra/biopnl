import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  variant?: 'terracotta' | 'monochrome' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-[#2A211E] dark:text-[#FFF4ED]',
  variant = 'terracotta'
}) => {
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-base', spacing: 'gap-1.5' },
    sm: { icon: 'w-7 h-7', text: 'text-lg', spacing: 'gap-2' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', spacing: 'gap-2.5' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', spacing: 'gap-3' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', spacing: 'gap-3.5' }
  };

  const { icon, text, spacing } = sizeMap[size];

  return (
    <div className={`flex items-center ${spacing} select-none ${className}`}>
      {/* Cellular Organic Membrane BioPNL Symbol */}
      <div className={`relative ${icon} shrink-0 flex items-center justify-center`}>
        {/* Subtle ambient halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D96C45]/30 to-[#F47A45]/20 blur-[2px] opacity-70" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="biopnlGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F47A45" />
              <stop offset="55%" stopColor="#D96C45" />
              <stop offset="100%" stopColor="#A94A32" />
            </linearGradient>
            <linearGradient id="biopnlLightGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF4ED" />
              <stop offset="100%" stopColor="#F6E7DF" />
            </linearGradient>
          </defs>

          {/* Organic Cellular Tri-lobe BioPNL Emblem matching user logo */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="
              M 50 4
              A 46 46 0 1 1 49.99 4
              Z

              M 48 10
              C 54 11 58 17 62 26
              C 67 36 67 49 69 61
              C 70 69 66 74 61 74
              C 54 74 46 68 38 60
              C 29 51 23 41 23 33
              C 23 23 30 14 39 11
              C 42 10 45 10 48 10
              Z

              M 67 15
              C 74 21 78 30 81 41
              C 84 53 84 64 79 73
              C 76 78 73 80 70 78
              C 67 76 68 70 68 62
              C 68 50 67 36 64 25
              C 63 20 64 16 67 15
              Z

              M 22 41
              C 23 48 29 56 37 64
              C 44 71 52 77 60 78
              C 56 83 49 87 41 87
              C 30 87 21 81 16 71
              C 12 62 13 52 17 44
              C 18 42 20 41 22 41
              Z
            "
            fill={variant === 'light' ? 'url(#biopnlLightGrad)' : 'url(#biopnlGrad)'}
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-['Comfortaa',sans-serif] font-bold tracking-[-0.04em] lowercase ${text} ${textColor}`}
            style={{ fontFamily: "'Comfortaa', -apple-system, sans-serif" }}
          >
            biopnl
          </span>
        </div>
      )}
    </div>
  );
};
