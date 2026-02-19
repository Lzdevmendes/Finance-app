import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
  browserLocalPersistence,
  setPersistence,
  User,
} from 'firebase/auth';
import {
  getFirestore,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBO7vHCQocs9Ao7QwEIYA5uqApIzLcyOrE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "finance-app-d0ef7.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "finance-app-d0ef7",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "finance-app-d0ef7.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "566923989390",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:566923989390:web:c9a83c0c7540d0f8cd54df",
  measurementId: "G-XN97TQ4XDB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence);

export { db, storage };

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<{ error: any }>;
  updateUserEmail: (newEmail: string) => Promise<{ error: any }>;
  updateUserPassword: (newPassword: string) => Promise<{ error: any }>;
  uploadProfileImage: (file: File) => Promise<{ error: any; url?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (name && user) {
        await updateProfile(user, { displayName: name });
      }
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }) => {
    try {
      if (user) {
        await updateProfile(user, updates);
        // Force refresh of user data by reloading the current user
        await auth.currentUser?.reload();
        const updatedUser = auth.currentUser;
        setUser(updatedUser);
      }
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const updateUserEmail = async (newEmail: string) => {
    try {
      if (user) {
        await updateEmail(user, newEmail);
        setUser({ ...user, email: newEmail });
      }
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const updateUserPassword = async (newPassword: string) => {
    try {
      if (user) {
        await updatePassword(user, newPassword);
      }
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      if (!user) throw new Error('User not authenticated');

      console.log('Starting upload for user:', user.uid);
      console.log('File to upload:', file.name, file.size, file.type);

      const storageRef = ref(storage, `profile-images/${user.uid}`);
      console.log('Storage ref created:', storageRef.fullPath);

      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload completed, snapshot:', snapshot);

      const url = await getDownloadURL(snapshot.ref);
      console.log('Download URL obtained:', url);

      // Update user profile with new photo URL
      await updateProfile(user, { photoURL: url });
      console.log('Firebase Auth profile updated');

      // Force update local state immediately
      const updatedUser = { ...user, photoURL: url };
      setUser(updatedUser);
      console.log('Local user state updated immediately');

      return { error: null, url };
    } catch (error: any) {
      console.error('Upload profile image error:', error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUserProfile,
        updateUserEmail,
        updateUserPassword,
        uploadProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
