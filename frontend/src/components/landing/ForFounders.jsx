import { Check, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { MEDIA } from "../../data/content";

const POINTS = [
  "You keep your focus on product, vision and fundraising",
  "We own global sales, partnerships, events and operations",
  "Local human teams + Robot COO across 6 hubs",
  "Performance-driven — we win when you win",
];

export default function ForFounders() {
  return (
    <section
      id="founders"
      className="relative overflow-hidden border-y border-[#e4ecf2] bg-[#040a12] py-24 text-white lg:py-32"
    >
      <div className="absolute inset-0 rf-grid-bg opacity-[0.08]" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#4d6bff]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <SectionLabel className="text-[#6a4dff]">For Startups / Founders</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Stay in the office.{" "}
            <span className="rf-text-gradient">Go global anyway.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            RoboFounders acts as your AI-Powered Robot COO — handling the on-the-ground heavy
            lifting for 3,000+ companies so founders can focus on what only they can do.
          </p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full rf-cyan-gradient text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-base text-white/85">{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            data-testid="founders-cta"
            className="group mt-9 inline-flex items-center gap-2 rounded-full rf-cyan-gradient px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:rf-glow-strong hover:-translate-y-0.5"
          >
            Deploy your Robot COO
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#4d6bff]/20 blur-2xl" />
            <img
              src={MEDIA.robotPortrait}
              alt="Robot COO"
              className="relative h-[480px] w-full rounded-[1.75rem] border border-white/10 object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl rf-chip p-5">
              <p className="font-display text-sm font-bold text-white">Meet &ldquo;Rofi&rdquo;</p>
              <p className="mt-1 text-sm text-white/70">
                Your embodied Robot COO — live at hackathons, exhibitions and the Startup World Cup.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
