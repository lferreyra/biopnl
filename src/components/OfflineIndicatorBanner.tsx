import React, { useState, useEffect } from 'react';
import { WifiOff, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { OfflineStorageService } from '../services/offlineStorageService';

export const OfflineIndicatorBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(() => OfflineStorageService.isOnline());
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    return OfflineStorageService.subscribe((online) => {
      setIsOnline(online);
      if (online) {
        setJustReconnected(true);
        setTimeout(() => setJustReconnected(false), 3500);
      }
    });
  }, []);

  if (isOnline && !justReconnected) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full py-1.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 z-50 ${
        justReconnected
          ? 'bg-emerald-600 text-white shadow-xs'
          : 'bg-[#8F3722] text-[#FFF9F5] shadow-xs'
      }`}
    >
      {justReconnected ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Conexión restablecida · Sincronizando datos</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3.5 h-3.5 shrink-0 animate-pulse" />
          <span>
            Modo sin conexión activo — Tus protocolos guardados y ejercicios de respiración funcionan al 100%.
          </span>
        </>
      )}
    </div>
  );
};
