import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/page-hero.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { getDictionary, langFromParam } from "@/lib/i18n/index.ts";
import EnrollCta from "./-components/enroll-cta.tsx";
import ProgramApproach from "./-components/program-approach";
import ProgramCycles from "./-components/program-cycles.tsx";

export const Route = createFileRoute("/{-$locale}/formations")({
  head: ({ params }) => {
    const t = getDictionary(langFromParam(params.locale)).programsPage;
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
  component: ProgramsPage,
});

function ProgramsPage() {
  const t = useT().programsPage;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}>
        <div className="mt-8 flex flex-wrap gap-2">
          {t.cycles.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 cursor-pointer"
            >
              {c.name} <span className="text-white/60">· {c.ages}</span>
            </a>
          ))}
        </div>
      </PageHero>
      <ProgramCycles />
      <ProgramApproach />
      <EnrollCta />
    </>
  );
}
