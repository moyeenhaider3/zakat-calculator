/**
 * Gold & Silver Price Fetcher + Calculation Engine
 *
 * API: goldpricez.com
 *   GET https://goldpricez.com/api/rates/currency/inr/measure/gram/metal/all
 *   Header: X-API-KEY: <key>
 *
 *   Response fields used:
 *     gram_in_inr          → 24K gold price per gram in INR
 *     silver_gram_in_inr   → Silver price per gram in INR
 *     (or gram_in_usd / silver_gram_in_usd for other currencies)
 *
 * Karat purity fractions:
 *   24K → 1.000 | 22K → 0.916 | 18K → 0.750
 *
 * 1 Tola = 11.664 grams
 */

import { GRAMS_PER_TOLA } from './nisab';

const API_KEY = import.meta.env.VITE_GOLDPRICEZ_API_KEY || '60547206719a628ce2bda07af7870edf60547206';
const BASE_URL = 'https://goldpricez.com/api/rates';
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

const GOLD_CACHE_KEY = 'zc_gold_gpz_v2';   // bumped to bust stale cache
const SILVER_CACHE_KEY = 'zc_silver_gpz_v2'; // bumped to bust stale cache

// Fallback prices per gram in INR (conservative, used when API fails)
const FALLBACK_GOLD_INR = 8000;
const FALLBACK_SILVER_INR = 95;

/**
 * Karat purity fractions.
 * Used to derive 22K and 18K prices from the 24K base price.
 */
export const KARAT_PURITY = {
  '24K': 1.0,
  '22K': 0.916,
  '18K': 0.75,
};

// ─── Cache helpers ────────────────────────────────────────────────────────────

function readCache(key) {
  try {
    const cached = JSON.parse(localStorage.getItem(key));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached;
  } catch { /* corrupt */ }
  return null;
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ ...data, timestamp: Date.now() }));
  } catch { /* quota exceeded */ }
}

// ─── API fetch ────────────────────────────────────────────────────────────────

/**
 * Fetch gold + silver prices from goldpricez.com for INR.
 * NOTE: API response is a double-encoded JSON string, so we parse twice.
 */
async function fetchFromGoldPriceZ() {
  const url = `${BASE_URL}/currency/inr/measure/gram/metal/all`;
  console.log('[metalPrices] Fetching:', url);

  const response = await fetch(url, {
    headers: { 'X-API-KEY': API_KEY },
  });

  if (!response.ok) throw new Error(`GoldPriceZ HTTP ${response.status}`);

  // API returns a JSON-encoded string (double-encoded), so parse twice
  const raw = await response.text();
  console.log('[metalPrices] Raw response:', raw.slice(0, 200));

  let data;
  try {
    const first = JSON.parse(raw);
    // If it's still a string, parse again
    data = typeof first === 'string' ? JSON.parse(first) : first;
  } catch (e) {
    throw new Error(`Failed to parse GoldPriceZ response: ${e.message}`);
  }

  console.log('[metalPrices] Parsed gold:', data.gram_in_inr, '| silver:', data.silver_gram_in_inr);

  const goldPerGram = parseFloat(data.gram_in_inr);
  const silverPerGram = parseFloat(data.silver_gram_in_inr);

  if (!goldPerGram || isNaN(goldPerGram)) {
    throw new Error(`Invalid gold price in response: ${data.gram_in_inr}`);
  }

  return { goldPerGram, silverPerGram };
}


// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch 24K gold price per gram in INR.
 */
export async function fetchGoldPriceINR() {
  // Check cache
  const cached = readCache(GOLD_CACHE_KEY);
  if (cached?.pricePerGram) {
    return {
      pricePerGram: cached.pricePerGram,
      pricePerTola: Math.round(cached.pricePerGram * GRAMS_PER_TOLA * 100) / 100,
      source: 'cache',
      lastUpdated: new Date(cached.timestamp),
    };
  }

  try {
    const { goldPerGram } = await fetchFromGoldPriceZ();
    writeCache(GOLD_CACHE_KEY, { pricePerGram: goldPerGram });
    console.log(`[metalPrices] Gold 24K: ₹${goldPerGram}/g (api)`);
    return {
      pricePerGram: goldPerGram,
      pricePerTola: Math.round(goldPerGram * GRAMS_PER_TOLA * 100) / 100,
      source: 'api',
      lastUpdated: new Date(),
    };
  } catch (err) {
    console.warn('[metalPrices] Gold fetch failed:', err.message);
  }

  return {
    pricePerGram: FALLBACK_GOLD_INR,
    pricePerTola: Math.round(FALLBACK_GOLD_INR * GRAMS_PER_TOLA * 100) / 100,
    source: 'fallback',
    lastUpdated: null,
  };
}

/**
 * Fetch silver price per gram in INR.
 */
export async function fetchSilverPriceINR() {
  const cached = readCache(SILVER_CACHE_KEY);
  if (cached?.pricePerGram) {
    return {
      pricePerGram: cached.pricePerGram,
      pricePerTola: Math.round(cached.pricePerGram * GRAMS_PER_TOLA * 100) / 100,
      source: 'cache',
      lastUpdated: new Date(cached.timestamp),
    };
  }

  try {
    const { silverPerGram } = await fetchFromGoldPriceZ();
    writeCache(SILVER_CACHE_KEY, { pricePerGram: silverPerGram });
    console.log(`[metalPrices] Silver: ₹${silverPerGram}/g (api)`);
    return {
      pricePerGram: silverPerGram,
      pricePerTola: Math.round(silverPerGram * GRAMS_PER_TOLA * 100) / 100,
      source: 'api',
      lastUpdated: new Date(),
    };
  } catch (err) {
    console.warn('[metalPrices] Silver fetch failed:', err.message);
  }

  return {
    pricePerGram: FALLBACK_SILVER_INR,
    pricePerTola: Math.round(FALLBACK_SILVER_INR * GRAMS_PER_TOLA * 100) / 100,
    source: 'fallback',
    lastUpdated: null,
  };
}

// ─── Gold calculation engine ──────────────────────────────────────────────────

/**
 * Calculate total gold value in INR from multi-karat entries.
 *
 * @param {Object} karatWeights  e.g. { '24K': 10, '22K': 20, '18K': 5 } (grams)
 * @param {number} pricePerGram24K  Current 24K gold price per gram in INR
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
 * Get per-karat value breakdown (for Results + PDF display).
 *
 * @param {Object} karatWeights
 * @param {number} pricePerGram24K
 * @returns {Array<{ karat, grams, purity, pricePerGram, value }>}
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

/** Legacy helper kept for backward compatibility with silver/other metals */
export function calculateMetalValue(weightGrams, pricePerGram) {
  return Math.round(weightGrams * pricePerGram * 100) / 100;
}
