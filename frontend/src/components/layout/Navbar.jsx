import { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@/components/shared/SiteLink";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";
import { getPagePath } from "@/lib/locale";
export const navTargets = [
  "/",
  "/#how",
  "/products",
  "/labo",
  "/#solutions",
  "/partnerships",
  "/#news",
  "/#team",
  "/#contact",
];

const navSectionIds = [
  "hero",
  "how",
  "technology",
  "labo",
  "solutions",
  "founders",
  "news",
  "team",
  "contact",
];

export default function Navbar() {
  const { lang, languagePath, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const pathname = getPagePath(location.pathname);
  const { hash } = location;
  const menuButton = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    if (open) document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return undefined;

    if (hash) setActiveSection(hash.slice(1));

    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname, hash]);

  const links = t.nav.map((label, i) => {
    const target = navTargets[i];
    const active =
      (pathname === "/" && activeSection === navSectionIds[i]) ||
      (target !== "/" && pathname === target) ||
      (target === "/products" && pathname.startsWith("/products/"));
    return (
      <Link
        key={target}
        to={target}
        aria-current={active ? "page" : undefined}
        onClick={() => {
          setActiveSection(navSectionIds[i]);
          setOpen(false);
          if (pathname === "/" && target.startsWith("/#")) {
            const targetId = target.slice(2);
            if (targetId === "hero") {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            } else {
              const el = document.getElementById(targetId);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          }
        }}
      >
        {label}
      </Link>
    );
  });
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.ui.skip}
      </a>
      <header className="site-header" data-testid="navbar">
        <div className="header-inner">
          <Link
            to="/"
            className="brand"
            aria-label="RoboFounders"
            data-testid="nav-logo"
            onClick={() => {
              setOpen(false);
              setActiveSection("hero");
              if (pathname === "/") {
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
          <div className="nav-actions">
            <div
              className="language-control"
              role="group"
              aria-label="Language / 言語"
            >
              <RouterLink
                to={languagePath("en")}
                lang="en"
                hrefLang="en"
                data-testid="language-en"
                aria-current={lang === "en" ? "true" : undefined}
              >
                EN
              </RouterLink>
              <span aria-hidden="true">/</span>
              <RouterLink
                to={languagePath("ja")}
                lang="ja"
                hrefLang="ja"
                data-testid="language-ja"
                aria-current={lang === "ja" ? "true" : undefined}
              >
                日本語
              </RouterLink>
            </div>
            <Link to="/#contact" className="nav-contact">
              {t.ui.contact}
              <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              className="menu-toggle"
              ref={menuButton}
              aria-label={open ? t.ui.close : t.ui.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-testid="nav-mobile-toggle"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav className="desktop-nav" aria-label={t.footer.explore}>
          <div className="desktop-nav-inner">{links}</div>
        </nav>
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label={t.footer.explore}
          hidden={!open}
        >
          {links}
        </nav>
      </header>
    </>
  );
}
