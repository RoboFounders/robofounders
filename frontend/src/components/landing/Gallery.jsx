import { Reveal, SectionLabel } from "./Reveal";
import { GALLERY, EVENT_VIDEOS } from "../../data/content";

export default function Gallery() {
  return (
    <section id="moments" className="relative overflow-hidden bg-[#040a12] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.12),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(34,211,238,0.08),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <SectionLabel>On the Ground</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Moments from{" "}
            <span className="rf-text-gradient">the field.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#9fb2c4]">
            Booths, demos, partnerships and real human connection — here&apos;s the Robot COO
            and the RoboFounders team out in the world, from Sarawak to Japan.
          </p>
        </Reveal>

        {/* Featured video */}
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
            <video
              data-testid="gallery-video"
              className="h-full w-full object-cover"
              src={EVENT_VIDEOS[0]}
              aria-label="RoboFounders event highlights"
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        </Reveal>

        {/* Photo grid */}
        <div className="mt-6 grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src}
              delay={(i % 4) * 0.08}
              className={`${g.span === "wide" ? "sm:col-span-2" : ""} ${
                g.span === "tall" ? "row-span-2" : ""
              }`}
            >
              <figure
                data-testid={`gallery-item-${i}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a12] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium leading-snug text-white opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Secondary clips */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {EVENT_VIDEOS.slice(1).map((v, i) => (
            <Reveal key={v} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <video
                  data-testid={`gallery-clip-${i}`}
                  className="h-full w-full object-cover"
                  src={v}
                  aria-label={`RoboFounders event clip ${i + 1}`}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  controls
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
