import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { contacts, media } from "@/content/media";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactAddressImage from "@/components/shared/ContactAddressImage";
import { navTargets } from "./Navbar";

const socialLinks = [
  ["Facebook", "facebook", Facebook],
  ["X", "x", Twitter],
  ["Instagram", "instagram", Instagram],
  ["YouTube", "youtube", Youtube],
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link
              to="/"
              className="brand footer-brand"
              aria-label="RoboFounders"
              onClick={() => {
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
              }}
            >
              <img
                src={media.logoOnDark}
                alt="RoboFounders"
                width="240"
                height="48"
              />
            </Link>
            <p>{t.footer.tagline}</p>
            <span className="eyebrow">{t.hero.label}</span>
            <ContactAddressImage className="footer-email-image footer-company-email" />
          </div>
          <div>
            <h2>{t.footer.explore}</h2>
            <div className="footer-links">
              {t.nav.map((label, i) => (
                <Link to={navTargets[i]} key={label}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>{t.footer.follow}</h2>
            <div className="footer-social-links">
              {socialLinks.map(([label, contactKey, Icon]) => (
                <a
                  href={contacts[contactKey]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} — RoboFounders`}
                  key={contactKey}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="footer-linkedin-group">
              <p className="footer-social-label">
                <Linkedin size={17} aria-hidden="true" />
                {t.footer.linkedin}
              </p>
              <div className="footer-region-links">
                <a
                  href={contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.footer.linkedinGlobal} <ArrowUpRight size={13} />
                </a>
                <a
                  href={contacts.linkedinJapan}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.footer.linkedinJapan} <ArrowUpRight size={13} />
                </a>
                <a
                  href={contacts.linkedinMalaysia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.footer.linkedinMalaysia} <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} RoboFounders. {t.footer.rights}
          </p>
          <Link to="/privacy">{t.footer.privacy}</Link>
          <p>{t.footer.line}</p>
        </div>
      </div>
    </footer>
  );
}
