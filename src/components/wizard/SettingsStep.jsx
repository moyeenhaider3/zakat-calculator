import { FiInfo } from "react-icons/fi";
import useTranslation from "../../hooks/useTranslation";
import useZakatStore from "../../store/zakatStore";
import { SUPPORTED_CURRENCIES } from "../../utils/currency";
import { getNisabExplanation } from "../../utils/nisab";

export default function SettingsStep() {
  const {
    madhab,
    setMadhab,
    nisabStandard,
    setNisabStandard,
    currency,
    setCurrency,
  } = useZakatStore();
  const { t } = useTranslation();
  const nisabInfo = getNisabExplanation(nisabStandard);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-5xl mb-3 block">⚙️</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("settings.title")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {t("settings.subtitle")}
        </p>
      </div>

      {/* Madhab Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {t("settings.madhab")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              value: "hanafi",
              labelKey: "settings.hanafi",
              descKey: "settings.hanafiDesc",
            },
            {
              value: "shafi",
              labelKey: "settings.shafi",
              descKey: "settings.shafiDesc",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setMadhab(option.value)}
              className={`card text-center py-4 cursor-pointer transition-all
                ${
                  madhab === option.value
                    ? "ring-2 ring-primary-500 border-primary-500 bg-primary-50/50 dark:bg-primary-900/20"
                    : "hover:border-gray-300 dark:hover:border-gray-600"
                }`}
            >
              <p className="font-bold text-gray-900 dark:text-white">
                {t(option.labelKey)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t(option.descKey)}
              </p>
            </button>
          ))}
        </div>
        <div className="card bg-primary-50/50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800/30">
          <div className="flex items-start gap-2">
            <FiInfo className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary-600 dark:text-primary-400">
              <strong>Madhab (مذهب)</strong> — {t("settings.madhabInfo")}
            </p>
          </div>
        </div>
      </div>

      {/* Nisab Standard */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {t("settings.nisabStandard")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "silver", labelKey: "settings.silver", icon: "🥈" },
            { value: "gold", labelKey: "settings.gold", icon: "🪙" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setNisabStandard(option.value)}
              className={`card text-center py-4 cursor-pointer transition-all
                ${
                  nisabStandard === option.value
                    ? "ring-2 ring-primary-500 border-primary-500 bg-primary-50/50 dark:bg-primary-900/20"
                    : "hover:border-gray-300 dark:hover:border-gray-600"
                }`}
            >
              <span className="text-2xl">{option.icon}</span>
              <p className="font-bold text-gray-900 dark:text-white mt-1">
                {t(option.labelKey)}
              </p>
            </button>
          ))}
        </div>
        <div className="card bg-accent-50/50 dark:bg-accent-900/10 border-accent-100 dark:border-accent-800/20">
          <div className="flex items-start gap-2">
            <FiInfo className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-accent-700 dark:text-accent-300">
                <strong>Nisab (نصاب)</strong> — {nisabInfo.description}
              </p>
              <p className="text-xs text-accent-600/70 dark:text-accent-400/70 mt-1">
                Weight: {nisabInfo.weight}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Currency */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {t("settings.currency")}
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="input-field"
          aria-label="Select currency"
        >
          {SUPPORTED_CURRENCIES.map(({ code, flag, name }) => (
            <option key={code} value={code}>
              {flag} {code} — {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
