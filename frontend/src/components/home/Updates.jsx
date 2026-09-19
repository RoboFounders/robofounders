import { useState } from "react";
import { Link } from "react-router-dom";
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
];

const newsImages = [
  media.newsEvent, // Tokyo to Boston / JETRO X-HUB TOKYO full image
  media.events[3], // booth-laptop / SF hub
  media.events[0], // robot-hug / Startup World Cup
  media.events[2], // team-banner / ASEAN network
];

export default function Updates() {
  const { t } = useLanguage();
  const [events, setEvents] = useState(true);
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
                onClick={() => setEvents(true)}
              >
                {t.updates.events}
              </button>
              <button
                type="button"
                aria-pressed={!events}
                onClick={() => setEvents(false)}
              >
                {t.updates.press}
              </button>
            </div>
          </div>
          <figure className="updates-hero-media">
            <img
              src={media.newsEvent}
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
                const isLinked = index === 0;
                const CardTag = isLinked ? Link : "article";
                const cardProps = isLinked
                  ? { to: "/news/x-hub-tokyo-boston", className: "news-tile-card is-link" }
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
