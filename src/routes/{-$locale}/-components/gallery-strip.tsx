import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { site } from "@/lib/site.ts";
import { cn } from "@/lib/utils.ts";

const PHOTOS = [
  { src: site.images.uniforms, tile: "col-span-2 md:row-span-2", img: "" },
  { src: site.images.conference, tile: "col-span-2", img: "" },
  { src: site.images.celebration, tile: "", img: "" },
  { src: site.images.hero, tile: "", img: "object-top" },
];

export default function GalleryStrip() {
  const t = useT();
  const locale = localeParam(useLang());
  return (
    <section className="bg-[oklch(0.22_0.09_268)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} inverted />
          <Link
            to="/{-$locale}/ecole"
            params={{ locale }}
            hash="galerie"
            className="flex items-center gap-1.5 font-semibold text-accent hover:underline cursor-pointer"
          >
            {t.gallery.cta} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className={cn("group overflow-hidden rounded-3xl", p.tile)}
            >
              <img
                src={p.src}
                alt={t.gallery.alts[i]}
                loading="lazy"
                className={cn("size-full object-cover transition duration-700 group-hover:scale-105", p.img)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
