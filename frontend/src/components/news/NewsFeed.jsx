import { AlertTriangle, Inbox } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import NewsCard from "./NewsCard";
import { NEWS } from "@/constants/testIds";
import { useLanguage } from "@/contexts/LanguageContext";

function FeedSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-[#e4ecf2] bg-white p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="mt-4 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-11/12" />
          <Skeleton className="mt-2 h-3 w-2/3" />
          <Skeleton className="mt-6 h-6 w-40 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// Renders the chronological feed plus loading / error / empty states.
export default function NewsFeed({ posts = [], isLoading, error }) {
  const { t } = useLanguage();
  const hasPosts = posts && posts.length > 0;

  if (isLoading && !hasPosts) return <FeedSkeleton />;

  if (error && !hasPosts) {
    return (
      <div
        data-testid={NEWS.error}
        className="rounded-2xl border border-[#f3d0d0] bg-[#fff5f5] p-10 text-center"
      >
        <AlertTriangle className="mx-auto h-8 w-8 text-[#e05a5a]" />
        <p className="mt-3 font-semibold text-[#0a0f1a]">{t.newsPage.error}</p>
        <p className="mt-1 text-sm text-[#5b6b7e]">{t.newsPage.retry}</p>
      </div>
    );
  }

  if (!hasPosts) {
    return (
      <div
        data-testid={NEWS.empty}
        className="rounded-2xl border border-[#e4ecf2] bg-white p-10 text-center"
      >
        <Inbox className="mx-auto h-8 w-8 text-[#9aa9b8]" />
        <p className="mt-3 font-semibold text-[#0a0f1a]">{t.newsPage.empty}</p>
        <p className="mt-1 text-sm text-[#5b6b7e]">
          {t.newsPage.emptyBody}
        </p>
      </div>
    );
  }

  return (
    <div data-testid={NEWS.feed} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <NewsCard key={p.id} post={p} delay={(i % 3) * 0.06} />
      ))}
    </div>
  );
}
