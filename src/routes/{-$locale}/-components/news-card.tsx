import { ArrowRight, Calendar } from "lucide-react";
import { useLang, useT } from "@/hooks/use-locale.ts";
import type { NewsItem } from "@/lib/i18n/fr.ts";
import { formatDate } from "@/lib/i18n/index.ts";
import { newsImage } from "@/lib/news.ts";
import { cn } from "@/lib/utils.ts";

/** News card; `featured` renders the wide "À la une" layout. */
export default function NewsCard({
  item,
  featured = false,
  onOpen,
}: {
  item: NewsItem;
  featured?: boolean;
  onOpen: () => void;
}) {
  const t = useT();
  const lang = useLang();
  return (
    <article
      id={item.id}
      className={cn(
        "group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border bg-card transition hover:shadow-xl",
        featured && "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.3fr_1fr]",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="aspect-[16/10] overflow-hidden cursor-pointer"
        aria-label={item.title}
      >
        <img
          src={newsImage(item)}
          alt={item.title}
          loading={featured ? "eager" : "lazy"}
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
      </button>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
          {featured && (
            <span className="rounded-full bg-primary px-3 py-1 font-bold text-primary-foreground">
              {t.newsPage.featured}
            </span>
          )}
          <span className="rounded-full bg-accent/30 px-3 py-1 font-bold text-primary">
            {t.news.categories[item.category]}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
          </span>
        </div>
        <h2
          className={cn(
            "mb-2 font-display leading-snug font-bold text-primary",
            featured ? "text-2xl md:text-3xl" : "text-lg",
          )}
        >
          {item.title}
        </h2>
        <p className={cn("mb-5 text-muted-foreground", featured ? "text-base" : "line-clamp-3 text-sm")}>
          {item.desc}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-auto flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline cursor-pointer"
        >
          {t.news.readMore} <ArrowRight className="size-3.5" />
        </button>
      </div>
    </article>
  );
}
