import { FiInfo } from 'react-icons/fi';
import useZakatStore from '../../store/zakatStore';
import { formatCurrency, getCurrencyInfo } from '../../utils/currency';
import { calculateMetalValue, gramsToTola, tolaToGrams } from '../../utils/metalPrices';

export default function AssetStep({ category }) {
  const { assets, weights, setAsset, setWeight, currency, goldPrice, silverPrice, language } = useZakatStore();
  const isHindi = language === 'hi';
  const value = assets[category.id] || '';
  const currencyInfo = getCurrencyInfo(currency);
  const hasWeight = category.hasWeightInput;
  const weightValue = weights[category.id] || '';

  const handleValueChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAsset(category.id, val);
    }
  };

  const handleWeightChange = (e, unit) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      let grams = val;
      if (unit === 'tola') {
        grams = val ? tolaToGrams(parseFloat(val)) : '';
      }
      setWeight(category.id, grams);

      // Auto-calculate value from weight
      if (grams && parseFloat(grams) > 0) {
        const price = category.id === 'gold' ? goldPrice : silverPrice;
        if (price > 0) {
          const calculatedValue = calculateMetalValue(parseFloat(grams), price);
          setAsset(category.id, calculatedValue.toString());
        }
      }
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

      {/* Weight input for gold/silver */}
      {hasWeight && (
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
          {(goldPrice > 0 || silverPrice > 0) && (
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Price: {formatCurrency(category.id === 'gold' ? goldPrice : silverPrice, 'INR')}/gram
            </p>
          )}
        </div>
      )}

      {/* Value input */}
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
