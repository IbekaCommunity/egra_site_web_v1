import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import SectionHeading from "@/components/section-heading.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { site } from "@/lib/site.ts";

export default function Bilingual() {
  const t = useT();
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2">
        <motion.div
          initial={{ x: -30 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <img
            src={site.images.celebration}
            alt={t.bilingual.photoAlt}
            className="aspect-[16/11] w-full rounded-[2rem] object-cover shadow-xl"
            loading="lazy"
          />
          <div className="absolute -right-3 -bottom-6 hidden w-44 overflow-hidden rounded-2xl border-4 border-background shadow-xl sm:block">
            <img
              src={site.images.uniforms}
              alt={t.gallery.alts[0]}
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="space-y-6">
          <SectionHeading eyebrow={t.bilingual.eyebrow} title={t.bilingual.title} />
          <p className="text-lg leading-relaxed text-muted-foreground">{t.bilingual.description}</p>
          <ul className="space-y-3">
            {t.bilingual.points.map((p) => (
              <li key={p} className="flex items-start gap-3 font-medium text-foreground">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[oklch(0.55_0.13_240)] dark:text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
