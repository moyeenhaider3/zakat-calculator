import { FiInfo } from 'react-icons/fi';
import useZakatStore from '../../store/zakatStore';
import { getCurrencyInfo } from '../../utils/currency';

export default function DeductionsStep() {
  const { deductions, setDeduction, currency, language } = useZakatStore();
  const isHindi = language === 'hi';
  const currencyInfo = getCurrencyInfo(currency);

  const handleChange = (type, e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setDeduction(type, val);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-5xl mb-3 block">📝</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isHindi ? 'कटौतियाँ' : 'Deductions'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          {isHindi
            ? 'अपने कर्ज़ और देनदारियाँ दर्ज करें — ये आपकी ज़कात योग्य संपत्ति से घटाई जाएँगी'
            : 'Enter your debts and liabilities — these are subtracted from your Zakatable wealth'}
        </p>
      </div>

      {/* Islamic context */}
      <div className="card bg-primary-50/50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800/30">
        <div className="flex items-start gap-3">
          <FiInfo className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-primary-700 dark:text-primary-300 text-sm font-arabic">
              Dayn (دين) — Debt
            </p>
            <p className="text-sm text-primary-600/80 dark:text-primary-400/80 mt-1">
              {isHindi
                ? 'इस्लाम में, कर्ज़ आपकी ज़कात योग्य संपत्ति से पहले काटा जाता है। केवल वही कर्ज़ शामिल करें जो तुरंत देय हैं या इस साल चुकाने हैं।'
                : 'In Islam, debts are deducted before calculating Zakat. Include only debts that are immediately due or payable this year.'}
            </p>
          </div>
        </div>
      </div>

      {/* Debts */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isHindi ? 'कर्ज़ (जो आप पर बकाया हैं)' : 'Debts (money you owe others)'}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
            {currencyInfo?.symbol || '₹'}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={deductions.debts || ''}
            onChange={(e) => handleChange('debts', e)}
            placeholder="0"
            className="input-field pl-10 text-xl font-semibold text-center"
            min="0"
            aria-label="Debts amount"
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {isHindi
            ? 'व्यक्तिगत ऋण, क्रेडिट कार्ड बकाया, EMI किस्तें'
            : 'Personal loans, credit card balances, EMI installments'}
        </p>
      </div>

      {/* Liabilities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isHindi ? 'तत्काल देनदारियाँ' : 'Immediate Liabilities'}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
            {currencyInfo?.symbol || '₹'}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={deductions.liabilities || ''}
            onChange={(e) => handleChange('liabilities', e)}
            placeholder="0"
            className="input-field pl-10 text-xl font-semibold text-center"
            min="0"
            aria-label="Liabilities amount"
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {isHindi
            ? 'तत्काल बिल, किराया, वेतन देय'
            : 'Immediate bills, rent due, wages payable'}
        </p>
      </div>
    </div>
  );
}
