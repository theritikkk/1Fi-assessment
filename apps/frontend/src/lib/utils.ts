import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numeric amount to Indian Rupee standard format (e.g. ₹1,27,400)
 */
export function formatCurrency(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '₹0';
  }
  const numericAmount = Math.round(Number(amount));
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

/**
 * Format number with Indian numbering system (e.g. 12,450)
 */
export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Calculate percentage discount and total saved amount
 */
export function calculateSavings(mrp: number, price: number): { percentage: number; amount: number } {
  if (!mrp || !price || mrp <= price) {
    return { percentage: 0, amount: 0 };
  }
  const amount = mrp - price;
  const percentage = Math.round((amount / mrp) * 100);
  return { percentage, amount };
}
