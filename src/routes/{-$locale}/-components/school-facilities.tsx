import {
  BookOpen,
  Dumbbell,
  Microscope,
  Monitor,
  School,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { useT } from "@/hooks/use-locale.ts";
import { site } from "@/lib/site.ts";

const ICONS = [School, BookOpen, Microscope, Monitor, Dumbbell, ShieldCheck];

export default function SchoolFacilities() {
  const t = useT().schoolPage.facilities;
  return (
    <section id="installations" className="scroll-mt-24 bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <SectionHeading eyebrow={t.eyebrow} title={t.title} />
            <p className="text-lg text-muted-foreground">{t.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={site.images.lab}
                alt={t.items[2].title}
                loading="lazy"
                className="aspect-square w-full rounded-3xl object-cover"
              />
              <img
                src={site.images.sport}
                alt={t.items[4].title}
                loading="lazy"
                className="aspect-square w-full rounded-3xl object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={item.title} className="rounded-3xl bg-card p-6 shadow-sm">
                  <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/30 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-1.5 font-display text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
