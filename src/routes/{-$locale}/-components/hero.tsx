import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { site } from "@/lib/site.ts";
import { cn } from "@/lib/utils.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const t = useT();
  const locale = localeParam(useLang());

  return (
    <section className="relative overflow-hidden bg-[oklch(0.3_0.13_268)] text-white">
      {/* Atmosphere: sky-blue glow + subtle dotted grid */}
      <div className="pointer-events-none absolute -top-40 -left-32 size-[520px] rounded-full bg-[oklch(0.66_0.13_240)]/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-[380px] rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.09)_1px,transparent_0)] [background-size:26px_26px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-20 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20 lg:pb-28">
        <div className="space-y-7">
          <motion.p
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[oklch(0.85_0.08_240)] uppercase"
          >
             {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t.hero.titleStart}{" "}
            <span className="relative inline-block  text-[oklch(0.8_0.11_240)]">
              {t.hero.titleHighlight}
              <span className="absolute -bottom-1  left-0 h-2 w-full -rotate-1 rounded-full bg-accent/70" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            className="max-w-xl text-lg text-justify text-white/75"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/{-$locale}/admissions"
              params={{ locale }}
              className={cn(
                buttonVariants(),
                "h-12 rounded-full bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/90 cursor-pointer",
              )}
            >
              {t.hero.enroll} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/{-$locale}/ecole"
              params={{ locale }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-12 rounded-full border border-white/25 px-6 text-base text-white hover:bg-white/10 hover:text-white cursor-pointer",
              )}
            >
              {t.hero.discover}
            </Link>
          </motion.div>

          <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-extrabold text-accent">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-white/65">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ rotate: 0, scale: 0.97 }}
            animate={{ rotate: 2, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-2xl"
          >
            <img
              src={site.images.hero}
              alt={t.hero.photoAlt}
              className="size-full object-cover object-top"
              fetchPriority="high"
            />
          </motion.div>

          {/* Handwritten motto sticker */}
          <motion.div
            initial={{ rotate: -10, y: 10 }}
            animate={{ rotate: -6, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="absolute -bottom-6 -left-4 rounded-2xl bg-white px-5 py-3 text-primary shadow-xl sm:-left-10"
          >
            <p className="font-script text-2xl leading-none text-[oklch(0.55_0.13_240)]">Think Global,</p>
            <p className="font-script text-3xl leading-none font-bold text-[oklch(0.3_0.13_268)]">Learn Local</p>
          </motion.div>

          <div className="absolute -top-4 -right-2 flex size-20 items-center justify-center rounded-full bg-accent font-display text-xl font-extrabold text-accent-foreground shadow-lg sm:-right-6">
            FR · EN
          </div>
        </div>
      </div>
    </section>
  );
}
