import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/section-heading.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { site } from "@/lib/site.ts";
import { cn } from "@/lib/utils.ts";

// Order matches `schoolPage.gallery.alts`.
const PHOTOS = [
  { src: site.images.celebration, tile: "col-span-2 row-span-2" },
  { src: site.images.uniforms, tile: "" },
  { src: site.images.conference, tile: "" },
  { src: site.images.hero, tile: "row-span-2", img: "object-top" },
  { src: site.images.sport, tile: "" },
  { src: site.images.lab, tile: "" },
  { src: site.images.computers, tile: "col-span-2" },
];

export default function SchoolGallery() {
  const t = useT().schoolPage.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + PHOTOS.length) % PHOTOS.length));

  return (
    <section id="galerie" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </div>
      <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
        {PHOTOS.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "group overflow-hidden rounded-3xl focus-visible:ring-4 focus-visible:ring-accent focus-visible:outline-none cursor-pointer",
              p.tile,
            )}
          >
            <img
              src={p.src}
              alt={t.alts[i]}
              loading="lazy"
              className={cn("size-full object-cover transition duration-700 group-hover:scale-105", p.img)}
            />
          </button>
        ))}
      </div>

      <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent className="max-w-[min(92vw,1100px)] border-0 bg-transparent p-0 shadow-none sm:max-w-[min(92vw,1100px)]">
          {index !== null && (
            <figure className="relative">
              <DialogTitle className="sr-only">{t.alts[index]}</DialogTitle>
              <img
                src={PHOTOS[index].src}
                alt={t.alts[index]}
                className="max-h-[80vh] w-full rounded-3xl object-contain"
              />
              <figcaption className="mt-3 text-center text-sm font-medium text-white">
                {t.alts[index]} · {index + 1}/{PHOTOS.length}
              </figcaption>
              <Button
                size="icon-lg"
                variant="secondary"
                onClick={() => step(-1)}
                aria-label={t.prev}
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full cursor-pointer"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                size="icon-lg"
                variant="secondary"
                onClick={() => step(1)}
                aria-label={t.next}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full cursor-pointer"
              >
                <ChevronRight className="size-5" />
              </Button>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
