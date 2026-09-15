# RoboFounders.ai — Product Roadmap

> **Vision:** Evolve RoboFounders.ai from a marketing landing page into the
> **"Crunchbase × TechCrunch × RobotShop × Product Hunt for Robotics"** —
> the central hub for robotics news, companies, funding, talent, hardware,
> and the RoboFounders Robot OS / AI Agent ecosystem.

This document is the shared source of truth for where the product is going and
what we build first. It is written to be shared with the founder and the team.

---

## 1. Where we are today

The current site is a **single, fully static marketing landing page**:

- React 19 SPA built with CRACO, styled with Tailwind + a custom `rf-*` design system.
- Deployed as static files on a CDN (Render / Vercel / Docker + Nginx). **No backend.**
- Already uses React Router, with one separate page precedent: `/roi-calculator`.
- "News" today is a **hardcoded section** (`Updates.jsx`) with static copy — not a
  real, continuously-updated feed.

To become a news + data platform, we introduce **route-based sections**, a
**normalized content data layer**, and a **lightweight ingestion pipeline** — all
designed so later sections (Marketplace, Company DB, etc.) reuse the same foundation.

---

## 2. The platform, section by section

The full platform the founder envisions:

1. **Robotics News** — News, X (Twitter) posts, press releases → **Phase 1 (this cycle)**
2. **Company Database** — Profiles of robotics companies
3. **Funding Database** — Rounds, investors, amounts
4. **Events** — Exhibitions & conferences
5. **Jobs** — Robotics roles
6. **Marketplace** — Robots, components, AI software
7. **Developers** — Robot OS, SDKs, APIs
8. **Investors** — VCs, CVCs, angels
9. **Demo Request** — Lead capture (already partially present)
10. **RoboFounders Robot OS / AI Agent** — the core platform

---

## 3. Phased roadmap

The ordering front-loads the "Crunchbase core" (News → Companies → Funding),
because those sections **feed each other** (every approved news account becomes a
company profile; companies attach to funding rounds). Commerce (Marketplace) and
the developer ecosystem come later because they are the biggest technical lifts.

### Phase 0 — Foundation (enabler, done alongside Phase 1)
- Convert the app to a **multi-section, route-based structure** (`/news`, later `/companies`, …).
- Introduce a **normalized content data layer** and a thin data-access module so the
  UI never talks to a raw data source directly.
- Decide and provision **dynamic infrastructure**: a lightweight serverless function
  + scheduled job now, and a plan to add a real database (e.g. Postgres/Supabase) +
  admin auth when data-heavy sections arrive.
- Baseline **SEO + analytics** (news/content pages need to be indexable).

### Phase 1 — Robotics News ⭐ (current)
A dedicated, continuously-updated **Robotics News** page that aggregates posts from
**approved** robotics companies and industry leaders on X, with full source
attribution and links back to the original posts. See Section 4 for detail.

### Phase 2 — Company Database
Company profiles (logo, description, HQ, category, links). Seeded directly from the
approved news accounts in Phase 1, so News and Companies cross-link.

### Phase 3 — Funding Database
Funding rounds tied to companies + investors; filters by stage, amount, date.

### Phase 4 — Events & Phase 5 — Jobs
Structured, submittable listings (exhibitions/conferences; robotics roles).

### Phase 6 — Marketplace
Robots, components, and AI software listings. Largest lift (catalog, payments/quotes,
vendor accounts) — needs the full backend from Phase 0's later stage.

### Phase 7 — Developers & Phase 8 — Investors
Robot OS / SDK / API directory; investor directory (VCs, CVCs, angels).

### Cross-cutting (continuous)
Demo Request flow, admin panel + authentication, English/Japanese i18n (the ROI
calculator already ships bilingual), performance, and accessibility.

---

## 4. Phase 1 in detail — Robotics News

### 4.1 Goals (from the founder's brief)
- Show posts **only from approved** robotics companies and industry leaders.
- **Credit the source** on every post (e.g. *"Source: Figure AI Official X"*).
- **Link back** to the original X post.
- **Auto-update** as new posts are published.
- **Add/remove accounts** via config file (admin panel comes later).
- Clean, **chronological** feed.
- Built to **scale** into the larger platform.

### 4.2 Sourcing strategy (hybrid — decided)
The X API changed dramatically in 2026: **no free tier**, pay-per-use (~$0.005 per
post read), a 2M-reads/month cap, and API keys that **must stay server-side**. So we
adopt a phased, low-risk hybrid:

- **Phase 1a — Manual / curated (ships first):** Editors add approved posts (and the
  one account that has already granted permission) via a config file. Each entry is
  rendered as a branded, attributed card. Zero API cost; works immediately.
- **Phase 1b — Automated ingestion (next):** A small **serverless function on a
  schedule** (e.g. every 30–60 min) reads the approved-accounts config, pulls new
  posts using server-side secrets, normalizes them, and publishes a static feed file
  the site reads. Source can be the **official X API** or a **cheaper third-party API**
  — swappable behind the data layer.
- **Phase 1c — Admin panel (later):** Replace the config file with a login-protected
  UI to manage accounts and moderate posts.

### 4.3 What gets built (Phase 1a + 1b)
- A **dedicated `/news` page** (separate from the current landing section), with a
  chronological, filterable feed of news cards.
- A **normalized post data model** and a static feed file the UI renders from.
- An **approved-accounts config file** (add/remove accounts by editing one file).
- A **reusable `NewsCard`** with avatar, author, `@handle`, **source label**,
  relative timestamp, text, media, and a **"View on X ↗"** link back to the original.
- **Auto-update UX:** the page periodically re-fetches the feed file; the scheduled
  job keeps that file fresh.
- The landing page's existing news section becomes a **teaser** linking to `/news`.

### 4.4 Compliance & attribution
We follow X's display requirements: always credit the **original author + source**,
**link back** to the post, don't alter content, show **only approved accounts**, and
**honor deletions** (the scheduled sync removes posts that disappear upstream).

### 4.5 How this scales into later phases
- The route-per-section structure is reused by every future section.
- Each approved account maps 1:1 to a future **Company profile** (Phase 2).
- The serverless + scheduled-file pattern generalizes to press releases, events, and
  funding ingestion before we invest in a full database + admin backend.

---

## 5. Key decisions & open questions
- **Feed source for Phase 1b:** official X API (cleanest, metered cost) vs. a
  third-party API (cheaper, ToS-gray). Pick per budget when we automate.
- **Where the generated feed file lives:** committed by a CI job vs. object storage /
  KV / Vercel Blob. Chosen at Phase 1b.
- **When to add a real backend + DB + auth:** required for Company/Funding/Marketplace
  and the admin panel; the serverless + static-file approach bridges us until then.

---

*Maintained by the RoboFounders team. Co-Authored-By: Oz <oz-agent@warp.dev>*
