import { en } from "./en.ts";
import { fr, type Dictionary } from "./fr.ts";

export type Lang = "fr" | "en";
export type { Dictionary };

// French is served at the root ("/"), English under the "/en" prefix.
export const DEFAULT_LANG: Lang = "fr";

const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Maps the optional `{-$locale}` URL segment to a language. */
export function langFromParam(locale: string | undefined): Lang {
  return locale === "en" ? "en" : DEFAULT_LANG;
}

/** The URL segment value for a language (`undefined` omits the prefix). */
export function localeParam(lang: Lang): "en" | undefined {
  return lang === "en" ? "en" : undefined;
}

export function formatDate(iso: string, lang: Lang): string {
  // Fixed locale and UTC so server and browser render the same string.
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
