// src/app/hooks/useTransactionStats.ts
import { useMemo } from 'react';
import { useFinance } from '../contexts/FinanceContext';

export function useTransactionStats(selectedMonth: number, selectedYear: number) {
  const { transactions } = useFinance();

  const stats = useMemo(() => {
    const filtered = transactions.filter(transaction => {
      const date = new Date(transaction.date);
      return date.getMonth() === selectedMonth - 1 && date.getFullYear() === selectedYear;
    });

    const totalIncome = filtered
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);

    const totalExpenses = filtered
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.value, 0);

    const balance = totalIncome - totalExpenses;

    // Cálculos adicionais para estatísticas premium
    const transactionCount = filtered.length;
    const incomeCount = filtered.filter(t => t.type === 'income').length;
    const expenseCount = filtered.filter(t => t.type === 'expense').length;
    const averageTransaction = transactionCount > 0 ? (totalIncome + totalExpenses) / transactionCount : 0;
    const largestIncome = Math.max(...filtered.filter(t => t.type === 'income').map(t => t.value), 0);
    const largestExpense = Math.max(...filtered.filter(t => t.type === 'expense').map(t => t.value), 0);

    return {
      totalIncome,
      totalExpenses,
      balance,
      transactionCount,
      incomeCount,
      expenseCount,
      averageTransaction,
      largestIncome,
      largestExpense
    };
  }, [transactions, selectedMonth, selectedYear]);

  const chartData = useMemo(() => {
    const filtered = transactions.filter(transaction => {
      const date = new Date(transaction.date);
      return date.getMonth() === selectedMonth - 1 && date.getFullYear() === selectedYear;
    });

    const income = filtered
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);

    const expenses = filtered
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.value, 0);

    return [
      { name: 'Receitas', value: income, color: '#10b981', percentage: income > 0 ? (income / (income + expenses)) * 100 : 0 },
      { name: 'Despesas', value: expenses, color: '#ef4444', percentage: expenses > 0 ? (expenses / (income + expenses)) * 100 : 0 }
    ].filter(item => item.value > 0);
  }, [transactions, selectedMonth, selectedYear]);

  const categoryData = useMemo(() => {
    const filtered = transactions.filter(transaction => {
      const date = new Date(transaction.date);
      return date.getMonth() === selectedMonth - 1 && date.getFullYear() === selectedYear;
    });

    const categoryTotals: { [key: string]: number } = {};

    filtered.forEach(transaction => {
      if (transaction.type === 'expense') {
        categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.value;
      }
    });

    return Object.entries(categoryTotals)
      .map(([category, value]) => ({
        category,
        value,
        percentage: (value / stats.totalExpenses) * 100
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 categorias
  }, [transactions, selectedMonth, selectedYear, stats.totalExpenses]);

  const monthlyData = useMemo(() => {
    const filtered = transactions.filter(transaction => {
      const date = new Date(transaction.date);
      return date.getMonth() === selectedMonth - 1 && date.getFullYear() === selectedYear;
    });

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const data = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayTransactions = filtered.filter(t => {
        const date = new Date(t.date);
        return date.getDate() === day;
      });

      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.value, 0);

      const expenses = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.value, 0);

      data.push({
        day: day.toString(),
        income,
        expenses,
        balance: income - expenses,
        date: `${day.toString().padStart(2, '0')}/${selectedMonth.toString().padStart(2, '0')}`
      });
    }

    return data;
  }, [transactions, selectedMonth, selectedYear]);

  const trendData = useMemo(() => {
    const monthlyTrends = [];

    // Últimos 6 meses
    for (let i = 5; i >= 0; i--) {
      const date = new Date(selectedYear, selectedMonth - 1 - i, 1);
      const month = date.getMonth();
      const year = date.getFullYear();

      const monthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.value, 0);

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.value, 0);

      monthlyTrends.push({
        month: date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
        income,
        expenses,
        balance: income - expenses
      });
    }

    return monthlyTrends;
  }, [transactions, selectedMonth, selectedYear]);

  return { stats, chartData, categoryData, monthlyData, trendData };
}