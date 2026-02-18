// constants/index.ts - Constantes e configurações da aplicação
import { CategoryType, ThemeName } from '../types';

export const CATEGORIES = [
  { value: CategoryType.FOOD, label: 'Alimentação', icon: '🍽️' },
  { value: CategoryType.LEISURE, label: 'Lazer', icon: '🎉' },
  { value: CategoryType.TRANSPORT, label: 'Transporte', icon: '🚗' },
  { value: CategoryType.HOME, label: 'Casa', icon: '🏠' },
  { value: CategoryType.HEALTH, label: 'Saúde', icon: '🏥' },
  { value: CategoryType.PERSONAL, label: 'Pessoal', icon: '👤' },
  { value: CategoryType.EDUCATION, label: 'Educação', icon: '📚' },
  { value: CategoryType.SHOPPING, label: 'Compras', icon: '🛒' },
  { value: CategoryType.TRAVEL, label: 'Viagem', icon: '✈️' },
  { value: CategoryType.TECHNOLOGY, label: 'Tecnologia', icon: '💻' },
  { value: CategoryType.INVESTMENTS, label: 'Investimentos', icon: '📈' },
  { value: CategoryType.SALARY, label: 'Salário', icon: '💰' },
  { value: CategoryType.FREELANCE, label: 'Freelance', icon: '💼' },
  { value: CategoryType.BONUS, label: 'Bônus', icon: '🎁' },
  { value: CategoryType.DIVIDENDS, label: 'Dividendos', icon: '📊' },
  { value: CategoryType.RENT, label: 'Aluguel', icon: '🏢' },
  { value: CategoryType.SERVICES, label: 'Serviços', icon: '🔧' },
  { value: CategoryType.INSURANCE, label: 'Seguros', icon: '🛡️' },
  { value: CategoryType.TAXES, label: 'Impostos', icon: '📋' },
  { value: CategoryType.DONATIONS, label: 'Doações', icon: '❤️' },
  { value: CategoryType.OTHER, label: 'Outros', icon: '📝' },
] as const;

export const THEMES: Record<ThemeName, {
  primary: string;
  primaryHover: string;
  text: string;
  border: string;
  light: string;
  gradient: string;
  bgGradient: string;
  accent: string;
  shadow: string;
}> = {
  emerald: {
    primary: 'bg-emerald-600',
    primaryHover: 'bg-emerald-700',
    text: 'text-emerald-600',
    border: 'border-emerald-600',
    light: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-emerald-600',
    bgGradient: 'from-emerald-50 to-green-50',
    accent: 'bg-emerald-100',
    shadow: 'shadow-emerald-100',
  },
  blue: {
    primary: 'bg-blue-600',
    primaryHover: 'bg-blue-700',
    text: 'text-blue-600',
    border: 'border-blue-600',
    light: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    accent: 'bg-blue-100',
    shadow: 'shadow-blue-100',
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'bg-purple-700',
    text: 'text-purple-600',
    border: 'border-purple-600',
    light: 'bg-purple-50',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-violet-50',
    accent: 'bg-purple-100',
    shadow: 'shadow-purple-100',
  },
  rose: {
    primary: 'bg-rose-600',
    primaryHover: 'bg-rose-700',
    text: 'text-rose-600',
    border: 'border-rose-600',
    light: 'bg-rose-50',
    gradient: 'from-rose-500 to-rose-600',
    bgGradient: 'from-rose-50 to-pink-50',
    accent: 'bg-rose-100',
    shadow: 'shadow-rose-100',
  },
};

export const CHART_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#f59e0b'];

export const DEFAULT_PREFERENCES = {
  theme: 'emerald' as ThemeName,
  darkMode: false,
  currency: 'EUR',
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
} as const;

export const TRANSITION_CONFIG = {
  duration: 0.2,
  ease: [0.4, 0.0, 0.2, 1],
} as const;