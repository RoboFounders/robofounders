import { Reveal, SectionLabel } from "./Reveal";
import { NEWS } from "../../data/content";

export default function News() {
  return (
    <section id="news" className="bg-[#f6f9fb] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <SectionLabel>News &amp; Momentum</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0a0f1a] sm:text-5xl">
            Fresh from the{" "}
            <span className="rf-text-gradient">global floor.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.1}>
              <article
                data-testid={`news-${i}`}
                className="group flex h-full flex-col rounded-2xl border border-[#e4ecf2] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b9c2ff] hover:rf-glow"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4d6bff]">
                  {n.date}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#0a0f1a]">{n.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[#5b6b7e]">{n.body}</p>
                <span className="mt-5 inline-block h-1 w-10 rounded-full rf-cyan-gradient transition-all duration-300 group-hover:w-16" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
