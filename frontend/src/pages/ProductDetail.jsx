import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight, Play, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductImage from "@/components/shared/ProductImage";
import PageMeta from "@/components/shared/PageMeta";
import AccessibleLoopVideo from "@/components/shared/AccessibleLoopVideo";
import InquiryDialog from "@/components/products/InquiryDialog";
import NotFound from "./NotFound";
import { useLanguage } from "@/contexts/LanguageContext";
import { media, productIds } from "@/content/media";
export default function ProductDetail() {
  const { productId } = useParams();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  if (productId === "robot-hand")
    return <Navigate replace to="/products/robotic-hand" />;
  if (!productIds.includes(productId)) return <NotFound />;
  const product = { ...t.products[productId], id: productId };
  const assets = media.products[productId];
  const roller = productId === "roller-screw";
  const hasGallery = assets.gallery.length > 0 || Boolean(assets.video);
  const other = roller ? "robotic-hand" : "roller-screw";
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
              {productIds.map((id) => (
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
          className={`product-hero ${roller ? "roller" : "hand"}`}
          data-testid="product-hero"
        >
          <div className="wrap product-hero-grid">
            <div>
              <p className="eyebrow">{product.eyebrow}</p>
              <h1 data-testid="product-hero-title">{product.name}</h1>
              <h2>{product.tagline}</h2>
              <p className="section-lead">{product.description}</p>
              {(roller || product.proof) && (
                <p className="origin">
                  <span />
                  {roller ? t.productsPage.made : product.proof}
                </p>
              )}
              <div className="actions">
                <button
                  type="button"
                  className="button primary"
                  onClick={() => setOpen(true)}
                  data-testid="product-cta-talk"
                >
                  {t.ui.engineering}
                  <ArrowUpRight size={18} />
                </button>
                {hasGallery && (
                  <a className="text-link" href="#product-gallery">
                    {t.ui.gallery}
                    <ArrowRight size={18} />
                  </a>
                )}
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
        {roller && (
          <section className="section targets-section" id="performance">
            <div className="wrap">
              <p className="eyebrow">{t.productsPage.target}</p>
              <h2>{t.productsPage.targetIntro}</h2>
              <div className="target-grid">
                {t.productsPage.targetLabels.map((label) => (
                  <div key={label}>
                    <strong>
                      ~4<span>×</span>
                    </strong>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
              <p className="target-note">{t.productsPage.targetNote}</p>
            </div>
          </section>
        )}
        <section className="section" id="product-overview">
          <div className="wrap">
            <p className="eyebrow">{t.ui.overview}</p>
            <h2>{t.productsPage.overview}</h2>
            <div className="benefits-grid">
              {product.benefits.map(([title, body], i) => (
                <article key={title}>
                  <span className="small-label">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            {product.collaboration && (
              <p className="product-collaboration">{product.collaboration}</p>
            )}
            <div className="application-row">
              <h3>{t.ui.applications}</h3>
              <div className="tags">
                {product.applications.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {hasGallery && (
          <section
            className="section soft-section"
            id="product-gallery"
            data-testid="product-gallery-section"
          >
            <div className="wrap">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{t.ui.gallery}</p>
                  <h2>{t.productsPage.gallery}</h2>
                </div>
                {roller && (
                  <span className="small-label">
                    <Play size={14} />
                    {t.ui.play}
                  </span>
                )}
              </div>
              <div
                className={`product-gallery ${roller ? "roller-gallery" : "hand-gallery"}`}
              >
                {assets.gallery.map((path, i) => (
                  <figure key={path}>
                    <ProductImage path={path} alt={product.galleryAlts[i]} />
                    <figcaption>{product.galleryAlts[i]}</figcaption>
                    <a
                      className="video-download"
                      href={`${path}-1600.webp`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.ui.enlarge}
                      <ArrowUpRight size={15} />
                    </a>
                  </figure>
                ))}
                {assets.video && (
                  <figure className="video-figure">
                    <AccessibleLoopVideo
                      src={assets.video}
                      poster={`${assets.hero}-1600.webp`}
                      label={t.ui.play}
                    />
                    <figcaption>{t.productsPage.videoCaption}</figcaption>
                  </figure>
                )}
              </div>
            </div>
          </section>
        )}
        {roller && (
          <section className="section">
            <div className="wrap">
              <p className="eyebrow">{t.productsPage.processTitle}</p>
              <h2>{t.productsPage.processBody}</h2>
              <div className="process-grid">
                {t.productsPage.process.map(([title, body], i) => (
                  <article key={title}>
                    <div>
                      <span>0{i + 1}</span>
                      {i < 2 && <ArrowRight size={20} />}
                    </div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="section product-cta dark-section">
          <div className="wrap">
            <p className="eyebrow">{t.productsPage.ecosystem}</p>
            <h2>{t.productsPage.specification}</h2>
            <p className="section-lead">{t.productsPage.ecosystemBody}</p>
            <button
              type="button"
              className="button primary"
              onClick={() => setOpen(true)}
            >
              {t.ui.engineering}
              <ArrowUpRight size={18} />
            </button>
          </div>
        </section>
        <section className="other-product">
          <div className="wrap">
            <div>
              <p className="eyebrow">{t.ui.next}</p>
              <h2>{t.products[other].name}</h2>
            </div>
            <Link to={`/products/${other}`} className="button outline">
              {t.ui.details}
              <Plus size={19} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <InquiryDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        product={product}
      />
    </>
  );
}
