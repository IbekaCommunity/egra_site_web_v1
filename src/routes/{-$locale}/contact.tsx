import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import PageHero from "@/components/page-hero.tsx";
import { useT } from "@/hooks/use-locale.ts";
import { getDictionary, langFromParam } from "@/lib/i18n/index.ts";
import { INQUIRY_KINDS } from "@/convex/shared/inquiry";
import ContactForm from "./-components/contact-form";
import ContactInfo from "./-components/contact-info.tsx";

export const Route = createFileRoute("/{-$locale}/contact")({
  validateSearch: z.object({
    type: z.enum(INQUIRY_KINDS).optional().catch(undefined),
  }),
  head: ({ params }) => {
    const t = getDictionary(langFromParam(params.locale)).contactPage;
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
  component: ContactPage,
});

function ContactPage() {
  const t = useT().contactPage;
  const { type } = Route.useSearch();
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm initialKind={type ?? "preinscription"} />
        <ContactInfo />
      </section>
    </>
  );
}
