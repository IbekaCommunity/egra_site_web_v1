import { site } from "@/lib/site.ts";
import type { NewsItem } from "@/lib/i18n/fr.ts";

// Photo per article id (same in both languages). Replace with real photos later.
const NEWS_IMAGE_BY_ID: Record<string, string> = {
  "nouveau-batiment": site.images.uniforms,
  "remise-des-prix": site.images.hero,
  "portes-ouvertes-2025": site.images.conference,
  "journee-culturelle": site.images.celebration,
  "conference-orientation": site.images.computers,
  "tournoi-sportif": site.images.sport,
};

export function newsImage(item: NewsItem): string {
  return NEWS_IMAGE_BY_ID[item.id] ?? site.images.celebration;
}
