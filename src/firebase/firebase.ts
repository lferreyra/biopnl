import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isFirebaseReady = false;

// Attempt to load firebase-applet-config if provisioned
try {
  // Check if config exists or environment variables are provided
  // @ts-ignore dynamic import or fallback
  const config = (window as any).__FIREBASE_CONFIG__;
  if (config && config.apiKey) {
    app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseReady = true;
  }
} catch {
  // Graceful fallback to local persistent adapter
  isFirebaseReady = false;
}

export { app, auth, db, isFirebaseReady };
