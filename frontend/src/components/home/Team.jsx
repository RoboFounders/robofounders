import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contacts, media } from "@/content/media";

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function Team() {
  const { t } = useLanguage();
  // Yasumitsu Morita is temporarily hidden pending client approval.
  const visibleMembers = t.team.members.filter(
    (member) => member.id !== "yasumitsu",
  );

  return (
    <section id="team" className="section">
      <div className="wrap">
        <p className="eyebrow">{t.team.label}</p>
        <h2>{t.team.title}</h2>
        <div className="founder-profile">
          <img
            src={media.founder}
            alt="Mariel Asami Fukase"
            loading="lazy"
            width="1000"
            height="646"
          />
          <div>
            <p className="eyebrow">{t.team.founderRole}</p>
            <h3>Mariel Asami Fukase</h3>
            <p>{t.team.bio}</p>
            <a
              className="text-link"
              href={contacts.founderLinkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="team-intro">
          <h3>{t.team.heading}</h3>
          <p>{t.team.body}</p>
        </div>
        <div className="team-grid">
          {visibleMembers.map((member) => (
            <article key={member.id}>
              <div className="team-photo-frame">
                {media.team[member.id] ? (
                  <img
                    src={media.team[member.id]}
                    alt={member.name}
                    loading="lazy"
                    width="800"
                    height="800"
                  />
                ) : (
                  <div
                    className="team-placeholder"
                    role="img"
                    aria-label={`${member.name}: ${t.team.photoPending}`}
                  >
                    <span>{initials(member.name)}</span>
                  </div>
                )}
              </div>
              <div className="team-card-copy">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <small>{member.bio}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
