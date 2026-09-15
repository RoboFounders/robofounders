import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { contacts, media } from "@/content/media";
import { useLanguage } from "@/contexts/LanguageContext";
import { navTargets } from "./Navbar";
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand">
              <img src={media.logoOnDark} alt="" width="40" height="40" />
              <span>RoboFounders</span>
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
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
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
