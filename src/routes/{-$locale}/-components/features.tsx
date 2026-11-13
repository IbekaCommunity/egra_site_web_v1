import { GraduationCap, HeartHandshake, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import SectionHeading from "@/components/section-heading.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { cn } from "@/lib/utils.ts";

const ICONS = [
  { icon: GraduationCap, tone: "bg-primary text-primary-foreground" },
  { icon: HeartHandshake, tone: "bg-secondary text-primary" },
  { icon: Lightbulb, tone: "bg-accent text-accent-foreground" },
  { icon: TrendingUp, tone: "bg-[oklch(0.66_0.13_240)] text-white" },
];

export default function Features() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <SectionHeading eyebrow={t.features.eyebrow} title={t.features.title} align="center" />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.features.items.map((f, i) => {
          const { icon: Icon, tone } = ICONS[i % ICONS.length];
          return (
            <motion.article
              key={f.title}
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className={cn("mb-6 flex size-14 items-center justify-center rounded-2xl transition group-hover:rotate-6", tone)}>
                <Icon className="size-6" />
              </span>
              <h3 className="mb-2 font-display text-lg font-bold text-primary">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
