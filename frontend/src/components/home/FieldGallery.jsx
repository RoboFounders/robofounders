import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/content/media";
import AccessibleLoopVideo from "@/components/shared/AccessibleLoopVideo";

export default function FieldGallery() {
  const { t } = useLanguage();
  return (
    <section id="moments" className="section dark-section">
      <div className="wrap">
        <p className="eyebrow">{t.gallery.label}</p>
        <h2>{t.gallery.title}</h2>
        <p className="section-lead">{t.gallery.body}</p>
        <div className="field-gallery">
          {media.events.map((src, i) => (
            <figure key={src}>
              <div className="field-media">
                <img
                  src={src}
                  alt={t.gallery.captions[i]}
                  loading="lazy"
                  width={media.eventSizes[i][0]}
                  height={media.eventSizes[i][1]}
                />
              </div>
              <figcaption>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span>{t.gallery.captions[i]}</span>
              </figcaption>
            </figure>
          ))}
          {media.eventVideos.map((src, i) => (
            <figure key={src}>
              <div className="field-media field-video">
                <AccessibleLoopVideo
                  src={src}
                  poster={media.events[[0, 3, 1][i]]}
                  label={`${t.gallery.video} ${i + 1}`}
                  preload="none"
                  startWhenVisible
                />
              </div>
              <figcaption>
                <span aria-hidden="true">
                  {String(media.events.length + i + 1).padStart(2, "0")}
                </span>
                <span>
                  {t.gallery.video} {i + 1}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
