/**
 * Currency Utility — Formatting & Info
 *
 * Supports 8 currencies with correct locale formatting.
 * No exchange rate API — all values are entered directly in the selected currency.
 * Metal prices per currency are defined in metalPrices.js (DEFAULT_METAL_PRICES).
 */

export const SUPPORTED_CURRENCIES = [
  {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    locale: "en-IN",
    flag: "🇮🇳",
  },
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", flag: "🇺🇸" },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    locale: "en-GB",
    flag: "🇬🇧",
  },
  { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE", flag: "🇪🇺" },
  {
    code: "AED",
    symbol: "د.إ",
    name: "UAE Dirham",
    locale: "ar-AE",
    flag: "🇦🇪",
  },
  {
    code: "SAR",
    symbol: "﷼",
    name: "Saudi Riyal",
    locale: "ar-SA",
    flag: "🇸🇦",
  },
  {
    code: "MYR",
    symbol: "RM",
    name: "Malaysian Ringgit",
    locale: "ms-MY",
    flag: "🇲🇾",
  },
  {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    locale: "en-CA",
    flag: "🇨🇦",
  },
];

/**
 * Format currency amount with correct locale and symbol.
 * For INR: uses Indian number system (lakhs, crores).
 */
export function formatCurrency(amount, currencyCode = "INR") {
  const currency = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode);
  const locale = currency?.locale || "en-IN";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency?.symbol || "₹"}${amount.toLocaleString(locale)}`;
  }
}

/**
 * Get currency info by code.
 */
export function getCurrencyInfo(code) {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code);
}
