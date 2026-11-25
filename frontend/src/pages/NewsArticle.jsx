import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Link from "@/components/shared/SiteLink";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Quote, Sparkles, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import AccessibleLoopVideo from "@/components/shared/AccessibleLoopVideo";
import ContactAddressImage from "@/components/shared/ContactAddressImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { newsArticles } from "@/content/newsData";
import { localizePath } from "@/lib/locale";

function renderEmphasis(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  );
}

function NewsCommunityLinks({ links }) {
  return (
    <div className="news-community-links">
      <div className="news-community-platforms">
        {links.filter(({ platform }) => platform !== "LinkedIn").map(({ label, platform, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {platform === "Instagram" && <Instagram size={18} aria-hidden="true" />}
            {platform === "Facebook" && <Facebook size={18} aria-hidden="true" />}
            <span>{label}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
      <div className="news-community-linkedin">
        <p><Linkedin size={18} aria-hidden="true" /> LinkedIn</p>
        <div className="news-community-regions">
          {links.filter(({ platform }) => platform === "LinkedIn").map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn — ${label}`}>
              <span>{label}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsVideo({ video, poster, posterAlt, label, caption }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`news-video-card${video.afterIntro ? " is-after-intro" : ""}`}>
      <div className="news-video-player">
        {failed ? (
          <img src={poster} alt={posterAlt} />
        ) : (
          <AccessibleLoopVideo
            src={video.src}
            poster={poster}
            label={label}
            preload="none"
            startWhenVisible
            autoStart={false}
            showAudioToggle={video.hasAudio !== false}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function NewsArticle() {
  const { slug = "x-hub-tokyo-boston" } = useParams();
  const { lang, t } = useLanguage();
  const article = newsArticles[slug];

  if (!article) {
    return <Navigate to={localizePath("/", lang)} replace />;
  }

  const content = article[lang] || article.en;
  const categoryLabel = article.category[lang] || article.category.en;
  const showVideoAfterIntro = article.video?.src && article.video.afterIntro;
  const videoFigure = article.video?.src && (
    <NewsVideo
      key={article.video.src}
      video={article.video}
      poster={article.video.poster || article.images.hero}
      posterAlt={content.heroAlt || content.title}
      label={content.videoLabel || t.gallery.video}
      caption={content.videoCaption}
    />
  );

  return (
    <>
      <PageMeta
        title={content.title.replace(/\n/g, ": ")}
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
              to="/#news"
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

            {content.subtitles.length > 0 && (
              <div className="news-subtitles">
                {content.subtitles.map((sub, i) => (
                  <p key={i} className="news-subtitle-item">
                    {sub}
                  </p>
                ))}
              </div>
            )}

            <div
              className={`news-featured-media${
                article.heroDisplay ? ` is-${article.heroDisplay}` : ""
              }`}
            >
              <img
                src={article.images.hero}
                alt={content.heroAlt || content.title}
                style={article.heroObjectPosition ? { objectPosition: article.heroObjectPosition } : undefined}
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
            <p className={`news-lead-text${content.introParagraphs?.length || showVideoAfterIntro ? " has-intro" : ""}`}>{content.lead}</p>
            {content.introFeature && (
              <figure className="news-partnership-feature">
                <img
                  src={article.images[content.introFeature.imageKey]}
                  alt={content.introFeature.alt}
                  width="1600"
                  height="1460"
                  loading="lazy"
                />
                <figcaption>
                  <h2>{content.introFeature.heading}</h2>
                  <p>{content.introFeature.text}</p>
                  <ul className="news-partnership-people">
                    {content.introFeature.people.map(({ name, role }) => (
                      <li key={name}><strong>{name}</strong><span>{role}</span></li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            )}
            {content.introParagraphs?.map((paragraph, index) => (
              <p className="news-intro-text" key={index}>{renderEmphasis(paragraph)}</p>
            ))}
            {showVideoAfterIntro && videoFigure}

            {/* Content Sections */}
            <div className="news-sections-flow">
              {content.sections.map((section, idx) => (
                <section key={idx} className="news-section-block">
                  <h2>{section.heading}</h2>
                  {section.profile && (
                    <div className="news-researcher-profile">
                      <img
                        src={article.images[section.profile.imageKey]}
                        alt={section.profile.name}
                        width={section.profile.width || 377}
                        height={section.profile.height || 414}
                        loading="lazy"
                      />
                      <div className="news-researcher-bio">
                        <h3>{section.profile.name}</h3>
                        <p className="news-researcher-affiliation">{section.profile.affiliation}</p>
                        {section.profile.paragraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {section.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx}>{renderEmphasis(p)}</p>
                  ))}

                  {section.attribution?.map((paragraph, index) => (
                    <p className="news-quote-attribution" key={index}>
                      {renderEmphasis(paragraph)}
                    </p>
                  ))}
                  {section.quoteParagraphs && (
                    <blockquote className="news-section-quote">
                      {section.quoteParagraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </blockquote>
                  )}

                  {(section.judgeComments || section.judgeComment) && (
                    <div className="judge-comments-list">
                      {(section.judgeComments || [section.judgeComment]).map(
                        (comment, commentIdx) => (
                          <aside
                            className={`judge-comment-card${comment.imageKey ? "" : " judge-comment-card--text-only"}`}
                            aria-label={`${comment.label}: ${comment.name}`}
                            key={`${comment.name}-${commentIdx}`}
                          >
                            {comment.imageKey && (
                              <img
                                className="judge-comment-avatar"
                                src={article.images[comment.imageKey]}
                                alt={comment.name}
                                loading="lazy"
                              />
                            )}
                            <div className="judge-comment-content">
                              <div className="judge-comment-heading">
                                <span className="judge-comment-label">
                                  <Quote size={16} aria-hidden="true" />
                                  {comment.label}
                                </span>
                                <strong>{comment.name}</strong>
                                <span>{comment.affiliation}</span>
                              </div>
                              <blockquote>{comment.text}</blockquote>
                            </div>
                          </aside>
                        ),
                      )}
                    </div>
                  )}

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

                  {section.emailImageLabel && (
                    <div className="news-application-contact">
                      <p>{section.emailImageLabel}</p>
                      <ContactAddressImage tone="dark" />
                    </div>
                  )}

                  {section.communityLinks?.length > 0 && (
                    <NewsCommunityLinks links={section.communityLinks} />
                  )}

                  {section.links?.length > 0 && (
                    <ul className="news-section-links">
                      {section.links.map(({ label, href }) => (
                        <li key={href}>
                          <a
                            className="news-source-link"
                            href={href}
                            {...(href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            <span>{label}</span>
                            <ArrowUpRight size={16} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
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
              <div className={`news-supporting-images${article.supportingImages.length === 1 ? " is-single" : ""}`}>
                {article.supportingImages.map((imageKey, index) => (
                  <figure key={imageKey}>
                    <img
                      src={article.images[imageKey]}
                      alt={
                        content.supportingImageAlts?.[index] || content.title
                      }
                      loading="lazy"
                    />
                    {content.supportingImageCaptions?.[index] && (
                      <figcaption>
                        {content.supportingImageCaptions[index]}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {article.sourceUrl && (
              <a
                className="news-source-link"
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.sourceLinkLabel || t.ui.readOriginal}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}

            {article.socialLinks?.length > 0 && (
              <section className="news-social-section" aria-labelledby="news-social-heading">
                <h2 id="news-social-heading">{content.socialHeading}</h2>
                <div className="news-social-links">
                  {article.socialLinks.map(({ platform, url }) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${content.socialHeading}: ${platform}`}
                      title={platform}
                    >
                      {platform === "LinkedIn" && <Linkedin size={24} aria-hidden="true" />}
                      {platform === "YouTube" && <Youtube size={24} aria-hidden="true" />}
                      {platform === "X" && <span aria-hidden="true">𝕏</span>}
                      {platform === "Medium" && <span aria-hidden="true">M</span>}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {!showVideoAfterIntro && videoFigure}

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
            {content.ctaTitle && <div className="news-cta-banner">
              <div className="cta-copy">
                <h3>{content.ctaTitle}</h3>
                <p>{content.ctaSubtitle}</p>
              </div>
              <Link to="/#contact" className="button primary">
                {content.ctaButton}
                <ArrowUpRight size={18} />
              </Link>
            </div>}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
