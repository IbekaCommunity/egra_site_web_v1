import { createFileRoute } from "@tanstack/react-router";
import Bilingual from "./-components/bilingual";
import EnrollCta from "./-components/enroll-cta.tsx";
import Features from "./-components/features.tsx";
import GalleryStrip from "./-components/gallery-strip.tsx";
import Hero from "./-components/hero"; 
import NewsPreview from "./-components/news-preview.tsx";
import Levels from "./-components/levels.tsx";

export const Route = createFileRoute("/{-$locale}/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Bilingual />
      <Levels />
      <GalleryStrip />
      <NewsPreview />
      <EnrollCta />
    </>
  );
}
