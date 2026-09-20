import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";
export const navTargets = [
  "/",
  "/#how",
  "/products",
  "/#works",
  "/#founders",
  "/#news",
  "/#founder",
  "/#contact",
];

const navSectionIds = [
  "hero",
  "how",
  "technology",
  "works",
  "founders",
  "news",
  "founder",
  "contact",
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { pathname, hash } = useLocation();
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
    const active =
      i === 2
        ? pathname.startsWith("/products") ||
          (pathname === "/" && activeSection === navSectionIds[i])
        : pathname === "/" && activeSection === navSectionIds[i];
    return (
      <Link
        key={navTargets[i]}
        to={navTargets[i]}
        aria-current={active ? "page" : undefined}
        onClick={() => {
          setActiveSection(navSectionIds[i]);
          setOpen(false);
          if (pathname === "/" && navTargets[i].startsWith("/#")) {
            const targetId = navTargets[i].replace("/#", "");
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
              <button
                type="button"
                lang="en"
                data-testid="language-en"
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                lang="ja"
                data-testid="language-ja"
                aria-pressed={lang === "ja"}
                onClick={() => setLang("ja")}
              >
                日本語
              </button>
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
