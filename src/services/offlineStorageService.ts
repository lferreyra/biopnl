import { Protocol } from '../types';
import { PROTOCOLS_CATALOG } from './protocolService';

const OFFLINE_PROTOCOLS_KEY = 'biopnl_offline_protocols_cache';
const OFFLINE_FAVORITES_KEY = 'biopnl_offline_favorites';

export class OfflineStorageService {
  private static listeners: ((isOnline: boolean) => void)[] = [];
  private static isOnlineState = typeof navigator !== 'undefined' ? navigator.onLine : true;

  static init() {
    if (typeof window === 'undefined') return;

    // Cache core protocols on first boot
    this.cacheCoreContent();

    window.addEventListener('online', () => {
      this.isOnlineState = true;
      this.notify();
    });

    window.addEventListener('offline', () => {
      this.isOnlineState = false;
      this.notify();
    });
  }

  static isOnline(): boolean {
    return this.isOnlineState;
  }

  static subscribe(listener: (isOnline: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private static notify() {
    this.listeners.forEach((l) => l(this.isOnlineState));
  }

  static cacheCoreContent() {
    try {
      localStorage.setItem(OFFLINE_PROTOCOLS_KEY, JSON.stringify(PROTOCOLS_CATALOG));
    } catch (err) {
      console.warn('Storage quota note for offline cache:', err);
    }
  }

  static getCachedProtocols(): Protocol[] {
    try {
      const data = localStorage.getItem(OFFLINE_PROTOCOLS_KEY);
      return data ? JSON.parse(data) : PROTOCOLS_CATALOG;
    } catch {
      return PROTOCOLS_CATALOG;
    }
  }

  static saveFavoriteOffline(item: { id: string; title: string; type: 'protocol' | 'symptom'; data: any }) {
    try {
      const existing = this.getOfflineFavorites();
      const filtered = existing.filter((f) => f.id !== item.id);
      const updated = [item, ...filtered];
      localStorage.setItem(OFFLINE_FAVORITES_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving offline favorite:', err);
    }
  }

  static getOfflineFavorites(): Array<{ id: string; title: string; type: 'protocol' | 'symptom'; data: any }> {
    try {
      const raw = localStorage.getItem(OFFLINE_FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static removeOfflineFavorite(id: string) {
    try {
      const existing = this.getOfflineFavorites();
      const updated = existing.filter((f) => f.id !== id);
      localStorage.setItem(OFFLINE_FAVORITES_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error removing offline favorite:', err);
    }
  }
}

// Auto-initialize
OfflineStorageService.init();
