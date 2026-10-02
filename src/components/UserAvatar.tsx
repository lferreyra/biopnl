import React from 'react';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg'
  };

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'B';

  return (
    <div
      className={`rounded-full bg-gradient-to-tr from-[#E8B8A6] via-[#F6E7DF] to-[#D8A08C] text-[#2A211E] font-medium flex items-center justify-center border border-white/60 shadow-sm shrink-0 select-none ${sizeClasses[size]} ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
};
