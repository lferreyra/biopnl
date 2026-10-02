import React from 'react';
import { Logo } from './Logo';
import { UserAvatar } from './UserAvatar';
import { ThemeToggle } from './ThemeToggle';
import { UserProfile } from '../types';
import {
  Home,
  Search,
  BookOpen,
  User,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export type NavTab = 'dashboard' | 'search' | 'protocols' | 'profile' | 'admin';

interface AppShellProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  user: UserProfile | null;
  onSignOut: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onTabChange,
  user,
  onSignOut,
  children
}) => {
  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase() === 'lucas.ferreyra@gmail.com';

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'search',
      label: 'Buscar',
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 'protocols',
      label: 'Protocolos',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: <User className="w-5 h-5" />
    },
    ...(isAdmin
      ? [
          {
            id: 'admin' as NavTab,
            label: 'Admin',
            icon: <ShieldCheck className="w-5 h-5" />
          }
        ]
      : [])
  ];

  return (
    <div className="min-h-screen text-[#111111] dark:text-[#FFF4ED] relative overflow-x-hidden flex flex-col md:flex-row transition-colors duration-300">
      {/* Ambient background wallpaper (matches uploaded light beam & terracotta aura) */}
      <div className="biopnl-ambient-canvas" />

      {/* Desktop Sidebar (visible on md: and larger) */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 shrink-0 h-screen sticky top-0 bg-[#FFF9F5]/92 dark:bg-[#18100C]/90 backdrop-blur-2xl border-r border-[#E8B8A6]/40 dark:border-white/10 p-6 z-30 transition-colors duration-300 shadow-2xs">
        <div className="space-y-8">
          {/* Logo & Quick Mode Toggle */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <Logo size="md" />
              <p className="text-[10px] text-[#374151] dark:text-[#BDB0A8] tracking-wider uppercase mt-1 pl-1 font-semibold">
                Biodecodificación & PNL
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Navigation links */}
          <nav className="space-y-1.5" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full min-h-[46px] px-4 rounded-full flex items-center gap-3.5 text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311] shadow-md shadow-black/10'
                      : 'text-[#262626] dark:text-[#BDB0A8] hover:text-black dark:hover:text-[#FFF4ED] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-white dark:text-[#181311]' : 'text-[#A94A32] dark:text-[#E07853]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Info & User */}
        <div className="space-y-4 pt-4 border-t border-[#E8B8A6]/30 dark:border-[#E8B8A6]/15">
          {/* Knowledge library indicator */}
          <div className="bio-glass-card rounded-2xl p-3.5 border border-[#E8B8A6]/40 dark:border-white/10 text-xs shadow-2xs">
            <div className="flex items-center gap-1.5 text-[#8F3722] dark:text-[#E07853] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Base de Conocimiento</span>
            </div>
            <p className="text-[11px] text-[#262626] dark:text-[#BDB0A8] leading-tight font-medium">
              Biodecodificación & PNL
            </p>
            <a
              href="https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#8F3722] dark:text-[#E07853] hover:underline font-semibold mt-1.5"
            >
              <span>Ver fuentes</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* User pill & sign out */}
          {user && (
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => onTabChange('profile')}
                className="flex items-center gap-2.5 text-left group min-w-0 cursor-pointer"
              >
                <UserAvatar name={user.name} size="sm" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#111111] dark:text-[#FFF4ED] truncate group-hover:text-[#8F3722] transition-colors">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-[#4B5563] dark:text-[#BDB0A8] truncate font-medium">
                    {user.email}
                  </p>
                </div>
              </button>

              <button
                onClick={onSignOut}
                title="Cerrar sesión"
                className="p-2 rounded-xl text-[#374151] hover:text-[#8F3722] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top bar on desktop & mobile */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#FFF9F5]/90 dark:bg-[#18100C]/90 backdrop-blur-2xl border-b border-[#E8B8A6]/40 dark:border-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <Logo size="sm" />
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-[#8F3722] dark:text-[#E07853] uppercase tracking-wider">
              {currentTab === 'dashboard' && 'Inicio & Búsqueda'}
              {currentTab === 'search' && 'Exploración de Síntomas'}
              {currentTab === 'protocols' && 'Biblioteca de Protocolos'}
              {currentTab === 'profile' && 'Perfil & Ajustes'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user && (
              <button
                onClick={() => onTabChange('profile')}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#241A15]/90 border border-[#E8B8A6]/50 dark:border-white/10 hover:border-[#8F3722]/50 transition-colors cursor-pointer shadow-2xs"
              >
                <UserAvatar name={user.name} size="sm" />
                <span className="text-xs font-bold text-[#111111] dark:text-[#FFF4ED]">
                  {user.name}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Page Content Body */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10 pb-28 md:pb-12">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F5]/95 dark:bg-[#18100C]/95 backdrop-blur-2xl border-t border-[#E8B8A6]/40 dark:border-white/10 px-3 py-2"
        aria-label="Navegación móvil"
      >
        <div className={`grid ${navItems.length === 5 ? 'grid-cols-5' : 'grid-cols-4'} items-center max-w-md mx-auto h-14`}>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center min-h-[44px] rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#8F3722] dark:text-[#E07853] font-bold'
                    : 'text-[#374151] dark:text-[#BDB0A8] hover:text-black dark:hover:text-[#FFF4ED]'
                }`}
              >
                <div
                  className={`p-1 rounded-xl transition-colors ${
                    isActive ? 'bg-[#8F3722]/15 dark:bg-[#E07853]/15' : ''
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 font-semibold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
