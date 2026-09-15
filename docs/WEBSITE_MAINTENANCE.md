# RoboFounders website maintenance

## Editing content

The launch website is English by default. The visible EN / 日本語 header buttons switch all first-party page content and save the visitor's choice locally. Both languages share the same URLs. Update matching keys in `frontend/src/content/en.js` and `ja.js` together; the tests check that their structures match.

The client's original `RoboFounders_WEB_Request.xlsx` and the later shared Google Sheet inform the copy. Yellow-highlighted requests in the shared sheet were treated as priorities. Japanese website translations should receive the client's final editorial review.

Launch scope is limited to roller screws and robotic hands. Roller-screw figures are development targets relative to a ball screw of the same screw diameter and lead, not certified performance guarantees. Do not reintroduce rolled-manufacturing, patent, shipment readiness, or guaranteed response-time claims without client approval. The later sheet specifically approves Morita's Toyota manufacturing background as part of the company origin story; do not broaden that biographical statement into a product or production claim.

The September client update replaces the earlier team illustrations with supplied profile media and expands the roster to ten people. Where the sheet contains no accessible photo, the website shows an initials placeholder rather than inventing a person’s image. Replace those placeholders when the client supplies the missing portraits or corrects Drive access.

## Structure

```text
frontend/src/
  content/                 English, Japanese, and shared media/contact data
  contexts/                Shared language state
  pages/                   Home, catalog, product details, privacy, ROI, 404
  components/
    layout/                Consistent navigation and footer
    home/                  Homepage-only sections
    products/              Product inquiry dialog
    shared/                Forms, images, metadata, motion, back-to-top
    ui/                    Existing UI primitives
  styles/site.css          Responsive website styling
frontend/public/
  images/brand/            Brand mark
  images/home/             Rofi illustration
  images/team/             Founder and existing team images
  images/events/           Existing event photography
  images/products/
    roller-screw/          Approved, optimized product photography
    robotic-hand/          Approved, optimized product photography
  videos/events/           Existing field clips
  videos/products/roller-screw/demonstration.mp4
```

`content/media.js` owns paths, product IDs, image dimensions, and contact recipients. Product photography and product video appear only on product routes. Homepage product previews use text and icons. Full-size links accompany detail-page gallery images, including the client's image with embedded English labels.

The highlighted 30–45 second homepage introduction-video request still needs a matching approved asset. The only supplied product video is an 8.5-second roller-screw clip, so it remains on the roller-screw page in line with the previously approved media placement. Do not repurpose or loop it as the missing homepage introduction.

## Updating product media

Keep original client deliveries outside the public directory. `frontend/scripts/prepare-product-media.py` reads the supplied ZIP, corrects EXIF orientation, exports WebP variants, and copies the supplied roller video. It performs no generative image edits. Run with Python and Pillow installed:

```powershell
python frontend/scripts/prepare-product-media.py "C:\path\client-images.zip" "C:\path\Roller.mp4"
```

`frontend/scripts/prepare-sheet-media.py` prepares the accessible homepage and team files downloaded from the later Google Sheet. Its source directory and expected filenames are documented in the script. It performs resize/re-encode work only:

```powershell
python frontend/scripts/prepare-sheet-media.py "C:\path\downloaded-sheet-media"
```

The 640/1600 filename suffix describes maximum image edge, not always width. If replacing images, update actual dimensions in `productImageSizes` in `content/media.js`. Keep descriptive names and separate product directories. Do not put unused originals or AI-generated product substitutes back into the public bundle.

## Routes and navigation

- `/`: section-based homepage; shared links navigate to the appropriate anchor from any page.
- `/products`: two-product catalog.
- `/products/roller-screw` and `/products/robotic-hand`: detail pages.
- `/products/robot-hand`: redirects to the canonical robotic-hand route for existing links.
- `/roi-calculator`: retained calculator using the shared language setting.
- Other URLs display a bilingual not-found page.

The fixed header becomes a compact menu on smaller screens. Product navigation remains in normal document flow. Forms and images reserve responsive space rather than overlaying copy.

## Inquiries

The shared inquiry form retains the existing FormSubmit endpoint and CC recipients in `content/media.js`. Validation, sending, success, and failure states are bilingual. Requests time out after 15 seconds; failed submissions retain entered text. Product inquiries include product context. No response-time guarantee is shown.

Automated tests mock the provider; they do not prove mailbox delivery. Before launch, the site owner should confirm FormSubmit activation and send a deliberate test from the production domain, then check the recipient and CC inboxes. No real test inquiry was sent during implementation.

## Verification and launch

```powershell
cd frontend
npm test -- --watchAll=false --runInBand
npm run build
npm start
```

Review both languages at phone, tablet, and desktop widths; check navigation, product images/video, inquiry dialog keyboard behavior, gallery full-size links, and news filters. Production hosting must rewrite client-side routes to `index.html` (existing hosting configuration should be verified when deploying). Titles and descriptions update client-side; this is not a server-rendered, locale-specific SEO implementation.

Implementation does not publish the website or change external services. Final launch checks include client approval of the Japanese copy and Made in Japan/product-target wording, a real owner-authorized form-delivery test, and the deployed route checks.

## Recoverable legacy files

The replaced landing components, old product components/content, and obsolete public media were archived locally at `C:\Users\Jacob\AppData\Local\Temp\robofounders-before-redesign-20260913`, preserving the pre-redesign files (including uncommitted versions). The active project no longer serves those obsolete media files. Client originals in Downloads were not changed. Copy this temporary backup to long-term storage if needed before Windows cleans temporary files.
