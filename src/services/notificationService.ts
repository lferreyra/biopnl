export interface MindfulReminder {
  id: string;
  time: string; // HH:mm
  label: string;
  message: string;
  enabled: boolean;
}

export const DEFAULT_REMINDERS: MindfulReminder[] = [
  {
    id: 'morning',
    time: '10:00',
    label: 'Despertar Somático',
    message: '🌅 Pausa matutina: Relajá la mandíbula, sentí tus pies firmes en la tierra e inhalá profundo.',
    enabled: true
  },
  {
    id: 'afternoon',
    time: '15:00',
    label: 'Reencuadre de Tarde',
    message: '🌿 Pausa de las 15:00: Observá tu postura, aflojá los hombros y hacé 3 respiraciones profundas.',
    enabled: true
  },
  {
    id: 'evening',
    time: '20:30',
    label: 'Descompresión Nocturna',
    message: '🌙 Cierre del día: Soltá lo que no puedas controlar hoy y regalate 2 minutos de quietud.',
    enabled: false
  }
];

const NOTIFICATIONS_STORAGE_KEY = 'biopnl_mindful_notifications_settings';

export class NotificationService {
  static getReminders(): MindfulReminder[] {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_REMINDERS;
    } catch {
      return DEFAULT_REMINDERS;
    }
  }

  static saveReminders(reminders: MindfulReminder[]) {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(reminders));
    } catch (err) {
      console.error('Error saving reminders:', err);
    }
  }

  static async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }
    try {
      return await Notification.requestPermission();
    } catch {
      return 'denied';
    }
  }

  static sendMindfulNotification(title: string, body: string) {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/icons/icon.svg',
          badge: '/icons/icon.svg',
          tag: 'biopnl-mindful-reminder'
        });
      } catch (err) {
        // Fallback for Service Worker notification if in SW context
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(title, {
              body,
              icon: '/icons/icon.svg',
              badge: '/icons/icon.svg'
            });
          });
        }
      }
    }
  }
}
