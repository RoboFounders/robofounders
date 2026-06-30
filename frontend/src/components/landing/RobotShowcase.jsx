import { useRef, useState, useCallback, useEffect } from "react";
import { Globe2, Cpu, Briefcase } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const HIGHLIGHTS = [
  { icon: Globe2, text: "Operates across 6 global hubs" },
  { icon: Cpu, text: "AI-powered, always learning" },
  { icon: Briefcase, text: "Packed and ready to deploy" },
];

const REST_TRANSFORM = "rotateX(0deg) rotateY(0deg)";
const REST_GLOW = "radial-gradient(closest-side at 50% 40%, rgba(77,107,255,0.35), transparent 70%)";

export default function RobotShowcase() {
  const stageRef = useRef(null);
  const robotRef = useRef(null);
  const glowRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const apply = useCallback(() => {
    rafRef.current = 0;
    const rect = rectRef.current;
    if (!rect) return;
    const px = (pointerRef.current.x - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (pointerRef.current.y - rect.top) / rect.height - 0.5;
    if (robotRef.current) {
      robotRef.current.style.transform = `rotateX(${-py * 18}deg) rotateY(${px * 26}deg)`;
    }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(closest-side at ${50 + px * 60}% ${40 + py * 60}%, rgba(77,107,255,0.35), transparent 70%)`;
    }
  }, []);

  const handleEnter = useCallback(() => {
    if (stageRef.current) rectRef.current = stageRef.current.getBoundingClientRect();
    setActive(true);
  }, []);

  const handleMove = useCallback(
    (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply);
    },
    [apply]
  );

  const handleLeave = useCallback(() => {
    setActive(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (robotRef.current) robotRef.current.style.transform = REST_TRANSFORM;
    if (glowRef.current) glowRef.current.style.background = REST_GLOW;
  }, []);

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  return (
    <section id="meet-rofi" className="relative overflow-hidden bg-[#070a16] py-24 lg:py-32">
      <div className="absolute inset-0 rf-grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4d6bff]/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <SectionLabel className="!text-[#7d93ff]">Meet Rofi</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Say hello to your{" "}
            <span className="rf-text-gradient">Robot COO.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Rofi is built to travel, execute, and run your operations on the ground anywhere in the
            world. Move your mouse over him to take a closer look.
          </p>

          <div className="mt-8 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#7d93ff] ring-1 ring-white/10">
                  <h.icon className="h-5 w-5" />
                </span>
                <span className="text-base font-medium text-white/90">{h.text}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="flex justify-center lg:justify-end">
          <div
            ref={stageRef}
            onMouseMove={handleMove}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            data-testid="robot-stage"
            className="relative w-full max-w-md select-none"
            style={{ perspective: "1100px" }}
          >
            {/* reactive glow that follows the cursor */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 rounded-[2rem] transition-opacity duration-300"
              style={{
                background: REST_GLOW,
                opacity: active ? 1 : 0.5,
                filter: "blur(20px)",
              }}
            />

            <div
              ref={robotRef}
              className={active ? "" : "rf-float"}
              style={{
                transform: REST_TRANSFORM,
                transformStyle: "preserve-3d",
                transition: active
                  ? "transform 0.12s ease-out"
                  : "transform 0.8s cubic-bezier(0.21,0.6,0.35,1)",
                willChange: "transform",
              }}
            >
              <img
                src="/images/rofi-3d.png"
                alt="Rofi, the RoboFounders Robot COO"
                draggable="false"
                className="relative z-10 mx-auto w-full max-w-[22rem] drop-shadow-[0_45px_60px_rgba(0,0,0,0.65)]"
                style={{ transform: "translateZ(60px)" }}
              />
              {/* ground shadow */}
              <div
                className="absolute bottom-2 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl"
                style={{ transform: "translateZ(-40px)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
