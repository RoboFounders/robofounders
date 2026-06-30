---
name: RoboFounders theme/accent system
description: How brand accent colors are structured across the landing page, for global recolors
---

# Accent color system

The brand accent (currently royal-blue/indigo `#4d6bff` → `#6a4dff`) lives in two layers:

1. **Centralized**: `frontend/src/index.css` — CSS vars (`--rf-primary`, `--rf-secondary`, shadcn `--primary`/`--accent`/`--ring` HSL) and the `rf-*` utility classes (`rf-cyan-gradient` [name kept despite blue], `rf-text-gradient`, `rf-glow`, `rf-radial-glow`, `rf-grid-bg`, selection, scrollbar).
2. **Inline literals**: many landing components hardcode hex tints in Tailwind arbitrary classes (e.g. button bg, hover borders, light-tint chip backgrounds).

**How to apply (global recolor):** edit `index.css` first, then sweep component hex literals with a perl one-liner across `frontend/src/components/landing/*.jsx`. After any sweep, grep for leftover old hexes — they hide in hover/border/light-tint tokens (past stragglers: `#5ee9f3`, `#9fe9f0`, `#eef7f9`, `#e0f7fa`).

**Why:** the original cyan theme was split between centralized utilities and per-component literals, so a CSS-only change leaves visible cyan behind.

# Other notes
- Navbar logo uses `/images/logo-mark.png` (background removed from logo-icon) rendered white via inline `filter: brightness(0) invert(1)` on the dark navbar.
- Hero scroll cue links to `#stats`; that id lives on the `StatsBar` section.
