import { Link } from "@tanstack/react-router";
import { ArrowRight, Baby, BookOpen, Microscope } from "lucide-react";
import SectionHeading from "@/components/section-heading.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { cn } from "@/lib/utils.ts";

const LEVEL_STYLES = [
  { icon: Baby, card: "bg-accent text-accent-foreground", chip: "bg-white/60 text-accent-foreground" },
  { icon: BookOpen, card: "bg-[oklch(0.66_0.13_240)] text-white", chip: "bg-white/20 text-white" },
  { icon: Microscope, card: "bg-[oklch(0.3_0.13_268)] text-white", chip: "bg-white/15 text-white" },
];

// Anchors of each cycle on the programs page (same order as `levels.items`).
const CYCLE_ANCHORS = ["prescolaire", "primaire", "secondaire"];

export default function Levels() {
  const t = useT();
  const locale = localeParam(useLang());
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow={t.levels.eyebrow} title={t.levels.title} />
        <Link
          to="/{-$locale}/formations"
          params={{ locale }}
          className="flex items-center gap-1.5 font-semibold text-primary hover:underline cursor-pointer"
        >
          {t.levels.cta} <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {t.levels.items.map((level, i) => {
          const s = LEVEL_STYLES[i % LEVEL_STYLES.length];
          const Icon = s.icon;
          return (
            <Link
              key={level.name}
              to="/{-$locale}/formations"
              params={{ locale }}
              hash={CYCLE_ANCHORS[i]}
              className={cn(
                "group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition hover:-translate-y-1 hover:shadow-2xl cursor-pointer",
                s.card,
              )}
            >
              <Icon className="absolute -right-6 -bottom-6 size-40 opacity-15 transition group-hover:scale-110" />
              <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-bold", s.chip)}>
                {level.ages}
              </span>
              <div className="relative">
                <h3 className="mb-2 font-display text-3xl font-extrabold">{level.name}</h3>
                <p className="max-w-xs text-sm opacity-85">{level.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
