import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

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
    const canonicalUrl = `${siteUrl}${path || location.pathname}`;
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

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, image, path, noIndex, lang, location.pathname, t]);
  return null;
}
