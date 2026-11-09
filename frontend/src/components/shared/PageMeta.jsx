import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/lib/locale";

const siteUrl = "https://www.robofounders.ai";
const defaultImage = `${siteUrl}/images/home/physical-ai-hero.webp`;

function setMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setPageLink(rel, href, hrefLang) {
  const language = hrefLang ? `[hreflang="${hrefLang}"]` : "";
  let element = document.head.querySelector(`link[rel="${rel}"]${language}`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hrefLang) element.hreflang = hrefLang;
    document.head.appendChild(element);
  }
  element.href = href;
}

export default function PageMeta({
  title,
  description,
  image = defaultImage,
  path,
  noIndex = false,
}) {
  const { t, lang } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    const pageTitle = `${title} | RoboFounders`;
    const pageDescription = description || t.meta.description;
    const pagePath = path || location.pathname;
    const englishUrl = `${siteUrl}${localizePath(pagePath, "en")}`;
    const japaneseUrl = `${siteUrl}${localizePath(pagePath, "ja")}`;
    const canonicalUrl = lang === "ja" ? japaneseUrl : englishUrl;
    const shareImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

    document.title = pageTitle;
    setMeta("name", "description", pageDescription);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", shareImage);
    setMeta("property", "og:locale", lang === "ja" ? "ja_JP" : "en_US");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", shareImage);

    setPageLink("canonical", canonicalUrl);
    if (noIndex) {
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    } else {
      setPageLink("alternate", englishUrl, "en");
      setPageLink("alternate", japaneseUrl, "ja");
      setPageLink("alternate", englishUrl, "x-default");
    }
  }, [title, description, image, path, noIndex, lang, location.pathname, t]);
  return null;
}
