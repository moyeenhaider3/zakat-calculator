/**
 * Asset Category Definitions for Zakat Calculation
 *
 * Each asset type includes:
 * - id: unique identifier
 * - label / labelHindi: bilingual display name
 * - icon: emoji icon for the wizard step
 * - description: brief explanation for the user
 * - zakatRate: percentage (0.025 = 2.5%)
 * - isZakatable: whether this category is subject to Zakat
 * - requiresHawl: whether the asset must be held for a full lunar year
 * - notes: additional guidance for the user
 * - islamicTerm: the Arabic/Islamic term and its meaning
 */

export const ASSET_CATEGORIES = [
  {
    id: "cash",
    label: "Cash & Bank Savings",
    labelHindi: "नकद और बैंक बचत",
    icon: "💰",
    description:
      "Include cash in hand, savings accounts, fixed deposits, and current accounts.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes:
      "Include all liquid cash — at home, in wallet, savings/current accounts, and fixed deposits.",
    islamicTerm: {
      term: "Maal (مال)",
      meaning:
        "Wealth or property. In Zakat context, it refers to all forms of monetary wealth.",
    },
  },
  {
    id: "gold",
    label: "Gold",
    labelHindi: "सोना",
    icon: "🪙",
    description:
      "Enter gold weight by karat (18K, 22K, 24K). Purity is applied automatically.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes:
      "Hanafi: ALL gold is Zakatable including personal jewelry. Shafi: Personal use jewelry is exempt.",
    islamicTerm: {
      term: "Dhahab (ذهب)",
      meaning:
        "Gold. Zakat on gold has been obligatory since the time of the Prophet ﷺ.",
    },
    hasWeightInput: true,
  },
  {
    id: "silver",
    label: "Silver",
    labelHindi: "चाँदी",
    icon: "🥈",
    description:
      "Silver jewelry, coins, utensils — enter value or weight in grams/tola.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes:
      "All silver items are Zakatable regardless of purpose (personal use or investment).",
    islamicTerm: {
      term: "Fiddah (فضة)",
      meaning:
        "Silver. Along with gold, silver is one of the two metals on which Zakat was originally prescribed.",
    },
    hasWeightInput: true,
    weightUnit: "grams",
  },
  {
    id: "businessInventory",
    label: "Business Inventory",
    labelHindi: "व्यापार का सामान",
    icon: "📦",
    description: "Current market value of goods held for trade or resale.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes: "Value inventory at current market price, not purchase cost.",
    islamicTerm: {
      term: "Urood at-Tijarah (عروض التجارة)",
      meaning:
        "Trade goods/merchandise. Any items purchased with the intention of resale are Zakatable.",
    },
  },
  {
    id: "receivables",
    label: "Money Owed to You",
    labelHindi: "आपको मिलने वाला पैसा",
    icon: "📄",
    description:
      "Loans given, debts owed to you that are expected to be repaid.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes:
      "Only include debts that you expect to be repaid. Write off bad debts.",
    islamicTerm: {
      term: "Dayn (دين)",
      meaning:
        "Debt. Money owed to you is considered part of your wealth for Zakat purposes.",
    },
  },
  {
    id: "stocks",
    label: "Stocks & Shares",
    labelHindi: "शेयर",
    icon: "📈",
    description: "Current market value of stocks, ETFs, and listed shares.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes:
      "Use current market value. For long-term holdings, some scholars allow Zakat on dividends only.",
    islamicTerm: {
      term: "Ashum (أسهم)",
      meaning:
        "Shares/stocks. Modern scholars agree that investments in stocks are a form of Zakatable wealth.",
    },
  },
  {
    id: "mutualFunds",
    label: "Mutual Funds & SIPs",
    labelHindi: "म्यूचुअल फंड और SIP",
    icon: "📊",
    description:
      "Current NAV (Net Asset Value) of all mutual fund investments.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes: "Use current NAV value. Include both equity and debt mutual funds.",
    islamicTerm: {
      term: "Istithmar (استثمار)",
      meaning:
        "Investment. Mutual funds are treated as a modern form of investment wealth (Maal Mustafad).",
    },
  },
  {
    id: "providentFund",
    label: "Retirement / Provident Fund",
    labelHindi: "सेवानिवृत्ति / भविष्य निधि",
    icon: "🏦",
    description:
      "Retirement or Provident Fund balance. Enter withdrawable amount.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes:
      "Hanafi view: Zakat due on amount accessible/received. Include only the amount you can withdraw.",
    islamicTerm: {
      term: "Maal Mustafad (مال مستفاد)",
      meaning:
        "Acquired/earned wealth. PF is a form of accumulated wealth that becomes Zakatable when accessible.",
    },
  },
  {
    id: "rentalProperty",
    label: "Property for Trade",
    labelHindi: "व्यापार के लिए संपत्ति",
    icon: "🏠",
    description: "Properties held for resale/trade, NOT personal residence.",
    zakatRate: 0.025,
    isZakatable: true,
    requiresHawl: true,
    notes:
      "Personal residence is NOT Zakatable. Only properties bought with the intention to sell/trade.",
    islamicTerm: {
      term: "Aqar (عقار)",
      meaning:
        "Real estate. Only property held for trading purposes is Zakatable — your home is exempt.",
    },
  },
  {
    id: "agriculturalProduce",
    label: "Agricultural Produce",
    labelHindi: "कृषि उपज",
    icon: "🌾",
    description: "Value of crops and agricultural produce at harvest time.",
    zakatRate: 0.05,
    isZakatable: true,
    requiresHawl: false,
    notes:
      "Ushr: 10% if rain-fed, 5% if irrigated. No Hawl required — due at harvest.",
    islamicTerm: {
      term: "Ushr (عشر)",
      meaning:
        "Tithe on agricultural produce. Literally means 'one-tenth'. It is due at harvest, not after a full year.",
    },
  },
];

/**
 * Get asset category by ID.
 */
export function getAssetCategory(id) {
  return ASSET_CATEGORIES.find((cat) => cat.id === id);
}

/**
 * Get only Zakatable categories.
 */
export function getZakatableCategories() {
  return ASSET_CATEGORIES.filter((cat) => cat.isZakatable);
}
