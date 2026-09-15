import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
            ? t.updates.items.map(([date, tag, title, body]) => (
                <article key={title}>
                  <div className="event-date">
                    {date}
                    <span>{tag}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))
            : t.updates.news.map(([date, title, body]) => (
                <article key={title}>
                  <p className="eyebrow">{date}</p>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
