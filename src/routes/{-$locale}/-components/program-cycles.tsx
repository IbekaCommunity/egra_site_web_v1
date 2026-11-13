import { Check } from "lucide-react";
import { useT } from "@/hooks/use-locale.ts";
import { site } from "@/lib/site.ts";
import { cn } from "@/lib/utils.ts";

// Photo and accent per cycle, in the same order as `programsPage.cycles`.
const CYCLE_STYLES = [
  { photo: site.images.uniforms, img: "", badge: "bg-accent text-[oklch(0.24_0.08_268)]" },
  { photo: site.images.hero, img: "object-top", badge: "bg-[oklch(0.66_0.13_240)] text-white" },
  { photo: site.images.conference, img: "", badge: "bg-[oklch(0.3_0.13_268)] text-white dark:bg-primary dark:text-primary-foreground" },
];

export default function ProgramCycles() {
  const t = useT().programsPage;
  return (
    <div className="mx-auto max-w-7xl space-y-24 px-4 py-20 md:px-6 md:py-28">
      {t.cycles.map((cycle, i) => {
        const s = CYCLE_STYLES[i % CYCLE_STYLES.length];
        const reversed = i % 2 === 1;
        return (
          <section
            key={cycle.id}
            id={cycle.id}
            className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={cn("relative", reversed && "lg:order-2")}>
              <img
                src={s.photo}
                alt={cycle.name}
                loading={i === 0 ? "eager" : "lazy"}
                className={cn("aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl", s.img)}
              />
              <span
                className={cn(
                  "absolute top-5 left-5 rounded-full px-4 py-1.5 text-sm font-bold shadow-lg",
                  s.badge,
                )}
              >
                {cycle.ages}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm font-bold tracking-[0.15em] text-[oklch(0.55_0.13_70)] uppercase dark:text-accent">
                  {String(i + 1).padStart(2, "0")} · {cycle.classes}
                </p>
                <h2 className="font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                  {cycle.name}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">{cycle.intro}</p>

              <div>
                <h3 className="mb-3 font-display text-sm font-bold tracking-wide text-primary uppercase">
                  {t.highlightsLabel}
                </h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {cycle.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                        <Check className="size-3" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-display text-sm font-bold tracking-wide text-primary uppercase">
                  {t.subjectsLabel}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cycle.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full border bg-card px-3 py-1 text-xs font-semibold text-foreground/80"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
