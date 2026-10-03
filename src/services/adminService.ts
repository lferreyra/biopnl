import { UserProfile, UserRole } from '../types';
import { db, auth } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export interface AdminActivityItem {
  id: string;
  userName: string;
  userEmail: string;
  action: 'search' | 'protocol' | 'login' | 'signup';
  detail: string;
  timestamp: string;
}

export interface AdminAnalyticsSummary {
  totalUsers: number;
  activeTodayCount: number;
  totalSearches: number;
  totalProtocolsRun: number;
  adminCount: number;
  topSymptoms: { term: string; count: number; percentage: number }[];
  topProtocols: { name: string; category: string; count: number }[];
  recentActivity: AdminActivityItem[];
}

const USERS_STORAGE_KEY = 'lumina_all_registered_users';
const ACTIVITY_STORAGE_KEY = 'lumina_admin_activity_log';
const SEARCH_STATS_STORAGE_KEY = 'lumina_symptom_search_counts';
const PROTOCOL_STATS_STORAGE_KEY = 'lumina_protocol_usage_counts';

// Primary Admin Account
const PRIMARY_ADMIN_USER: UserProfile = {
  id: 'user_lucas_admin',
  userId: 'user_lucas_admin',
  name: 'Lucas Ferreyra',
  email: 'lucas.ferreyra@gmail.com',
  role: 'admin',
  createdAt: '2026-10-01T00:00:00.000Z',
  lastActiveAt: new Date().toISOString(),
  searchesCount: 0,
  protocolsCount: 0,
  status: 'active'
};

// Known demo emails to purge from storage
const DEMO_EMAILS = new Set([
  'amelia.bienestar@biopnl.app',
  'amelia@biopnl.app',
  'matias.albarracin@medsomatica.org',
  'sofia.benitez@terapias.ar',
  'carlos.mendoza@gmail.com',
  'valen.rossi@outlook.com',
  'javier.gomez@biovida.com',
  'elena.castillo@bienestar.cl',
  'rodrigo.paz@gmail.com',
  'mariana.duprat@terapiafloral.com',
  'andres.q@psicosomatica.net',
  'lucia.varela@gmail.com'
]);

export class AdminService {
  private static users: UserProfile[] = [];
  private static activity: AdminActivityItem[] = [];
  private static symptomCounts: Record<string, number> = {};
  private static protocolCounts: Record<string, number> = {};
  private static initialized = false;

  private static init() {
    if (this.initialized) return;

    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        const parsed: UserProfile[] = JSON.parse(storedUsers);
        // Strictly filter out any demo or simulated accounts
        this.users = parsed.filter((u) => {
          if (!u.email) return false;
          const emailLower = u.email.toLowerCase();
          if (DEMO_EMAILS.has(emailLower)) return false;
          if (u.id.startsWith('sim_user_')) return false;
          if (emailLower.includes('@medsomatica.org') || emailLower.includes('@terapias.ar') || emailLower.includes('@bienestar.cl') || emailLower.includes('@biovida.com')) {
            return false;
          }
          return true;
        });

        // Ensure Lucas Ferreyra is present as admin
        const hasLucas = this.users.some((u) => u.email.toLowerCase() === 'lucas.ferreyra@gmail.com');
        if (!hasLucas) {
          this.users.unshift(PRIMARY_ADMIN_USER);
        } else {
          const lucas = this.users.find((u) => u.email.toLowerCase() === 'lucas.ferreyra@gmail.com');
          if (lucas) lucas.role = 'admin';
        }
        this.saveUsers();
      } else {
        this.users = [PRIMARY_ADMIN_USER];
        this.saveUsers();
      }

      // Activity log: purge demo activity
      const storedActivity = localStorage.getItem(ACTIVITY_STORAGE_KEY);
      if (storedActivity) {
        const parsedActivity: AdminActivityItem[] = JSON.parse(storedActivity);
        this.activity = parsedActivity.filter((a) => {
          if (!a.userEmail) return false;
          const emailLower = a.userEmail.toLowerCase();
          if (DEMO_EMAILS.has(emailLower)) return false;
          return true;
        });
        this.saveActivity();
      } else {
        this.activity = [];
        this.saveActivity();
      }

      // Symptom search counts
      const storedSymptoms = localStorage.getItem(SEARCH_STATS_STORAGE_KEY);
      this.symptomCounts = storedSymptoms ? JSON.parse(storedSymptoms) : {};

      // Protocol usage counts
      const storedProtocols = localStorage.getItem(PROTOCOL_STATS_STORAGE_KEY);
      this.protocolCounts = storedProtocols ? JSON.parse(storedProtocols) : {};
    } catch {
      this.users = [PRIMARY_ADMIN_USER];
      this.activity = [];
      this.symptomCounts = {};
      this.protocolCounts = {};
    }

    this.initialized = true;
  }

  private static saveUsers() {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
    } catch (e) {
      console.error('Error saving users to storage', e);
    }
  }

  private static saveActivity() {
    try {
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(this.activity));
    } catch (e) {
      console.error('Error saving activity to storage', e);
    }
  }

  private static saveStats() {
    try {
      localStorage.setItem(SEARCH_STATS_STORAGE_KEY, JSON.stringify(this.symptomCounts));
      localStorage.setItem(PROTOCOL_STATS_STORAGE_KEY, JSON.stringify(this.protocolCounts));
    } catch (e) {
      console.error('Error saving stats to storage', e);
    }
  }

  static getAllUsers(): UserProfile[] {
    this.init();
    return [...this.users];
  }

  static async syncUsersFromFirestore(): Promise<UserProfile[]> {
    this.init();
    if (db && auth?.currentUser) {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const firestoreUsers: UserProfile[] = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data() as UserProfile;
          if (data && data.email && !DEMO_EMAILS.has(data.email.toLowerCase())) {
            firestoreUsers.push(data);
          }
        });
        if (firestoreUsers.length > 0) {
          this.users = firestoreUsers;
          this.saveUsers();
        }
      } catch (e) {
        console.warn('Could not sync users from Firestore:', e);
      }
    }
    return this.getAllUsers();
  }

  static isUserAdmin(email?: string): boolean {
    if (!email) return false;
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'lucas.ferreyra@gmail.com') return true;
    this.init();
    const found = this.users.find((u) => u.email.toLowerCase() === cleanEmail);
    return found?.role === 'admin';
  }

  static registerOrUpdateUser(profile: UserProfile): UserProfile {
    this.init();
    const cleanEmail = profile.email.trim().toLowerCase();
    const isLucasAdmin = cleanEmail === 'lucas.ferreyra@gmail.com';

    const existingIndex = this.users.findIndex(
      (u) => u.email.toLowerCase() === cleanEmail || u.id === profile.id
    );

    const assignedRole: UserRole = isLucasAdmin
      ? 'admin'
      : profile.role || (existingIndex >= 0 ? this.users[existingIndex].role : 'user') || 'user';

    const updatedUser: UserProfile = {
      ...profile,
      role: assignedRole,
      lastActiveAt: new Date().toISOString(),
      searchesCount: existingIndex >= 0 ? (this.users[existingIndex].searchesCount || 0) : 0,
      protocolsCount: existingIndex >= 0 ? (this.users[existingIndex].protocolsCount || 0) : 0,
      status: 'active'
    };

    if (existingIndex >= 0) {
      this.users[existingIndex] = {
        ...this.users[existingIndex],
        ...updatedUser
      };
    } else {
      this.users.unshift(updatedUser);
      this.logActivity({
        userName: updatedUser.name,
        userEmail: updatedUser.email,
        action: 'signup',
        detail: 'Nuevo usuario registrado en BioPNL'
      });
    }

    this.saveUsers();
    return updatedUser;
  }

  static async updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
    this.init();
    const user = this.users.find((u) => u.id === userId || u.userId === userId);
    if (!user) return false;

    // Prevent removing admin from primary owner Lucas
    if (user.email.toLowerCase() === 'lucas.ferreyra@gmail.com' && newRole === 'user') {
      return false;
    }

    user.role = newRole;
    this.saveUsers();

    if (db) {
      try {
        await updateDoc(doc(db, 'users', userId), { role: newRole });
      } catch (err) {
        console.warn('Firestore update role error:', err);
      }
    }
    return true;
  }

  static async deleteUser(userId: string): Promise<boolean> {
    this.init();
    const target = this.users.find((u) => u.id === userId || u.userId === userId);
    if (target?.email.toLowerCase() === 'lucas.ferreyra@gmail.com') {
      return false; // Prevent deleting main admin
    }
    this.users = this.users.filter((u) => u.id !== userId && u.userId !== userId);
    this.saveUsers();

    if (db) {
      try {
        await deleteDoc(doc(db, 'users', userId));
      } catch (err) {
        console.warn('Firestore delete user error:', err);
      }
    }
    return true;
  }

  static logActivity(item: Omit<AdminActivityItem, 'id' | 'timestamp'>) {
    this.init();
    const newEntry: AdminActivityItem = {
      ...item,
      id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    this.activity.unshift(newEntry);
    if (this.activity.length > 50) {
      this.activity = this.activity.slice(0, 50);
    }
    this.saveActivity();
  }

  static recordSearch(userEmail?: string, queryText?: string) {
    if (!userEmail) return;
    this.init();
    const user = this.users.find((u) => u.email.toLowerCase() === userEmail.toLowerCase());
    if (user) {
      user.searchesCount = (user.searchesCount || 0) + 1;
      user.lastActiveAt = new Date().toISOString();
      this.saveUsers();
    }
    if (queryText) {
      const cleanTerm = queryText.trim();
      this.symptomCounts[cleanTerm] = (this.symptomCounts[cleanTerm] || 0) + 1;
      this.saveStats();

      this.logActivity({
        userName: user?.name || userEmail.split('@')[0],
        userEmail,
        action: 'search',
        detail: `Consultó síntoma: "${cleanTerm}"`
      });
    }
  }

  static recordProtocol(userEmail?: string, protocolTitle?: string) {
    if (!userEmail) return;
    this.init();
    const user = this.users.find((u) => u.email.toLowerCase() === userEmail.toLowerCase());
    if (user) {
      user.protocolsCount = (user.protocolsCount || 0) + 1;
      user.lastActiveAt = new Date().toISOString();
      this.saveUsers();
    }
    if (protocolTitle) {
      const cleanTitle = protocolTitle.trim();
      this.protocolCounts[cleanTitle] = (this.protocolCounts[cleanTitle] || 0) + 1;
      this.saveStats();

      this.logActivity({
        userName: user?.name || userEmail.split('@')[0],
        userEmail,
        action: 'protocol',
        detail: `Completó protocolo: "${cleanTitle}"`
      });
    }
  }

  static getAnalyticsSummary(): AdminAnalyticsSummary {
    this.init();
    const totalUsers = this.users.length;
    const adminCount = this.users.filter((u) => u.role === 'admin').length;

    // Active in last 24h
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const activeTodayCount = this.users.filter((u) => {
      if (!u.lastActiveAt) return false;
      return new Date(u.lastActiveAt).getTime() >= oneDayAgo;
    }).length;

    const totalSearches = this.users.reduce((acc, u) => acc + (u.searchesCount || 0), 0);
    const totalProtocolsRun = this.users.reduce((acc, u) => acc + (u.protocolsCount || 0), 0);

    // Compute top symptoms dynamically from real user searches
    const symptomEntries = Object.entries(this.symptomCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const totalSymptomHits = symptomEntries.reduce((sum, item) => sum + item[1], 0) || 1;
    const topSymptoms = symptomEntries.map(([term, count]) => ({
      term,
      count,
      percentage: Math.round((count / totalSymptomHits) * 100)
    }));

    // Compute top protocols dynamically from real user executions
    const protocolEntries = Object.entries(this.protocolCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topProtocols = protocolEntries.map(([name, count]) => ({
      name,
      category: 'Protocolo de Escucha Interior',
      count
    }));

    return {
      totalUsers,
      activeTodayCount,
      totalSearches,
      totalProtocolsRun,
      adminCount,
      topSymptoms,
      topProtocols,
      recentActivity: this.activity.slice(0, 15)
    };
  }

  static exportUsersToCSV(): string {
    this.init();
    const headers = ['ID', 'Nombre', 'Email', 'Rol', 'Fecha Registro', 'Último Acceso', 'Búsquedas', 'Protocolos', 'Estado'];
    const rows = this.users.map((u) => [
      u.id,
      `"${u.name}"`,
      u.email,
      u.role || 'user',
      u.createdAt,
      u.lastActiveAt || u.createdAt,
      u.searchesCount || 0,
      u.protocolsCount || 0,
      u.status || 'active'
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    return csvContent;
  }
}
