import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import useZakatStore from "../../store/zakatStore";
import { ASSET_CATEGORIES } from "../../utils/assetTypes";
import { formatCurrency } from "../../utils/currency";
import { getNisabExplanation, getNisabValue } from "../../utils/nisab";

export default function ReviewStep() {
  const {
    assets,
    deductions,
    currency,
    madhab,
    nisabStandard,
    goldPrice,
    silverPrice,
  } = useZakatStore();
  const { t } = useTranslation();

  // Calculate totals for preview
  const totalAssets = Object.values(assets).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0,
  );
  const totalDeductions =
    (parseFloat(deductions.debts) || 0) +
    (parseFloat(deductions.liabilities) || 0);
  const netWealth = Math.max(0, totalAssets - totalDeductions);
  const nisabValue = getNisabValue(nisabStandard, goldPrice, silverPrice);
  const isLiable = netWealth >= nisabValue;
  const nisabInfo = getNisabExplanation(nisabStandard);

  // Assets with non-zero values
  const filledAssets = ASSET_CATEGORIES.filter((cat) => {
    const val = parseFloat(assets[cat.id]) || 0;
    return val > 0;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-5xl mb-3 block">📋</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("review.title")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {t("review.subtitle")}
        </p>
      </div>

      {/* Settings summary */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          {t("review.settings")}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Madhab</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">
              {madhab}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Nisab Standard
            </span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">
              {nisabStandard} ({nisabInfo.weight})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Nisab Value
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(nisabValue, currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Assets summary */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          {t("review.assets")}
        </h3>
        {filledAssets.length === 0 ? (
          <p className="text-sm text-gray-400 italic">{t("review.noAssets")}</p>
        ) : (
          <div className="space-y-2">
            {filledAssets.map((cat) => (
              <div key={cat.id} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <span>{cat.icon}</span> {t(`asset.${cat.id}.label`)}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(parseFloat(assets[cat.id]), currency)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-700 dark:text-gray-200">
                  {t("review.totalAssets")}
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formatCurrency(totalAssets, currency)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deductions summary */}
      {totalDeductions > 0 && (
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            {t("review.deductions")}
          </h3>
          <div className="space-y-2 text-sm">
            {parseFloat(deductions.debts) > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("review.debts")}
                </span>
                <span className="font-medium text-red-500">
                  - {formatCurrency(parseFloat(deductions.debts), currency)}
                </span>
              </div>
            )}
            {parseFloat(deductions.liabilities) > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("review.liabilitiesLabel")}
                </span>
                <span className="font-medium text-red-500">
                  -{" "}
                  {formatCurrency(parseFloat(deductions.liabilities), currency)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Net wealth and nisab comparison */}
      <div
        className={`card border-2 ${isLiable ? "border-primary-500 bg-primary-50/30 dark:bg-primary-900/20" : "border-gray-300 dark:border-gray-600"}`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t("review.netZakatable")}
          </h3>
          {isLiable ? (
            <FiCheckCircle className="w-5 h-5 text-primary-500" />
          ) : (
            <FiAlertTriangle className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(netWealth, currency)}
        </p>
        <div className="mt-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isLiable ? "bg-primary-500" : "bg-gray-400"}`}
            style={{
              width: `${Math.min(100, (netWealth / (nisabValue || 1)) * 100)}%`,
            }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Nisab: {formatCurrency(nisabValue, currency)} |{" "}
          {isLiable ? t("review.aboveNisab") : t("review.belowNisab")}
        </p>
      </div>

      <p className="text-center text-sm text-gray-400 dark:text-gray-500">
        {t("review.pressCalculate")}
      </p>
    </div>
  );
}
