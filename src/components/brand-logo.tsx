import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { useLang } from "@/hooks/use-locale.ts";
import { cn } from "@/lib/utils.ts";

export default function BrandLogo({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  const lang = useLang();
  return (
    <Link
      to="/{-$locale}"
      params={{ locale: localeParam(lang) }}
      className={cn("flex items-center gap-3 cursor-pointer", className)}
    >
      {/* White tile keeps the navy crest readable on dark surfaces */}
      <span className="flex size-12 md:size-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/5">
        <img
          src={site.logo}
          alt={site.name}
          className="size-full object-contain"
          width={56}
          height={56}
        />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-sm md:text-base font-extrabold tracking-tight uppercase",
            inverted ? "text-white" : "text-primary",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "block text-[11px] md:text-xs tracking-[0.18em] uppercase",
            inverted ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
