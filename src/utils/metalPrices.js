/**
 * Metal Price Calculation Engine
 *
 * No API calls. Prices are set manually by the user via the pencil icon,
 * otherwise default hardcoded values are used.
 *
 * Default prices (Feb 2026 India estimate — verify before use):
 *   Gold 24K: ₹16,000/g
 *   Silver:   ₹95/g
 *
 * Karat purity fractions:
 *   24K → 1.000 | 22K → 0.916 | 18K → 0.750
 *
 * 1 Tola = 11.664 grams
 */

import { GRAMS_PER_TOLA } from './nisab';

export const DEFAULT_GOLD_PRICE_INR = 16100;  // kept for backward compat
export const DEFAULT_SILVER_PRICE_INR = 290;   // kept for backward compat

/**
 * Default gold (24K) and silver prices per gram by currency.
 * Values are conservative estimates for Feb 2026.
 * Users can override via the pencil icon at any time.
 *
 * Gold ~$93/g (~₹16,000/g) · Silver ~$0.93/g (~₹95/g)
 */
export const DEFAULT_METAL_PRICES = {
  /*        gold/g         silver/g   */
  INR: { gold: 16100,      silver: 290   },
  USD: { gold: 160,        silver: 2.4   },
  GBP: { gold: 117,        silver: 1.8   },
  EUR: { gold: 134,        silver: 2.1   },
  AED: { gold: 588,        silver: 8.8   },
  SAR: { gold: 611,        silver: 9.1   },
  MYR: { gold: 740,        silver: 11.0  },
  CAD: { gold: 215,        silver: 3.2   },
};

/** Get default gold price for a given currency (falls back to INR). */
export function getDefaultGoldPrice(currency) {
  return DEFAULT_METAL_PRICES[currency]?.gold ?? DEFAULT_METAL_PRICES.INR.gold;
}

/** Get default silver price for a given currency (falls back to INR). */
export function getDefaultSilverPrice(currency) {
  return DEFAULT_METAL_PRICES[currency]?.silver ?? DEFAULT_METAL_PRICES.INR.silver;
}

export const KARAT_PURITY = {
  '24K': 1.0,
  '22K': 0.916,
  '18K': 0.75,
};

// ─── Gold calculation engine ──────────────────────────────────────────────────

/**
 * Calculate total gold value in INR from multi-karat entries.
 *
 * @param {Object} karatWeights  e.g. { '24K': 10, '22K': 20, '18K': 5 } (grams)
 * @param {number} pricePerGram24K  24K gold price per gram in INR
 * @returns {number} Total market value in INR
 */
export function calculateGoldValue(karatWeights, pricePerGram24K) {
  if (!pricePerGram24K || pricePerGram24K <= 0) return 0;
  let total = 0;
  for (const [karat, grams] of Object.entries(karatWeights)) {
    const purity = KARAT_PURITY[karat] ?? 0;
    total += (parseFloat(grams) || 0) * purity * pricePerGram24K;
  }
  return Math.round(total * 100) / 100;
}

/**
 * Get per-karat breakdown for Results + PDF display.
 */
export function getGoldKaratBreakdown(karatWeights, pricePerGram24K) {
  return Object.entries(karatWeights)
    .filter(([, grams]) => parseFloat(grams) > 0)
    .map(([karat, grams]) => {
      const purity = KARAT_PURITY[karat] ?? 0;
      const pricePerGram = Math.round(pricePerGram24K * purity * 100) / 100;
      const value = Math.round((parseFloat(grams) || 0) * pricePerGram * 100) / 100;
      return { karat, grams: parseFloat(grams), purity, pricePerGram, value };
    });
}

/**
 * Calculate silver value in INR from weight.
 */
export function calculateSilverValue(grams, pricePerGramINR) {
  if (!pricePerGramINR || pricePerGramINR <= 0) return 0;
  return Math.round((parseFloat(grams) || 0) * pricePerGramINR * 100) / 100;
}

// ─── Weight conversion helpers ────────────────────────────────────────────────

export function gramsToTola(grams) {
  return Math.round((grams / GRAMS_PER_TOLA) * 1000) / 1000;
}

export function tolaToGrams(tola) {
  return Math.round(tola * GRAMS_PER_TOLA * 1000) / 1000;
}

/** Legacy helper for silver/other metals */
export function calculateMetalValue(weightGrams, pricePerGram) {
  return Math.round(weightGrams * pricePerGram * 100) / 100;
}
