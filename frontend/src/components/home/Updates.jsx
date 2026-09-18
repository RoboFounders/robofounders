import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";

const eventImages = [
  media.events[8], // boston-ai-week
  media.events[0], // robot-hug / Startup World Cup
  media.events[2], // team-banner / Diffusion Sarawak
  media.events[1], // team-ivs / IVS Japan
  media.events[5], // banner-booth / Silicon Valley launch
  media.events[4], // founder-laptop / BuildClub Tokyo
];

const newsImages = [
  media.home.startups, // partners/team group photo for X-HUB Boston
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
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.updates.label}</p>
            <h2>{t.updates.title}</h2>
          </div>
        </div>
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
            : t.updates.news.map(([date, title, body], index) => (
                <article key={title} className="news-tile-card">
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
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
