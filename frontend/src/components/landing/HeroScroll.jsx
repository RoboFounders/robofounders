import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { HERO_SCENES, MEDIA } from "../../data/content";

// from / to define the scroll window [0‒1] where this text is visible.
// A short fade-in at `from`, hold until near `to`, then fade-out at `to`.
function SceneText({ progress, from, to, tag, title, sub }) {
  const FADE = 0.04;
  const isFirst = from === 0;

  const stops = isFirst
    ? [0, to - FADE, to]
    : [from, from + FADE, to - FADE, to];
  const opVals = isFirst ? [1, 1, 0] : [0, 1, 1, 0];
  const yVals  = isFirst ? [0, 0, -30] : [30, 0, 0, -30];

  const opacity = useTransform(progress, stops, opVals);
  const y       = useTransform(progress, stops, yVals);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center"
    >
      <span className="mb-5 inline-block rounded-full rf-chip px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
        {tag}
      </span>
      <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl">
        {title.split("\n").map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">{sub}</p>
    </motion.div>
  );
}

export default function HeroScroll() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const targetTime = useRef(0);
  const smoothTime = useRef(0);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // intro overlay fades out as scroll begins
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => {
      setDuration(video.duration || 0);
      try {
        video.currentTime = 0.05;
        smoothTime.current = 0.05;
        targetTime.current = 0.05;
      } catch (e) {
        /* noop */
      }
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf;
    const loop = () => {
      const d = video.duration;
      if (d && !Number.isNaN(d)) {
        smoothTime.current += (targetTime.current - smoothTime.current) * 0.12;
        if (Math.abs(targetTime.current - smoothTime.current) > 0.004) {
          try {
            video.currentTime = smoothTime.current;
          } catch (e) {
            /* seeking guard */
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const unsub = scrollYProgress.on("change", (p) => {
      const d = video.duration;
      if (d && !Number.isNaN(d)) {
        targetTime.current = Math.max(0.04, Math.min(d - 0.06, p * d));
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      unsub();
    };
  }, [scrollYProgress, duration]);

  return (
    <section id="hero" ref={containerRef} className="relative h-[300vh] bg-[#040a12]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          data-testid="hero-video"
          poster={MEDIA.robotPortrait}
          className="absolute inset-0 h-full w-full object-contain"
          muted
          playsInline
          preload="auto"
          autoPlay={false}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
        </video>
        {/* legibility overlays */}
        <div className="absolute inset-0 rf-hero-vignette" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040a12]/40 via-transparent to-[#040a12]/70" />
        <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full rf-radial-glow blur-2xl" />

        {/* synchronized scene overlays — show briefly at start and end only */}
        {HERO_SCENES.map((s, i) => (
          <SceneText
            key={i}
            progress={scrollYProgress}
            from={s.from}
            to={s.to}
            tag={s.tag}
            title={s.title}
            sub={s.sub}
          />
        ))}

        {/* CTAs pinned bottom */}
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-5 px-6">
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 rounded-full rf-cyan-gradient px-7 py-3.5 text-sm font-semibold text-[#04222a] transition-all duration-300 hover:rf-glow-strong hover:-translate-y-0.5"
            >
              Get Your Robot COO
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#how"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
            >
              See how it works
            </a>
          </div>
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex flex-col items-center gap-1 text-white/70"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
