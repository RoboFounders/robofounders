import { Linkedin, Twitter } from "lucide-react";
import { LOGO, NAV_LINKS, CONTACT } from "../../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-[#e4ecf2] bg-[#040a12] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#hero" className="flex items-center gap-2.5">
              <img src={LOGO} alt="RoboFounders" className="h-9 w-9 object-contain" />
              <span className="font-display text-lg font-extrabold tracking-tight">
                Robo<span className="text-[#6a4dff]">Founders</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Your AI-Powered Robot COO for global expansion. We handle on-the-ground execution
              across 6 global hubs so founders can focus on vision and strategy.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              Explore
            </h4>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-[#6a4dff]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              Connect
            </h4>
            <div className="mt-4 flex gap-3">
              <a
                href={CONTACT.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-all hover:border-[#6a4dff] hover:text-[#6a4dff]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-all hover:border-[#6a4dff] hover:text-[#6a4dff]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full rf-cyan-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:rf-glow-strong"
            >
              Get Your Robot COO
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} RoboFounders. Build the future. Go global.
          </p>
          <p className="text-xs text-white/40">
            Japan • Malaysia • United States • ASEAN • Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
}
