import PageHero from '#/components/page-hero';
import { Button } from '#/components/ui/button';
import { useT } from '#/hooks/use-locale';
import { getDictionary, langFromParam } from '#/lib/i18n';
import { createFileRoute } from '@tanstack/react-router'
import {z} from 'zod';

export const Route = createFileRoute('/{-$locale}/career')({
  head: ({ params }) => {
      const t = getDictionary(langFromParam(params.locale)).careerPage;
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
  component: CareerPage,
})

function CareerPage() {
  const t = useT().careerPage; 
    return (
      <>
        <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}>
          {/* <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-[oklch(0.24_0.08_268)]">
            <button>Test</button>
          </div> */}
        </PageHero>
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.5fr_1fr]">
           
        </section>
      </>
    );
}
