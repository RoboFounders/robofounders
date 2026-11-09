import { useState } from "react";
import Link from "@/components/shared/SiteLink";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  ScanEye,
  Factory,
  Bot,
  PencilRuler,
  Boxes,
  Globe2,
  Network,
  Orbit,
  Pause,
  Play,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import InquiryForm from "@/components/shared/InquiryForm";
import InquiryDialog from "@/components/products/InquiryDialog";
import ProductImage from "@/components/shared/ProductImage";
import FieldGallery from "@/components/home/FieldGallery";
import Team from "@/components/home/Team";
import Updates from "@/components/home/Updates";
import AccessibleLoopVideo from "@/components/shared/AccessibleLoopVideo";

import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";

const rollerId = "roller-screw";
const rollerPath = `/products/${rollerId}`;
const serviceIcons = [PencilRuler, Boxes, Factory, Globe2, Orbit];
const factoryIcons = [ScanEye, Factory, Bot];
export default function Home() {
  const { t } = useLanguage();
  const accentBreak = t.hero.accent.indexOf("・") + 1;
  const product = { ...t.products[rollerId], id: rollerId };
  const closeUp = media.products[rollerId].closeUp;
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);
  return (
    <>
      <PageMeta title={t.meta.home} image={`${closeUp}-1600.webp`} />
      <Navbar />
      <main id="main-content" className="page-main">
        <section id="hero" className="home-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                {t.hero.label}
              </p>
              <h1>
                {t.hero.title}
                <span>
                  {accentBreak ? (
                    <>
                      <span className="hero-accent-phrase">{t.hero.accent.slice(0, accentBreak)}</span>
                      <wbr />
                      {t.hero.accent.slice(accentBreak)}
                    </>
                  ) : t.hero.accent}
                </span>
              </h1>
              <p className="hero-line">{t.hero.line}</p>
              <p className="hero-body">{t.hero.body}</p>
              <div className="actions">
                <Link className="button primary" to={rollerPath}>
                  {t.hero.primaryCta}
                  <ArrowUpRight size={18} />
                </Link>
                <button
                  type="button"
                  className="button ghost"
                  onClick={() => setConsultationOpen(true)}
                >
                  {t.contact.intents.technical}
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
            <figure className="hero-media roller-hero-media">
              <ProductImage path={closeUp} alt={product.imageAlt} eager />
              <figcaption>
                <span>{t.technology.label}</span>
                <strong>{product.name}</strong>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="section core-motion-section" id="technology">
          <div className="wrap core-motion-grid">
            <div>
              <p className="eyebrow">{t.technology.label}</p>
              <h2>{t.technology.title}</h2>
              <p className="section-lead">{t.technology.body}</p>
              <ul className="tags core-motion-tags">
                {t.technology.applications.map((application) => (
                  <li key={application}>{application}</li>
                ))}
              </ul>
              <Link className="button outline" to={rollerPath}>
                {t.hero.primaryCta}
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <ProductImage path={media.products[rollerId].hero} alt={product.galleryAlts[0]} />
          </div>
        </section>
        <section className="section soft-section" id="engineering">
          <div className="wrap">
            <div className="split-heading">
              <div>
                <p className="eyebrow">{t.why.label}</p>
                <h2>{t.why.title}</h2>
              </div>
              <p className="section-lead">{t.why.body}</p>
            </div>
            <div className="why-grid">
              {t.why.items.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <img
              className="section-wide-image why-reference-image"
              src={media.home.why}
              alt={t.why.imageAlt}
              loading="lazy"
              width="1800"
              height="1200"
            />
          </div>
        </section>
        <section id="how" className="section">
          <div className="wrap">
            <div className="split-heading">
              <div>
                <p className="eyebrow">{t.about.label}</p>
                <h2 className="client-line-breaks">{t.about.title}</h2>
              </div>
              <p className="section-lead">{t.about.body}</p>
            </div>
            <div className="section-divider" />
            <p className="eyebrow">{t.services.label}</p>
            <h3 className="subheading">{t.services.title}</h3>
            <p>{t.services.body}</p>
            <div className="services-grid">
              {t.services.items.map(([name, title, body], i) => {
                const Icon = serviceIcons[i];
                return (
                  <article key={name}>
                    <div className="card-top">
                      <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                    </div>
                    <h4>{name}</h4>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section company-section">
          <div className="wrap company-grid">
            <figure className="company-media">
              <img
                src={media.home.about}
                alt={t.company.imageAlt}
                loading="lazy"
                width="952"
                height="637"
              />
              <figcaption>{t.company.label}</figcaption>
            </figure>
            <div className="company-copy">
              <p className="eyebrow">{t.company.label}</p>
              <h2>{t.company.title}</h2>
              <p className="section-lead">{t.company.body}</p>
              <section className="company-profile" id="company-profile" aria-labelledby="company-profile-heading">
                <h3 id="company-profile-heading">{t.companyProfile.title}</h3>
                <dl className="company-facts">
                  <div>
                    <dt>{t.companyProfile.nameLabel}</dt>
                    <dd>{t.companyProfile.name}</dd>
                  </div>
                  <div>
                    <dt>{t.companyProfile.officeLabel}</dt>
                    <dd>{t.companyProfile.office}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
          <div className="wrap encounter-grid company-mission-only">
            <aside className="company-mission">
              <h4>{t.company.missionTitle}</h4>
              <div className="challenge-list">
                {t.company.challenges.map((challenge) => (
                  <span key={challenge}>{challenge}</span>
                ))}
              </div>
              <p>{t.company.mission}</p>
            </aside>
          </div>
        </section>
        <section className="section soft-section">
          <div className="wrap">
            <p className="eyebrow">{t.regions.label}</p>
            <h2>{t.regions.title}</h2>
            <p className="section-lead">{t.regions.body}</p>
            <div className="regions-route" aria-hidden="true">
              {t.regions.items.map(([name, , , role]) => (
                <div className="regions-route-node" key={name}>
                  <span className="regions-route-icon">
                    <Globe2 size={34} strokeWidth={1.15} />
                  </span>
                  <strong>{name}</strong>
                  <small>{role}</small>
                </div>
              ))}
            </div>
            {/* Global ecosystem image is temporarily hidden pending client approval. */}
            <div className="regions-grid">
              {t.regions.items.map(([name, title, body, role]) => (
                <article key={name}>
                  <div className="region-art" aria-hidden="true">
                    <Globe2 size={140} strokeWidth={0.45} />
                  </div>
                  <span className="small-label">{role}</span>
                  <h3>{name}</h3>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section soft-section story-section">
          <div className="wrap story-grid">
            <div>
              <p className="eyebrow">{t.story.label}</p>
              <h2>{t.story.title}</h2>
              <blockquote>"{t.story.quote}"</blockquote>
              <span className="small-label">
                Mariel Asami Fukase / {t.team.founderRole}
              </span>
            </div>
            <div className="story-copy">
              <p>{t.story.paragraphs[0]}</p>
              <details>
                <summary>
                  {t.story.more}
                  <Plus size={18} />
                </summary>
                {t.story.paragraphs.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </details>
            </div>
          </div>
        </section>
        <FieldGallery />
        <section className="section soft-section" id="labo">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.labo.label}</p>
                <h2>{t.labo.homeTitle}</h2>
              </div>
              <Link className="text-link" to="/labo">
                {t.labo.status} <ArrowUpRight size={18} />
              </Link>
            </div>
            <p className="section-lead">{t.labo.homeBody}</p>
            <div className="technology-grid">
              <Link className="technology-card" to="/labo">
                <img className="tech-image tech-image--robotic-hand" src={media.robotHandNew} alt={t.labo.imageAlt} loading="lazy" width="100" height="100" />
                <span className="eyebrow">{t.labo.status}</span>
                <h3>{t.productsPage.laboName}</h3>
                <p>{t.labo.homeBody}</p>
                <span className="text-link">{t.labo.explore} <ArrowUpRight size={20} /></span>
              </Link>
            </div>
          </div>
        </section>
        <section className="section platform-section">
          <div className="wrap">
            <p className="eyebrow">{t.platform.label}</p>
            <h2 className="client-line-breaks">{t.platform.title}</h2>
            <p className="section-lead">{t.platform.body}</p>
            <div className="platform-grid">
              {t.platform.items.map(([name, body]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <p className="platform-closing">
              <Network size={25} />
              {t.platform.closing}
            </p>
          </div>
        </section>
        <section
          className="brand-marquee"
          aria-label={`${t.marquee.label}: ${t.marquee.items.join(". ")}`}
        >
          <div
            className={`brand-marquee-track${marqueePaused ? " is-paused" : ""}`}
            aria-hidden="true"
          >
            {[0, 1].map((copy) => (
              <div className="brand-marquee-group" key={copy}>
                {t.marquee.items.map((item) => (
                  <span className="brand-marquee-item" key={`${copy}-${item}`}>
                    {item}
                    <span className="brand-marquee-dot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="marquee-motion-toggle"
            onClick={() => setMarqueePaused((paused) => !paused)}
            aria-label={marqueePaused ? t.ui.resumeMarquee : t.ui.pauseMarquee}
            aria-pressed={marqueePaused}
          >
            {marqueePaused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </button>
        </section>
        <section id="physical-ai-film" className="section concept-film-section">
          <div className="wrap concept-film-grid">
            <figure className="concept-film-media">
              <AccessibleLoopVideo
                src={media.conceptFilm}
                poster={media.conceptFilmPoster}
                label={t.showcase.videoAlt}
                preload="none"
                startWhenVisible
                showToggle={false}
                showAudioToggle
              />
            </figure>
            <div className="concept-film-copy">
              <p className="eyebrow">{t.showcase.label}</p>
              <h2 className="client-line-breaks">{t.showcase.title}</h2>
              <p className="section-lead client-line-breaks">{t.showcase.body}</p>
              <div className="concept-film-points">
                {t.showcase.points.map(([title, body]) => (
                  <div key={title}>
                    <p>
                      <strong>{title}</strong>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
              <Link className="button outline" to="/products">
                {t.showcase.cta}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        <section className="section dark-section" id="solutions">
          <div className="wrap">
            <div className="split-heading">
              <div>
                <p className="eyebrow">{t.factory.label}</p>
                <h2 className="client-line-breaks">{t.factory.title}</h2>
              </div>
              <p className="section-lead">{t.factory.body}</p>
            </div>
            <div className="factory-grid">
              {t.factory.items.map(([title, body], i) => {
                const Icon = factoryIcons[i];
                return (
                  <article key={title}>
                    <Icon size={27} strokeWidth={1.3} />
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                );
              })}
            </div>
            <div className="actions solutions-actions">
              <Link className="button primary" to="/#contact">
                {t.factory.projectCta}<ArrowUpRight size={18} />
              </Link>
              <Link className="button ghost" to="/#works">
                {t.factory.worksCta}<ArrowRight size={18} />
              </Link>
            </div>
            <div className="factory-deployment-video">
              <AccessibleLoopVideo
                src={media.home.factoryVideo}
                poster={media.home.factoryVideoPoster}
                label={t.factory.videoLabel}
                preload="none"
                startWhenVisible
                showToggle={false}
                showAudioToggle
              />
            </div>
          </div>
        </section>
        <section className="section" id="works">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.works.label}</p>
                <h2>{t.works.title}</h2>
              </div>
              <Link to="/#contact" className="text-link">
                {t.works.cta}
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="works-grid">
              {t.works.items.map(([tag, title, body], i) => (
                <article key={title}>
                  <img
                    src={[media.aseanSummit, media.events[0], media.aseanMou][i]}
                    alt={title}
                    loading="lazy"
                    width={[1816, 1600, 1600][i]}
                    height={[1211, 1316, 1066][i]}
                  />
                  <p className="eyebrow">{tag}</p>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="founders" className="section startup-section">
          <div className="wrap startup-grid">
            <div className="startup-copy">
              <p className="eyebrow">{t.startups.label}</p>
              <h2>{t.startups.title}</h2>
              <p className="section-lead client-line-breaks">{t.startups.body}</p>
              <Link className="button primary" to="/partnerships">
                {t.startups.cta}
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="startup-details">
              <p className="startup-line">{t.startups.line}</p>
              <div className="partner-types">
                {t.startups.partners.map((x) => (
                  <span key={x}>
                    {x}
                    <Plus size={14} />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="wrap startup-media-wrap">
            <img
              className="section-wide-image startup-reference-image"
              src={media.home.startups}
              alt={t.startups.imageAlt}
              loading="lazy"
              width="1600"
              height="1066"
            />
          </div>
        </section>
        <Updates />
        <Team />
        <section id="contact" className="section contact-section">
          <div className="wrap contact-grid">
            <div>
              <p className="eyebrow">{t.contact.label}</p>
              <h2>
                {t.contact.title}
                <span>{t.contact.accent}</span>
              </h2>
              <p className="section-lead">{t.contact.body}</p>
              <span className="eyebrow">{t.hero.label}</span>
              <img
                className="contact-image"
                src={media.home.contact}
                alt={t.contact.imageAlt}
                loading="lazy"
                width="1024"
                height="1536"
              />
            </div>
            <div className="contact-form-panel">
              <h3>{t.contact.formTitle}</h3>
              <InquiryForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <InquiryDialog
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        product={product}
        intent="technical"
      />
    </>
  );
}
