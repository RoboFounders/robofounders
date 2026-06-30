import { Reveal } from "./Reveal";
import { STATS } from "../../data/content";

export default function StatsBar() {
  return (
    <section id="stats" className="border-y border-[#e4ecf2] bg-[#f6f9fb]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-10 sm:grid-cols-4 lg:py-14">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <div
              data-testid={`stat-${i}`}
              className="font-display text-4xl font-extrabold tracking-tight text-[#0a0f1a] sm:text-5xl"
            >
              <span className="rf-text-gradient">{s.value}</span>
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5b6b7e]">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
