import { useEffect } from 'react';

/**
 * Lightweight SEO hook — sets document title and meta description.
 * Replaces react-helmet-async to avoid crashes with React 18 Suspense + lazy loading.
 */
export default function useSEO({ title, description, noIndex = false }) {
  useEffect(() => {
    // Set title
    if (title) {
      document.title = title;
    }

    // Set meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    // Set robots meta
    if (noIndex) {
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
      }
      robots.content = 'noindex';
    }

    // Cleanup: restore default on unmount
    return () => {
      if (noIndex) {
        const robots = document.querySelector('meta[name="robots"]');
        if (robots) robots.content = 'index, follow';
      }
    };
  }, [title, description, noIndex]);
}
