/**
 * Nisab Threshold Utility
 *
 * Nisab is the minimum amount of wealth a Muslim must have before
 * being obligated to pay Zakat. There are two standards:
 *
 * - Gold Standard: 87.48 grams of gold (≈ 7.5 tola)
 * - Silver Standard: 612.36 grams of silver (≈ 52.5 tola)
 *
 * Most scholars recommend using the silver standard as it results
 * in a lower threshold, meaning more people pay Zakat — which is
 * more cautious and benefits more recipients.
 */

// Standard Nisab weights in grams
export const GOLD_NISAB_GRAMS = 87.48;
export const SILVER_NISAB_GRAMS = 612.36;

// Tola conversion (1 tola = 11.664 grams, standard in Indian/Pakistani markets)
export const GRAMS_PER_TOLA = 11.664;

/**
 * Calculate the Nisab threshold value in the selected currency.
 * Prices come directly from DEFAULT_METAL_PRICES for the selected currency.
 *
 * @param {'gold' | 'silver'} standard - Which Nisab standard to use
 * @param {number} goldPricePerGram - Gold price per gram in selected currency
 * @param {number} silverPricePerGram - Silver price per gram in selected currency
 * @returns {number} Nisab value in the selected currency
 */
export function getNisabValue(standard, goldPricePerGram, silverPricePerGram) {
  if (standard === "gold") {
    return Math.round(GOLD_NISAB_GRAMS * (goldPricePerGram || 0) * 100) / 100;
  }
  return Math.round(SILVER_NISAB_GRAMS * (silverPricePerGram || 0) * 100) / 100;
}

/**
 * Get a human-readable explanation of the Nisab.
 */
export function getNisabExplanation(standard) {
  if (standard === "gold") {
    return {
      weight: `${GOLD_NISAB_GRAMS}g (≈ ${(GOLD_NISAB_GRAMS / GRAMS_PER_TOLA).toFixed(1)} tola)`,
      metal: "gold",
      description:
        "The Gold Nisab is the value of 87.48 grams of gold. If your total Zakatable wealth equals or exceeds this amount, Zakat is obligatory on you.",
    };
  }
  return {
    weight: `${SILVER_NISAB_GRAMS}g (≈ ${(SILVER_NISAB_GRAMS / GRAMS_PER_TOLA).toFixed(1)} tola)`,
    metal: "silver",
    description:
      "The Silver Nisab is the value of 612.36 grams of silver. This is the more commonly used standard as it results in a lower threshold, meaning more people fulfill the obligation of Zakat.",
  };
}
