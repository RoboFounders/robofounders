import { Linkedin, Globe, Award, Plane } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { MEDIA, CONTACT } from "../../data/content";

const FACTS = [
  { icon: Award, text: "Venture Capitalist — 4 IPOs" },
  { icon: Plane, text: "Bridging Japan • Malaysia • US • ASEAN" },
  { icon: Globe, text: "AI Robotics Innovator" },
];

export default function Founder() {
  return (
    <section id="founder" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1fr]">
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#00e0ef]/30 to-transparent blur-xl" />
            <img
              src={MEDIA.founder}
              alt="Mariel Asami Fukase"
              className="relative aspect-[4/5] w-full rounded-[1.75rem] border border-[#e4ecf2] object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <SectionLabel>About the Founder</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0a0f1a] sm:text-5xl">
            Mariel Asami Fukase
          </h2>
          <p className="mt-2 font-display text-lg font-semibold text-[#008f99]">
            Founder &amp; CEO — RoboFounders
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5b6b7e]">
            A venture capitalist with four IPOs and a deep belief in embodied AI, Mariel founded
            RoboFounders to give every ambitious founder a Robot COO — pairing cutting-edge
            robotics with on-the-ground human teams to make global expansion effortless.
          </p>

          <div className="mt-8 space-y-3">
            {FACTS.map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6fbfd] text-[#008f99]">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="text-base font-medium text-[#0a0f1a]">{f.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="founder-linkedin"
              className="inline-flex items-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0f1a] transition-all hover:border-[#9fe9f0] hover:rf-glow"
            >
              <Linkedin className="h-4 w-4 text-[#008f99]" />
              LinkedIn
            </a>
            <a
              href={CONTACT.website}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="founder-website"
              className="inline-flex items-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0f1a] transition-all hover:border-[#9fe9f0] hover:rf-glow"
            >
              <Globe className="h-4 w-4 text-[#008f99]" />
              robofounders.net
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
