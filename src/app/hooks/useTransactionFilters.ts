// src/app/hooks/useTransactionFilters.ts
import { useMemo } from 'react';
import { useFinance } from '../contexts/FinanceContext';

export function useTransactionFilters(selectedMonth: number, selectedYear: number) {
  const { transactions } = useFinance();

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const date = new Date(transaction.date);
      return date.getMonth() === selectedMonth - 1 && date.getFullYear() === selectedYear;
    });
  }, [transactions, selectedMonth, selectedYear]);

  const accounts = useMemo(() => {
    const uniqueAccounts = [...new Set(filteredTransactions.map(t => t.account))];
    return uniqueAccounts;
  }, [filteredTransactions]);

  const groupedTransactions = useMemo(() => {
    const grouped: { [key: string]: typeof filteredTransactions } = {};
    filteredTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const dateKey = date.toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(transaction);
    });
    return grouped;
  }, [filteredTransactions]);

  return { filteredTransactions, accounts, groupedTransactions };
}