import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import SiteFooter from "@/components/layout/site-footer.tsx";
import SiteHeader from "@/components/layout/site-header.tsx";
import { getDictionary, langFromParam } from "@/lib/i18n/index.ts";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // Only "/" (French) and "/en" (English) are valid prefixes.
    if (params.locale !== undefined && params.locale !== "en") throw notFound();
  },
  head: ({ params }) => {
    const lang = langFromParam(params.locale);
    const t = getDictionary(lang);
    return {
      meta: [
        { title: t.meta.homeTitle },
        { name: "description", content: t.meta.homeDescription },
        { property: "og:title", content: t.meta.homeTitle },
        { property: "og:description", content: t.meta.homeDescription },
        { property: "og:locale", content: lang === "fr" ? "fr_FR" : "en_GB" },
      ],
    };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
