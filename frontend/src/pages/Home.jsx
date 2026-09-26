import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Cog,
  ScanEye,
  Factory,
  Bot,
  PencilRuler,
  Boxes,
  Globe2,
  Network,
  Orbit,
  BrainCircuit,
  ShieldCheck,
  PlayCircle,
  Pause,
  Play,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import InquiryForm from "@/components/shared/InquiryForm";
import FieldGallery from "@/components/home/FieldGallery";
import Team from "@/components/home/Team";
import Updates from "@/components/home/Updates";
import AccessibleLoopVideo from "@/components/shared/AccessibleLoopVideo";

const productCardImages = {
  "roller-screw": "/images/products/roller-screw/assembly-640.webp",
  "robotic-hand": "/images/products/robot-hand-new.jpg",
};
import { useLanguage } from "@/contexts/LanguageContext";
import { media, productIds } from "@/content/media";

const serviceIcons = [PencilRuler, Boxes, Factory, Globe2, Orbit];
const factoryIcons = [ScanEye, Factory, Bot];
const heroCapabilityIcons = [Cog, BrainCircuit, Factory, ShieldCheck];
export default function Home() {
  const { t } = useLanguage();
  const [marqueePaused, setMarqueePaused] = useState(false);
  return (
    <>
      <PageMeta title={t.meta.home} />
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
                <span>{t.hero.accent}</span>
              </h1>
              <p className="hero-line">{t.hero.line}</p>
              <p className="hero-body">{t.hero.body}</p>
              <p className="hero-body hero-body-secondary">
                {t.hero.bodySecondary}
              </p>
              <div className="hero-statements">
                {t.hero.statements.map((statement) => (
                  <strong key={statement}>{statement}</strong>
                ))}
              </div>
              <p className="hero-build-label">{t.hero.buildLabel}</p>
              <div
                className="hero-capabilities"
                aria-label={t.hero.buildLabel}
              >
                {t.hero.capabilities.map((capability, index) => {
                  const Icon = heroCapabilityIcons[index];
                  return (
                    <span key={capability}>
                      <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                      {capability}
                    </span>
                  );
                })}
              </div>
              <div className="actions">
                <Link className="button primary" to="/products">
                  {t.hero.primaryCta}
                  <ArrowUpRight size={18} />
                </Link>
                <Link className="button ghost" to="/#contact">
                  {t.hero.secondaryCta}
                  <ArrowRight size={17} />
                </Link>
              </div>
              <p className="hero-foot">{t.hero.foot}</p>
            </div>
            <figure className="hero-media hero-video-media">
              <div className="hero-video-container">
                <AccessibleLoopVideo
                  src={media.homeVideo}
                  poster={media.home.hero}
                  label={t.showcase.videoLabel}
                  showToggle={false}
                />
                <img
                  className="hero-video-brandmark"
                  src={media.logoGalaxy}
                  width="64"
                  height="45"
                  alt="RoboFounders"
                  aria-hidden="true"
                />
              </div>
            </figure>
          </div>
          <div className="hero-bottom wrap">
            <span>{t.hero.nodes.join(" / ")}</span>
            <a href="#physical-ai-film" aria-label={t.showcase.label}>
              <ArrowRight size={18} />
            </a>
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
              <img
                src={media.home.heroDangerousWork}
                alt={t.hero.visualAlt}
                width="1532"
                height="957"
                loading="lazy"
              />
              <figcaption>
                <span>{t.showcase.caption}</span>
              </figcaption>
            </figure>
            <div className="concept-film-copy">
              <p className="eyebrow">{t.showcase.label}</p>
              <h2 className="client-line-breaks">{t.showcase.title}</h2>
              <p className="section-lead client-line-breaks">{t.showcase.body}</p>
              <div className="concept-film-points">
                {t.showcase.points.map(([title, body], index) => (
                  <div key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
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
                      <span>0{i + 1}</span>
                      <Icon size={24} strokeWidth={1.4} />
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
                width="1800"
                height="1258"
              />
              <figcaption>{t.company.label}</figcaption>
            </figure>
            <div className="company-copy">
              <p className="eyebrow">{t.company.label}</p>
              <h2>{t.company.title}</h2>
              <p className="section-lead">{t.company.body}</p>
              <div className="company-facts">
                {t.company.facts.map(([date, fact]) => (
                  <div key={date}>
                    <strong>{date}</strong>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
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
              {t.regions.items.map(([name, , , role], i) => (
                <div className="regions-route-node" key={name}>
                  <span className="regions-route-index">0{i + 1}</span>
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
              {t.regions.items.map(([name, title, body, role], i) => (
                <article key={name}>
                  <div className="region-art" aria-hidden="true">
                    <Globe2 size={140} strokeWidth={0.45} />
                    <span>0{i + 1}</span>
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
        <section className="section">
          <div className="wrap">
            <div className="split-heading">
              <div>
                <p className="eyebrow">{t.why.label}</p>
                <h2>{t.why.title}</h2>
              </div>
              <p className="section-lead">{t.why.body}</p>
            </div>
            <div className="why-grid">
              {t.why.items.map(([title, body], i) => (
                <article key={title}>
                  <span>0{i + 1}</span>
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
        <section className="section" id="technology">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.technology.label}</p>
                <h2>{t.technology.title}</h2>
              </div>
              <Link className="text-link" to="/products">
                {t.ui.explore}
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <p className="section-lead client-line-breaks">{t.technology.body}</p>
            <div className="technology-grid">
              {productIds.map((id, i) => {
                const product = t.products[id];
                return (
                  <Link
                    className="technology-card"
                    to={`/products/${id}`}
                    key={id}
                  >
                    <img
                      className={`tech-image tech-image--${id}`}
                      src={productCardImages[id]}
                      alt={product.cardImageAlt || product.imageAlt}
                      loading="lazy"
                      width="100"
                      height="100"
                    />
                    <span className="eyebrow">
                      {i === 0
                        ? t.productsPage.featured
                        : t.productsPage.second}
                    </span>
                    <h3>{product.name}</h3>
                    <p className="client-line-breaks">{product.preview}</p>
                    <span className="text-link">
                      {t.ui.details}
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section platform-section">
          <div className="wrap">
            <p className="eyebrow">{t.platform.label}</p>
            <h2 className="client-line-breaks">{t.platform.title}</h2>
            <p className="section-lead">{t.platform.body}</p>
            <div className="platform-grid">
              {t.platform.items.map(([name, body], i) => (
                <div key={name}>
                  <span className="small-label">0{i + 1}</span>
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
        <section className="section dark-section">
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
            <img
              className="section-wide-image dark-image factory-deployment-image"
              src={media.home.factory}
              alt={t.factory.imageAlt}
              loading="lazy"
              width="1567"
              height="1045"
            />
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
                    src={media.events[[1, 0, 2][i]]}
                    alt={title}
                    loading="lazy"
                    width={media.eventSizes[[1, 0, 2][i]][0]}
                    height={media.eventSizes[[1, 0, 2][i]][1]}
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
              <Link className="button primary" to="/#contact">
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
                width="934"
                height="1400"
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
    </>
  );
}
