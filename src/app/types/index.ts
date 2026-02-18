// types/index.ts - Centralização de todos os tipos e interfaces
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum AccountType {
  CHECKING = 'checking',
  SAVINGS = 'savings',
  CREDIT_CARD = 'credit_card',
}

export enum CategoryType {
  FOOD = 'alimentacao',
  LEISURE = 'lazer',
  TRANSPORT = 'transporte',
  HOME = 'casa',
  HEALTH = 'saude',
  PERSONAL = 'pessoal',
  EDUCATION = 'educacao',
  SHOPPING = 'compras',
  TRAVEL = 'viagem',
  TECHNOLOGY = 'tecnologia',
  INVESTMENTS = 'investimentos',
  SALARY = 'salario',
  FREELANCE = 'freelance',
  BONUS = 'bonus',
  DIVIDENDS = 'dividendos',
  RENT = 'aluguel',
  SERVICES = 'servicos',
  INSURANCE = 'seguros',
  TAXES = 'impostos',
  DONATIONS = 'doacoes',
  OTHER = 'outros',
}

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  value: number;
  type: TransactionType;
  category: CategoryType;
  tags: string[];
  account: AccountType;
  date: string;
  createdAt: string;
  isRecurring?: boolean;
  recurringFrequency?: 'monthly' | 'weekly' | 'yearly';
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  balance: number;
  creditLimit?: number;
  dueDate?: number; // Dia do vencimento
  closingDate?: number; // Dia do fechamento
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  createdAt: string;
  deadline?: string;
}

export interface UserPreferences {
  theme: 'emerald' | 'blue' | 'purple' | 'rose';
  darkMode: boolean;
  currency: string;
}

export interface GoalWithFeasibility extends Goal {
  monthlySavings: number;
  monthsNeeded: number;
  isFeasible: boolean;
}

export interface CategoryExpense {
  category: string;
  value: number;
}

export type RecurringFrequency = 'monthly' | 'weekly' | 'yearly';

export type ThemeName = 'emerald' | 'blue' | 'purple' | 'rose';