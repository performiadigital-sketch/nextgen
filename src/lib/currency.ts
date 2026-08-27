export type CurrencyCode = 'EUR' | 'USD' | 'FCFA' | 'GBP';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  name: string;
  position: 'before' | 'after';
}

export const CURRENCY_RATES: Record<CurrencyCode, CurrencyInfo> = {
  EUR: { code: 'EUR', symbol: '€', rate: 1.0, name: 'Euro', position: 'after' },
  USD: { code: 'USD', symbol: '$', rate: 1.08, name: 'US Dollar', position: 'before' },
  FCFA: { code: 'FCFA', symbol: 'FCFA', rate: 655.957, name: 'Franc CFA (XAF/XOF)', position: 'after' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.85, name: 'British Pound', position: 'before' },
};

export function convertCurrency(eurAmount: number, targetCurrency: CurrencyCode = 'EUR'): number {
  const info = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.EUR;
  return eurAmount * info.rate;
}

export function formatCurrency(
  eurAmount: number | undefined | null,
  targetCurrency: CurrencyCode = 'EUR',
  compact: boolean = true
): string {
  if (eurAmount === undefined || eurAmount === null || isNaN(eurAmount)) return '-';
  const info = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.EUR;
  const value = eurAmount * info.rate;

  if (compact) {
    if (info.code === 'FCFA') {
      if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)} Mrd ${info.symbol}`;
      } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)} M ${info.symbol}`;
      } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(0)} k ${info.symbol}`;
      }
      return `${Math.round(value).toLocaleString()} ${info.symbol}`;
    } else {
      if (value >= 1_000_000) {
        const num = (value / 1_000_000).toFixed(2);
        return info.position === 'before' ? `${info.symbol}${num}M` : `${num}M ${info.symbol}`;
      } else if (value >= 1_000) {
        const num = (value / 1_000).toFixed(0);
        return info.position === 'before' ? `${info.symbol}${num}k` : `${num}k ${info.symbol}`;
      }
      const num = Math.round(value).toLocaleString();
      return info.position === 'before' ? `${info.symbol}${num}` : `${num} ${info.symbol}`;
    }
  } else {
    const num = Math.round(value).toLocaleString();
    return info.position === 'before' ? `${info.symbol} ${num}` : `${num} ${info.symbol}`;
  }
}
