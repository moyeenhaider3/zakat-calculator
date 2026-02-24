/**
 * Core Zakat Calculation Engine
 *
 * Zakat (زكاة) means "purification" — it is one of the Five Pillars of Islam.
 * Muslims who possess wealth above the Nisab threshold for a full lunar year (Hawl)
 * must pay 2.5% of their net Zakatable wealth to eligible recipients.
 *
 * This engine supports both Hanafi and Shafi madhab (school of thought) differences.
 */

import { ASSET_CATEGORIES } from './assetTypes';

const STANDARD_ZAKAT_RATE = 0.025; // 2.5%
const AGRICULTURAL_IRRIGATED_RATE = 0.05; // 5%
const AGRICULTURAL_RAINFED_RATE = 0.10; // 10%

/**
 * Calculate Zakat based on assets, deductions, nisab, and madhab.
 *
 * @param {Object} assets - Object keyed by asset category id, values in currency amount
 * @param {Object} deductions - Object with { debts, liabilities } values
 * @param {number} nisabValue - The Nisab threshold value in the same currency
 * @param {'hanafi' | 'shafi'} madhab - School of Islamic jurisprudence
 * @returns {Object} Calculation result with full breakdown
 */
export function calculateZakat(assets = {}, deductions = {}, nisabValue = 0, madhab = 'hanafi') {
  const breakdown = [];
  let totalAssets = 0;

  // Calculate Zakat for each asset category
  ASSET_CATEGORIES.forEach((category) => {
    const amount = parseFloat(assets[category.id]) || 0;

    if (amount <= 0) return;

    let zakatAmount = 0;
    let isIncluded = true;
    let note = '';

    // Handle madhab-specific rules
    if (category.id === 'gold' && madhab === 'shafi') {
      // Shafi: personal-use gold jewelry is exempt
      // We still include it but mark the note — user decides if it's personal use
      note = 'Shafi madhab: Personal-use gold jewelry may be exempt. Consult a scholar.';
    }

    if (category.id === 'providentFund') {
      note = 'Zakat applies on the accessible/withdrawable amount only.';
    }

    // Calculate Zakat amount based on category rate
    if (category.id === 'agriculturalProduce') {
      // Agricultural Zakat (Ushr) — defaults to irrigated rate (5%)
      zakatAmount = roundCurrency(amount * AGRICULTURAL_IRRIGATED_RATE);
      note = 'Rate: 5% (irrigated) or 10% (rain-fed). Adjust if your land is rain-fed.';
    } else {
      zakatAmount = roundCurrency(amount * STANDARD_ZAKAT_RATE);
    }

    totalAssets += amount;

    breakdown.push({
      categoryId: category.id,
      categoryLabel: category.label,
      amount,
      zakatRate: category.id === 'agriculturalProduce' ? AGRICULTURAL_IRRIGATED_RATE : STANDARD_ZAKAT_RATE,
      zakatAmount,
      isIncluded,
      note,
    });
  });

  // Calculate total deductions
  const totalDebts = parseFloat(deductions.debts) || 0;
  const totalLiabilities = parseFloat(deductions.liabilities) || 0;
  const totalDeductions = totalDebts + totalLiabilities;

  // Net Zakatable wealth
  const netZakatable = Math.max(0, totalAssets - totalDeductions);

  // Check against Nisab threshold
  const isLiable = netZakatable >= nisabValue;

  // If net wealth is below Nisab, no Zakat is due
  if (!isLiable) {
    return {
      isLiable: false,
      totalAssets: roundCurrency(totalAssets),
      totalDeductions: roundCurrency(totalDeductions),
      netZakatable: roundCurrency(netZakatable),
      nisabValue: roundCurrency(nisabValue),
      zakatDue: 0,
      breakdown,
      madhab,
      message: 'Your net Zakatable wealth is below the Nisab threshold. Zakat is not obligatory on you this year, but voluntary Sadaqah (charity) is always encouraged.',
    };
  }

  // Calculate total Zakat due (on net amount, not gross)
  // Note: Agricultural Zakat is calculated independently
  const nonAgriculturalAssets = totalAssets - (parseFloat(assets.agriculturalProduce) || 0);
  const netNonAgricultural = Math.max(0, nonAgriculturalAssets - totalDeductions);
  const agriculturalZakat = breakdown.find((b) => b.categoryId === 'agriculturalProduce')?.zakatAmount || 0;
  const standardZakat = roundCurrency(netNonAgricultural * STANDARD_ZAKAT_RATE);
  const zakatDue = roundCurrency(standardZakat + agriculturalZakat);

  return {
    isLiable: true,
    totalAssets: roundCurrency(totalAssets),
    totalDeductions: roundCurrency(totalDeductions),
    netZakatable: roundCurrency(netZakatable),
    nisabValue: roundCurrency(nisabValue),
    zakatDue,
    breakdown,
    madhab,
    message: `Alhamdulillah! Your Zakat due this year is calculated at 2.5% of your net Zakatable wealth.`,
  };
}

/**
 * Round to 2 decimal places (currency precision).
 */
function roundCurrency(value) {
  return Math.round(value * 100) / 100;
}

/**
 * Islamic Glossary — terms used throughout the app
 */
export const ISLAMIC_GLOSSARY = [
  {
    term: 'Zakat (زكاة)',
    meaning: 'Purification of wealth. The third Pillar of Islam — an obligatory annual charity of 2.5% on wealth above the Nisab threshold.',
    category: 'core',
  },
  {
    term: 'Nisab (نصاب)',
    meaning: 'The minimum amount of wealth one must possess before Zakat becomes obligatory. It is measured in gold (87.48g) or silver (612.36g) equivalents.',
    category: 'core',
  },
  {
    term: 'Hawl (حول)',
    meaning: 'A full lunar year (approximately 354 days). Wealth must be held for one Hawl before Zakat applies.',
    category: 'core',
  },
  {
    term: 'Madhab (مذهب)',
    meaning: 'School of Islamic jurisprudence. The four main schools are Hanafi, Shafi, Maliki, and Hanbali. Zakat rules differ slightly between them.',
    category: 'core',
  },
  {
    term: 'Sadaqah (صدقة)',
    meaning: 'Voluntary charity given out of goodwill. Unlike Zakat, Sadaqah has no minimum amount and can be given at any time.',
    category: 'related',
  },
  {
    term: 'Ushr (عشر)',
    meaning: 'A tithe (one-tenth) on agricultural produce. Due at harvest time — 10% for rain-fed crops, 5% for irrigated crops.',
    category: 'related',
  },
  {
    term: 'Maal (مال)',
    meaning: 'Wealth or property. In the Zakat context, it refers to all forms of asset that can be measured in monetary value.',
    category: 'related',
  },
  {
    term: 'Hanafi (حنفي)',
    meaning: 'The most widely followed school in South Asia. Key difference: personal-use gold jewelry IS Zakatable.',
    category: 'madhab',
  },
  {
    term: "Shafi'i (شافعي)",
    meaning: 'A school widely followed in Southeast Asia and East Africa. Key difference: personal-use gold jewelry is exempt from Zakat.',
    category: 'madhab',
  },
];
