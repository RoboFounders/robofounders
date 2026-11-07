import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router preserves scroll position across route changes, so navigating
// (e.g. Home -> /products) can open the new page scrolled part-way down. This resets
// scroll to the top whenever the pathname changes, so every page opens at the top.
//
// Route-based hash links wait for the new page to mount before scrolling.
export default function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    if (hash) {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Malformed anchors do not break navigation. */
      }
      const target =
        document.getElementById(id) ||
        (id === "press" || id === "news-press"
          ? document.getElementById("news")
          : null);
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    const frame = requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
    return () => {
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname, hash]);

  return null;
}
