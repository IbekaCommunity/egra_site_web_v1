import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { cn } from "@/lib/utils.ts";

export default function EnrollCta() {
  const t = useT();
  const locale = localeParam(useLang());
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-accent px-6 py-14 text-center md:px-16 md:py-20">
        <div className="pointer-events-none absolute -top-16 -left-16 size-64 rounded-full bg-white/30 blur-2xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-20 size-72 rounded-full bg-[oklch(0.66_0.13_240)]/40 blur-3xl" />
        <div className="relative mx-auto max-w-2xl space-y-5">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance text-[oklch(0.24_0.08_268)] md:text-5xl">
            {t.cta.title}
          </h2>
          <p className="text-lg text-[oklch(0.3_0.08_268)]">{t.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/{-$locale}/admissions"
              params={{ locale }}
              className={cn(
                buttonVariants(),
                "h-12 rounded-full bg-[oklch(0.3_0.13_268)] px-6 text-base text-white hover:bg-[oklch(0.25_0.12_268)] cursor-pointer",
              )}
            >
              {t.cta.enroll} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/{-$locale}/contact"
              params={{ locale }}
              search={{ type: "message" }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-12 rounded-full border-2 border-[oklch(0.3_0.13_268)] px-6 text-base text-[oklch(0.3_0.13_268)] hover:bg-white/40 hover:text-[oklch(0.3_0.13_268)] cursor-pointer",
              )}
            >
              {t.cta.contact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
