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
          {media.galleryItems.map((item, i) => (
            <figure key={item.src}>
              <div className={`field-media${item.type === "video" ? " field-video" : ""}`}>
                {item.type === "video" ? (
                  <AccessibleLoopVideo
                    src={item.src}
                    poster={item.poster}
                    label={t.gallery.captions[i]}
                    preload="none"
                    startWhenVisible
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={t.gallery.captions[i]}
                    loading="lazy"
                    width={item.size[0]}
                    height={item.size[1]}
                  />
                )}
              </div>
              <figcaption><span>{t.gallery.captions[i]}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
