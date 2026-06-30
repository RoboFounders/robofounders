import { Reveal, SectionLabel } from "./Reveal";
import { MOMENTUM } from "../../data/content";

export default function Momentum() {
  return (
    <section id="momentum" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <SectionLabel>Events &amp; Momentum</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0a0f1a] sm:text-5xl">
            Where the Robot COO is{" "}
            <span className="rf-text-gradient">showing up next.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5b6b7e]">
            We don&apos;t just advise from a deck — we&apos;re on stage, on the floor, and in the
            room across the world&apos;s most important startup ecosystems.
          </p>
        </Reveal>

        <div className="mt-14 border-l-2 border-[#cdeef2] pl-8 sm:pl-12">
          {MOMENTUM.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div data-testid={`momentum-${i}`} className="group relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center sm:-left-[57px]">
                  <span className="h-3 w-3 rounded-full rf-cyan-gradient ring-4 ring-[#e6fbfd] transition-transform group-hover:scale-125" />
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#0a0f1a] px-3 py-1 text-xs font-semibold text-white">
                    {m.date}
                  </span>
                  <span className="rounded-full border border-[#cdeef2] bg-[#e6fbfd] px-3 py-1 text-xs font-semibold text-[#008f99]">
                    {m.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-[#0a0f1a] sm:text-2xl">
                  {m.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#5b6b7e]">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
