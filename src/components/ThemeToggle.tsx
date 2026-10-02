import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-2xl lumina-glass flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer hover:border-[#D96C45]/40 active:scale-95 ${
        isDark
          ? 'text-[#E8B8A6] hover:text-[#FFF4ED]'
          : 'text-[#7E716D] hover:text-[#2A211E]'
      } ${className}`}
      title={isDark ? 'Cambiar a modo cálido (Linen)' : 'Cambiar a modo noche (Café Profundo)'}
      aria-label={isDark ? 'Activar tema claro' : 'Activar tema café profundo'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-[#F47A45] transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-4 h-4 text-[#D96C45] transition-transform duration-300 rotate-0" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs">
          {isDark ? 'Café Profundo' : 'Modo Cálido'}
        </span>
      )}
    </button>
  );
};
