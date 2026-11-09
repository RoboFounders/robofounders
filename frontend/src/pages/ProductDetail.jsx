import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Link from "@/components/shared/SiteLink";
import { ArrowUpRight, ArrowLeft, ArrowRight, Play } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductImage from "@/components/shared/ProductImage";
import PageMeta from "@/components/shared/PageMeta";
import AccessibleLoopVideo from "@/components/shared/AccessibleLoopVideo";
import InquiryDialog from "@/components/products/InquiryDialog";
import RollerScrewDiagram from "@/components/products/RollerScrewDiagram";
import NotFound from "./NotFound";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";
import { localizePath } from "@/lib/locale";
export default function ProductDetail() {
  const { productId } = useParams();
  const { t, lang } = useLanguage();
  const [intent, setIntent] = useState("");
  const { rollerEngineering: engineering, productsPage, contact } = t;
  if (productId === "robot-hand" || productId === "robotic-hand")
    return <Navigate replace to={localizePath("/labo", lang)} />;
  if (productId !== "roller-screw") return <NotFound />;
  const product = { ...t.products[productId], id: productId };
  const assets = media.products[productId];
  return (
    <>
      <PageMeta
        title={product.name}
        description={product.description}
        image={`${assets.hero}-1600.webp`}
      />
      <Navbar />
      <main id="main-content" className="page-main" data-testid="products-page">
        <div className="product-nav">
          <div className="wrap">
            <Link to="/products" className="all-products">
              <ArrowLeft size={16} />
              {t.ui.back}
            </Link>
            <nav aria-label={t.ui.products}>
              {["roller-screw"].map((id) => (
                <Link
                  to={`/products/${id}`}
                  key={id}
                  aria-current={id === productId ? "page" : undefined}
                >
                  {t.products[id].short}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <section
          className="product-hero roller"
          data-testid="product-hero"
        >
          <div className="wrap product-hero-grid">
            <div>
              <p className="eyebrow">{product.eyebrow}</p>
              <h1 data-testid="product-hero-title">{product.name}</h1>
              <h2>{product.tagline}</h2>
              <p className="section-lead">{product.description}</p>
              <p className="origin">
                <span />
                {productsPage.made}
              </p>
              <div className="actions">
                <button
                  type="button"
                  className="button primary"
                  onClick={() => setIntent("technical")}
                  data-testid="product-cta-talk"
                >
                  {contact.intents.technical}
                  <ArrowUpRight size={18} />
                </button>
                <a className="text-link" href="#performance">
                  {t.ui.performance}<ArrowRight size={18} />
                </a>
              </div>
            </div>
            <figure className="product-main-image">
              <ProductImage path={assets.hero} alt={product.imageAlt} eager />
              <figcaption>
                <span>RoboFounders</span>
                <span>{product.short}</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="section soft-section" id="mechanism">
          <div className="wrap mechanism-grid">
            <div>
              <p className="eyebrow">{t.ui.overview}</p>
              <h2>{engineering.mechanism}</h2>
              <p className="section-lead">{engineering.explanation}</p>
            </div>
            <RollerScrewDiagram content={engineering} />
          </div>
        </section>
        <section className="section targets-section" id="performance">
          <div className="wrap">
            <h2>{productsPage.target}</h2>
            <table className="engineering-target-table" aria-describedby="development-target-note">
              <caption>{productsPage.targetIntro}</caption>
              <thead>
                <tr>
                  <th scope="col">{engineering.metric}</th>
                  <th scope="col">{engineering.target}</th>
                </tr>
              </thead>
              <tbody>
                {productsPage.targetLabels.map((label) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>~4×</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="target-note" id="development-target-note">{productsPage.targetNote}</p>
            <div className="engineering-specs">
              <h3>{engineering.specs}</h3>
              <p>{engineering.specsBody}</p>
            </div>
          </div>
        </section>
        <section className="section" id="product-overview">
          <div className="wrap">
            <p className="eyebrow">{t.ui.overview}</p>
            <h2>{t.productsPage.overview}</h2>
            <div className="benefits-grid">
              {product.benefits.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section soft-section" id="applications">
          <div className="wrap">
            <h2>{t.ui.applications}</h2>
            <div className="benefits-grid">
              {engineering.applications.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section" id="roadmap">
          <div className="wrap">
            <h2>{productsPage.processTitle}</h2>
            <p className="section-lead">{productsPage.processBody}</p>
            <ol className="process-grid engineering-roadmap">
              {productsPage.process.map(([title, body]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <div className="actions">
              <button type="button" className="button primary" onClick={() => setIntent("custom")}>
                {contact.intents.custom}<ArrowUpRight size={18} />
              </button>
              <Link className="text-link" to="/partnerships">
                {contact.intents.coDevelopment}<ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        <section
          className="section soft-section"
          id="product-gallery"
          data-testid="product-gallery-section"
        >
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.ui.gallery}</p>
                <h2>{productsPage.gallery}</h2>
              </div>
              <span className="small-label">
                <Play size={14} />
                {t.ui.play}
              </span>
            </div>
            <div className="product-gallery roller-gallery">
              {assets.gallery.map((path, i) => (
                <figure key={path}>
                  <ProductImage path={path} alt={product.galleryAlts[i]} />
                  <figcaption>{product.galleryAlts[i]}</figcaption>
                  <a className="video-download" href={`${path}-1600.webp`} target="_blank" rel="noopener noreferrer">
                    {t.ui.enlarge}<ArrowUpRight size={15} />
                  </a>
                </figure>
              ))}
              <figure className="video-figure">
                <AccessibleLoopVideo src={assets.video} poster={`${assets.hero}-1600.webp`} label={t.ui.play} />
                <figcaption>{productsPage.videoCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="section product-cta dark-section">
          <div className="wrap">
            <p className="eyebrow">{t.productsPage.ecosystem}</p>
            <h2>{t.productsPage.specification}</h2>
            <p className="section-lead">{t.productsPage.ecosystemBody}</p>
            <button
              type="button"
              className="button primary"
              onClick={() => setIntent("technical")}
            >
              {contact.intents.technical}
              <ArrowUpRight size={18} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <InquiryDialog
        isOpen={Boolean(intent)}
        onClose={() => setIntent("")}
        intent={intent || "technical"}
        product={product}
      />
    </>
  );
}
