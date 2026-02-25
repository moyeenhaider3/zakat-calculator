import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import useZakatStore from '../../store/zakatStore';
import { formatCurrency, getCurrencyInfo } from '../../utils/currency';
import {
    KARAT_PURITY,
    calculateGoldValue,
    calculateMetalValue,
    gramsToTola,
    tolaToGrams,
} from '../../utils/metalPrices';

const KARATS = ['24K', '22K', '18K'];

// ─── Multi-karat gold input ───────────────────────────────────────────────────

function GoldWeightInput({ goldPrice, currency, language }) {
  const { goldWeights, setGoldWeight, setAsset } = useZakatStore();
  const isHindi = language === 'hi';
  // Track tola display values separately (derived from grams)
  const [tolaDisplay, setTolaDisplay] = useState({ '24K': '', '22K': '', '18K': '' });

  const handleGramsChange = (karat, val) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    setGoldWeight(karat, val);
    // Update tola display
    setTolaDisplay((prev) => ({
      ...prev,
      [karat]: val && parseFloat(val) > 0 ? gramsToTola(parseFloat(val)).toFixed(3) : '',
    }));
    // Update combined asset value
    const updated = { ...goldWeights, [karat]: val };
    const total = calculateGoldValue(updated, goldPrice);
    if (total > 0) setAsset('gold', total.toString());
  };

  const handleTolaChange = (karat, val) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    setTolaDisplay((prev) => ({ ...prev, [karat]: val }));
    const grams = val && parseFloat(val) > 0 ? tolaToGrams(parseFloat(val)) : '';
    setGoldWeight(karat, grams.toString());
    const updated = { ...goldWeights, [karat]: grams.toString() };
    const total = calculateGoldValue(updated, goldPrice);
    if (total > 0) setAsset('gold', total.toString());
  };

  const totalValue = calculateGoldValue(goldWeights, goldPrice);
  const currencyInfo = getCurrencyInfo(currency);
  const symbol = currencyInfo?.symbol || '₹';

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {isHindi ? 'वज़न दर्ज करें (कैरेट अनुसार)' : 'Enter Weight by Karat'}
      </label>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 dark:text-gray-500 text-center font-medium px-1">
        <span>{isHindi ? 'कैरेट' : 'Karat'}</span>
        <span>{isHindi ? 'ग्राम' : 'Grams'}</span>
        <span>{isHindi ? 'तोला' : 'Tola'}</span>
      </div>

      {/* One row per karat */}
      {KARATS.map((karat) => (
        <div key={karat} className="grid grid-cols-3 gap-2 items-center">
          {/* Karat label */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{karat}</span>
            <span className="text-xs text-gray-400">{Math.round(KARAT_PURITY[karat] * 1000) / 10}%</span>
          </div>
          {/* Grams */}
          <input
            type="number"
            inputMode="decimal"
            value={goldWeights[karat] ?? ''}
            onChange={(e) => handleGramsChange(karat, e.target.value)}
            placeholder="0"
            className="input-field text-center text-sm"
            min="0"
            step="0.01"
          />
          {/* Tola */}
          <input
            type="number"
            inputMode="decimal"
            value={tolaDisplay[karat] ?? ''}
            onChange={(e) => handleTolaChange(karat, e.target.value)}
            placeholder="0"
            className="input-field text-center text-sm"
            min="0"
            step="0.001"
          />
        </div>
      ))}

      {/* Price + Total */}
      <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-1">
        {goldPrice > 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            24K: {formatCurrency(goldPrice, 'INR')}/g
            {' · '}
            22K: {formatCurrency(Math.round(goldPrice * 0.916), 'INR')}/g
            {' · '}
            18K: {formatCurrency(Math.round(goldPrice * 0.75), 'INR')}/g
          </p>
        )}
        {totalValue > 0 && (
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 text-center">
            {isHindi ? 'कुल मूल्य:' : 'Total:'}
            {' '}{symbol}{totalValue.toLocaleString('en-IN')}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Silver / generic weight input ───────────────────────────────────────────

function WeightInput({ category, goldPrice, silverPrice, setAsset, setWeight, language, weights }) {
  const isHindi = language === 'hi';
  const weightValue = weights[category.id] || '';
  const price = category.id === 'silver' ? silverPrice : goldPrice;

  const handleWeightChange = (e, unit) => {
    const val = e.target.value;
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    let grams = val;
    if (unit === 'tola') {
      grams = val ? tolaToGrams(parseFloat(val)).toString() : '';
    }
    setWeight(category.id, grams);
    if (grams && parseFloat(grams) > 0 && price > 0) {
      setAsset(category.id, calculateMetalValue(parseFloat(grams), price).toString());
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {isHindi ? 'वज़न दर्ज करें' : 'Enter Weight'}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            {isHindi ? 'ग्राम' : 'Grams'}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={weightValue}
            onChange={(e) => handleWeightChange(e, 'grams')}
            placeholder="0"
            className="input-field text-center"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            {isHindi ? 'तोला' : 'Tola'}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={weightValue ? gramsToTola(parseFloat(weightValue)).toFixed(3) : ''}
            onChange={(e) => handleWeightChange(e, 'tola')}
            placeholder="0"
            className="input-field text-center"
            min="0"
            step="0.001"
          />
        </div>
      </div>
      {price > 0 && (
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          {formatCurrency(price, 'INR')}/gram
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssetStep({ category }) {
  const {
    assets, weights, setAsset, setWeight,
    currency, goldPrice, silverPrice, language,
  } = useZakatStore();
  const isHindi = language === 'hi';
  const value = assets[category.id] || '';
  const currencyInfo = getCurrencyInfo(currency);
  const isGold = category.id === 'gold';

  const handleValueChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAsset(category.id, val);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category header */}
      <div className="text-center">
        <span className="text-5xl mb-3 block">{category.icon}</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isHindi ? category.labelHindi : category.label}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          {category.description}
        </p>
      </div>

      {/* Islamic term info */}
      {category.islamicTerm && (
        <div className="card bg-primary-50/50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800/30">
          <div className="flex items-start gap-3">
            <FiInfo className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-primary-700 dark:text-primary-300 text-sm font-arabic">
                {category.islamicTerm.term}
              </p>
              <p className="text-sm text-primary-600/80 dark:text-primary-400/80 mt-1">
                {category.islamicTerm.meaning}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gold: multi-karat | Silver/others: grams+tola */}
      {isGold ? (
        <GoldWeightInput
          goldPrice={goldPrice}
          currency={currency}
          language={language}
        />
      ) : category.hasWeightInput ? (
        <WeightInput
          category={category}
          goldPrice={goldPrice}
          silverPrice={silverPrice}
          setAsset={setAsset}
          setWeight={setWeight}
          language={language}
          weights={weights}
        />
      ) : null}

      {/* Value input — hidden for gold (auto-calculated), shown for all others */}
      {!isGold && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isHindi ? 'मूल्य दर्ज करें' : 'Enter Value'} ({currencyInfo?.symbol || '₹'})
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg font-medium">
              {currencyInfo?.symbol || '₹'}
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={value}
              onChange={handleValueChange}
              placeholder="0"
              className="input-field pl-10 text-xl font-semibold text-center"
              min="0"
              step="0.01"
              aria-label={`${category.label} value`}
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
            {isHindi ? 'लागू नहीं होने पर 0 दर्ज करें' : 'Enter 0 if not applicable'}
          </p>
        </div>
      )}

      {/* Category-specific notes */}
      {category.notes && (
        <div className="card bg-accent-50/50 dark:bg-accent-900/10 border-accent-100 dark:border-accent-800/20">
          <p className="text-sm text-accent-700 dark:text-accent-300">
            💡 {category.notes}
          </p>
        </div>
      )}
    </div>
  );
}
