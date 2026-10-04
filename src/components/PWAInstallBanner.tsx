import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('biopnl_pwa_dismissed') === 'true';
  });
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Para instalar BioPNL en tu teléfono: tocá el menú de opciones de tu navegador (los tres puntos o el botón de compartir en Safari) y seleccioná "Agregar a pantalla principal".');
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('biopnl_pwa_dismissed', 'true');
  };

  if (isDismissed || isInstalled || !deferredPrompt) return null;

  return (
    <div className="relative mx-auto max-w-4xl px-4 my-3">
      <div className="rounded-2xl p-3 sm:p-4 bg-gradient-to-r from-[#FAF3EE] via-[#FFF9F5] to-[#FAF3EE] dark:from-[#241A17] dark:via-[#1F1714] dark:to-[#241A17] border border-[#E8B8A6]/60 dark:border-white/10 shadow-sm flex items-center justify-between gap-3 text-[#1A1412] dark:text-[#FFF7F2]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8F3722] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold">
              Instalá BioPNL en tu teléfono o escritorio
            </h4>
            <p className="text-[11px] sm:text-xs text-[#3D3532] dark:text-[#E2D7D1]">
              Acceso rápido desde tu pantalla de inicio, modo sin conexión y mejor rendimiento.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="px-3.5 py-1.5 rounded-xl bg-[#8F3722] hover:bg-[#7A2818] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-[#3D3532]/60 dark:text-white/60 hover:text-[#1A1412] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
