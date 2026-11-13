import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/page-hero.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { getDictionary, langFromParam } from "@/lib/i18n/index.ts";
import {
  AdmissionDocuments,
  AdmissionFaq,
  AdmissionSteps,
} from "./-components/admission-sections.tsx";

export const Route = createFileRoute("/{-$locale}/admissions")({
  head: ({ params }) => {
    const t = getDictionary(langFromParam(params.locale)).admissionsPage;
    const title = `${t.metaTitle} | EGRA International School`;
    return {
      meta: [
        { title },
        { name: "description", content: t.metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: t.metaDescription },
      ],
    };
  },
  component: AdmissionsPage,
});

function AdmissionsPage() {
  const t = useT().admissionsPage;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-[oklch(0.24_0.08_268)]">
          <span className="size-2 rounded-full bg-[oklch(0.55_0.17_150)]" />
          {t.open}
        </span>
      </PageHero>
      <AdmissionSteps />
      <AdmissionDocuments />
      <AdmissionFaq />
    </>
  );
}
