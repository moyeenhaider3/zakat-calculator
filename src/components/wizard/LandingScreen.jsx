import {
    FiArrowRight,
    FiBookOpen,
    FiDollarSign,
    FiDownload,
    FiHelpCircle,
    FiShield,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useSEO from "../../hooks/useSEO";
import useTranslation from "../../hooks/useTranslation";
import useZakatStore from "../../store/zakatStore";
import AdInFeed from "../ads/AdInFeed";

const featureKeys = [
  {
    icon: <FiShield className="w-6 h-6" />,
    titleKey: "feature.accurate.title",
    descKey: "feature.accurate.desc",
  },
  {
    icon: <FiDollarSign className="w-6 h-6" />,
    titleKey: "feature.prices.title",
    descKey: "feature.prices.desc",
  },
  {
    icon: <FiDownload className="w-6 h-6" />,
    titleKey: "feature.pdf.title",
    descKey: "feature.pdf.desc",
  },
];

const stepKeys = ["step.1", "step.2", "step.3", "step.4"];

export default function LandingScreen() {
  const navigate = useNavigate();
  const { resetCalculation } = useZakatStore();
  const { t } = useTranslation();

  useSEO({
    title: "Zakat Calculator — Free & Accurate Zakat Calculation",
    description:
      "Calculate your Zakat accurately with our free online calculator. Supports Hanafi & Shafi madhab, live gold/silver prices, 8 currencies, and PDF export.",
  });

  const handleStart = () => {
    resetCalculation();
    navigate("/calculator");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-16">
      {/* Hero Section */}
      <section className="text-center mb-12 animate-fade-in">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 
          text-primary-600 dark:text-primary-300 rounded-full text-sm font-medium mb-6"
        >
          🕌 {t("landing.badge")}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          {t("landing.title")}{" "}
          <span className="text-primary-500">{t("landing.titleCalc")}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 max-w-lg mx-auto">
          {t("landing.tagline")}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {t("landing.zakatMeaning")}
        </p>

        <button
          onClick={handleStart}
          className="btn-primary text-lg px-10 py-4 shadow-lg shadow-primary-500/25 
            hover:shadow-xl hover:shadow-primary-500/30 transition-all group"
        >
          {t("landing.startButton")}
          <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* How It Works */}
      <section
        className="mb-12 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t("landing.howItWorks")}
        </h2>
        <div className="space-y-4">
          {stepKeys.map((key, i) => (
            <div key={key} className="flex items-start gap-4 card">
              <div
                className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full 
                flex items-center justify-center font-bold text-lg"
              >
                {i + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300 pt-1.5">
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad placement — below fold, before features */}
      <AdInFeed />

      {/* Features */}
      <section
        className="mb-12 animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t("landing.features")}
        </h2>
        <div className="grid gap-4">
          {featureKeys.map((f) => (
            <div
              key={f.titleKey}
              className="card flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div
                className="flex-shrink-0 w-12 h-12 bg-primary-50 dark:bg-primary-900/30 
                text-primary-500 rounded-xl flex items-center justify-center"
              >
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t(f.titleKey)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t(f.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More Links */}
      <section
        className="mb-8 animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t("landing.learnAboutZakat")}
        </h2>
        <div className="grid gap-3">
          <Link
            to="/how-to-calculate"
            className="card flex items-center gap-4 hover:shadow-md hover:border-primary-200 
              dark:hover:border-primary-700 transition-all group"
          >
            <div
              className="w-10 h-10 bg-accent-50 dark:bg-accent-900/20 text-accent-500 
              rounded-lg flex items-center justify-center"
            >
              <FiHelpCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t("landing.howToCalculate")}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("landing.stepByStep")}
              </p>
            </div>
            <FiArrowRight className="text-gray-400 group-hover:text-primary-500 transition-colors" />
          </Link>
          <Link
            to="/glossary"
            className="card flex items-center gap-4 hover:shadow-md hover:border-primary-200 
              dark:hover:border-primary-700 transition-all group"
          >
            <div
              className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 text-primary-500 
              rounded-lg flex items-center justify-center"
            >
              <FiBookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t("landing.glossary")}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("landing.glossaryDesc")}
              </p>
            </div>
            <FiArrowRight className="text-gray-400 group-hover:text-primary-500 transition-colors" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="mb-1">{t("landing.disclaimer")}</p>
        <p className="font-arabic text-sm text-primary-500/60">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </footer>
    </div>
  );
}
