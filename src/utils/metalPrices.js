/**
 * Gold & Silver Price Fetcher
 *
 * Fetches live gold and silver prices per gram in INR.
 * Uses a free API with fallback to hardcoded prices.
 * Caches results in localStorage with a 12-hour TTL.
 *
 * 1 Tola = 11.664 grams (Indian/Pakistani standard)
 */

import { GRAMS_PER_TOLA } from './nisab';

const HARDCODED_GOLD_PRICE_INR = 15000; // per gram, conservative estimate
const HARDCODED_SILVER_PRICE_INR = 300; // per gram

const GOLD_CACHE_KEY = 'zc_gold_price';
const SILVER_CACHE_KEY = 'zc_silver_price';
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

/**
 * Fetch current gold price per gram in INR.
 */
export async function fetchGoldPriceINR() {
  return fetchMetalPrice('gold', GOLD_CACHE_KEY, HARDCODED_GOLD_PRICE_INR);
}

/**
 * Fetch current silver price per gram in INR.
 */
export async function fetchSilverPriceINR() {
  return fetchMetalPrice('silver', SILVER_CACHE_KEY, HARDCODED_SILVER_PRICE_INR);
}

/**
 * Internal fetch helper with caching.
 */
async function fetchMetalPrice(metal, cacheKey, fallbackPrice) {
  // Check cache
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return {
        pricePerGram: cached.price,
        pricePerTola: Math.round(cached.price * GRAMS_PER_TOLA * 100) / 100,
        source: 'cache',
        lastUpdated: new Date(cached.timestamp),
      };
    }
  } catch {
    // Cache miss
  }

  // Try fetching from a free API
  try {
    // Using a lightweight metals API
    const symbol = metal === 'gold' ? 'XAU' : 'XAG';
    const response = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=demo&base=INR&currencies=${symbol}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.rates && data.rates[symbol]) {
        // API returns INR per troy ounce — convert to per gram
        const pricePerOunce = 1 / data.rates[symbol];
        const pricePerGram = Math.round((pricePerOunce / 31.1035) * 100) / 100;

        localStorage.setItem(cacheKey, JSON.stringify({
          price: pricePerGram,
          timestamp: Date.now(),
        }));

        return {
          pricePerGram,
          pricePerTola: Math.round(pricePerGram * GRAMS_PER_TOLA * 100) / 100,
          source: 'api',
          lastUpdated: new Date(),
        };
      }
    }
  } catch {
    // API failure — use fallback
  }

  // Return fallback
  return {
    pricePerGram: fallbackPrice,
    pricePerTola: Math.round(fallbackPrice * GRAMS_PER_TOLA * 100) / 100,
    source: 'fallback',
    lastUpdated: null,
  };
}

/**
 * Convert weight between grams and tola.
 */
export function gramsToTola(grams) {
  return Math.round((grams / GRAMS_PER_TOLA) * 1000) / 1000;
}

export function tolaToGrams(tola) {
  return Math.round(tola * GRAMS_PER_TOLA * 1000) / 1000;
}

/**
 * Calculate value from weight and price.
 */
export function calculateMetalValue(weightGrams, pricePerGram) {
  return Math.round(weightGrams * pricePerGram * 100) / 100;
}
