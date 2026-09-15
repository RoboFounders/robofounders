# RoboFounders — Bilingual Website

A React website for RoboFounders' Physical AI ecosystem, with English and Japanese content, a section-based homepage, dedicated product catalog and detail pages, and a separate attributed news feed. Initial products are roller screws and robotic hands.

The redesign uses a consistent navy/purple visual system, responsive layouts, client-approved product photography, and an explicit language toggle. Product media is confined to product pages.

## Development

The frontend uses React 19, CRACO, Tailwind CSS, custom CSS, React Router, Framer Motion, and lucide-react. Run commands from `frontend/`:

```powershell
npm start
npm test -- --watchAll=false --runInBand
npm run build
```

## Content and project organization

- `frontend/src/content/en.js` and `ja.js`: matching localized content dictionaries.
- `frontend/src/content/media.js`: centralized media paths and contacts.
- `frontend/src/pages/`: route-level pages.
- `frontend/src/components/{layout,home,products,shared,news}/`: focused, reusable components.
- `frontend/src/styles/site.css`: responsive website styles.
- `frontend/public/images/{brand,home,team,events,products}/`: organized images.
- `frontend/public/videos/{events,products}/`: organized videos.

See [Website maintenance](docs/WEBSITE_MAINTENANCE.md) for editing guidance, media preparation, inquiry behavior, retained content, and launch checks.

The existing news workflow documentation below is retained from the prior implementation; this redesign does not activate external providers or alter their commercial terms.

## Robotics News (`/news`) — Phase 1

A dedicated, continuously-updated news feed that aggregates posts from **approved** X (Twitter) accounts, with full source attribution and links back to each original post. This is the first section of the larger platform roadmap in [`docs/ROADMAP.md`](docs/ROADMAP.md).

**Route:** `/news` (`src/pages/RoboticsNews.jsx`) — reachable from the "Robotics News" nav link and the "View all robotics news" button in the landing news section.

**Key files**

- `public/data/news-sources.json` — approved accounts (add/remove accounts here).
- `public/data/news-posts.json` — the normalized feed the UI renders (generated).
- `src/lib/newsApi.js` — data layer; fetches + auto-refreshes the feed (SWR, 5-minute interval).
- `src/components/news/NewsCard.jsx` / `NewsFeed.jsx` — the feed UI.
- `scripts/fetch-news.mjs` — manual/curated feed generator (Phase 1a).
- `scripts/refresh-news.mjs` + `.github/workflows/refresh-news.yml` — scheduled automated ingestion (Phase 1b).

**Add a post (manual):** add an entry to `scripts/curated-posts.json`, then run:

```bash
yarn news            # regenerate public/data/news-posts.json
yarn news --hydrate  # optional: pull missing text/author from X oEmbed
```

**Add / remove an account:** edit `public/data/news-sources.json`. Only sources with `enabled: true` and `permission: "owner"` or `"granted"` are ever shown.

**Enable automatic updates (Phase 1b):** the GitHub Actions workflow runs every 30 minutes and is a **no-op until configured**. To turn it on, set:

- repo **variable** `NEWS_PROVIDER` = `x` (official API) or `twitterapi_io` (third-party)
- repo **secret** `X_BEARER_TOKEN` (for `x`) or `TWITTERAPI_IO_KEY` (for `twitterapi_io`)
- optional variable `NEWS_MAX_PER_ACCOUNT` (default 10)
- optional variable `NEWS_FULL_SYNC` = `1` to periodically re-sync and drop upstream-deleted posts

The refresher uses **`since_id`** (derived from the newest post already saved), so X only returns posts newer than what we have — if no one posted, it fetches nothing and the run costs ~$0. It also **caches each account's numeric X user ID** back into `news-sources.json` after the first run, so later runs skip the username→ID lookup. Combined with the 30-minute schedule, this keeps API usage minimal.

> **X API note (2026):** the X API is pay-per-use (~$0.005/post read), has no free tier, and requires server-side keys — which is why keys live only in CI/serverless, never in the frontend.

**Attribution & compliance:** every card credits the original author + source and links back to the post; only approved accounts are shown; the scheduled sync replaces each refreshed account's posts so upstream deletions drop out.

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

*(Test commit for new remote configuration)*
