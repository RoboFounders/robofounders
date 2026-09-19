import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductImage from "@/components/shared/ProductImage";
import PageMeta from "@/components/shared/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { productIds, media } from "@/content/media";
export default function ProductCatalog() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta title={t.meta.products} />
      <Navbar />
      <main id="main-content" className="page-main">
        <section className="catalog-hero dark-section">
          <div className="wrap catalog-hero-card">
            <div className="catalog-hero-copy">
              <p className="eyebrow">{t.productsPage.label}</p>
              <h1>{t.productsPage.title}</h1>
              <p className="section-lead">{t.productsPage.body}</p>
            </div>
            <figure className="catalog-hero-media">
              <img
                src={media.robotHandNew}
                alt={t.productsPage.title}
                className="catalog-hero-image"
                loading="eager"
                width="1600"
                height="900"
              />
            </figure>
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <h2 className="sr-only">{t.productsPage.intro}</h2>
            <div className="catalog-grid">
              {productIds.map((id, i) => {
                const p = t.products[id];
                return (
                  <article className="catalog-card" key={id}>
                    <Link
                      to={`/products/${id}`}
                      className={`catalog-image ${id}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <ProductImage
                        path={media.products[id].hero}
                        alt=""
                        eager
                      />
                    </Link>
                    <div className="catalog-copy">
                      <p className="eyebrow">
                        {i === 0
                          ? t.productsPage.featured
                          : t.productsPage.second}
                      </p>
                      <h2>{p.name}</h2>
                      <h3>{p.tagline}</h3>
                      <p>{p.preview}</p>
                      <Link className="button outline" to={`/products/${id}`}>
                        {t.ui.details}
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section soft-section">
          <div className="wrap section-heading">
            <div>
              <p className="eyebrow">{t.productsPage.ecosystem}</p>
              <h2>{t.productsPage.ask}</h2>
              <p className="section-lead">{t.productsPage.askBody}</p>
            </div>
            <Link className="button primary" to="/#contact">
              {t.ui.contact}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
