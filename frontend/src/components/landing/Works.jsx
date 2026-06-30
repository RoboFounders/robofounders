import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { WORKS } from "../../data/content";

export default function Works() {
  return (
    <section id="works" className="bg-[#f6f9fb] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <SectionLabel>Our Works / Case Studies</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0a0f1a] sm:text-5xl">
              Execution you can{" "}
              <span className="rf-text-gradient">point to.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              data-testid="works-cta"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#008f99] transition-colors hover:text-[#0a0f1a]"
            >
              Start your case study
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WORKS.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.12}>
              <div
                data-testid={`work-${i}`}
                className="group h-full overflow-hidden rounded-2xl border border-[#e4ecf2] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:rf-glow"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full rf-chip px-3 py-1 text-xs font-semibold text-white">
                    {w.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#0a0f1a]">{w.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#5b6b7e]">{w.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
