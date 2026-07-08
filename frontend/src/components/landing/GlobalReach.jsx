import { Reveal, SectionLabel } from "./Reveal";
import { MEDIA } from "../../data/content";

export default function GlobalReach() {
  return (
    <section id="global" className="relative overflow-hidden bg-[#0a0f1a] py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#4d6bff]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#6a4dff]/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionLabel>Global Reach</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Expand Your Business Globally{" "}
            <span className="rf-text-gradient">Without Leaving the Office.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            RoboFounders acts as your AI-Powered Robot COO across{" "}
            <span className="font-semibold text-white">6 global hubs</span>. We handle the
            on-the-ground heavy lifting so founders can focus on vision and strategy.
          </p>

          <div className="mt-9 flex flex-wrap gap-8">
            <div>
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">6</p>
              <p className="mt-1 text-sm text-white/50">Global Hubs</p>
            </div>
            <div className="border-l border-white/15 pl-8">
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">4</p>
              <p className="mt-1 text-sm text-white/50">IPOs by Founder</p>
            </div>
            <div className="border-l border-white/15 pl-8">
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">24/7</p>
              <p className="mt-1 text-sm text-white/50">On the Ground</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#4d6bff]/40 via-[#6a4dff]/20 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
              <video
                src={MEDIA.globalVideo}
                autoPlay
                loop
                muted
                playsInline
                data-testid="global-video"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
