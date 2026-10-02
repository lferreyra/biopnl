export type ProtocolCategory = 
  | 'Relajación'
  | 'PNL'
  | 'Mindfulness'
  | 'Reflexión'
  | 'Visualización'
  | 'Gestión emocional';

export interface ProtocolStep {
  stepNumber: number;
  title: string;
  instruction: string;
}

export interface Protocol {
  id: string;
  title: string;
  shortDescription: string;
  durationMinutes: number;
  category: ProtocolCategory;
  iconName: string;
  objective: string;
  preparation: string;
  steps: ProtocolStep[];
  closure: string;
  reflectionQuestions: string[];
}

export interface Source {
  name: string;
  reference: string;
  relevantExcerpt: string;
  url?: string;
}

export interface KnowledgeResult {
  query: string;
  title: string;
  summary: string;
  interpretation: string;
  emotionalThemes: string[];
  reflectionQuestions: string[];
  relatedProtocols: Protocol[];
  sources: Source[];
  disclaimer: string;
  isMedicalAlert?: boolean;
  alertMessage?: string;
  alertLevel?: 'warning' | 'emergency' | 'none';
  medicalAlert?: {
    isAlert: boolean;
    level: 'warning' | 'emergency';
    message: string;
  };
  isDemoContent?: boolean;
}

export interface KnowledgeProvider {
  search(query: string): Promise<KnowledgeResult>;
}

export interface SearchRecord {
  id: string;
  userId: string;
  query: string;
  title: string;
  resultSummary: string;
  createdAt: string; // ISO string
}

export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  role?: UserRole;
  lastActiveAt?: string;
  searchesCount?: number;
  protocolsCount?: number;
  status?: 'active' | 'inactive';
}

export type ThemeMode = 'light' | 'dark';
