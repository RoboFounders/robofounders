import { useEffect, useRef } from "react";
import Link from "@/components/shared/SiteLink";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";

const eventImages = [
  media.bostonAiWeek, // boston-ai-week
  media.startupWorldCup, // client-approved Startup World Cup image
  media.events[2], // team-banner / Diffusion Sarawak
  media.ivsExhibit, // client-approved IVS Japan image
  media.events[4], // banner-booth / Silicon Valley launch
  media.events[7], // client-provided Jungle Forge image
  media.home.factory, // humans and robots working together
];

// Keep these in the same order as the localized news cards.
const newsCards = [
  ["ces-2027-us-internship-opportunities", media.ces2027Hiring, "full-image"],
  ["usm-ergomotion-partnership", media.ergomotionDemo, "contain"],
  ["physical-ai-robotics-partners-2026", media.physicalAiPartners, "contain"],
  ["ces-2027-japan-pavilion", media.ces2027, "contain"],
  ["kabilan-kb-advisor", media.kabilanPortrait, "kabilan"],
  ["x-hub-tokyo-singapore", media.xHubSingapore],
  ["x-hub-tokyo-boston", media.newsEvent],
  ["nikkei-genai-sum-2026", media.nikkeiCoverage, "nikkei"],
  ["japan-corporation-established", media.japanCorporation],
  ["ai-malaysia-takeover-2026", media.aiMalaysiaTakeover],
  ["robofounders-beamstart-physical-ai", media.beamstartHero],
  ["startup-world-cup-tokyo-2026", media.startupWorldCupTokyo],
  ["ivs2026-startup-market", media.ivs2026News, "contain"],
  ["diffusion-borneo-beyond-poc", media.beyondPocPortrait, "contain"],
  ["diffusion-borneo-2026", media.diffusionBorneo],
  ["jungle-forge-award-2026", media.events[7]],
  ["startup-world-cup-malaysia", media.startupWorldCup, "malaysia"],
  ["onilema-abis-2025", media.aseanSummit],
];

export default function Updates() {
  const { t } = useLanguage();
  const newsRail = useRef(null);
  const scrollDirection = useRef(0);
  const scrollFrame = useRef(null);

  useEffect(() => {
    const animate = () => {
      if (newsRail.current && scrollDirection.current !== 0) {
        newsRail.current.scrollLeft += scrollDirection.current * 7;
      }
      scrollFrame.current = window.requestAnimationFrame(animate);
    };
    scrollFrame.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(scrollFrame.current);
  }, []);

  const handleRailPointerMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    scrollDirection.current = position < 0.14 ? -1 : position > 0.86 ? 1 : 0;
  };

  const stopRailScroll = () => {
    scrollDirection.current = 0;
  };

  const scrollNews = (direction) => {
    newsRail.current?.scrollBy({
      left: direction * Math.min(newsRail.current.clientWidth * 0.82, 1160),
      behavior: "smooth",
    });
  };

  return (
    <section className="section soft-section" id="news">
      <div className="wrap">
        <div className="updates-hero-banner">
          <div className="updates-hero-copy">
            <p className="eyebrow">{t.updates.label}</p>
            <h2>{t.updates.title}</h2>
          </div>
          <figure className="updates-hero-media">
            <img
              src={media.newsBanner}
              alt={t.updates.title}
              className="updates-hero-image"
              loading="lazy"
              width="800"
              height="450"
            />
          </figure>
        </div>
        <div className="updates-sections">
          <section className="updates-press" id="news-press" aria-labelledby="press-heading">
            <div className="updates-section-heading">
              <h3 className="updates-column-title" id="press-heading">{t.updates.press}</h3>
              <div className="news-rail-controls" aria-label={t.updates.press}>
                <button type="button" onClick={() => scrollNews(-1)} aria-label={t.ui.previousNews}>
                  <ArrowLeft size={20} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => scrollNews(1)} aria-label={t.ui.nextNews}>
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              className="news-tiles"
              ref={newsRail}
              onPointerMove={handleRailPointerMove}
              onPointerLeave={stopRailScroll}
              onPointerCancel={stopRailScroll}
            >
              {t.updates.news.map(([date, title, body], index) => {
                const [slug, image = media.newsBanner, imageStyle] = newsCards[index] || [];
                const isLinked = Boolean(slug);
                const CardTag = isLinked ? Link : "article";
                const cardProps = isLinked
                  ? { to: `/news/${slug}`, className: "news-tile-card is-link" }
                  : { className: "news-tile-card" };

                return (
                  <CardTag key={title} {...cardProps}>
                    <div
                      style={imageStyle === "kabilan" ? { "--kabilan-image": `url(${image})` } : undefined}
                      className={`news-media${imageStyle ? ` is-${imageStyle}` : ""}`}
                    >
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        width={imageStyle === "full-image" ? 1168 : 400}
                        height={imageStyle === "full-image" ? 1179 : 240}
                        style={imageStyle === "kabilan" ? {
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          objectPosition: "center",
                        } : undefined}
                      />
                    </div>
                    <div className="news-card-body">
                      <p className="eyebrow">{date}</p>
                      <h4>
                        <span className="news-card-title">{title}</span>
                        {isLinked && <ArrowUpRight size={16} className="news-link-arrow" />}
                      </h4>
                      <p>{body}</p>
                      {isLinked && (
                        <span className="news-read-more">
                          {t.ui.readArticle}
                          <ArrowUpRight size={14} />
                        </span>
                      )}
                    </div>
                  </CardTag>
                );
              })}
            </div>
          </section>

          <section className="updates-events" aria-labelledby="events-heading">
            <h3 className="updates-column-title" id="events-heading">{t.updates.events}</h3>
            <div className="events-list">
              {t.updates.items.map(([date, tag, title, body], index) => (
                <article key={title} className="event-item-card">
                  <div className={`event-media${index === 1 ? " is-startup-world-cup" : ""}`}>
                    <img
                      src={eventImages[index % eventImages.length]}
                      alt={title}
                      loading="lazy"
                      width="400"
                      height="260"
                    />
                  </div>
                  <div className="event-date">
                    {date}
                    <span>{tag}</span>
                  </div>
                  <div className="event-content">
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
