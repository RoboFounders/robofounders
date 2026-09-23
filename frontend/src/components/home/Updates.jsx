import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";

const eventImages = [
  media.bostonAiWeek, // boston-ai-week
  media.startupWorldCup, // client-approved Startup World Cup image
  media.events[2], // team-banner / Diffusion Sarawak
  media.ivsExhibit, // client-approved IVS Japan image
  media.events[4], // banner-booth / Silicon Valley launch
  media.events[7], // startups-jungle / BuildClub Tokyo
  media.events[7], // client-provided Jungle Forge image
  media.home.factory, // humans and robots working together
];

const newsImages = [
  media.xHubSingapore, // client-provided X-HUB Singapore image
  media.newsEvent, // Tokyo to Boston / JETRO X-HUB TOKYO full image
  media.japanCorporation, // client-provided Japan corporation image
  media.aiMalaysiaTakeover, // client-provided AI Malaysia Takeover image
  media.startupWorldCupTokyo, // client-provided Startup World Cup Tokyo image
  media.ivs2026News, // IVS2026 Startup Market
  media.beyondPocPortrait, // Beyond POC speaker story
  media.diffusionBorneo, // Diffusion Borneo 2026 image from doc
  media.events[7], // client-provided Jungle Forge image
  media.startupWorldCup, // client-approved Startup World Cup image
  media.events[3], // booth-laptop / ASEAN network
];

const newsSlugMap = {
  0: "/news/x-hub-tokyo-singapore",
  1: "/news/x-hub-tokyo-boston",
  2: "/news/japan-corporation-established",
  3: "/news/ai-malaysia-takeover-2026",
  4: "/news/startup-world-cup-tokyo-2026",
  5: "/news/ivs2026-startup-market",
  6: "/news/diffusion-borneo-beyond-poc",
  7: "/news/diffusion-borneo-2026",
  8: "/news/jungle-forge-award-2026",
  9: "/news/startup-world-cup-malaysia",
};

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
                <button type="button" onClick={() => scrollNews(-1)} aria-label="Previous news">
                  <ArrowLeft size={20} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => scrollNews(1)} aria-label="Next news">
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
                const linkTarget = newsSlugMap[index];
                const isLinked = Boolean(linkTarget);
                const CardTag = isLinked ? Link : "article";
                const cardProps = isLinked
                  ? { to: linkTarget, className: "news-tile-card is-link" }
                  : { className: "news-tile-card" };

                return (
                  <CardTag key={title} {...cardProps}>
                    <div
                      className={`news-media${
                        index === 5 || index === 6 ? " is-contain" : ""
                      }`}
                    >
                      <img
                        src={newsImages[index % newsImages.length]}
                        alt={title}
                        loading="lazy"
                        width="400"
                        height="240"
                      />
                    </div>
                    <div className="news-card-body">
                      <p className="eyebrow">{date}</p>
                      <h4>
                        {title}
                        {isLinked && <ArrowUpRight size={16} className="news-link-arrow" />}
                      </h4>
                      <p>{body}</p>
                      {isLinked && (
                        <span className="news-read-more">
                          {t.ui?.readArticle || (t.lang === "ja" ? "記事を読む" : "Read full article")}
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
