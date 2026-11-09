import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/lib/locale";

export default function SiteLink({ to, ...props }) {
  const { lang } = useLanguage();
  const target = typeof to === "string"
    ? localizePath(to, lang)
    : { ...to, pathname: localizePath(to.pathname ?? "", lang) };

  return <Link to={target} {...props} />;
}
