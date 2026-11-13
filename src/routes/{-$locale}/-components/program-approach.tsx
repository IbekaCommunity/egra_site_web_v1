import { Handshake, Hammer, Languages, UserRound } from "lucide-react";
import SectionHeading from "@/components/section-heading.tsx";
import { useT } from "@/hooks/use-locale.ts";

const ICONS = [Languages, UserRound, Hammer, Handshake];

export default function ProgramApproach() {
  const t = useT().programsPage;
  return (
    <>
      <section className="bg-[oklch(0.22_0.09_268)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading eyebrow={t.approach.eyebrow} title={t.approach.title} inverted align="center" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.approach.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                  <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent text-[oklch(0.24_0.08_268)]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-2 font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="space-y-4">
            <SectionHeading eyebrow={t.activities.eyebrow} title={t.activities.title} />
            <p className="text-lg text-muted-foreground">{t.activities.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {t.activities.items.map((a, i) => (
              <span
                key={a}
                className={
                  i % 3 === 0
                    ? "rounded-full bg-accent/40 px-5 py-3 font-semibold text-primary"
                    : i % 3 === 1
                      ? "rounded-full bg-secondary px-5 py-3 font-semibold text-primary"
                      : "rounded-full bg-primary/10 px-5 py-3 font-semibold text-primary"
                }
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
