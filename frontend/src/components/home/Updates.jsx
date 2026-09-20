import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";

const eventImages = [
  media.bostonAiWeek, // boston-ai-week
  media.events[0], // robot-hug / Startup World Cup
  media.events[2], // team-banner / Diffusion Sarawak
  media.events[1], // team-ivs / IVS Japan
  media.events[4], // banner-booth / Silicon Valley launch
  media.events[7], // startups-jungle / BuildClub Tokyo
  media.home.factory, // humans and robots working together
];

const newsImages = [
  media.newsEvent, // Tokyo to Boston / JETRO X-HUB TOKYO full image
  media.events[2], // Beyond POC speaker story
  media.diffusionBorneo, // Diffusion Borneo 2026 image from doc
  media.events[0], // robot-hug / Startup World Cup
  media.events[3], // booth-laptop / ASEAN network
];

const newsSlugMap = {
  0: "/news/x-hub-tokyo-boston",
  1: "/news/diffusion-borneo-beyond-poc",
  2: "/news/diffusion-borneo-2026",
  3: "/news/startup-world-cup-malaysia",
};

export default function Updates() {
  const { t } = useLanguage();
  const location = useLocation();

  const [events, setEvents] = useState(() => {
    if (
      location.state?.tab === "press" ||
      location.hash === "#press" ||
      location.hash === "#news-press"
    ) {
      return false;
    }
    if (location.state?.tab === "events") {
      return true;
    }
    try {
      const saved = sessionStorage.getItem("updates_active_tab");
      if (saved === "press") return false;
      if (saved === "events") return true;
    } catch {
      // ignore
    }
    return true;
  });

  useEffect(() => {
    if (
      location.state?.tab === "press" ||
      location.hash === "#press" ||
      location.hash === "#news-press"
    ) {
      setEvents(false);
      try {
        sessionStorage.setItem("updates_active_tab", "press");
      } catch {
        // ignore
      }
    } else if (location.state?.tab === "events") {
      setEvents(true);
      try {
        sessionStorage.setItem("updates_active_tab", "events");
      } catch {
        // ignore
      }
    }
  }, [location.state, location.hash]);

  const handleTabChange = (showEvents) => {
    setEvents(showEvents);
    try {
      sessionStorage.setItem(
        "updates_active_tab",
        showEvents ? "events" : "press",
      );
    } catch {
      // ignore
    }
  };

  return (
    <section className="section soft-section" id="news">
      <div className="wrap">
        <div className="updates-hero-banner">
          <div className="updates-hero-copy">
            <p className="eyebrow">{t.updates.label}</p>
            <h2>{t.updates.title}</h2>
            <div className="segmented" role="group" aria-label={t.updates.label}>
              <button
                type="button"
                aria-pressed={events}
                onClick={() => handleTabChange(true)}
              >
                {t.updates.events}
              </button>
              <button
                type="button"
                aria-pressed={!events}
                onClick={() => handleTabChange(false)}
              >
                {t.updates.press}
              </button>
            </div>
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
        <div className={events ? "events-list" : "news-tiles"}>
          {events
            ? t.updates.items.map(([date, tag, title, body], index) => (
                <article key={title} className="event-item-card">
                  <div className="event-media">
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
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))
            : t.updates.news.map(([date, title, body], index) => {
                const linkTarget = newsSlugMap[index];
                const isLinked = Boolean(linkTarget);
                const CardTag = isLinked ? Link : "article";
                const cardProps = isLinked
                  ? { to: linkTarget, className: "news-tile-card is-link" }
                  : { className: "news-tile-card" };

                return (
                  <CardTag key={title} {...cardProps}>
                    <div className="news-media">
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
                      <h3>
                        {title}
                        {isLinked && <ArrowUpRight size={16} className="news-link-arrow" />}
                      </h3>
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
      </div>
    </section>
  );
}
