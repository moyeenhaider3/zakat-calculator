import { FiMoon, FiSun } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import useZakatStore from "../../store/zakatStore";
import { SUPPORTED_CURRENCIES } from "../../utils/currency";
import { LANGUAGE_OPTIONS, isRTL } from "../../utils/translations";

export default function TopBar() {
  const {
    currency,
    setCurrency,
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
  } = useZakatStore();
  const { t } = useTranslation();
  const location = useLocation();
  const isWizard = location.pathname === "/calculator";
  const rtl = isRTL(language);

  return (
    <header className="sticky top-0 z-40 glass border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-primary-500 text-lg"
        >
          {rtl ? (
            <>
              <span className="text-2xl">🕌</span>
              <span className="hidden sm:inline">{t("header.zakatCalc")}</span>
            </>
          ) : (
            <>
              <span className="text-2xl">🕌</span>
              <span className="hidden sm:inline">{t("header.zakatCalc")}</span>
            </>
          )}
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Currency selector */}
          {!isWizard && (
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 
                rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-300
                dark:text-gray-200 cursor-pointer"
              aria-label="Select currency"
            >
              {SUPPORTED_CURRENCIES.map(({ code, flag, name }) => (
                <option key={code} value={code}>
                  {flag} {code}
                </option>
              ))}
            </select>
          )}

          {/* Language selector (dropdown) */}
          <select
            value={language}
            onChange={(e) => {
              const next = e.target.value;
              setLanguage(next);
              document.documentElement.dir = isRTL(next) ? "rtl" : "ltr";
              document.documentElement.lang = next;
            }}
            className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 
              rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-300
              dark:text-gray-200 cursor-pointer"
            aria-label="Select language"
          >
            {LANGUAGE_OPTIONS.map(({ code, labelNative }) => (
              <option key={code} value={code}>
                {labelNative}
              </option>
            ))}
          </select>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 
              transition-colors min-h-tap min-w-tap flex items-center justify-center"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 text-accent-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
