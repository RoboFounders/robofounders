import { Reveal, SectionLabel } from "./Reveal";
import { GALLERY, EVENT_VIDEOS } from "../../data/content";

// Interleave photos and clips into a single Pinterest-style masonry flow.
// The final clip is pulled out and shown larger as a featured video below.
function buildItems(masonryVideos) {
  const items = [];
  let vi = 0;
  GALLERY.forEach((photo, i) => {
    items.push({ type: "photo", ...photo });
    // drop a video clip in roughly every 3rd slot so they're spread out and never oversized
    if ((i + 1) % 3 === 0 && vi < masonryVideos.length) {
      items.push({ type: "video", src: masonryVideos[vi], index: vi });
      vi += 1;
    }
  });
  while (vi < masonryVideos.length) {
    items.push({ type: "video", src: masonryVideos[vi], index: vi });
    vi += 1;
  }
  return items;
}

export default function Gallery() {
  const masonryVideos = EVENT_VIDEOS.slice(0, -1);
  const featuredVideo = EVENT_VIDEOS[EVENT_VIDEOS.length - 1];
  const items = buildItems(masonryVideos);

  return (
    <section id="moments" className="relative overflow-hidden bg-[#040a12] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(77,107,255,0.12),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(106,77,255,0.10),transparent_45%)]" />

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

        {/* Pinterest-style masonry: photos shown full at natural aspect, clips sized to the same column width */}
        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5 [column-fill:balance]">
          {items.map((item, i) =>
            item.type === "photo" ? (
              <Reveal
                key={item.src}
                delay={(i % 3) * 0.06}
                className="mb-4 break-inside-avoid"
              >
                <figure
                  data-testid={`gallery-item-${i}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040a12]/90 via-transparent to-transparent opacity-80" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium leading-snug text-white opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    {item.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ) : (
              <Reveal
                key={item.src}
                delay={(i % 3) * 0.06}
                className="mb-4 break-inside-avoid"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <video
                    data-testid={`gallery-clip-${item.index}`}
                    className="w-full h-auto"
                    src={item.src}
                    aria-label={`RoboFounders event clip ${item.index + 1}`}
                    preload="metadata"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                </div>
              </Reveal>
            )
          )}
        </div>

        {/* Featured clip — shown larger than the masonry items */}
        {featuredVideo && (
          <Reveal className="mt-6">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black/40 rf-glow">
              <video
                data-testid="gallery-clip-featured"
                className="w-full h-auto"
                src={featuredVideo}
                aria-label="Featured RoboFounders event clip"
                preload="metadata"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
