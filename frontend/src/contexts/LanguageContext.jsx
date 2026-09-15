import { createContext, useContext, useEffect, useState } from "react";
import en from "@/content/en";
import ja from "@/content/ja";

const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("robofounders-language") === "ja"
        ? "ja"
        : "en";
    } catch {
      return "en";
    }
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("robofounders-language", lang);
    } catch {
      /* Storage can be disabled. */
    }
  }, [lang]);
  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: lang === "ja" ? ja : en }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}
