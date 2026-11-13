import { Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import type { NewsItem } from "@/lib/i18n/fr.ts";
import { formatDate } from "@/lib/i18n/index.ts";
import { newsImage } from "@/lib/news.ts";

export default function NewsArticleDialog({
  item,
  onClose,
}: {
  item: NewsItem | null;
  onClose: () => void;
}) {
  const t = useT();
  const lang = useLang();
  return (
    <Dialog open={item !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        {item && (
          <article>
            <img
              src={newsImage(item)}
              alt={item.title}
              className="aspect-[16/9] w-full rounded-t-xl object-cover"
            />
            <div className="space-y-4 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                <span className="rounded-full bg-accent/30 px-3 py-1 font-bold text-primary">
                  {t.news.categories[item.category]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
                </span>
              </div>
              <DialogTitle className="font-display text-2xl leading-tight font-extrabold text-primary md:text-3xl">
                {item.title}
              </DialogTitle>
              {item.body.map((p) => (
                <p key={p} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </article>
        )}
      </DialogContent>
    </Dialog>
  );
}
