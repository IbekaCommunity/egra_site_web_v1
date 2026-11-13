import { Compass, Eye, HeartHandshake } from "lucide-react";
import SectionHeading from "@/components/section-heading.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { site } from "@/lib/site.ts";

const PILLAR_ICONS = [Compass, Eye, HeartHandshake];

export default function SchoolAbout() {
  const t = useT().schoolPage;
  return (
    <section id="projet" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          {t.about.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <p className="font-script text-3xl text-[oklch(0.55_0.13_240)] dark:text-primary">
            {t.about.quote}
          </p>
        </div>
        <div className="relative">
          <img
            src={site.images.conference}
            alt={t.about.photoAlt}
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl"
          />
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-accent px-6 py-4 shadow-xl sm:block">
            <p className="font-display text-sm font-extrabold tracking-wide text-[oklch(0.24_0.08_268)] uppercase">
              {site.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {t.pillars.map((pillar, i) => {
          const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
          return (
            <div key={pillar.title} className="rounded-3xl border bg-card p-7">
              <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mb-2 font-display text-xl font-bold text-primary">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
