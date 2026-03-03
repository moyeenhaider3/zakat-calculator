/**
 * useTranslation Hook — Provides t() helper for components
 *
 * Usage:
 *   const { t, language, isRTL } = useTranslation();
 *   <h1>{t('landing.title')}</h1>
 */

import { useCallback } from "react";
import useZakatStore from "../store/zakatStore";
import { isRTL as checkRTL, getTranslation } from "../utils/translations";

export default function useTranslation() {
  const language = useZakatStore((s) => s.language);

  const t = useCallback(
    (key, params) => getTranslation(language, key, params),
    [language],
  );

  return {
    t,
    language,
    isRTL: checkRTL(language),
  };
}
