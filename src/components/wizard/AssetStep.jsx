import { useState } from "react";
import { FiEdit2, FiInfo, FiRefreshCw, FiX } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import useZakatStore from "../../store/zakatStore";
import { formatCurrency, getCurrencyInfo } from "../../utils/currency";
import {
    KARAT_PURITY,
    calculateGoldValue,
    calculateMetalValue,
    gramsToTola,
    tolaToGrams,
} from "../../utils/metalPrices";

const KARATS = ["24K", "22K", "18K"];

// ─── Price Edit Dialog ────────────────────────────────────────────────────────

function PriceEditDialog({
  metal,
  currentPrice,
  hasOverride,
  onSave,
  onReset,
  onClose,
}) {
  const [value, setValue] = useState(
    currentPrice ? Math.round(currentPrice).toString() : "",
  );
  const { t } = useTranslation();
  const metalLabel =
    metal === "gold" ? t("asset.goldMetal") : t("asset.silverMetal");

  const handleSave = () => {
    const price = parseFloat(value);
    if (!price || price <= 0) return;
    onSave(price);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5 animate-slide-up"
        dir="ltr"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("asset.setPrice", { metal: metalLabel })}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("asset.pricePerGram")} (
            {getCurrencyInfo(useZakatStore.getState().currency)?.symbol || "$"})
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
              {getCurrencyInfo(useZakatStore.getState().currency)?.symbol ||
                "$"}
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 7500"
              className="input-field pl-10 text-lg font-semibold"
              min="1"
              step="1"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {t("asset.currentPrice")}{" "}
            {currentPrice
              ? `${formatCurrency(currentPrice, useZakatStore.getState().currency)}/g`
              : "—"}
            {hasOverride && (
              <span className="ms-2 text-amber-500 font-medium">
                ● {t("asset.manualOverride")}
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={!parseFloat(value) || parseFloat(value) <= 0}
            className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("asset.savePrice")}
          </button>
          {hasOverride && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
              {t("asset.resetPrice")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Multi-karat gold input ───────────────────────────────────────────────────

function GoldWeightInput({ goldPrice, currency, language }) {
  const {
    goldWeights,
    setGoldWeight,
    setAsset,
    priceOverrides,
    setPriceOverride,
  } = useZakatStore();
  const { t } = useTranslation();
  const [tolaDisplay, setTolaDisplay] = useState({
    "24K": "",
    "22K": "",
    "18K": "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const hasOverride = !!priceOverrides?.[currency]?.gold;

  const handleGramsChange = (karat, val) => {
    if (val !== "" && !/^\d*\.?\d*$/.test(val)) return;
    setGoldWeight(karat, val);
    // Update tola display
    setTolaDisplay((prev) => ({
      ...prev,
      [karat]:
        val && parseFloat(val) > 0
          ? gramsToTola(parseFloat(val)).toFixed(3)
          : "",
    }));
    // Update combined asset value
    const updated = { ...goldWeights, [karat]: val };
    const total = calculateGoldValue(updated, goldPrice);
    if (total > 0) setAsset("gold", total.toString());
  };

  const handleTolaChange = (karat, val) => {
    if (val !== "" && !/^\d*\.?\d*$/.test(val)) return;
    setTolaDisplay((prev) => ({ ...prev, [karat]: val }));
    const grams =
      val && parseFloat(val) > 0 ? tolaToGrams(parseFloat(val)) : "";
    setGoldWeight(karat, grams.toString());
    const updated = { ...goldWeights, [karat]: grams.toString() };
    const total = calculateGoldValue(updated, goldPrice);
    if (total > 0) setAsset("gold", total.toString());
  };

  const totalValue = calculateGoldValue(goldWeights, goldPrice);
  const currencyInfo = getCurrencyInfo(currency);
  const symbol = currencyInfo?.symbol || "$";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("asset.enterWeightByKarat")}
      </label>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 dark:text-gray-500 text-center font-medium px-1">
        <span>{t("asset.karat")}</span>
        <span>{t("asset.grams")}</span>
        <span>{t("asset.tola")}</span>
      </div>

      {/* One row per karat */}
      {KARATS.map((karat) => (
        <div key={karat} className="grid grid-cols-3 gap-2 items-center">
          {/* Karat label */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
              {karat}
            </span>
            <span className="text-xs text-gray-400">
              {Math.round(KARAT_PURITY[karat] * 1000) / 10}%
            </span>
          </div>
          {/* Grams */}
          <input
            type="number"
            inputMode="decimal"
            value={goldWeights[karat] ?? ""}
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
            value={tolaDisplay[karat] ?? ""}
            onChange={(e) => handleTolaChange(karat, e.target.value)}
            placeholder="0"
            className="input-field text-center text-sm"
            min="0"
            step="0.001"
          />
        </div>
      ))}

      {/* Price row + pencil icon */}
      <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-1">
        {goldPrice > 0 && (
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              24K: {formatCurrency(goldPrice, currency)}/g
              {" · "}
              22K: {formatCurrency(Math.round(goldPrice * 0.916), currency)}/g
              {" · "}
              18K: {formatCurrency(Math.round(goldPrice * 0.75), currency)}/g
              {hasOverride && <span className="ml-1 text-amber-500"> ●</span>}
            </p>
            <button
              onClick={() => setShowDialog(true)}
              className="text-gray-400 hover:text-primary-500 transition-colors flex-shrink-0"
              title="Edit price manually"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        {totalValue > 0 && (
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 text-center">
            {t("asset.total")} {formatCurrency(totalValue, currency)}
          </p>
        )}

        {/* Verify hint */}
        <div className="flex items-start gap-2 mt-1 px-1 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
          <FiInfo className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            {t("asset.verifyGold")}
          </p>
        </div>
      </div>

      {/* Price edit dialog */}
      {showDialog && (
        <PriceEditDialog
          metal="gold"
          currentPrice={goldPrice}
          hasOverride={hasOverride}
          onClose={() => setShowDialog(false)}
          onSave={(price) => {
            setPriceOverride("gold", price);
            setShowDialog(false);
          }}
          onReset={() => {
            setPriceOverride("gold", null);
            setShowDialog(false);
          }}
        />
      )}
    </div>
  );
}

// ─── Silver / generic weight input ───────────────────────────────────────────

function WeightInput({
  category,
  goldPrice,
  silverPrice,
  setAsset,
  setWeight,
  language,
  weights,
  currency,
}) {
  const { priceOverrides, setPriceOverride } = useZakatStore();
  const { t } = useTranslation();
  const weightValue = weights[category.id] || "";
  const isSilver = category.id === "silver";
  const price = isSilver ? silverPrice : goldPrice;
  const [showDialog, setShowDialog] = useState(false);
  const hasOverride = isSilver
    ? !!priceOverrides?.[currency]?.silver
    : !!priceOverrides?.[currency]?.gold;

  const handleWeightChange = (e, unit) => {
    const val = e.target.value;
    if (val !== "" && !/^\d*\.?\d*$/.test(val)) return;
    let grams = val;
    if (unit === "tola") {
      grams = val ? tolaToGrams(parseFloat(val)).toString() : "";
    }
    setWeight(category.id, grams);
    if (grams && parseFloat(grams) > 0 && price > 0) {
      setAsset(
        category.id,
        calculateMetalValue(parseFloat(grams), price).toString(),
      );
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("asset.enterWeight")}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t("asset.grams")}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={weightValue}
            onChange={(e) => handleWeightChange(e, "grams")}
            placeholder="0"
            className="input-field text-center"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t("asset.tola")}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={
              weightValue ? gramsToTola(parseFloat(weightValue)).toFixed(3) : ""
            }
            onChange={(e) => handleWeightChange(e, "tola")}
            placeholder="0"
            className="input-field text-center"
            min="0"
            step="0.001"
          />
        </div>
      </div>
      {price > 0 && (
        <div className="flex items-center justify-center gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            {formatCurrency(price, currency)}/gram
            {hasOverride && <span className="ml-1 text-amber-500"> ●</span>}
          </p>
          <button
            onClick={() => setShowDialog(true)}
            className="text-gray-400 hover:text-primary-500 transition-colors flex-shrink-0"
            title="Edit price manually"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Price edit dialog */}
      {showDialog && (
        <PriceEditDialog
          metal={isSilver ? "silver" : "gold"}
          currentPrice={price}
          hasOverride={hasOverride}
          onClose={() => setShowDialog(false)}
          onSave={(newPrice) => {
            setPriceOverride(isSilver ? "silver" : "gold", newPrice);
            setShowDialog(false);
          }}
          onReset={() => {
            if (isSilver) {
              setPriceOverride("silver", null);
            } else {
              setPriceOverride("gold", null);
            }
            setShowDialog(false);
          }}
        />
      )}

      {/* Verify hint — shown for silver */}
      {isSilver && price > 0 && (
        <div className="flex items-start gap-2 px-1 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
          <FiInfo className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            {t("asset.verifySilver")}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssetStep({ category }) {
  const {
    assets,
    weights,
    setAsset,
    setWeight,
    currency,
    goldPrice,
    silverPrice,
    language,
  } = useZakatStore();
  const { t } = useTranslation();
  const value = assets[category.id] || "";
  const currencyInfo = getCurrencyInfo(currency);
  const isGold = category.id === "gold";

  const handleValueChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setAsset(category.id, val);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category header */}
      <div className="text-center">
        <span className="text-5xl mb-3 block">{category.icon}</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t(`asset.${category.id}.label`)}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          {t(`asset.${category.id}.description`)}
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
                {t(`asset.${category.id}.meaning`)}
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
          currency={currency}
        />
      ) : null}

      {/* Value input — hidden for gold (auto-calculated), shown for all others */}
      {!isGold && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("asset.enterValue")} ({currencyInfo?.symbol || "$"})
          </label>
          <div className="relative" dir="ltr">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg font-medium">
              {currencyInfo?.symbol || "$"}
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
              aria-label={`${t(`asset.${category.id}.label`)} value`}
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
            {t("asset.notApplicable")}
          </p>
        </div>
      )}

      {/* Category-specific notes */}
      {category.notes && (
        <div className="card bg-accent-50/50 dark:bg-accent-900/10 border-accent-100 dark:border-accent-800/20">
          <p className="text-sm text-accent-700 dark:text-accent-300">
            💡 {t(`asset.${category.id}.notes`)}
          </p>
        </div>
      )}
    </div>
  );
}
