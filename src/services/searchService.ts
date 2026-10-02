import { SearchRecord } from '../types';

const SEARCHES_STORAGE_KEY_PREFIX = 'lumina_searches_';

export class SearchService {
  /**
   * Retrieves the search history for a user, capped strictly at the 5 most recent records.
   */
  static getRecentSearches(userId: string): SearchRecord[] {
    try {
      const key = `${SEARCHES_STORAGE_KEY_PREFIX}${userId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const records: SearchRecord[] = JSON.parse(stored);
        // Ensure sorted by createdAt descending and limited to 5
        return records
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
      }
      
      // Seed with initial realistic demo history if brand new user
      const initialSeed: SearchRecord[] = [
        {
          id: 'search_seed_1',
          userId,
          query: 'Ansiedad',
          title: 'Ansiedad e Inquietud Anticipatoria',
          resultSummary: 'Compilación de reflexiones en torno a la activación del sistema de alerta.',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // Hace 2 horas
        },
        {
          id: 'search_seed_2',
          userId,
          query: 'Migraña',
          title: 'Migraña y Cefaleas Tensionales',
          resultSummary: 'Enfoques no directivos sobre la cefalea tensional y procesos de control.',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Ayer
        },
        {
          id: 'search_seed_3',
          userId,
          query: 'Dolor lumbar',
          title: 'Dolor Lumbar y Sobrecarga Baja de la Columna',
          resultSummary: 'Simbólica de la estructura ósea, soporte material y redistribución de cargas.',
          createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString() // Hace 3 días
        }
      ];
      localStorage.setItem(key, JSON.stringify(initialSeed));
      return initialSeed;
    } catch {
      return [];
    }
  }

  /**
   * Saves a search record for a user.
   * STRICT CONSTRAINT: Only keeps the last 5 searches.
   * If a 6th search is added, the oldest one is permanently pruned.
   * Only affects the given userId's searches.
   */
  static saveSearch(
    userId: string,
    query: string,
    title: string,
    resultSummary: string
  ): SearchRecord {
    const key = `${SEARCHES_STORAGE_KEY_PREFIX}${userId}`;
    const current = this.getRecentSearches(userId);

    // Filter out duplicate identical query to bring it to the top
    const filtered = current.filter(
      (s) => s.query.toLowerCase().trim() !== query.toLowerCase().trim()
    );

    const newRecord: SearchRecord = {
      id: `search_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId,
      query: query.trim(),
      title: title.trim(),
      resultSummary: resultSummary.trim().slice(0, 480),
      createdAt: new Date().toISOString()
    };

    // Prepend new record
    const updated = [newRecord, ...filtered];

    // Maintain STRICT maximum of 5 searches
    const pruned = updated.slice(0, 5);

    try {
      localStorage.setItem(key, JSON.stringify(pruned));
    } catch (e) {
      console.warn('Could not persist search history to storage:', e);
    }

    return newRecord;
  }

  /**
   * Deletes a specific search from user history.
   */
  static deleteSearch(userId: string, searchId: string): SearchRecord[] {
    const key = `${SEARCHES_STORAGE_KEY_PREFIX}${userId}`;
    const current = this.getRecentSearches(userId);
    const updated = current.filter((s) => s.id !== searchId);
    try {
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update search storage:', e);
    }
    return updated;
  }

  /**
   * Formats a friendly relative time string in Spanish:
   * "hace 2 horas", "ayer", "hace 3 días", etc.
   */
  static formatRelativeTime(isoString: string): string {
    const now = Date.now();
    const then = new Date(isoString).getTime();
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 2) return 'hace un momento';
    if (diffMins < 60) return `hace ${diffMins} min`;
    if (diffHours === 1) return 'hace 1 hora';
    if (diffHours < 24) return `hace ${diffHours} horas`;
    if (diffDays === 1) return 'ayer';
    if (diffDays < 7) return `hace ${diffDays} días`;
    if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} sem`;
    return new Date(isoString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  }
}
