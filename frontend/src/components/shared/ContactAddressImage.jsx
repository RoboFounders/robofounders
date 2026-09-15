import { media } from "@/content/media";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactAddressImage({
  tone = "light",
  className = "",
}) {
  const { t } = useLanguage();
  const source =
    tone === "dark"
      ? media.contactAddressDark
      : media.contactAddressLight;

  return (
    <img
      className={`contact-address-image ${className}`.trim()}
      src={source}
      alt={t.contact.emailImageAlt}
      width="345"
      height="46"
      loading="lazy"
      decoding="async"
    />
  );
}
