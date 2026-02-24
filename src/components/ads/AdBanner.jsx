/**
 * AdBanner Component — Bottom banner ad
 *
 * Shows Google AdSense banner on non-wizard pages.
 * In development mode (VITE_AD_ENV=development), shows a test placeholder.
 * Toggle with VITE_ADS_ENABLED env variable.
 */

import { useEffect, useRef, useState } from 'react';

const isAdsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true';
const isDev = import.meta.env.VITE_AD_ENV === 'development';
const pubId = import.meta.env.VITE_ADSENSE_PUB_ID || '';
const slotId = import.meta.env.VITE_AD_SLOT_BANNER || '';

export default function AdBanner() {
  const adRef = useRef(null);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (!isAdsEnabled || isDev) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setAdFailed(true);
    }
  }, []);

  if (!isAdsEnabled) return null;

  // Development placeholder
  if (isDev) {
    return (
      <div
        className="mx-4 my-3 border-2 border-dashed border-gray-300 dark:border-gray-600 
          rounded-xl h-[60px] flex items-center justify-center text-xs text-gray-400 dark:text-gray-500"
        role="complementary"
        aria-label="Advertisement"
      >
        <span>📢 Ad Banner (Test Mode — 320×50)</span>
      </div>
    );
  }

  if (adFailed) return null;

  return (
    <div role="complementary" aria-label="Advertisement" className="mx-4 my-3">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', height: '50px' }}
        data-ad-client={pubId}
        data-ad-slot={slotId}
        data-ad-format="banner"
      />
    </div>
  );
}
