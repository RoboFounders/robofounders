import { Reveal, SectionLabel } from "./Reveal";
import { STEPS } from "../../data/content";

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute inset-0 rf-grid-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <SectionLabel>Your Global Expansion, Powered by Robot COO</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0a0f1a] sm:text-5xl">
            Three moves from local startup to{" "}
            <span className="rf-text-gradient">global operator.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5b6b7e]">
            Zero (or low) upfront hassle for founders. RoboFounders takes on execution risk with
            AI + robotics + local teams, so you focus on vision while we handle the ground game.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div
                data-testid={`step-${s.n}`}
                className="group relative h-full overflow-hidden rounded-2xl border border-[#e4ecf2] bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b9c2ff] hover:rf-glow"
              >
                <div className="pointer-events-none absolute -right-6 -top-8 font-display text-[120px] font-black leading-none text-[#eef1ff] transition-colors group-hover:text-[#d6ddff]">
                  {s.n}
                </div>
                <div className="relative">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4d6bff]">
                    {s.kicker}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[#0a0f1a]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#5b6b7e]">{s.body}</p>
                </div>
                <div className="relative mt-8 h-1 w-12 rounded-full rf-cyan-gradient transition-all duration-300 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
