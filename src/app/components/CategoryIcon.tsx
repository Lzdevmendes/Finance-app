import React from 'react';
import {
  ShoppingCart,
  Coffee,
  Home,
  Car,
  Heart,
  Shirt,
  Smartphone,
  Utensils,
  Gift,
  GraduationCap,
  Plane,
  Film,
  DollarSign,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  alimentacao: <Utensils size={18} />,
  lazer: <Film size={18} />,
  transporte: <Car size={18} />,
  casa: <Home size={18} />,
  saude: <Heart size={18} />,
  pessoal: <Shirt size={18} />,
  educacao: <GraduationCap size={18} />,
  compras: <ShoppingCart size={18} />,
  viagem: <Plane size={18} />,
  presente: <Gift size={18} />,
  tecnologia: <Smartphone size={18} />,
  cafe: <Coffee size={18} />,
  outros: <DollarSign size={18} />,
};

export function getCategoryIcon(category: string) {
  return categoryIcons[category] || categoryIcons.outros;
}

interface CategoryIconProps {
  category: string;
  className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  return <div className={className}>{getCategoryIcon(category)}</div>;
}
