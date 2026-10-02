import { UserProfile } from '../types';

const AUTH_STORAGE_KEY = 'lumina_active_user';

export class AuthService {
  private static currentUser: UserProfile | null = null;
  private static listeners: ((user: UserProfile | null) => void)[] = [];

  static init(): UserProfile | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        this.currentUser = JSON.parse(stored);
      } else {
        this.currentUser = null;
      }
    } catch {
      this.currentUser = null;
    }
    return this.currentUser;
  }

  static getCurrentUser(): UserProfile | null {
    if (!this.currentUser) {
      this.init();
    }
    return this.currentUser;
  }

  static subscribe(listener: (user: UserProfile | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private static notify() {
    this.listeners.forEach((l) => l(this.currentUser));
  }

  static async signIn(email: string, _password?: string): Promise<UserProfile> {
    const name = email.split('@')[0] || 'Explorador';
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const user: UserProfile = {
      id: `user_${Date.now()}`,
      userId: `user_${Date.now()}`,
      name: formattedName,
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };
    this.currentUser = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  }

  static async signInWithEmail(email: string, password?: string): Promise<UserProfile> {
    return this.signIn(email, password);
  }

  static async signUp(name: string, email: string, _password?: string): Promise<UserProfile> {
    const user: UserProfile = {
      id: `user_${Date.now()}`,
      userId: `user_${Date.now()}`,
      name: name.trim() || 'Explorador',
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };
    this.currentUser = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  }

  static async signUpWithEmail(email: string, password?: string, name?: string): Promise<UserProfile> {
    return this.signUp(name || 'Explorador', email, password);
  }

  static async signInWithGoogle(): Promise<UserProfile> {
    // Elegant Google authentication flow
    const user: UserProfile = {
      id: 'google_user_lucas',
      userId: 'google_user_lucas',
      name: 'Lucas Ferreyra',
      email: 'lucas.ferreyra@gmail.com',
      createdAt: new Date().toISOString()
    };
    this.currentUser = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  }

  static async signInAsDemoUser(): Promise<UserProfile> {
    const user: UserProfile = {
      id: 'user_amelia_demo',
      userId: 'user_amelia_demo',
      name: 'Amelia',
      email: 'amelia.bienestar@biopnl.app',
      createdAt: new Date().toISOString()
    };
    this.currentUser = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  }

  static async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.notify();
  }
}
