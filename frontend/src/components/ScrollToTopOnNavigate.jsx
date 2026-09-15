import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router preserves scroll position across route changes, so navigating
// (e.g. Home -> /products) can open the new page scrolled part-way down. This resets
// scroll to the top whenever the pathname changes, so every page opens at the top.
//
// Route-based hash links wait for the new page to mount before scrolling.
export default function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        let id = hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {
          /* Malformed anchors do not break navigation. */
        }
        const target = document.getElementById(id);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
