import {
  FiDownload,
  FiExternalLink,
  FiRefreshCw,
  FiShare2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useSEO from "../../hooks/useSEO";
import useTranslation from "../../hooks/useTranslation";
import useZakatStore from "../../store/zakatStore";
import { formatCurrency } from "../../utils/currency";
import { getGoldKaratBreakdown } from "../../utils/metalPrices";
import { getNisabExplanation } from "../../utils/nisab";
import AdNative from "../ads/AdNative";

const ZAKAT_ORGS = [
  { name: "Zakat Foundation of India", url: "https://zakatindia.org" },
  { name: "Human Welfare Foundation", url: "https://hwfindia.org" },
  { name: "Islamic Relief India", url: "https://islamicrelief.in" },
];

export default function ResultsScreen() {
  const navigate = useNavigate();
  const {
    result,
    currency,
    madhab,
    nisabStandard,
    language,
    resetCalculation,
    goldWeights,
    goldPrice,
  } = useZakatStore();
  const { t } = useTranslation();
  const nisabInfo = getNisabExplanation(nisabStandard);
  const goldKaratBreakdown = getGoldKaratBreakdown(
    goldWeights || {},
    goldPrice || 0,
  );

  useSEO({ title: "Your Zakat Results — Zakat Calculator", noIndex: true });

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {t("results.noCalculation")}
        </p>
        <button onClick={() => navigate("/calculator")} className="btn-primary">
          {t("results.calculateZakat")}
        </button>
      </div>
    );
  }

  const handleRecalculate = () => {
    resetCalculation();
    navigate("/calculator");
  };

  const handleShare = async () => {
    const shareText = result.isLiable
      ? `My Zakat due this year: ${formatCurrency(result.zakatDue, currency)}. Calculate yours at Zakat Calculator!`
      : `I checked my Zakat status using Zakat Calculator. Check yours too!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Zakat Calculator",
          text: shareText,
          url: window.location.origin,
        });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert(t("results.copiedToClipboard"));
    }
  };

  const handleDownloadPDF = async () => {
    const { exportZakatSummary } = await import("../../utils/pdfExport");
    exportZakatSummary(
      result,
      currency,
      madhab,
      nisabStandard,
      goldKaratBreakdown,
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
      {/* Hero Section */}
      <section className="text-center mb-8 animate-fade-in">
        {result.isLiable ? (
          <>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 
              text-primary-600 dark:text-primary-300 rounded-full text-sm font-medium mb-4"
            >
              ✅ {t("results.zakatDue")}
            </div>
            <h1 className="text-lg text-gray-500 dark:text-gray-400 mb-2">
              {t("results.yourZakatDue")}
            </h1>
            <p className="text-5xl sm:text-6xl font-extrabold text-primary-500 mb-2">
              {formatCurrency(result.zakatDue, currency)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("results.percentOfWealth")}
            </p>
          </>
        ) : (
          <>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 
              text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium mb-4"
            >
              🤲 {t("results.notDue")}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t("results.notDueThisYear")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {result.message}
            </p>
          </>
        )}
      </section>

      {/* Nisab Comparison Bar */}
      <section className="card mb-6 animate-slide-up">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          {t("results.nisabComparison")}
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              {t("results.yourNetWealth")}
            </span>
            <span className="font-medium">
              {formatCurrency(result.netZakatable, currency)}
            </span>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                result.isLiable
                  ? "bg-gradient-to-r from-primary-500 to-primary-400"
                  : "bg-gray-400"
              }`}
              style={{
                width: `${Math.min(100, (result.netZakatable / (result.nisabValue || 1)) * 100)}%`,
              }}
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500"
              style={{
                left: `${Math.min(100, (result.nisabValue / Math.max(result.netZakatable, result.nisabValue)) * 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span className="text-red-500">
              Nisab: {formatCurrency(result.nisabValue, currency)}
            </span>
          </div>
        </div>
      </section>

      {/* Breakdown Table */}
      {result.breakdown.length > 0 && (
        <section
          className="card mb-6 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            {t("results.assetBreakdown")}
          </h3>
          <div className="space-y-3">
            {result.breakdown
              .filter((b) => b.amount > 0)
              .map((item) => (
                <div
                  key={item.categoryId}
                  className="py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {t(`asset.${item.categoryId}.label`)}
                      </p>
                      {item.note && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {item.note}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.amount, currency)}
                      </p>
                      <p className="text-xs text-primary-500">
                        Zakat: {formatCurrency(item.zakatAmount, currency)}
                      </p>
                    </div>
                  </div>
                  {/* Per-karat sub-breakdown for gold */}
                  {item.categoryId === "gold" &&
                    goldKaratBreakdown.length > 0 && (
                      <div className="mt-2 ml-2 space-y-1">
                        {goldKaratBreakdown.map(
                          ({ karat, grams, pricePerGram, value }) => (
                            <div
                              key={karat}
                              className="flex justify-between text-xs text-gray-400 dark:text-gray-500"
                            >
                              <span>
                                {karat} · {grams}g @{" "}
                                {formatCurrency(pricePerGram, currency)}/g
                              </span>
                              <span>{formatCurrency(value, currency)}</span>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                </div>
              ))}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-600 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {t("results.totalAssets")}
              </span>
              <span className="font-medium">
                {formatCurrency(result.totalAssets, currency)}
              </span>
            </div>
            {result.totalDeductions > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("results.totalDeductions")}
                </span>
                <span className="font-medium text-red-500">
                  - {formatCurrency(result.totalDeductions, currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-900 dark:text-white">
                {t("results.netZakatable")}
              </span>
              <span className="text-gray-900 dark:text-white">
                {formatCurrency(result.netZakatable, currency)}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Calculation details */}
      <section
        className="card mb-6 animate-slide-up"
        style={{ animationDelay: "0.15s" }}
      >
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          {t("results.calculationDetails")}
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
        </div>
      </section>

      {/* Action buttons */}
      <section
        className="grid grid-cols-3 gap-3 mb-8 animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <button
          onClick={handleDownloadPDF}
          className="btn-primary text-sm py-3 flex flex-col items-center gap-1"
        >
          <FiDownload className="w-5 h-5" />
          <span>PDF</span>
        </button>
        <button
          onClick={handleShare}
          className="btn-secondary text-sm py-3 flex flex-col items-center gap-1"
        >
          <FiShare2 className="w-5 h-5" />
          <span>{t("results.share")}</span>
        </button>
        <button
          onClick={handleRecalculate}
          className="btn-secondary text-sm py-3 flex flex-col items-center gap-1"
        >
          <FiRefreshCw className="w-5 h-5" />
          <span>{t("results.redo")}</span>
        </button>
      </section>

      <AdNative />

      {/* Community Support — first */}
      <section
        className="card mb-6 animate-slide-up border-2 border-primary-200 dark:border-primary-800"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="text-center">
          <span className="text-3xl mb-3 block">💚</span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {t("results.supportCommunity")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed max-w-md mx-auto">
            {t("results.supportDesc")}
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 inline-block mb-3 shadow-sm">
            <img
              src={new URL("../../assets/qr-code.png", import.meta.url).href}
              alt="Scan to support"
              className="w-48 h-48 mx-auto object-contain"
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t("results.scanToPay")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            {t("results.bankDetails")}
          </p>
        </div>
      </section>

      {/* Voluntary Charity */}
      <section
        className="card mb-6 animate-slide-up"
        style={{ animationDelay: "0.35s" }}
      >
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          🤲 {t("results.voluntaryCharity")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {t("results.charityDesc")}
        </p>
        <div className="space-y-2 mb-4">
          {ZAKAT_ORGS.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 
                hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {org.name}
              </span>
              <FiExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          ))}
        </div>
      </section>

      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
        <p>{t("landing.disclaimer")}</p>
      </footer>
    </div>
  );
}
