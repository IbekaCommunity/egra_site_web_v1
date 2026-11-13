import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/page-hero.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { getDictionary, langFromParam } from "@/lib/i18n/index.ts";
import EnrollCta from "./-components/enroll-cta.tsx";
import SchoolAbout from "./-components/school-about";
import SchoolFacilities from "./-components/school-facilities";
import SchoolGallery from "./-components/school-gallery";
import SchoolValues from "./-components/school-values";

export const Route = createFileRoute("/{-$locale}/ecole")({
  head: ({ params }) => {
    const t = getDictionary(langFromParam(params.locale)).schoolPage;
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
  component: SchoolPage,
});

const JUMPS = [
  { key: "about", href: "#projet" },
  { key: "facilities", href: "#installations" },
  { key: "gallery", href: "#galerie" },
] as const;

function SchoolPage() {
  const t = useT().schoolPage;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}>
        <div className="mt-8 flex flex-wrap gap-2">
          {JUMPS.map((j) => (
            <a
              key={j.key}
              href={j.href}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 cursor-pointer"
            >
              {t.jump[j.key]}
            </a>
          ))}
        </div>
      </PageHero>
      <SchoolAbout />
      <SchoolValues />
      <SchoolFacilities />
      <SchoolGallery />
      <EnrollCta />
    </>
  );
}
