# RoboFounders Physical AI Website

Official bilingual website for [RoboFounders](https://www.robofounders.ai), presenting the company’s Physical AI platform for dangerous manufacturing.

The website communicates a clear mission—**Protect People. Automate Danger.**—and connects RoboFounders’ capabilities across robotics components, AI integration, manufacturing automation, worker safety, and international deployment across Japan, ASEAN, and the United States.

## Website highlights

- English-first experience with a visible `EN / 日本語` language switcher
- Responsive, section-based corporate homepage
- Dedicated product catalog and product-detail pages
- Initial product launch for planetary roller screws and robotic hands
- Client-provided product, company, event, and team media
- Accessible looping video and marquee controls
- Product-specific inquiry dialogs and a general contact form
- Privacy notice, route-aware metadata, sitemap, and crawler configuration
- Static production delivery through Vercel, Render, or Docker/Nginx

## Technology

| Area | Implementation |
| --- | --- |
| Application | React 19 |
| Routing | React Router |
| Build system | Create React App with CRACO |
| Styling | Custom responsive CSS, Tailwind CSS utilities |
| Components | Radix UI primitives and local reusable components |
| Animation | Framer Motion and CSS motion |
| Icons | Lucide React |
| Form delivery | FormSubmit |
| Testing | Jest and React DOM test utilities |
| Hosting | Vercel, Render, or Docker with Nginx |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Main Physical AI corporate website |
| `/products` | Product catalog |
| `/products/roller-screw` | Planetary roller screw details |
| `/products/robotic-hand` | Robotic hand details |
| `/products/robot-hand` | Compatibility redirect to `/products/robotic-hand` |
| `/privacy` | Bilingual privacy notice |
| `/roi-calculator` | Retained ROI calculator |
| Any unmatched route | Bilingual not-found page |

Homepage navigation uses section anchors for About Us, Technology, Our Works, Partners, News & Events, Team, and Contact.

## Project structure

```text
robofounders/
├── .gitignore                  Local files, builds, secrets, and agent tools
├── README.md                   Project overview and operating guide
├── Dockerfile                 Two-stage React build and Nginx image
├── render.yaml                Render static-site deployment settings
├── vercel.json                Vercel settings when the repository is the root
└── frontend/
    ├── package.json           Dependencies and npm scripts
    ├── package-lock.json      Reproducible npm dependency lockfile
    ├── yarn.lock              Reproducible Yarn dependency lockfile
    ├── craco.config.js        Aliases, Jest, ESLint, and development server
    ├── vercel.json            Vercel settings when `frontend` is the root
    ├── public/
    │   ├── index.html         Base HTML and fallback social metadata
    │   ├── robots.txt         Search-engine crawler rules
    │   ├── sitemap.xml        Public route sitemap
    │   ├── images/
    │   │   ├── brand/         Color and reversed RoboFounders logos
    │   │   ├── events/        “Moments from the field” photography
    │   │   ├── home/          Homepage and company imagery
    │   │   ├── products/      Optimized product images by product
    │   │   └── team/          Founder and team portraits
    │   └── videos/
    │       ├── events/        Field and event clips
    │       ├── home/          Physical AI concept film
    │       └── products/      Product demonstration videos
    ├── scripts/
    │   ├── prepare-product-media.py  Prepare product ZIPs and video
    │   └── prepare-sheet-media.py    Prepare homepage/team sheet assets
    └── src/
        ├── index.js           React application entry point
        ├── App.js             Providers and route definitions
        ├── App.css            Legacy/global application styles
        ├── index.css          Base CSS and Tailwind layers
        ├── styles/
        │   └── site.css       Main responsive visual system
        ├── pages/             Route-level page components
        ├── components/        Reusable interface components
        ├── content/           English, Japanese, and shared media data
        ├── contexts/          Shared language state
        ├── lib/               Navigation and utility helpers
        ├── hooks/             Shared React hooks
        └── constants/         Stable test identifiers
```

## Important source files

### Application and pages

| File | Responsibility |
| --- | --- |
| `src/App.js` | Defines application providers, public routes, scrolling behavior, and notifications |
| `src/pages/Home.jsx` | Composes the complete section-based homepage |
| `src/pages/ProductCatalog.jsx` | Presents the initial product portfolio |
| `src/pages/ProductDetail.jsx` | Renders localized product details, responsive media, and inquiry actions |
| `src/pages/Privacy.jsx` | Provides the English and Japanese privacy notice |
| `src/pages/ROICalculator.jsx` | Retains the existing ROI calculator route |
| `src/pages/NotFound.jsx` | Handles invalid URLs without leaving a blank screen |

### Content and localization

| File | Responsibility |
| --- | --- |
| `src/content/en.js` | English navigation, homepage, team, product, form, and interface copy |
| `src/content/ja.js` | Japanese content with the same structure as the English dictionary |
| `src/content/media.js` | Central source for image paths, video paths, product IDs, dimensions, and contact configuration |
| `src/content/content.test.js` | Verifies matching localization structure and required launch content |
| `src/contexts/LanguageContext.jsx` | Controls language selection and remembers it in local storage |

Always update `en.js` and `ja.js` together. The content test intentionally fails when their structures diverge.

### Components

| Directory or file | Responsibility |
| --- | --- |
| `components/layout/` | Shared navigation and footer |
| `components/home/` | Homepage ecosystem, field gallery, updates, and team sections |
| `components/products/` | Product inquiry dialog |
| `components/shared/AccessibleLoopVideo.jsx` | Muted looping video with accessible play/pause behavior |
| `components/shared/InquiryForm.jsx` | Validation and FormSubmit delivery for general and product inquiries |
| `components/shared/PageMeta.jsx` | Per-route titles, canonical URLs, robots directives, and social metadata |
| `components/shared/ProductImage.jsx` | Responsive product image variants and dimensions |
| `components/shared/Reveal.jsx` | Reusable scroll-reveal behavior |
| `components/shared/BackToTop.jsx` | Keyboard-accessible return-to-top control |
| `components/ui/` | Reusable Radix-based interface primitives |

## Requirements

- Node.js 20 LTS recommended
- npm 10+ or Yarn 1.22
- Python 3 and Pillow only when preparing replacement media
- Docker only when using the container workflow

No environment variables are required to render the static website locally. Never commit `.env` files, API tokens, downloaded client ZIPs, or local agent tooling.

## Local development

From the repository root:

```bash
cd frontend
npm ci
npm start
```

The CRACO development server is configured for port `5000`. Open:

```text
http://localhost:5000
```

If dependencies are intentionally changed, use `npm install <package>` and commit the updated `package.json` and `package-lock.json` together.

### Yarn alternative

```bash
cd frontend
yarn install --frozen-lockfile
yarn start
```

Do not mix npm and Yarn while changing dependencies in the same update unless both lockfiles are deliberately synchronized.

## Testing and production build

Run the automated tests:

```bash
cd frontend
npm test -- --watchAll=false --runInBand
```

Create an optimized production build:

```bash
cd frontend
npm run build
```

Production output is generated in `frontend/build/`. The directory is ignored by Git and must not be committed.

Before release, verify at minimum:

1. English and Japanese navigation and content
2. Homepage section links and mobile menu
3. Both product pages and full-size product images
4. Video autoplay, looping, and pause controls
5. General and product inquiry validation
6. Direct refreshes on `/products`, product details, and `/privacy`
7. `robots.txt`, `sitemap.xml`, canonical URLs, and social metadata
8. Mobile layouts without horizontal overflow or cropped essential content

Automated form tests mock the external provider. A deliberate production-domain submission is still required to confirm FormSubmit activation and mailbox delivery.

## Updating website content

1. Update the corresponding key in `frontend/src/content/en.js`.
2. Apply the equivalent update in `frontend/src/content/ja.js`.
3. Update media paths in `frontend/src/content/media.js` when assets change.
4. Run the tests and production build.
5. Review both languages at desktop and mobile widths.

Do not add unsupported manufacturing, patent, shipment-readiness, performance-guarantee, or response-time claims without client approval.

## Updating media

Keep original client downloads outside `frontend/public`. Only optimized production assets should be published.

Product media preparation:

```powershell
python frontend/scripts/prepare-product-media.py "C:\path\client-images.zip" "C:\path\Roller.mp4"
```

Homepage and team media preparation:

```powershell
python frontend/scripts/prepare-sheet-media.py "C:\path\downloaded-sheet-media"
```

After replacing product images, confirm the responsive dimensions in `productImageSizes` inside `src/content/media.js`.

## Deployment

### Vercel

This repository supports both common Vercel project-root configurations:

- Repository root: uses `/vercel.json`, builds `frontend`, and publishes `frontend/build`
- `frontend` root: uses `/frontend/vercel.json` and Create React App defaults

Both configurations provide SPA rewrites, security headers, and static media caching. Choose one Root Directory in the Vercel dashboard and keep it consistent. Branch pushes should be reviewed through a preview deployment before promotion or merge to the production branch.

### Render

`render.yaml` builds the React application and publishes `frontend/build` as a static site with SPA routing and production headers.

### Docker

Build and run the production Nginx container from the repository root:

```bash
docker build -t robofounders-web .
docker run --rm -p 8080:80 --name robofounders-web robofounders-web
```

Then open `http://localhost:8080`.

## Git and release workflow

Recommended Git workflow:

```bash
git switch -c descriptive-branch-name
git add <related-files>
git commit -m "type(scope): describe the completed change"
git push -u origin descriptive-branch-name
```

Keep commits focused by responsibility—content, media, products, accessibility, deployment, or documentation—so releases remain easy to review and revert.
