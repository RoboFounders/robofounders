import * as Icons from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { VALUES, MEDIA } from "../../data/content";

export default function ValueProp() {
  return (
    <section id="value" className="bg-[#f6f9fb] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Key Value Proposition</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0a0f1a] sm:text-5xl">
              One partner for everything that happens{" "}
              <span className="rf-text-gradient">on the ground.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[#5b6b7e]">
              From sales and partnerships to live robot demos at flagship events, RoboFounders
              combines embodied AI with local human expertise across Japan, the US, Malaysia and
              ASEAN.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => {
            const Icon = Icons[v.icon] || Icons.Sparkles;
            return (
              <Reveal key={v.title} delay={(i % 3) * 0.1}>
                <div
                  data-testid={`value-${i}`}
                  className="group flex h-full flex-col rounded-2xl border border-[#e4ecf2] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b9c2ff] hover:rf-glow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef1ff] text-[#4d6bff] transition-all duration-300 group-hover:rf-cyan-gradient group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[#0a0f1a]">{v.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#5b6b7e]">{v.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-[#e4ecf2]">
            <img
              src={MEDIA.network}
              alt="Global robotics network"
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04141a]/80 via-[#04141a]/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14">
              <p className="max-w-lg font-display text-2xl font-bold text-white sm:text-3xl">
                A Robot COO that never sleeps — operating across six hubs, in real time.
              </p>
              <p className="mt-3 max-w-md text-white/75">
                Real-world presence at Startup World Cup, Diffusion Sarawak, IVS2026 and more.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
