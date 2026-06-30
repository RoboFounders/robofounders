import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#040a12]"
    >
      <img
        src="/images/hero-bg.jpeg"
        alt="RoboFounders Robot COO"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#040a12]/90 via-[#040a12]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040a12]/30 via-transparent to-[#040a12]/60" />

      <div className="relative flex h-full max-w-7xl flex-col justify-center px-8 lg:px-16">
        <div className="max-w-xl">
          <span className="mb-6 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Robot COO
          </span>

          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your Robot COO<br />
            <span className="text-[#00e0ef]">is Here</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
            Meet the AI-powered operator built to run your global expansion — robotics, AI and local human teams, all in one.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00e0ef] px-7 py-3.5 text-sm font-semibold text-[#04222a] transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,224,239,0.4)]"
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
