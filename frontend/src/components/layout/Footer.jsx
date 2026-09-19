import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { contacts, media } from "@/content/media";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactAddressImage from "@/components/shared/ContactAddressImage";
import { navTargets } from "./Navbar";
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
            <h2>{t.footer.connect}</h2>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={contacts.x} target="_blank" rel="noopener noreferrer">
              X <ArrowUpRight size={14} />
            </a>
            <ContactAddressImage className="footer-email-image" />
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
