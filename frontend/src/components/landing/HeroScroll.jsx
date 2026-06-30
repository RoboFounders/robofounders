import { ArrowUpRight, ChevronDown, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(110% 120% at 78% 45%, #1c2576 0%, #11144a 42%, #070a22 100%)",
      }}
    >
      {/* Robot image anchored right at natural size, sitting fully below the navbar (top-16). Its left edge
          fades into the dark background via a mask so there's no hard seam — no zoom, head stays below nav. */}
      <img
        src="/images/hero-bg.jpeg"
        alt="RoboFounders Robot COO"
        className="absolute right-0 top-16 h-[calc(100%-4rem)] w-auto"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 22%)",
        }}
      />

      {/* Left readability gradient so the headline text stays legible */}
      <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#070a22]/85 via-[#0c1147]/35 to-transparent" />

      <div className="relative flex h-full max-w-7xl flex-col justify-center px-8 lg:px-16">
        <div className="max-w-xl">
          <span className="mb-6 inline-block rounded-full border border-[#6478ff]/40 bg-[#6478ff]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#aeb9ff]">
            Robot COO
          </span>

          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your Robot COO<br />
            <span className="text-[#8a9bff]">is Here</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
            Meet the AI-powered operator built to run your global expansion, robotics, AI and local human teams, all in one.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 rounded-full bg-[#4d6bff] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(77,107,255,0.45)]"
            >
              Get Your Robot COO
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#how"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>

      {/* Floating badge near the star — bottom right */}
      <div className="absolute bottom-24 right-12 hidden lg:flex flex-col items-end gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-md">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5b6cff]/20">
            <Zap className="h-4 w-4 text-[#8a9bff]" />
          </span>
          <div>
            <p className="text-xs font-semibold text-[#8a9bff]">24/7 Active</p>
            <p className="text-[11px] text-white/60">Robot COO, Rofi</p>
          </div>
          <span className="ml-1 h-2 w-2 rounded-full bg-[#5b6cff] animate-pulse" />
        </div>
        <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
          <div className="text-center">
            <p className="text-base font-extrabold text-white">6</p>
            <p className="text-[10px] text-white/50">Global Hubs</p>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-base font-extrabold text-white">3,000+</p>
            <p className="text-[10px] text-white/50">Companies</p>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-base font-extrabold text-white">4</p>
            <p className="text-[10px] text-white/50">IPOs</p>
          </div>
        </div>
      </div>

      <a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
