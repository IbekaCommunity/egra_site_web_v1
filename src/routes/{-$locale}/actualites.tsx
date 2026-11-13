import { createFileRoute } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { z } from "zod";
import PageHero from "@/components/page-hero.tsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { NEWS_CATEGORIES } from "@/lib/i18n/fr.ts";
import { getDictionary, langFromParam } from "@/lib/i18n/index.ts";
import { cn } from "@/lib/utils.ts";
import EnrollCta from "./-components/enroll-cta.tsx";
import NewsArticleDialog from "./-components/news-article-dialog.tsx";
import NewsCard from "./-components/news-card.tsx";

export const Route = createFileRoute("/{-$locale}/actualites")({
  validateSearch: z.object({
    categorie: z.enum(NEWS_CATEGORIES).optional().catch(undefined),
    article: z.string().optional().catch(undefined),
  }),
  head: ({ params }) => {
    const t = getDictionary(langFromParam(params.locale)).newsPage;
    const title = `${t.metaTitle} | Egra International School`;
    return {
      meta: [
        { title },
        { name: "description", content: t.metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: t.metaDescription },
      ],
    };
  },
  component: NewsPage,
});

const FILTERS = ["all", ...NEWS_CATEGORIES] as const;

function NewsPage() {
  const t = useT();
  const { categorie, article } = Route.useSearch();
  const navigate = Route.useNavigate();

  // Newest first; the latest article is featured only on the unfiltered view.
  const sorted = [...t.news.items].sort((a, b) => b.date.localeCompare(a.date));
  const visible = categorie ? sorted.filter((n) => n.category === categorie) : sorted;
  const openItem = sorted.find((n) => n.id === article) ?? null;

  const setSearch = (next: { categorie?: (typeof NEWS_CATEGORIES)[number]; article?: string }) =>
    navigate({ search: (prev) => ({ ...prev, ...next }), resetScroll: false, replace: true });

  return (
    <>
      <PageHero eyebrow={t.newsPage.eyebrow} title={t.newsPage.title} subtitle={t.newsPage.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-10 flex flex-wrap gap-2" role="tablist">
          {FILTERS.map((f) => {
            const active = (categorie ?? "all") === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSearch({ categorie: f === "all" ? undefined : f })}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition cursor-pointer",
                  active
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
                )}
              >
                {f === "all" ? t.news.categories.all : t.news.categories[f]}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Newspaper />
              </EmptyMedia>
              <EmptyDescription>{t.newsPage.empty}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, i) => (
              <NewsCard
                key={item.id}
                item={item}
                featured={!categorie && i === 0}
                onOpen={() => setSearch({ article: item.id })}
              />
            ))}
          </div>
        )}
      </section>

      <EnrollCta />

      <NewsArticleDialog item={openItem} onClose={() => setSearch({ article: undefined })} />
    </>
  );
}
