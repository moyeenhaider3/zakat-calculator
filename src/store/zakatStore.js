/**
 * Zustand Store — Global Zakat Calculator State
 *
 * Manages all app state with localStorage persistence.
 * Includes assets, deductions, settings, prices, and calculation results.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  calculateGoldValue,
  getDefaultGoldPrice,
  getDefaultSilverPrice,
} from "../utils/metalPrices";
import { getNisabValue } from "../utils/nisab";
import { calculateZakat } from "../utils/zakat";

const useZakatStore = create(
  persist(
    (set, get) => ({
      // Asset values (keyed by category id)
      assets: {},

      // Asset weights for gold/silver (in grams)
      weights: {},

      // Multi-karat gold weights (grams per karat)
      goldWeights: { "24K": "", "22K": "", "18K": "" },

      // Deductions
      deductions: {
        debts: 0,
        liabilities: 0,
      },

      // Settings
      currency: "INR",
      madhab: "hanafi",
      nisabStandard: "silver",
      language: "en",
      darkMode: false,

      // Prices — dynamic defaults per currency, overridable via pencil icon
      goldPrice: 16000,
      silverPrice: 95,

      // Manual price overrides per currency (e.g., { INR: { gold: null, silver: null } })
      priceOverrides: {},

      // Wizard state
      currentStep: 0,

      // Calculation result
      result: null,

      // --- Actions ---

      setAsset: (categoryId, value) =>
        set((state) => ({
          assets: { ...state.assets, [categoryId]: value },
        })),

      setWeight: (categoryId, weightGrams) =>
        set((state) => ({
          weights: { ...state.weights, [categoryId]: weightGrams },
        })),

      setGoldWeight: (karat, grams) =>
        set((state) => ({
          goldWeights: { ...state.goldWeights, [karat]: grams },
        })),

      setDeduction: (type, value) =>
        set((state) => ({
          deductions: { ...state.deductions, [type]: value },
        })),

      setCurrency: (code) =>
        set((state) => {
          const overrides = state.priceOverrides[code] || {};
          return {
            currency: code,
            goldPrice: overrides.gold ?? getDefaultGoldPrice(code),
            silverPrice: overrides.silver ?? getDefaultSilverPrice(code),
          };
        }),
      setMadhab: (m) => set({ madhab: m }),
      setNisabStandard: (s) => set({ nisabStandard: s }),
      setLanguage: (lang) => set({ language: lang }),

      setDarkMode: (enabled) => {
        if (enabled) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ darkMode: enabled });
      },

      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        if (newMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ darkMode: newMode });
      },

      setPrices: (gold, silver) =>
        set({ goldPrice: gold, silverPrice: silver }),

      /**
       * Manual price override for current currency.
       * @param {'gold'|'silver'} metal
       * @param {number|null} price  null = clear override (revert to default)
       */
      setPriceOverride: (metal, price) =>
        set((state) => {
          const currency = state.currency;
          const currentOverrides = state.priceOverrides[currency] || {
            gold: null,
            silver: null,
          };
          const newCurrencyOverrides = { ...currentOverrides, [metal]: price };
          const newOverrides = {
            ...state.priceOverrides,
            [currency]: newCurrencyOverrides,
          };

          return {
            priceOverrides: newOverrides,
            ...(metal === "gold" && price !== null ? { goldPrice: price } : {}),
            ...(metal === "silver" && price !== null
              ? { silverPrice: price }
              : {}),
            ...(metal === "gold" && price === null
              ? { goldPrice: getDefaultGoldPrice(currency) }
              : {}),
            ...(metal === "silver" && price === null
              ? { silverPrice: getDefaultSilverPrice(currency) }
              : {}),
          };
        }),

      setCurrentStep: (step) => set({ currentStep: step }),

      calculateResult: () => {
        const state = get();

        // Compute gold value from karat weights, then inject into assets
        const goldValue = calculateGoldValue(
          state.goldWeights,
          state.goldPrice,
        );
        const assetsWithGold =
          goldValue > 0
            ? { ...state.assets, gold: goldValue.toString() }
            : state.assets;

        const nisabValue = getNisabValue(
          state.nisabStandard,
          state.goldPrice,
          state.silverPrice,
        );
        const result = calculateZakat(
          assetsWithGold,
          state.deductions,
          nisabValue,
          state.madhab,
        );
        set({ result });
        return result;
      },

      resetAll: () => {
        document.documentElement.classList.remove("dark");
        set({
          assets: {},
          weights: {},
          goldWeights: { "24K": "", "22K": "", "18K": "" },
          deductions: { debts: 0, liabilities: 0 },
          currency: "INR",
          madhab: "hanafi",
          nisabStandard: "silver",
          language: "en",
          darkMode: false,
          goldPrice: getDefaultGoldPrice("INR"),
          silverPrice: getDefaultSilverPrice("INR"),
          priceOverrides: {},
          currentStep: 0,
          result: null,
        });
      },

      resetCalculation: () => {
        set({
          assets: {},
          weights: {},
          goldWeights: { "24K": "", "22K": "", "18K": "" },
          deductions: { debts: 0, liabilities: 0 },
          currentStep: 0,
          result: null,
        });
      },
    }),
    {
      name: "zakat-calculator-storage",
      partialize: (state) => ({
        assets: state.assets,
        weights: state.weights,
        goldWeights: state.goldWeights,
        deductions: state.deductions,
        currency: state.currency,
        madhab: state.madhab,
        nisabStandard: state.nisabStandard,
        language: state.language,
        darkMode: state.darkMode,
        goldPrice: state.goldPrice,
        silverPrice: state.silverPrice,
        priceOverrides: state.priceOverrides,
        currentStep: state.currentStep,
      }),
    },
  ),
);

export default useZakatStore;
