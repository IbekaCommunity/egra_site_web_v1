import type { Dictionary } from "@/lib/i18n/index.ts";

type NavKey = keyof Pick<
  Dictionary["nav"],
  "home" | "school" | "programs" | "admissions" | "news" | "contact"
>;

// Every page lives under the optional `{-$locale}` segment ("/" = FR, "/en" = EN).
export const NAV_ITEMS = [
  { key: "home", to: "/{-$locale}" },
  { key: "school", to: "/{-$locale}/ecole" },
  { key: "programs", to: "/{-$locale}/formations" },
  { key: "admissions", to: "/{-$locale}/admissions" },
  { key: "news", to: "/{-$locale}/actualites" },
  { key: "contact", to: "/{-$locale}/contact" },
] as const satisfies ReadonlyArray<{ key: NavKey; to: string }>;

export type NavTo = (typeof NAV_ITEMS)[number]["to"];

/** Swaps the language prefix of a pathname, keeping the rest of the path. */
export function switchLangPath(pathname: string, target: "fr" | "en"): string {
  const rest = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  if (target === "fr") return rest;
  return rest === "/" ? "/en" : `/en${rest}`;
}
