import { ArrowUpRight, Linkedin, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { contacts, media } from "@/content/media";

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function Team() {
  const { t, lang } = useLanguage();
  const readProfile = lang === "ja" ? "プロフィールを読む" : "Read profile";
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
                <div className="team-card-name">
                  <h4>{member.name}</h4>
                  {member.linkedin && (
                    <a className="team-linkedin" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn: ${member.name}`}>
                      <Linkedin size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p>{member.role}</p>
                <small className="team-bio-preview">{member.bio}</small>
                <div className="team-card-actions">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button className="team-profile-trigger" aria-label={`${readProfile}: ${member.name}`}>
                        <span className="sr-only">{readProfile}</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="team-profile-overlay" />
                      <Dialog.Content className="team-profile-dialog">
                        <Dialog.Close className="team-profile-close" aria-label={t.ui.close}>
                          <X size={20} aria-hidden="true" />
                        </Dialog.Close>
                        <Dialog.Title>{member.name}</Dialog.Title>
                        <p className="team-profile-role">{member.role}</p>
                        <Dialog.Description className="team-profile-bio">{member.bio}</Dialog.Description>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
