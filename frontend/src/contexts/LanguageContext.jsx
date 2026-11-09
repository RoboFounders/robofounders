import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import en from "@/content/en";
import ja from "@/content/ja";
import { getLocale, localizePath } from "@/lib/locale";

const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const { pathname, search, hash } = useLocation();
  const lang = getLocale(pathname);
  const languagePath = (nextLang) => ({
    pathname: localizePath(pathname, nextLang), search, hash,
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LanguageContext.Provider
      value={{ lang, languagePath, t: lang === "ja" ? ja : en }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}
