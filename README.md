# RoboFounders — Landing Page

A high-end, fully static marketing landing page for **RoboFounders**, an
"AI-Powered Robot COO for Global Expansion" service. The page pairs a
scroll-controlled hero video with synchronized text overlays and a series of
storytelling sections (value props, the Rofi robot showcase, event momentum,
photo/video gallery, founder bio, leadership team, and a contact form).

The visual language is a futuristic AI-robotics aesthetic: deep royal-blue /
indigo accents (`#4d6bff` → `#6a4dff`) on clean white and near-black sections.

---

## Tech Stack

| Layer        | Choice                                                        |
|--------------|--------------------------------------------------------------|
| Framework    | React 19                                                     |
| Build tool   | CRACO (Create React App Configuration Override)             |
| Styling      | Tailwind CSS (compiled via PostCSS) + custom CSS utilities   |
| Animation    | Framer Motion (scroll + reveal animations)                  |
| Icons        | lucide-react                                                 |
| UI primitives| shadcn/ui (Radix UI) components in `src/components/ui`       |
| Toasts       | sonner                                                       |
| Served on    | Port **5000** (`cd frontend && npm start`)                  |
| Backend      | None — 100% static, all content lives in one data file       |

> Note: although the dependency list includes libraries like `axios`,
> `react-query`, `react-router-dom`, and `recharts` (CRA template leftovers),
> the landing page itself is static and does not use them.

---

## Project Structure

```
.
├── README.md                 # This file
├── replit.md                 # Project overview + user preferences
└── frontend/
    ├── craco.config.js       # CRACO overrides (incl. "@" → src alias)
    ├── tailwind.config.js     # Tailwind theme + content globs
    ├── postcss.config.js      # PostCSS (tailwind + autoprefixer)
    ├── jsconfig.json          # Editor path mapping for "@/..."
    ├── components.json         # shadcn/ui generator config
    ├── public/
    │   ├── index.html
    │   ├── images/
    │   │   ├── logo-*.png          # Brand logos / marks
    │   │   ├── hero-bg.jpeg
    │   │   ├── mariel.png          # Founder photo
    │   │   ├── rofi-3d.png         # Transparent Rofi render (showcase)
    │   │   ├── team/               # Cartoon avatars (hiro, mai, bong, celine)
    │   │   └── events/             # Event/booth gallery photos
    │   └── videos/
    │       ├── hero.mp4 / hero.webm   # Scroll-controlled hero video
    │       ├── global-expansion.mp4   # Global reach section
    │       ├── founder-rofi.mp4       # For Founders section
    │       └── event-*.mp4            # Gallery clips
    └── src/
        ├── index.js              # React entry point
        ├── index.css             # Tailwind directives + design tokens + utilities
        ├── App.js                # Page composition — renders all sections in order
        ├── App.css
        ├── data/
        │   └── content.js        # SINGLE SOURCE OF TRUTH for all copy + media
        ├── components/
        │   ├── landing/          # All page sections (see below)
        │   └── ui/               # shadcn/ui primitives (Radix-based)
        ├── hooks/
        │   └── use-toast.js
        ├── lib/
        │   └── utils.js          # `cn()` class-merge helper
        └── constants/
            └── testIds/          # Central registry of data-testid values
```

---

## Architecture

The app follows a simple, content-driven single-page architecture:

1. **`src/App.js`** is the composition root. It renders `<Navbar />`, then a
   `<main>` containing every section component in display order, followed by
   `<Footer />` and a global `<Toaster />`.

2. **`src/data/content.js`** is the single source of truth. Every piece of copy,
   every media path (images/videos), nav links, stats, steps, team members,
   events, and contact details are exported as plain constants. Components import
   what they need and render it — so editing text or swapping media usually means
   touching only this one file.

3. **Section components** in `src/components/landing/` are mostly presentational.
   Each owns one section of the page, pulls its data from `content.js`, and uses
   the shared `Reveal` helper for scroll-in animation.

4. **`Reveal.jsx`** exports two reusable building blocks used across sections:
   - `Reveal` — a Framer Motion wrapper that fades/slides children in on scroll.
   - `SectionLabel` — the small uppercase eyebrow label above each headline.

5. **Styling** is Tailwind utility classes compiled through PostCSS. Design
   tokens (brand colors, surfaces, borders) are defined as CSS variables in
   `src/index.css`, alongside custom helper classes (e.g. `rf-text-gradient`,
   `rf-cyan-gradient`, `rf-glow`, `rf-grid-bg`, `rf-chip`).

6. **Path alias**: `@/` maps to `src/` (configured in `craco.config.js` /
   `jsconfig.json`), so imports look like `@/components/landing/Navbar`.

---

## Page Sections (render order)

Defined in `src/App.js`. Each section reads its content from `content.js`.

| # | Component          | Section id   | What it shows | Data used |
|---|--------------------|--------------|---------------|-----------|
| — | `Navbar.jsx`       | —            | Sticky top nav: logo, anchor links, primary CTA | `NAV_LINKS`, `LOGO` |
| 1 | `HeroScroll.jsx`   | `#hero`      | Scroll-controlled hero video with text overlays that fade in/out at scroll checkpoints; floating "24/7 Active" badge | `MEDIA.heroVideo`, `HERO_SCENES` |
| 2 | `StatsBar.jsx`     | `#stats`     | Headline stats strip (hubs, companies, etc.) | `STATS` |
| 3 | `GlobalReach.jsx`  | —            | Global-expansion video feature | `MEDIA.globalVideo` |
| 4 | `HowItWorks.jsx`   | `#how`       | "Your Global Expansion, Powered by Robot COO" — step-by-step process | `STEPS` |
| 5 | `ValueProp.jsx`    | —            | Full-width value statement over imagery | `VALUES` |
| 6 | `RobotShowcase.jsx`| `#meet-rofi` | Interactive 3D-tilt showcase of "Rofi" (transparent render) with capability highlights | `rofi-3d.png` |
| 7 | `Momentum.jsx`     | —            | "Where the Robot COO is showing up next" — upcoming events timeline | `MOMENTUM` |
| 8 | `Gallery.jsx`      | —            | Masonry of event photos + autoplaying clips from the field | `GALLERY`, `EVENT_VIDEOS` |
| 9 | `Works.jsx`        | `#works`     | "Our Works / Case Studies" | `WORKS` |
| 10| `ForFounders.jsx`  | `#founders`  | "Stay in the office. Go global anyway." pitch with a looping Rofi video and key bullet points | `MEDIA.founderVideo` |
| 11| `Founder.jsx`      | —            | Founder bio (Mariel Asami Fukase), leadership team grid (cartoon avatars + Rofi), and other ventures | `MEDIA.founder`, `TEAM`, `FOUNDER_VENTURES`, `CONTACT` |
| 12| `News.jsx`         | `#news`      | "News & Momentum" updates | `NEWS` |
| 13| `Contact.jsx`      | `#contact`   | Contact form (client-side, toast confirmation) + social links (X, LinkedIn) | `CONTACT` |
| — | `Footer.jsx`       | —            | Logo, explore links, social icons, CTA | `NAV_LINKS`, `CONTACT` |

### Shared helpers

- `Reveal.jsx` — `Reveal` (scroll animation wrapper) and `SectionLabel` (eyebrow label).

---

## Content & Media

All editable content is centralized in **`src/data/content.js`**:

- **Brand**: `LOGO`, `LOGO_FULL`, `LOGO_MARK`
- **Media paths**: `MEDIA` (hero/global/founder videos, founder photo, etc.)
- **Navigation**: `NAV_LINKS`
- **Section data**: `HERO_SCENES`, `STATS`, `STEPS`, `VALUES`, `MOMENTUM`,
  `WORKS`, `GALLERY`, `EVENT_VIDEOS`, `NEWS`
- **People**: `TEAM` (Rofi + human leadership), `FOUNDER_VENTURES`
- **Contact**: `CONTACT` (LinkedIn, X/Twitter handle, etc.)

Images live in `frontend/public/images/` and videos in
`frontend/public/videos/`, referenced by root-relative URL paths (e.g.
`/images/mariel.png`, `/videos/hero.mp4`).

---

## Development

```bash
cd frontend
npm install          # install dependencies (use --legacy-peer-deps if needed)
npm start            # dev server on http://localhost:5000
npm run build        # production build
```

The dev server runs through CRACO (`craco start`). On Replit it is wired to the
**"Start application"** workflow.

### Conventions

- Use **npm** (not yarn) for package management in this environment.
- Edit copy and media in `src/data/content.js` rather than hardcoding strings in
  components.
- Reuse `Reveal` / `SectionLabel` and the `rf-*` utility classes to stay on-brand.
- Interactive elements carry `data-testid` attributes (registered in
  `src/constants/testIds/`).
