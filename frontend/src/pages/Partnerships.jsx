import { useState } from "react";
import Link from "@/components/shared/SiteLink";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InquiryDialog from "@/components/products/InquiryDialog";
import PageMeta from "@/components/shared/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";

export default function Partnerships() {
  const { t } = useLanguage();
  const [intent, setIntent] = useState("");
  const { partnerships } = t;

  return (
    <>
      <PageMeta title={partnerships.title} description={partnerships.body} image={media.home.startups} />
      <Navbar />
      <main id="main-content" className="page-main">
        <section className="catalog-hero dark-section">
          <div className="wrap catalog-hero-card">
            <div className="catalog-hero-copy">
              <p className="eyebrow">{partnerships.label}</p>
              <h1>{partnerships.title}</h1>
              <p className="section-lead">{partnerships.body}</p>
              <div className="actions">
                <button type="button" className="button primary" onClick={() => setIntent("coDevelopment")}>
                  {t.contact.intents.coDevelopment}<ArrowUpRight size={18} />
                </button>
              </div>
            </div>
            <figure className="catalog-hero-media">
              <img className="catalog-hero-image" src={media.home.startups} alt={t.startups.imageAlt} width="1600" height="1066" />
            </figure>
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <h2>{partnerships.audiencesTitle}</h2>
            <ul className="partner-types partnership-audiences">
              {partnerships.audiences.map((audience) => <li key={audience}>{audience}</li>)}
            </ul>
          </div>
        </section>
        <section className="section soft-section">
          <div className="wrap">
            <h2>{partnerships.opportunitiesTitle}</h2>
            <div className="benefits-grid partnership-opportunities">
              {partnerships.opportunities.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <Link className="text-link partnership-announcement" to="/news/physical-ai-robotics-partners-2026">
              {partnerships.announcement}<ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <section className="section product-cta dark-section">
          <div className="wrap">
            <h2>{partnerships.contactTitle}</h2>
            <p className="section-lead">{partnerships.contactBody}</p>
            <div className="actions">
              <button type="button" className="button primary" onClick={() => setIntent("partnership")}>
                {t.contact.intents.partnership}<ArrowUpRight size={18} />
              </button>
              <button type="button" className="button ghost" onClick={() => setIntent("poc")}>
                {t.contact.intents.poc}<ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <InquiryDialog isOpen={Boolean(intent)} onClose={() => setIntent("")} intent={intent || "coDevelopment"} />
    </>
  );
}
