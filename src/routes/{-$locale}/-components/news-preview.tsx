import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import SectionHeading from "@/components/section-heading.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { formatDate, localeParam } from "@/lib/i18n/index.ts";
import { newsImage } from "@/lib/news.ts";

export default function NewsPreview() {
  const t = useT();
  const lang = useLang();
  const locale = localeParam(lang);
  const latest = [...t.news.items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow={t.news.eyebrow} title={t.news.title} />
        <Link
          to="/{-$locale}/actualites"
          params={{ locale }}
          className="flex items-center gap-1.5 font-semibold text-primary hover:underline cursor-pointer"
        >
          {t.news.seeAll} <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {latest.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col overflow-hidden rounded-3xl border bg-card transition hover:shadow-xl"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={newsImage(item)}
                alt={item.title}
                loading="lazy"
                className="size-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Calendar className="size-3.5" />
                <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
              </p>
              <h3 className="mb-2 font-display text-lg leading-snug font-bold text-primary">{item.title}</h3>
              <p className="mb-5 line-clamp-3 text-sm text-muted-foreground">{item.desc}</p>
              <Link
                to="/{-$locale}/actualites"
                params={{ locale }}
                search={{ article: item.id }}
                className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary hover:underline cursor-pointer"
              >
                {t.news.readMore} <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
