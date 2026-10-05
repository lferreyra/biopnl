import React from 'react';
import { BRAND_COLORS } from '../utils/brandLogo';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  variant?: 'auto' | 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor,
  variant = 'auto'
}) => {
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-base', spacing: 'gap-1.5' },
    sm: { icon: 'w-7 h-7', text: 'text-lg', spacing: 'gap-2' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', spacing: 'gap-2.5' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', spacing: 'gap-3' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', spacing: 'gap-3.5' }
  };

  const { icon, text, spacing } = sizeMap[size];

  // Default adaptive text color
  const computedTextColor =
    textColor ||
    (variant === 'dark'
      ? 'text-[#FFF7F2]'
      : variant === 'light'
      ? 'text-[#241915]'
      : 'text-[#241915] dark:text-[#FFF7F2]');

  return (
    <div className={`inline-flex items-center ${spacing} select-none ${className}`}>
      {/* Official BioPNL Circular Emblem (Authentic 3-Segment Design) */}
      <div className={`relative ${icon} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 transition-transform duration-300 hover:scale-105 drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Light mode gradient */}
            <linearGradient id="biopnlEmblemLight" x1="50" y1="4" x2="50" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={BRAND_COLORS.circleLight} />
              <stop offset="100%" stopColor={BRAND_COLORS.circleLightGradEnd} />
            </linearGradient>

            {/* Dark mode gradient */}
            <linearGradient id="biopnlEmblemDark" x1="50" y1="4" x2="50" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={BRAND_COLORS.circleDark} />
              <stop offset="100%" stopColor={BRAND_COLORS.circleDarkGradEnd} />
            </linearGradient>
          </defs>

          {/* 1. Terracotta Circle Background */}
          {variant === 'dark' ? (
            <circle cx="50" cy="50" r="46" fill="url(#biopnlEmblemDark)" />
          ) : variant === 'light' ? (
            <circle cx="50" cy="50" r="46" fill="url(#biopnlEmblemLight)" />
          ) : (
            <>
              <circle cx="50" cy="50" r="46" fill="url(#biopnlEmblemLight)" className="dark:hidden" />
              <circle cx="50" cy="50" r="46" fill="url(#biopnlEmblemDark)" className="hidden dark:block" />
            </>
          )}

          {/* 2. Segment 1: Upper Central Kernel */}
          <path
            d="M 44 14 C 50 14 53 19 53 26 C 53 38 52 52 50 63 C 49 69 45 72 40 71 C 35 70 32 64 32 54 C 32 40 34 26 38 18 C 40 15 42 14 44 14 Z"
            className={
              variant === 'dark'
                ? 'fill-[#FFF0E8]'
                : variant === 'light'
                ? 'fill-[#FBECE3]'
                : 'fill-[#FBECE3] dark:fill-[#FFF0E8]'
            }
          />

          {/* 3. Segment 2: Lower-Left Wrap Lobe */}
          <path
            d="M 18 42 C 24 45 28 52 30 62 C 31 70 37 76 43 78 C 38 83 31 84 24 81 C 17 76 13 67 13 58 C 13 51 15 45 18 42 Z"
            className={
              variant === 'dark'
                ? 'fill-[#FFF0E8]'
                : variant === 'light'
                ? 'fill-[#FBECE3]'
                : 'fill-[#FBECE3] dark:fill-[#FFF0E8]'
            }
          />

          {/* 4. Segment 3: Right Crescent Lobe */}
          <path
            d="M 57 20 C 68 22 78 32 82 46 C 85 58 82 70 74 77 C 68 81 61 80 58 76 C 60 70 60 58 59 46 C 58 36 57 26 57 20 Z"
            className={
              variant === 'dark'
                ? 'fill-[#FFF0E8]'
                : variant === 'light'
                ? 'fill-[#FBECE3]'
                : 'fill-[#FBECE3] dark:fill-[#FFF0E8]'
            }
          />
        </svg>
      </div>

      {/* Official "biopnl" lowercase Wordmark */}
      {showText && (
        <span
          className={`font-['Comfortaa',sans-serif] font-bold tracking-[-0.03em] lowercase ${text} ${computedTextColor}`}
          style={{ fontFamily: "'Comfortaa', -apple-system, sans-serif" }}
        >
          biopnl
        </span>
      )}
    </div>
  );
};
