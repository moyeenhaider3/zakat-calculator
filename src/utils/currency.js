/**
 * Currency Utility — Exchange Rates + Formatting
 *
 * Supports 8 currencies with Indian number formatting (lakhs/crores).
 * Caches exchange rates in localStorage with a 6-hour TTL.
 */

export const SUPPORTED_CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN', flag: '🇮🇳' },
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US', flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE', flag: '🇪🇺' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE', flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', locale: 'ar-SA', flag: '🇸🇦' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', locale: 'ms-MY', flag: '🇲🇾' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA', flag: '🇨🇦' },
];

// Fallback rates (relative to INR)
const FALLBACK_RATES = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
  EUR: 0.011,
  AED: 0.044,
  SAR: 0.045,
  MYR: 0.053,
  CAD: 0.016,
};

const CACHE_KEY = 'zc_exchange_rates';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours in ms

/**
 * Fetch exchange rates with caching and fallback.
 */
export async function fetchExchangeRates(baseCurrency = 'INR') {
  // Check cache first
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL && cached.base === baseCurrency) {
      return { rates: cached.rates, source: 'cache', lastUpdated: new Date(cached.timestamp) };
    }
  } catch {
    // Cache miss or corrupt
  }

  // Fetch from API
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    const rates = {};
    SUPPORTED_CURRENCIES.forEach(({ code }) => {
      rates[code] = data.rates[code] || FALLBACK_RATES[code];
    });

    // Cache result
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      rates,
      base: baseCurrency,
      timestamp: Date.now(),
    }));

    return { rates, source: 'api', lastUpdated: new Date() };
  } catch {
    // Return fallback rates
    return { rates: FALLBACK_RATES, source: 'fallback', lastUpdated: null };
  }
}

/**
 * Convert amount between currencies.
 */
export function convertAmount(amount, fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) return amount;
  if (!rates[fromCurrency] || !rates[toCurrency]) return amount;

  // Convert through base
  const inBase = amount / rates[fromCurrency];
  const converted = inBase * rates[toCurrency];
  return Math.round(converted * 100) / 100;
}

/**
 * Format currency amount with correct locale and symbol.
 * For INR: uses Indian number system (lakhs, crores).
 */
export function formatCurrency(amount, currencyCode = 'INR') {
  const currency = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode);
  const locale = currency?.locale || 'en-IN';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency?.symbol || '₹'}${amount.toLocaleString(locale)}`;
  }
}

/**
 * Get currency info by code.
 */
export function getCurrencyInfo(code) {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code);
}
