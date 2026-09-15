import { ExternalLink, BadgeCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "@/components/shared/Reveal";
import { NEWS } from "@/constants/testIds";

const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const timeAgo = (iso, lang) => {
  const ms = Date.parse(iso);
  if (!ms) return "";
  try {
    return formatDistanceToNow(ms, {
      addSuffix: true,
      locale: lang === "ja" ? ja : undefined,
    });
  } catch {
    return "";
  }
};

// A single news post. Always credits the original author + source and links
// back to the original X post (attribution is required by X + the founder).
export default function NewsCard({ post, delay = 0 }) {
  const { t, lang } = useLanguage();
  const { author = {}, source = {}, media = [] } = post;
  const image = media.find((m) => m.type === "image");

  return (
    <Reveal delay={delay} y={18}>
      <article
        data-testid={`${NEWS.card}-${post.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e4ecf2] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b9c2ff] hover:rf-glow"
      >
        {image && (
          <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#f4f5f8] to-[#e8eaf1] p-2">
            <img
              src={image.url}
              alt={image.alt || author.name}
              loading="lazy"
              className="h-full w-full rounded-xl object-contain"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          {/* Author row */}
          <div className="flex flex-wrap items-center gap-3">
            <Avatar className="h-11 w-11 border border-[#e4ecf2]">
              {author.avatarUrl ? (
                <AvatarImage src={author.avatarUrl} alt={author.name} />
              ) : null}
              <AvatarFallback className="bg-[#eef1ff] text-sm font-bold text-[#4d6bff]">
                {initials(author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="truncate font-semibold text-[#0a0f1a]">
                  {author.name}
                </span>
                {author.verified && (
                  <BadgeCheck className="h-4 w-4 shrink-0 text-[#4d6bff]" />
                )}
              </div>
              {author.handle && (
                <span className="text-sm text-[#5b6b7e]">@{author.handle}</span>
              )}
            </div>
            {post.createdAt && (
              <span className="ml-auto shrink-0 text-xs font-medium text-[#9aa9b8]">
                {timeAgo(post.createdAt, lang)}
              </span>
            )}
          </div>

          {/* Post text */}
          {post.text && (
            <p className="mt-4 flex-1 whitespace-pre-line text-[15px] leading-relaxed text-[#26313f]">
              {post.text}
            </p>
          )}

          {/* Footer: source label + link back to the original post */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef1ff] pt-4">
            <span
              data-testid={NEWS.cardSource}
              className="inline-flex items-center rounded-full border border-[#d6ddff] bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-[#4d6bff]"
            >
              {t.ui.source}: {source.label || `${author.name} on X`}
            </span>
            <a
              data-testid={NEWS.cardLink}
              href={post.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#4d6bff] transition-colors hover:text-[#6a4dff]"
            >
              {t.ui.viewX} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
