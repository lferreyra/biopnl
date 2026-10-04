import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseReady } from '../firebase/firebase';
import { UserProfile, UserRole } from '../types';
import { AdminService } from './adminService';

const AUTH_STORAGE_KEY = 'lumina_active_user';

export class AuthService {
  private static currentUser: UserProfile | null = null;
  private static listeners: ((user: UserProfile | null) => void)[] = [];
  private static authInitialized = false;

  static init(): UserProfile | null {
    if (this.authInitialized) {
      return this.currentUser;
    }
    this.authInitialized = true;

    // Load cached session first for instant UI response
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch {
      this.currentUser = null;
    }

    // Connect real Firebase Auth state listener
    if (auth) {
      onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          try {
            const cleanEmail = (fbUser.email || '').trim().toLowerCase();
            const isLucas = cleanEmail === 'lucas.ferreyra@gmail.com';
            let profile: UserProfile | null = null;

            if (db) {
              const userDocRef = doc(db, 'users', fbUser.uid);
              const snap = await getDoc(userDocRef);
              if (snap.exists()) {
                profile = snap.data() as UserProfile;
              } else {
                // First-time profile creation in Firestore
                profile = {
                  id: fbUser.uid,
                  userId: fbUser.uid,
                  name: fbUser.displayName || (cleanEmail.split('@')[0] || 'Nuevo Usuario'),
                  email: cleanEmail,
                  role: isLucas ? 'admin' : 'user',
                  createdAt: new Date().toISOString(),
                  lastActiveAt: new Date().toISOString(),
                  searchesCount: 0,
                  protocolsCount: 0,
                  status: 'active'
                };
                await setDoc(userDocRef, profile);
              }
            }

            if (!profile) {
              profile = {
                id: fbUser.uid,
                userId: fbUser.uid,
                name: fbUser.displayName || (cleanEmail.split('@')[0] || 'Nuevo Usuario'),
                email: cleanEmail,
                role: isLucas ? 'admin' : 'user',
                createdAt: new Date().toISOString()
              };
            }

            // Sync with AdminService
            this.currentUser = AdminService.registerOrUpdateUser(profile);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
            this.notify();
          } catch (err) {
            console.error('Error fetching user profile from Firestore:', err);
          }
        } else {
          // Explicit sign out
          this.currentUser = null;
          localStorage.removeItem(AUTH_STORAGE_KEY);
          this.notify();
        }
      });
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

  static async updateUserPreferences(partial: Partial<UserProfile>): Promise<UserProfile | null> {
    if (!this.currentUser) return null;
    const updated = { ...this.currentUser, ...partial };
    this.currentUser = updated;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    if (db && auth?.currentUser) {
      try {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), partial);
      } catch (err) {
        console.warn('Non-fatal preference sync notice:', err);
      }
    }
    this.notify();
    return updated;
  }

  private static mapAuthError(err: unknown): string {
    if (!err || typeof err !== 'object') return 'Ocurrió un error inesperado al procesar la solicitud.';
    const code = (err as { code?: string }).code || '';

    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado. Por favor, iniciá sesión.';
      case 'auth/invalid-email':
        return 'El formato de correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe contener al menos 6 caracteres.';
      case 'auth/user-not-found':
        return 'No encontramos ninguna cuenta con ese correo.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos. Verificá tus datos.';
      case 'auth/unauthorized-domain': {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
        return `Dominio no autorizado en Firebase. Tu dominio actual es: "${currentHost}". Cópialo sin "https://" y pégalo en Firebase Console > Authentication > Settings > Dominios autorizados. O bien, puedes registrarte abajo con tu correo y contraseña.`;
      }
      case 'auth/popup-closed-by-user':
        return 'La ventana de inicio con Google se cerró antes de completar el acceso.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Por favor verificá tu conexión a internet.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Por favor aguardá unos minutos antes de reintentar.';
      default:
        return (err as Error).message || 'No fue posible completar la autenticación.';
    }
  }

  static async signUp(email: string, password?: string, name?: string): Promise<UserProfile> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password || '';
    const cleanName = (name || '').trim() || (cleanEmail.split('@')[0] || 'Nuevo Usuario');
    const isLucas = cleanEmail === 'lucas.ferreyra@gmail.com';

    if (!cleanPassword || cleanPassword.length < 6) {
      throw new Error('La contraseña debe tener un mínimo de 6 caracteres.');
    }

    if (auth) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        const fbUser = cred.user;

        // Update auth profile display name
        if (cleanName) {
          try {
            await updateProfile(fbUser, { displayName: cleanName });
          } catch {
            // non-fatal
          }
        }

        const role: UserRole = isLucas ? 'admin' : 'user';

        const profile: UserProfile = {
          id: fbUser.uid,
          userId: fbUser.uid,
          name: cleanName,
          email: cleanEmail,
          role,
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
          searchesCount: 0,
          protocolsCount: 0,
          status: 'active'
        };

        if (db) {
          try {
            await setDoc(doc(db, 'users', fbUser.uid), profile);
          } catch (dbErr) {
            console.error('Firestore user save error:', dbErr);
          }
        }

        const syncedUser = AdminService.registerOrUpdateUser(profile);
        this.currentUser = syncedUser;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(syncedUser));
        this.notify();
        return syncedUser;
      } catch (err) {
        throw new Error(this.mapAuthError(err));
      }
    }

    // Fallback if Firebase is offline
    const fallbackUser: UserProfile = {
      id: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      userId: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: isLucas ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };
    const synced = AdminService.registerOrUpdateUser(fallbackUser);
    this.currentUser = synced;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(synced));
    this.notify();
    return synced;
  }

  static async signUpWithEmail(email: string, password?: string, name?: string): Promise<UserProfile> {
    return this.signUp(email, password, name);
  }

  static async signInWithEmail(email: string, password?: string): Promise<UserProfile> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password || '';
    const isLucas = cleanEmail === 'lucas.ferreyra@gmail.com';

    if (!cleanPassword) {
      throw new Error('Por favor ingresá tu contraseña.');
    }

    if (auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        const fbUser = cred.user;
        let profile: UserProfile | null = null;

        if (db) {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            profile = snap.data() as UserProfile;
            try {
              await updateDoc(userDocRef, { lastActiveAt: new Date().toISOString() });
            } catch {
              // ignore non-critical update failure
            }
          }
        }

        if (!profile) {
          profile = {
            id: fbUser.uid,
            userId: fbUser.uid,
            name: fbUser.displayName || (cleanEmail.split('@')[0] || 'Explorador'),
            email: cleanEmail,
            role: isLucas ? 'admin' : 'user',
            createdAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
            searchesCount: 0,
            protocolsCount: 0,
            status: 'active'
          };
          if (db) {
            try {
              await setDoc(doc(db, 'users', fbUser.uid), profile);
            } catch {
              // ignore
            }
          }
        }

        const syncedUser = AdminService.registerOrUpdateUser(profile);
        this.currentUser = syncedUser;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(syncedUser));
        this.notify();
        return syncedUser;
      } catch (err) {
        throw new Error(this.mapAuthError(err));
      }
    }

    // Fallback if Firebase Auth is unavailable
    const fallbackUser: UserProfile = {
      id: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      userId: isLucas ? 'user_lucas_admin' : `user_${Date.now()}`,
      name: isLucas ? 'Lucas Ferreyra' : (cleanEmail.split('@')[0] || 'Explorador'),
      email: cleanEmail,
      role: isLucas ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };
    const synced = AdminService.registerOrUpdateUser(fallbackUser);
    this.currentUser = synced;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(synced));
    this.notify();
    return synced;
  }

  static async signInWithGoogle(): Promise<UserProfile> {
    if (auth) {
      try {
        const cred = await signInWithPopup(auth, googleProvider);
        const fbUser = cred.user;
        const cleanEmail = (fbUser.email || '').trim().toLowerCase();
        const isLucas = cleanEmail === 'lucas.ferreyra@gmail.com';
        let profile: UserProfile | null = null;

        if (db) {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            profile = snap.data() as UserProfile;
            try {
              await updateDoc(userDocRef, { lastActiveAt: new Date().toISOString() });
            } catch {
              // ignore
            }
          } else {
            profile = {
              id: fbUser.uid,
              userId: fbUser.uid,
              name: fbUser.displayName || 'Usuario Google',
              email: cleanEmail,
              role: isLucas ? 'admin' : 'user',
              createdAt: new Date().toISOString(),
              lastActiveAt: new Date().toISOString(),
              searchesCount: 0,
              protocolsCount: 0,
              status: 'active'
            };
            await setDoc(userDocRef, profile);
          }
        }

        if (!profile) {
          profile = {
            id: fbUser.uid,
            userId: fbUser.uid,
            name: fbUser.displayName || 'Usuario Google',
            email: cleanEmail,
            role: isLucas ? 'admin' : 'user',
            createdAt: new Date().toISOString()
          };
        }

        const syncedUser = AdminService.registerOrUpdateUser(profile);
        this.currentUser = syncedUser;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(syncedUser));
        this.notify();
        return syncedUser;
      } catch (err) {
        throw new Error(this.mapAuthError(err));
      }
    }

    throw new Error('El servicio de autenticación con Google no está disponible en este momento.');
  }

  static async signOut(): Promise<void> {
    if (auth) {
      try {
        await fbSignOut(auth);
      } catch (err) {
        console.warn('Firebase signOut error:', err);
      }
    }
    this.currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.notify();
  }
}
