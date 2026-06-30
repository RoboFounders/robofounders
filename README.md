# RoboFounders — Landing Page

A high-end, fully static marketing landing page for **RoboFounders**, an "AI-Powered Robot COO for Global Expansion" service. The page pairs a scroll-controlled hero video with synchronized text overlays and a series of storytelling sections (value props, the Rofi robot showcase, event updates, photo/video gallery, founder bio, leadership team, and a contact form).

The visual language is a futuristic AI-robotics aesthetic: deep royal-blue / indigo accents (`#4d6bff` → `#6a4dff`) on clean white and near-black sections.

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
| Served on    | Port **5000** (`cd frontend && yarn start`)                  |
| Deployment   | Render (Static Site CDN) or Docker                           |

---

## Project Structure

```
.
├── README.md                 # This file
├── Dockerfile                # Production Docker configuration
├── .dockerignore             # Files ignored during Docker builds
├── render.yaml               # Render Blueprint deployment configuration
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
    │   │   ├── mariel.jpg          # Founder photo (updated)
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

1. **`src/App.js`** is the composition root. It renders `<Navbar />`, then a `<main>` containing every section component in display order, followed by `<Footer />`, a global `<Toaster />`, and the `<ScrollToTop />` controller.

2. **`src/data/content.js`** is the single source of truth. Every piece of copy, every media path (images/videos), nav links, stats, steps, team members, events, and contact details are exported as plain constants.

3. **Section components** in `src/components/landing/` pull their data from `content.js` and use the shared `Reveal` helper for scroll-in animation.

4. **`Reveal.jsx`** exports reusable transition elements:
   - `Reveal` — a Framer Motion wrapper that fades/slides children in on scroll.
   - `SectionLabel` — the small uppercase eyebrow label above each headline.

5. **Path alias**: `@/` maps to `src/` (configured in `craco.config.js` / `jsconfig.json`).

---

## Page Sections (render order)

Defined in `src/App.js`. Each section reads its content from `content.js`.

| # | Component          | Section id   | What it shows | Data used |
|---|--------------------|--------------|---------------|-----------|
| — | `Navbar.jsx`       | —            | Sticky top nav: logo, anchor links, primary CTA | `NAV_LINKS`, `LOGO` |
| 1 | `HeroScroll.jsx`   | `#hero`      | Scroll-controlled hero video with text overlays; floating "24/7 Active" badge | `MEDIA.heroVideo`, `HERO_SCENES` |
| 2 | `StatsBar.jsx`     | `#stats`     | Headline stats strip (hubs, companies, etc.) | `STATS` |
| 3 | `GlobalReach.jsx`  | —            | Global-expansion video feature | `MEDIA.globalVideo` |
| 4 | `HowItWorks.jsx`   | `#how`       | "Your Global Expansion, Powered by Robot COO" — step-by-step process | `STEPS` |
| 5 | `ValueProp.jsx`    | —            | Full-width value statement over imagery | `VALUES` |
| 6 | `RobotShowcase.jsx`| `#meet-rofi` | Interactive 3D-tilt showcase of "Rofi" with capability highlights | `rofi-3d.png` |
| 7 | `Gallery.jsx`      | —            | Masonry of event photos + autoplaying clips from the field | `GALLERY`, `EVENT_VIDEOS` |
| 8 | `Works.jsx`        | `#works`     | "Our Works / Case Studies" | `WORKS` |
| 9 | `ForFounders.jsx`  | `#founders`  | "Stay in the office. Go global anyway." pitch with a looping Rofi video | `MEDIA.founderVideo` |
| 10| `Updates.jsx`      | `#news`      | Tabbed updates interface: toggles between **Events Timeline** & **Press & News** | `MOMENTUM`, `NEWS` |
| 11| `Founder.jsx`      | `#founder`   | Founder bio (Mariel Asami Fukase) and leadership team grid | `MEDIA.founder`, `TEAM`, `FOUNDER_VENTURES`, `CONTACT` |
| 12| `Contact.jsx`      | `#contact`   | Contact form (client-side, toast confirmation) + social links | `CONTACT` |
| — | `ScrollToTop.jsx`  | —            | Floating scroll-to-top button that appears on scroll | — |
| — | `Footer.jsx`       | —            | Logo, explore links, social icons, CTA | `NAV_LINKS`, `CONTACT` |

---

## Development & Deployment

### Local Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (Yarn is recommended to avoid npm installation conflicts):
   ```bash
   yarn install
   ```
3. Start the local server:
   ```bash
   yarn start
   ```

### Docker Deployment

To run the application inside a container:
1. Build the production image:
   ```bash
   docker build -t robofounders-landing .
   ```
2. Start the container:
   ```bash
   docker run -d -p 8080:80 --name robofounders-web robofounders-landing
   ```
   *The page will be served on `http://localhost:8080` via Nginx.*

### Render Blueprint Deployment

This repository includes a `render.yaml` specification for zero-config Render Blueprint deployments. When pushed to GitHub, you can link the repository to Render, which will host the React build directory (`./frontend/build`) on Render's static CDN.
