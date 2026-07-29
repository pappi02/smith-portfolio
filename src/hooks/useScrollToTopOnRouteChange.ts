import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top whenever the route changes.
 * Useful because many UIs keep the previous scroll position when navigating via SPA.
 */
export function useScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    // Use rAF twice to ensure layout/paint has occurred before scrolling.
    // This prevents the scroll from landing mid-page on slower renders.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });

      });
    });
  }, [location.pathname, location.search, location.hash]);
}

