const japanesePrefix = /^\/ja(?=\/|$)/i;

export function getLocale(pathname) {
  return japanesePrefix.test(pathname) ? "ja" : "en";
}

export function getPagePath(pathname) {
  return pathname.replace(japanesePrefix, "") || "/";
}

export function localizePath(pathname, lang) {
  if (!pathname.startsWith("/")) return pathname;
  const pagePath = getPagePath(pathname);
  return lang === "ja" ? `/ja${pagePath}` : pagePath;
}
