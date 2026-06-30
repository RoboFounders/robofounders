import { Linkedin, Globe, Award, Plane, Twitter, Bot } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { MEDIA, CONTACT, TEAM, FOUNDER_VENTURES } from "../../data/content";

const FACTS = [
  { icon: Award, text: "Venture Capitalist — 4 IPOs" },
  { icon: Plane, text: "Bridging Japan • Malaysia • US • ASEAN • Vietnam" },
  { icon: Globe, text: "Serial founder & AI robotics innovator" },
];

export default function Founder() {
  return (
    <section id="founder" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#4d6bff]/30 to-transparent blur-xl" />
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
            <p className="mt-2 font-display text-lg font-semibold text-[#4d6bff]">
              Founder &amp; CEO — RoboFounders
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5b6b7e]">
              A venture capitalist behind four IPOs and a serial founder, Mariel built RoboFounders
              to give every ambitious founder a Robot COO — pairing embodied AI with on-the-ground
              human teams to make global expansion effortless. She also organizes BuildClub Tokyo,
              connecting founders and ecosystems across Asia and the US.
            </p>

            <div className="mt-8 space-y-3">
              {FACTS.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef1ff] text-[#4d6bff]">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="text-base font-medium text-[#0a0f1a]">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#9aa9b8]">
                Also building
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FOUNDER_VENTURES.map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-[#e4ecf2] bg-[#f6f9fb] px-3.5 py-1.5 text-sm font-medium text-[#0a0f1a]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACT.founderLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="founder-linkedin"
                className="inline-flex items-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0f1a] transition-all hover:border-[#b9c2ff] hover:rf-glow"
              >
                <Linkedin className="h-4 w-4 text-[#4d6bff]" />
                LinkedIn
              </a>
              <a
                href={CONTACT.twitter}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="founder-twitter"
                className="inline-flex items-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0f1a] transition-all hover:border-[#b9c2ff] hover:rf-glow"
              >
                <Twitter className="h-4 w-4 text-[#4d6bff]" />
                @maripto7
              </a>
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="founder-website"
                className="inline-flex items-center gap-2 rounded-full border border-[#e4ecf2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0f1a] transition-all hover:border-[#b9c2ff] hover:rf-glow"
              >
                <Globe className="h-4 w-4 text-[#4d6bff]" />
                robofounders.net
              </a>
            </div>
          </Reveal>
        </div>

        {/* Leadership team */}
        <div className="mt-20 lg:mt-28">
          <Reveal className="max-w-2xl">
            <SectionLabel>Our Team</SectionLabel>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0a0f1a] sm:text-4xl">
              Humans &amp; robot,{" "}
              <span className="rf-text-gradient">one mission.</span>
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-[#5b6b7e]">
              A cross-border leadership team — plus Rofi, our Robot COO — executing on the ground
              across Japan, Malaysia, the US and ASEAN.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 5) * 0.08}>
                <div
                  data-testid={`team-${i}`}
                  className="group flex h-full flex-col items-center rounded-2xl border border-[#e4ecf2] bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:rf-glow"
                >
                  <span
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl font-display text-2xl font-bold ${
                      m.isRobot
                        ? "rf-cyan-gradient text-white"
                        : "bg-[#eef1ff] text-[#4d6bff]"
                    }`}
                  >
                    {m.isRobot ? <Bot className="h-9 w-9" /> : m.initials}
                  </span>
                  <h4 className="mt-5 font-display text-lg font-bold text-[#0a0f1a]">{m.name}</h4>
                  <p className="mt-1 text-sm font-semibold text-[#4d6bff]">{m.role}</p>
                  {m.note && (
                    <p className="mt-2 text-sm leading-snug text-[#5b6b7e]">{m.note}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
