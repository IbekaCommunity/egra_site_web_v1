import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Info } from "lucide-react";
import SectionHeading from "@/components/section-heading.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { buttonVariants } from "@/components/ui/button.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { site } from "@/lib/site.ts";
import { cn } from "@/lib/utils.ts";

export function AdmissionSteps() {
  const t = useT().admissionsPage;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <SectionHeading eyebrow={t.stepsEyebrow} title={t.stepsTitle} align="center" />
      <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Connecting line behind the step numbers on large screens */}
        <div className="pointer-events-none absolute top-8 right-[12%] left-[12%] hidden h-0.5 bg-gradient-to-r from-accent via-[oklch(0.66_0.13_240)] to-primary lg:block" />
        {t.steps.map((step, i) => (
          <li key={step.title} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary font-display text-2xl font-extrabold text-primary-foreground shadow-lg ring-8 ring-background">
              {i + 1}
            </span>
            <h3 className="mb-2 font-display text-lg font-bold text-primary">{step.title}</h3>
            <p className="max-w-64 text-sm text-muted-foreground">{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AdmissionDocuments() {
  const t = useT().admissionsPage;
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2">
        <div className="space-y-6">
          <SectionHeading eyebrow={t.docsEyebrow} title={t.docsTitle} />
          <ul className="space-y-3">
            {t.docs.map((doc) => (
              <li key={doc} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/30 text-primary">
                  <FileText className="size-4" />
                </span>
                <span className="font-medium text-foreground">{doc}</span>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            {t.docsNote}
          </p>
        </div>
        <img
          src={site.images.uniforms}
          alt={t.title}
          loading="lazy"
          className="hidden aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl lg:block"
        />
      </div>
    </section>
  );
}

export function AdmissionFaq() {
  const t = useT().admissionsPage;
  const locale = localeParam(useLang());
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-6">
        <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} />
        <div className="rounded-3xl bg-[oklch(0.3_0.13_268)] p-8 text-white">
          <h3 className="mb-2 font-display text-2xl font-extrabold">{t.ctaTitle}</h3>
          <p className="mb-6 text-white/80">{t.ctaDesc}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/{-$locale}/contact"
              params={{ locale }}
              className={cn(
                buttonVariants(),
                "h-11 rounded-full bg-accent px-5 text-[oklch(0.24_0.08_268)] hover:bg-accent/90 cursor-pointer",
              )}
            >
              {t.ctaButton} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/{-$locale}/formations"
              params={{ locale }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-11 rounded-full px-5 text-white hover:bg-white/10 hover:text-white cursor-pointer",
              )}
            >
              {t.ctaPrograms}
            </Link>
          </div>
        </div>
      </div>
      <Accordion defaultValue={[0]} className="space-y-3">
        {t.faq.map((item, i) => (
          <AccordionItem key={item.q} value={i} className="rounded-2xl border bg-card px-5">
            <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-primary cursor-pointer">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
