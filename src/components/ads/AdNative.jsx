/**
 * AdNative Component — Native ad for Results page only
 *
 * Lazy-loads using IntersectionObserver — only loads when scrolled into view.
 * Shows test placeholder in development mode.
 */

import { useEffect, useRef, useState } from 'react';

const isAdsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true';
const isDev = import.meta.env.VITE_AD_ENV === 'development';
const pubId = import.meta.env.VITE_ADSENSE_PUB_ID || '';
const slotId = import.meta.env.VITE_AD_SLOT_NATIVE || '';

export default function AdNative() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isAdsEnabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !isAdsEnabled || isDev) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad failed to load
    }
  }, [isVisible]);

  if (!isAdsEnabled) return null;

  // Development placeholder
  if (isDev) {
    return (
      <div ref={containerRef} className="my-6">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Sponsored</p>
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 
            rounded-xl h-[200px] flex items-center justify-center text-xs text-gray-400 dark:text-gray-500"
          role="complementary"
          aria-label="Sponsored content"
        >
          <span>📢 Native Ad (Test Mode — Results Page)</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="my-6" role="complementary" aria-label="Sponsored content">
      {isVisible && (
        <>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Sponsored</p>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={pubId}
            data-ad-slot={slotId}
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
          />
        </>
      )}
    </div>
  );
}
