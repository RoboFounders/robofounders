# RoboFounders — Bilingual Website

A React website for RoboFounders' Physical AI ecosystem, with English and Japanese content, a section-based homepage, and dedicated product catalog and detail pages. Initial products are roller screws and robotic hands.

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
- `frontend/src/components/{layout,home,products,shared}/`: focused, reusable components.
- `frontend/src/styles/site.css`: responsive website styles.
- `frontend/public/images/{brand,home,team,events,products}/`: organized images.
- `frontend/public/videos/{events,products}/`: organized videos.

See [Website maintenance](docs/WEBSITE_MAINTENANCE.md) for editing guidance, media preparation, inquiry behavior, retained content, and launch checks.

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
