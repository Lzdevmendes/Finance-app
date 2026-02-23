import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../config/firebase';
import { Transaction, Goal, UserPreferences } from '../types';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  updateDoc,
  orderBy,
} from 'firebase/firestore';

interface FinanceContextType {
  transactions: Transaction[];
  goals: Goal[];
  preferences: UserPreferences;
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({ theme: 'emerald', darkMode: false, currency: 'BRL' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setGoals([]);
      setPreferences({ theme: 'emerald', darkMode: false, currency: 'BRL' });
      setLoading(false);
      return;
    }

    const transRef = collection(db, 'users', user.uid, 'transactions');
    const goalsRef = collection(db, 'users', user.uid, 'goals');
    const prefsRef = doc(db, 'users', user.uid, 'preferences', 'settings');

    const unsubTrans = onSnapshot(query(transRef, orderBy('date', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[];
      setTransactions(data);
    }, (err) => console.error("Erro transações:", err));

    const unsubGoals = onSnapshot(goalsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Goal[];
      setGoals(data);
    }, (err) => console.error("Erro metas:", err));

    const unsubPrefs = onSnapshot(prefsRef, (snapshot) => {
      if (snapshot.exists()) {
        const prefsData = snapshot.data() as UserPreferences;
        setPreferences(prefsData);
        // Save to localStorage for immediate theme application
        localStorage.setItem('finance-app-preferences', JSON.stringify(prefsData));
      }
    }, (err) => console.error("Erro preferências:", err));

    setLoading(false);

    return () => { unsubTrans(); unsubGoals(); unsubPrefs(); };
  }, [user]);

  // Apply theme to DOM when preferences change
  useEffect(() => {
    // Apply dark mode class
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply theme colors using CSS custom properties
    const themeColors = {
      emerald: {
        primary: '#10b981',
        primaryHover: '#059669',
        light: '#ecfdf5',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      },
      blue: {
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        light: '#eff6ff',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
      },
      purple: {
        primary: '#8b5cf6',
        primaryHover: '#7c3aed',
        light: '#faf5ff',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
      },
      rose: {
        primary: '#f43f5e',
        primaryHover: '#e11d48',
        light: '#fff1f2',
        gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
      }
    };

    const colors = themeColors[preferences.theme];
    if (colors) {
      document.documentElement.style.setProperty('--theme-primary', colors.primary);
      document.documentElement.style.setProperty('--theme-primary-hover', colors.primaryHover);
      document.documentElement.style.setProperty('--theme-light', colors.light);
      document.documentElement.style.setProperty('--theme-gradient', colors.gradient);
    }

    // Save to localStorage for immediate theme application on page reload
    localStorage.setItem('finance-app-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'transactions'), {
      ...transaction,
      userId: user.uid,
      createdAt: new Date().toISOString()
    });
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid, 'transactions', id), updates);
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'transactions', id));
  };

  const addGoal = async (goal: Omit<Goal, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'goals'), {
      ...goal,
      userId: user.uid,
      createdAt: new Date().toISOString()
    });
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid, 'goals', id), updates);
  };

  const deleteGoal = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'goals', id));
  };

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!user) return;
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);

    // Save to localStorage for immediate theme application
    localStorage.setItem('finance-app-preferences', JSON.stringify(updated));

    await setDoc(doc(db, 'users', user.uid, 'preferences', 'settings'), updated);
  };

  const refreshData = async () => {
    // Data is automatically refreshed via onSnapshot
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        goals,
        preferences,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        updatePreferences,
        refreshData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
