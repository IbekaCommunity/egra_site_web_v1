import PageHero from '#/components/page-hero';
import { useT } from '#/hooks/use-locale';
import { getDictionary, langFromParam } from '#/lib/i18n';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/fees')({
    head: ({ params }) => {
        const t = getDictionary(langFromParam(params.locale)).feesPage;
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
    component: FeesPage,
})

function FeesPage() {
    const t = useT().feesPage;
  return(
  <>
    
        
        <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}/>
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.5fr_1fr]">
        </section>
    

     
  </> 
  );
    
}
