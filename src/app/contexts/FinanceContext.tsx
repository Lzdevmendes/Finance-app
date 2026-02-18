import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from './AuthContext'; // Import db from AuthContext
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  updateDoc,
  where,
  orderBy,
} from 'firebase/firestore';

interface Transaction {
  id: string;
  userId: string;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
  tags: string[];
  account: string;
  date: string;
  createdAt: string;
}

interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  createdAt: string;
}

interface Preferences {
  theme: 'emerald' | 'blue' | 'purple' | 'rose';
  darkMode: boolean;
}

interface FinanceContextType {
  transactions: Transaction[];
  goals: Goal[];
  preferences: Preferences;
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  updatePreferences: (preferences: Partial<Preferences>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [preferences, setPreferences] = useState<Preferences>({ theme: 'emerald', darkMode: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setGoals([]);
      setPreferences({ theme: 'emerald', darkMode: false });
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
        setPreferences(snapshot.data() as Preferences);
      }
    }, (err) => console.error("Erro preferências:", err));

    setLoading(false);

    return () => { unsubTrans(); unsubGoals(); unsubPrefs(); };
  }, [user]);

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

  const updatePreferences = async (newPreferences: Partial<Preferences>) => {
    if (!user) return;
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
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
