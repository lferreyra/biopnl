import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, X, Check, Clock, Sparkles } from 'lucide-react';
import { NotificationService, MindfulReminder } from '../services/notificationService';

interface MindfulNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MindfulNotificationsModal: React.FC<MindfulNotificationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [reminders, setReminders] = useState<MindfulReminder[]>(() => NotificationService.getReminders());
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    return typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default';
  });
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleToggleReminder = async (id: string) => {
    if (permission !== 'granted') {
      const result = await NotificationService.requestPermission();
      setPermission(result);
      if (result !== 'granted') {
        alert('Para recibir los micro-recordatorios, habilitá los permisos de notificaciones en tu navegador.');
        return;
      }
    }

    const updated = reminders.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
    setReminders(updated);
    NotificationService.saveReminders(updated);
  };

  const handleSendSample = async () => {
    if (permission !== 'granted') {
      const res = await NotificationService.requestPermission();
      setPermission(res);
      if (res !== 'granted') {
        alert('Permisos de notificación no autorizados en el navegador.');
        return;
      }
    }
    NotificationService.sendMindfulNotification(
      '🌿 BioPNL · Pausa de Presencia',
      'Observá tu postura, aflojá la mandíbula y hacé 3 respiraciones profundas.'
    );
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md rounded-[32px] p-6 sm:p-7 bg-[#FAF3EE] dark:bg-[#1E1715] border border-[#E8B8A6]/60 dark:border-white/15 shadow-2xl text-[#1A1412] dark:text-[#FFF7F2]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#8F3722]/10 dark:bg-[#E07853]/20 text-[#8F3722] dark:text-[#E07853] flex items-center justify-center">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold">
                  Notificaciones Conscientes
                </h3>
                <p className="text-xs text-[#3D3532] dark:text-[#E2D7D1]">
                  Micro-pausas somáticas en tu rutina diaria
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#3D3532]/70 dark:text-white/70"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#3D3532] dark:text-[#E2D7D1] leading-relaxed mb-4">
            Recibí recordatorios amables y no invasivos para reconectar con tu respiración y chequear el nivel de tensión en tu cuerpo durante el día.
          </p>

          {/* List of Reminders */}
          <div className="space-y-2.5 mb-5">
            {reminders.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
                    <span className="font-bold text-xs">{r.time}</span>
                    <span className="text-xs font-semibold text-[#1A1412] dark:text-[#FFF7F2]">
                      · {r.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3D3532]/80 dark:text-white/70 line-clamp-1">
                    {r.message}
                  </p>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => handleToggleReminder(r.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    r.enabled ? 'bg-[#8F3722] dark:bg-[#E07853]' : 'bg-black/20 dark:bg-white/20'
                  }`}
                  role="switch"
                  aria-checked={r.enabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      r.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#E8B8A6]/30 dark:border-white/10">
            <button
              type="button"
              onClick={handleSendSample}
              className="w-full py-2 px-3 rounded-xl bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/15 text-xs font-bold border border-[#E8B8A6]/50 dark:border-white/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {testSent ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400">¡Notificación enviada!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
                  <span>Probar notificación de ejemplo</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#8F3722] hover:bg-[#7A2818] text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
            >
              Listo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
