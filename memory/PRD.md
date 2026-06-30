# RoboFounders — Landing Page PRD

## Original Problem Statement
Recreate the layout/UX and scroll-controlled hero-video behavior of the reference site
(site-checkout.preview.emergentagent.com), adapted to "RoboFounders — Your Robot COO for
Global Expansion" with a modern AI-robotics theme: clean white/light backgrounds, vibrant
cyan/teal neon accents, dark navy text, premium futuristic minimalism. Use the attached video
as the full-width, scroll-scrubbed hero with synchronized text overlays per scene.

## Architecture
- Static React (CRA + craco) single-page landing. No backend, no DB (user chose static).
- Tailwind + custom CSS utilities (glow, gradients, grid bg). Fonts: Outfit (display) + Inter (body).
- framer-motion for scroll-scrub hero (useScroll/useTransform) + scroll-reveal.
- Hero video served locally from /public/media/ as hero.webm (VP9) + hero.mp4 (H.264, faststart)
  for universal browser playback; poster fallback = robot image.

## User Personas
- Founders/startups scaling internationally who want an execution partner ("Robot COO").

## Core Requirements (static)
- Sticky glass navbar with anchor nav + CTA.
- Scroll-controlled hero video that scrubs frames on scroll with 5 synchronized text scenes.
- Sections: Stats, How It Works (3 steps), Value Proposition, Events/Momentum timeline,
  Works/Case Studies, For Founders, About Founder (Mariel Asami Fukase), News, Contact form, Footer.
- Cyan/teal neon theme on white; dark navy text.
- Contact = scroll to on-page form (client-side validation + sonner toast, no submission).

## Implemented (2026-06-30)
- Full landing page with all sections + scroll-scrub hero (real attached video).
- Re-encoded hero video to faststart H.264 + added VP9 WebM fallback (fixes headless decode).
- Generated RoboFounders logo; stock images for robot/events/founder/team.
- Contact form: required-field validation, success/error toasts, field reset.
- External links wired: mailto:dummyemail@gmail.com, LinkedIn company page, robofounders.net.
- Verified by testing agent (iteration_1 + iteration_2): all sections, nav smooth-scroll,
  contact form, links, images, and hero scene transitions pass. Hero video plays/scrubs in
  all real browsers (headless test browser lacks H.264, hence WebM added).

## Backlog / Remaining
- P1: Swap in real logo, founder photo, and event images (user will provide).
- P1: Update real contact email (currently dummyemail@gmail.com placeholder).
- P2: Optional backend for contact form (lead capture / email notifications).
- P2: Add more case studies / press logos; multilingual (JP/EN) toggle.

## Next Tasks
- Await user-provided brand assets (logo, founder + event photos) and real email, then replace.
