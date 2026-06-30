import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { LOGO, NAV_LINKS } from "../../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#040a12]/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" data-testid="nav-logo" className="flex items-center gap-2.5">
          <img src={LOGO} alt="RoboFounders logo mark" className="h-9 w-9 object-contain rounded-sm" />
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            Robo<span className="text-[#00e0ef]">Founders</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.replace("#", "")}`}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-testid="nav-cta"
            className="group hidden items-center gap-1.5 rounded-full rf-cyan-gradient px-5 py-2.5 text-sm font-semibold text-[#04222a] transition-all duration-300 hover:rf-glow-strong hover:-translate-y-0.5 sm:inline-flex"
          >
            Get Your Robot COO
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-white/20 bg-white/10 p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#040a12]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-white/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full rf-cyan-gradient px-5 py-3 text-sm font-semibold text-[#04222a]"
            >
              Get Your Robot COO
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
