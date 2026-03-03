import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";
import useTranslation from "../../hooks/useTranslation";
import { ASSET_CATEGORIES } from "../../utils/assetTypes";
import { ISLAMIC_GLOSSARY } from "../../utils/zakat";

export default function GlossaryScreen() {
  const { t } = useTranslation();

  useSEO({
    title: "Islamic Terms Glossary — Zakat Calculator",
    description:
      "Understand the Islamic terms used in Zakat calculation: Nisab, Hawl, Madhab, Sadaqah, Ushr, and more.",
  });

  const coreTerms = ISLAMIC_GLOSSARY.filter((t) => t.category === "core");
  const madhabTerms = ISLAMIC_GLOSSARY.filter((t) => t.category === "madhab");
  const relatedTerms = ISLAMIC_GLOSSARY.filter((t) => t.category === "related");

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft className="w-4 h-4" /> {t("glossary.backHome")}
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {t("glossary.title")}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {t("glossary.subtitle")}
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-primary-500 mb-4">
          {t("glossary.coreTerms")}
        </h2>
        <div className="space-y-3">
          {coreTerms.map((term) => (
            <div key={term.term} className="card">
              <h3 className="font-bold text-gray-900 dark:text-white font-arabic text-lg">
                {term.term}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {term.meaning}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-primary-500 mb-4">
          {t("glossary.schoolsOfThought")}
        </h2>
        <div className="space-y-3">
          {madhabTerms.map((term) => (
            <div key={term.term} className="card">
              <h3 className="font-bold text-gray-900 dark:text-white font-arabic text-lg">
                {term.term}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {term.meaning}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-primary-500 mb-4">
          {t("glossary.relatedTerms")}
        </h2>
        <div className="space-y-3">
          {relatedTerms.map((term) => (
            <div key={term.term} className="card">
              <h3 className="font-bold text-gray-900 dark:text-white font-arabic text-lg">
                {term.term}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {term.meaning}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-primary-500 mb-4">
          {t("glossary.assetTerms")}
        </h2>
        <div className="space-y-3">
          {ASSET_CATEGORIES.filter((cat) => cat.islamicTerm).map((cat) => (
            <div key={cat.id} className="card">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t(`asset.${cat.id}.label`)}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white font-arabic">
                {cat.islamicTerm.term}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {t(`asset.${cat.id}.meaning`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
