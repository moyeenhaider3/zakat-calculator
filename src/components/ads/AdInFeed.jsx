/**
 * AdInFeed Component — Landing page ad
 *
 * Renders below intro text and above CTA on the landing page.
 * Loads with a 1.5s delay to protect LCP score.
 * Shows test placeholder in development mode.
 */

import { useEffect, useState } from "react";

const isAdsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const isDev = import.meta.env.VITE_AD_ENV === "development";
const pubId = import.meta.env.VITE_ADSENSE_PUB_ID || "";
const slotId = import.meta.env.VITE_AD_SLOT_INFEED || "";

export default function AdInFeed() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isAdsEnabled) return;

    // Delay render by 1.5s to protect LCP
    const timer = setTimeout(() => setShouldRender(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldRender || !isAdsEnabled || isDev) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad failed
    }
  }, [shouldRender]);

  if (!isAdsEnabled || !shouldRender) return null;

  // Development placeholder
  if (isDev) {
    return (
      <div className="my-6">
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 
            rounded-xl h-[120px] flex items-center justify-center text-xs text-gray-400 dark:text-gray-500"
          role="complementary"
          aria-label="Advertisement"
        >
          <span>📢 In-Feed Ad (Test Mode — Landing Page)</span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6" role="complementary" aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={pubId}
        data-ad-slot={slotId}
        data-ad-format="fluid"
        data-ad-layout-key="-hi+d-3-4b+7w"
      />
    </div>
  );
}
