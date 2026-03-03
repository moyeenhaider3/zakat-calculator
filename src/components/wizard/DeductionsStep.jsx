import { FiInfo } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import useZakatStore from "../../store/zakatStore";
import { getCurrencyInfo } from "../../utils/currency";

export default function DeductionsStep() {
  const { deductions, setDeduction, currency } = useZakatStore();
  const { t } = useTranslation();
  const currencyInfo = getCurrencyInfo(currency);

  const handleChange = (type, e) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setDeduction(type, val);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-5xl mb-3 block">📝</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("deductions.title")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          {t("deductions.subtitle")}
        </p>
      </div>

      {/* Islamic context */}
      <div className="card bg-primary-50/50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800/30">
        <div className="flex items-start gap-3">
          <FiInfo className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-primary-700 dark:text-primary-300 text-sm font-arabic">
              {t("deductions.daynTitle")}
            </p>
            <p className="text-sm text-primary-600/80 dark:text-primary-400/80 mt-1">
              {t("deductions.islamicContext")}
            </p>
          </div>
        </div>
      </div>

      {/* Debts */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t("deductions.debts")}
        </label>
        <div className="relative" dir="ltr">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
            {currencyInfo?.symbol || "$"}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={deductions.debts || ""}
            onChange={(e) => handleChange("debts", e)}
            placeholder="0"
            className="input-field pl-10 text-xl font-semibold text-center"
            min="0"
            aria-label="Debts amount"
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {t("deductions.debtsHint")}
        </p>
      </div>

      {/* Liabilities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t("deductions.liabilities")}
        </label>
        <div className="relative" dir="ltr">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
            {currencyInfo?.symbol || "$"}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={deductions.liabilities || ""}
            onChange={(e) => handleChange("liabilities", e)}
            placeholder="0"
            className="input-field pl-10 text-xl font-semibold text-center"
            min="0"
            aria-label="Liabilities amount"
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {t("deductions.liabilitiesHint")}
        </p>
      </div>
    </div>
  );
}
