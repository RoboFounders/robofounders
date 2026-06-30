import { useState } from "react";
import { Reveal, SectionLabel } from "./Reveal";
import { MOMENTUM, NEWS } from "../../data/content";

export default function Updates() {
  const [activeTab, setActiveTab] = useState("events"); // "events" or "news"

  return (
    <section id="news" className="bg-[#f6f9fb] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal className="max-w-xl">
            <SectionLabel>Updates &amp; News</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0a0f1a] sm:text-5xl">
              Fresh from the <span className="rf-text-gradient">global floor.</span>
            </h2>
          </Reveal>

          {/* Premium tabs switcher */}
          <Reveal delay={0.05}>
            <div className="inline-flex rounded-full bg-white p-1.5 border border-[#e4ecf2] shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab("events")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "events"
                    ? "bg-[#4d6bff] text-white shadow-md shadow-indigo-500/20"
                    : "text-[#5b6b7e] hover:text-[#0a0f1a]"
                }`}
              >
                Events Timeline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("news")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "news"
                    ? "bg-[#4d6bff] text-white shadow-md shadow-indigo-500/20"
                    : "text-[#5b6b7e] hover:text-[#0a0f1a]"
                }`}
              >
                Press &amp; News
              </button>
            </div>
          </Reveal>
        </div>

        {/* Tab Content */}
        <div className="mt-14">
          {activeTab === "events" ? (
            <div className="border-l-2 border-[#d6ddff] pl-8 sm:pl-12">
              {MOMENTUM.map((m, i) => (
                <Reveal key={m.title} delay={i * 0.08}>
                  <div data-testid={`momentum-${i}`} className="group relative pb-10 last:pb-0">
                    <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center sm:-left-[57px]">
                      <span className="h-3 w-3 rounded-full rf-cyan-gradient ring-4 ring-[#eef1ff] transition-transform group-hover:scale-125" />
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#0a0f1a] px-3 py-1 text-xs font-semibold text-white">
                        {m.date}
                      </span>
                      <span className="rounded-full border border-[#d6ddff] bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-[#4d6bff]">
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
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
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
          )}
        </div>
      </div>
    </section>
  );
}
