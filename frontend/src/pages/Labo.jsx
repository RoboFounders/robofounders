import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import ProductImage from "@/components/shared/ProductImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";

export default function Labo() {
  const { t } = useLanguage();
  const hand = t.products["robotic-hand"];
  return (
    <>
      <PageMeta title={t.meta.labo} description={t.labo.body} path="/labo" image="/images/products/robot-hand-new.jpg" />
      <Navbar />
      <main id="main-content" className="page-main">
        <section className="catalog-hero dark-section">
          <div className="wrap catalog-hero-card">
            <div className="catalog-hero-copy">
              <p className="eyebrow">{t.labo.label}</p>
              <h1>{t.labo.title}</h1>
              <p className="small-label">{t.labo.status}</p>
              <p className="section-lead">{t.labo.body}</p>
            </div>
            <figure className="catalog-hero-media">
              <img src="/images/products/robot-hand-new.jpg" alt={t.labo.imageAlt} className="catalog-hero-image" width="1600" height="900" />
            </figure>
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <p className="eyebrow">{t.labo.label}</p>
            <h2>{t.labo.focusTitle}</h2>
            <div className="benefits-grid">
              {t.labo.focus.map((item) => <article key={item}><h3>{item}</h3></article>)}
            </div>
            <p className="section-lead">{t.labo.collaboration}</p>
            <Link className="button primary" to="/#contact">{t.labo.cta}<ArrowUpRight size={18} /></Link>
          </div>
        </section>
        <section className="section soft-section" id="labo-gallery">
          <div className="wrap">
            <p className="eyebrow">{t.labo.label}</p>
            <h2>{t.ui.gallery}</h2>
            <div className="product-gallery hand-gallery">
              {media.products["robotic-hand"].gallery.map((path, index) => (
                <figure key={path}>
                  <ProductImage path={path} alt={hand.galleryAlts[index]} />
                  <figcaption>{hand.galleryAlts[index]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
