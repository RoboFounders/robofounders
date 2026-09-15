import { useMemo, useState } from "react";
import { Rss } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/shared/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, SectionLabel } from "@/components/shared/Reveal";
import NewsFeed from "@/components/news/NewsFeed";
import { useNewsPosts } from "@/lib/newsApi";
import { NEWS } from "@/constants/testIds";

const ALL = "All";
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

export default function RoboticsNews() {
  const { t } = useLanguage();
  const { posts, isLoading, error } = useNewsPosts();
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => p.category && set.add(p.category));
    return [ALL, ...Array.from(set)];
  }, [posts]);

  const visible = useMemo(
    () =>
      category === ALL ? posts : posts.filter((p) => p.category === category),
    [posts, category],
  );

  return (
    <div className="relative min-h-screen bg-white" data-testid={NEWS.page}>
      <Navbar />
      <PageMeta title={t.meta.news} />
      <main id="main-content" className="page-main">
        {/* Hero / intro */}
        <section className="relative overflow-hidden bg-[#0a0f1a] pt-16 pb-16 text-white">
          <div className="pointer-events-none absolute inset-0 rf-grid-bg opacity-30" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[680px] -translate-x-1/2 rf-radial-glow blur-2xl" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <SectionLabel className="text-[#aeb9ff]">
                {t.newsPage.label}
              </SectionLabel>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {t.newsPage.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed !text-white/70">
                {t.newsPage.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Feed */}
        <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          {categories.length > 1 && (
            <div className="mb-10 flex flex-wrap gap-2.5">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  data-testid={`${NEWS.filter}-${slug(c)}`}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    category === c
                      ? "border-[#4d6bff] bg-[#eef1ff] text-[#4d6bff]"
                      : "border-[#e4ecf2] bg-white text-[#5b6b7e] hover:border-[#b9c2ff] hover:text-[#4d6bff]"
                  }`}
                >
                  {c === ALL ? t.newsPage.all : t.newsPage.categories[c] || c}
                </button>
              ))}
            </div>
          )}

          <NewsFeed posts={visible} isLoading={isLoading} error={error} />

          <p className="mt-12 flex items-start gap-2 text-xs leading-relaxed text-[#9aa9b8]">
            <Rss className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{t.newsPage.attribution}</span>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
