import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Building2, Quote, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import AccessibleLoopVideo from "@/components/shared/AccessibleLoopVideo";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsArticles } from "@/content/newsData";

export default function NewsArticle() {
  const { slug = "x-hub-tokyo-boston" } = useParams();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const article = newsArticles[slug];

  if (!article) {
    return <Navigate to="/" replace />;
  }

  const handleBack = (e) => {
    if (window.history.length > 1) {
      e.preventDefault();
      navigate(-1);
    }
  };

  const content = article[lang] || article.en;
  const categoryLabel = article.category[lang] || article.category.en;

  return (
    <>
      <PageMeta
        title={content.title}
        description={content.lead}
        path={`/news/${slug}`}
        image={article.images.hero}
      />
      <Navbar />
      <main id="main-content" className="page-main news-article-page">
        {/* Article Hero */}
        <section className="news-hero-section">
          <div className="wrap news-hero-wrap">
            <Link
              to={{ pathname: "/", hash: "#news" }}
              state={{ tab: "press" }}
              onClick={handleBack}
              className="back-link"
            >
              <ArrowLeft size={16} />
              {content.backLink}
            </Link>

            <div className="news-meta-header">
              <span className="news-category-badge">{categoryLabel}</span>
              <time className="news-date">{article.date}</time>
            </div>

            <h1 className="news-title">{content.title}</h1>

            <div className="news-subtitles">
              {content.subtitles.map((sub, i) => (
                <p key={i} className="news-subtitle-item">
                  {sub}
                </p>
              ))}
            </div>

            <div
              className={`news-featured-media${
                article.heroDisplay ? ` is-${article.heroDisplay}` : ""
              }`}
            >
              <img
                src={article.images.hero}
                alt={content.title}
                width="1920"
                height="1080"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="section news-body-section">
          <div className="wrap news-content-wrap">
            {/* Lead Paragraph */}
            <p className="news-lead-text">{content.lead}</p>

            {/* Content Sections */}
            <div className="news-sections-flow">
              {content.sections.map((section, idx) => (
                <section key={idx} className="news-section-block">
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {section.bullets && (
                    <div className="news-spec-box">
                      <ul className="news-bullet-list">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx}>
                            <CheckCircle2 size={18} className="bullet-icon" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.followUp && (
                    <p className="news-followup">{section.followUp}</p>
                  )}

                  {section.subBullets && (
                    <ul className="news-subbullet-list">
                      {section.subBullets.map((sb, sbIdx) => (
                        <li key={sbIdx}>{sb}</li>
                      ))}
                    </ul>
                  )}

                  {section.closing && (
                    <p className="news-closing">{section.closing}</p>
                  )}
                </section>
              ))}
            </div>

            {article.supportingImages?.length > 0 && (
              <div className="news-supporting-images">
                {article.supportingImages.map((imageKey, index) => (
                  <figure key={imageKey}>
                    <img
                      src={article.images[imageKey]}
                      alt={
                        content.supportingImageAlts?.[index] || content.title
                      }
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            )}

            {/* On-the-Ground Event Video */}
            {article.video?.src && (
              <figure className="news-video-card">
                <div className="news-video-player">
                  <AccessibleLoopVideo
                    src={article.video.src}
                    poster={article.video.poster || article.images.hero}
                    label="RoboFounders event clip"
                    preload="metadata"
                    startWhenVisible
                  />
                </div>
              </figure>
            )}

            {/* CEO Quote */}
            {content.quote && (
              <div className="news-quote-card">
                <div className="quote-badge">
                  <Quote size={28} />
                </div>
                <blockquote>
                  {content.quote.text.split("\n\n").map((para, qIdx) => (
                    <p key={qIdx}>{para}</p>
                  ))}
                </blockquote>
                <div className="quote-author">
                  <strong>{content.quote.speaker}</strong>
                  <span>{content.quote.role}</span>
                </div>
              </div>
            )}

            {/* Vision */}
            {content.visionHeading && (
              <section className="news-section-block news-vision-block">
                <h2>{content.visionHeading}</h2>
                {content.visionText?.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </section>
            )}

            {/* Collaboration Checklist */}
            {content.collaborationHeading && (
              <section className="news-section-block news-collab-block">
                <h2>{content.collaborationHeading}</h2>
                <p className="section-lead">{content.collaborationIntro}</p>
                <div className="news-collab-grid">
                  {content.collaborationItems?.map((item, cIdx) => (
                    <div key={cIdx} className="collab-item">
                      <Sparkles size={18} className="collab-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom CTA Card */}
            <div className="news-cta-banner">
              <div className="cta-copy">
                <h3>{content.ctaTitle}</h3>
                <p>{content.ctaSubtitle}</p>
              </div>
              <Link to="/#contact" className="button primary">
                {content.ctaButton}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
