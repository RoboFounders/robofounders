// Nav link helpers shared by Navbar and Footer.
//
// NAV_LINKS mixes two kinds of targets:
//   - route links  (href starts with "/", e.g. "/news")  -> react-router <Link>
//   - hash links   (href starts with "#", e.g. "#how")    -> in-page anchors
//
// Hash links only scroll correctly while on the landing route ("/"). From any
// other route they must first jump back to "/", so we prefix them with "/".

export const isRouteHref = (href = "") => href.startsWith("/");

export const resolveHashHref = (href, isHome) => (isHome ? href : `/${href}`);

// Build a stable data-testid suffix from a nav href ("#how" -> "how",
// "/news" -> "news").
export const navTestId = (href = "") => href.replace(/^[#/]+/, "") || "home";
