/**
 * Zustand Store — Global Zakat Calculator State
 *
 * Manages all app state with localStorage persistence.
 * Includes assets, deductions, settings, prices, and calculation results.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getNisabValue } from '../utils/nisab';
import { calculateZakat } from '../utils/zakat';

const useZakatStore = create(
  persist(
    (set, get) => ({
      // Asset values (keyed by category id)
      assets: {},

      // Asset weights for gold/silver (in grams)
      weights: {},

      // Deductions
      deductions: {
        debts: 0,
        liabilities: 0,
      },

      // Settings
      currency: 'INR',
      madhab: 'hanafi',
      nisabStandard: 'silver',
      language: 'en',
      darkMode: false,

      // Live prices
      goldPrice: 0,
      silverPrice: 0,
      exchangeRates: null,
      priceSource: null,

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

      setDeduction: (type, value) =>
        set((state) => ({
          deductions: { ...state.deductions, [type]: value },
        })),

      setCurrency: (code) => set({ currency: code }),
      setMadhab: (m) => set({ madhab: m }),
      setNisabStandard: (s) => set({ nisabStandard: s }),
      setLanguage: (lang) => set({ language: lang }),

      setDarkMode: (enabled) => {
        if (enabled) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ darkMode: enabled });
      },

      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ darkMode: newMode });
      },

      setPrices: (gold, silver) =>
        set({ goldPrice: gold, silverPrice: silver }),

      setExchangeRates: (rates) => set({ exchangeRates: rates }),
      setPriceSource: (source) => set({ priceSource: source }),

      setCurrentStep: (step) => set({ currentStep: step }),

      calculateResult: () => {
        const state = get();
        const nisabValue = getNisabValue(
          state.nisabStandard,
          state.goldPrice,
          state.silverPrice
        );
        const result = calculateZakat(
          state.assets,
          state.deductions,
          nisabValue,
          state.madhab
        );
        set({ result });
        return result;
      },

      resetAll: () => {
        document.documentElement.classList.remove('dark');
        set({
          assets: {},
          weights: {},
          deductions: { debts: 0, liabilities: 0 },
          currency: 'INR',
          madhab: 'hanafi',
          nisabStandard: 'silver',
          language: 'en',
          darkMode: false,
          goldPrice: 0,
          silverPrice: 0,
          exchangeRates: null,
          priceSource: null,
          currentStep: 0,
          result: null,
        });
      },

      resetCalculation: () => {
        set({
          assets: {},
          weights: {},
          deductions: { debts: 0, liabilities: 0 },
          currentStep: 0,
          result: null,
        });
      },
    }),
    {
      name: 'zakat-calculator-storage',
      partialize: (state) => ({
        assets: state.assets,
        weights: state.weights,
        deductions: state.deductions,
        currency: state.currency,
        madhab: state.madhab,
        nisabStandard: state.nisabStandard,
        language: state.language,
        darkMode: state.darkMode,
        goldPrice: state.goldPrice,
        silverPrice: state.silverPrice,
        currentStep: state.currentStep,
      }),
    }
  )
);

export default useZakatStore;
