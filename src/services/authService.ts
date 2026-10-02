import { UserProfile } from '../types';
import { AdminService } from './adminService';

const AUTH_STORAGE_KEY = 'lumina_active_user';

export class AuthService {
  private static currentUser: UserProfile | null = null;
  private static listeners: ((user: UserProfile | null) => void)[] = [];

  static init(): UserProfile | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        this.currentUser = JSON.parse(stored);
        if (this.currentUser) {
          // Sync with AdminService
          this.currentUser = AdminService.registerOrUpdateUser(this.currentUser);
        }
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
    const cleanEmail = email.trim().toLowerCase();
    const isLucas = cleanEmail === 'lucas.ferreyra@gmail.com';
    const name = isLucas ? 'Lucas Ferreyra' : (email.split('@')[0] || 'Explorador');
    const formattedName = isLucas ? name : (name.charAt(0).toUpperCase() + name.slice(1));

    const rawUser: UserProfile = {
      id: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      userId: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      name: formattedName,
      email: cleanEmail,
      role: isLucas ? 'admin' : (AdminService.isUserAdmin(cleanEmail) ? 'admin' : 'user'),
      createdAt: new Date().toISOString()
    };

    const user = AdminService.registerOrUpdateUser(rawUser);
    this.currentUser = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  }

  static async signInWithEmail(email: string, password?: string): Promise<UserProfile> {
    return this.signIn(email, password);
  }

  static async signUp(name: string, email: string, _password?: string): Promise<UserProfile> {
    const cleanEmail = email.trim().toLowerCase();
    const isLucas = cleanEmail === 'lucas.ferreyra@gmail.com';

    const rawUser: UserProfile = {
      id: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      userId: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      name: name.trim() || 'Explorador',
      email: cleanEmail,
      role: isLucas ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };

    const user = AdminService.registerOrUpdateUser(rawUser);
    this.currentUser = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  }

  static async signUpWithEmail(email: string, password?: string, name?: string): Promise<UserProfile> {
    return this.signUp(name || 'Explorador', email, password);
  }

  static async signInWithGoogle(): Promise<UserProfile> {
    const rawUser: UserProfile = {
      id: 'user_lucas_admin',
      userId: 'user_lucas_admin',
      name: 'Lucas Ferreyra',
      email: 'lucas.ferreyra@gmail.com',
      role: 'admin',
      createdAt: new Date().toISOString()
    };

    const user = AdminService.registerOrUpdateUser(rawUser);
    this.currentUser = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  }

  static async signInAsAdmin(): Promise<UserProfile> {
    return this.signInWithGoogle();
  }

  static async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.notify();
  }
}
