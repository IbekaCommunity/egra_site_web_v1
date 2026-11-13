import { useLocation } from "@tanstack/react-router";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useLang } from "@/hooks/use-locale.ts";
import { switchLangPath } from "@/lib/nav.ts";
import type { Lang } from "@/lib/i18n/index.ts";
import { cn } from "@/lib/utils.ts";

const LANGUAGES: ReadonlyArray<{ code: Lang; label: string }> = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

function useLangHref() {
  const { pathname } = useLocation();
  return (code: Lang) => switchLangPath(pathname, code);
}

export function LanguageSelector() {
  const lang = useLang();
  const hrefFor = useLangHref();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition hover:bg-muted cursor-pointer"
        aria-label="Language"
      >
        <Globe className="size-4" />
        {lang.toUpperCase()}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            render={<a href={hrefFor(l.code)} hrefLang={l.code} />}
            className="cursor-pointer"
          >
            <span className="w-6 text-xs font-bold text-muted-foreground">
              {l.code.toUpperCase()}
            </span>
            {l.label}
            {lang === l.code && <Check className="ml-auto size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageToggleRow() {
  const lang = useLang();
  const hrefFor = useLangHref();
  return (
    <div className="flex gap-2">
      {LANGUAGES.map((l) => (
        <a
          key={l.code}
          href={hrefFor(l.code)}
          hrefLang={l.code}
          className={cn(
            "flex flex-1 items-center justify-center rounded-xl border py-2.5 text-sm font-semibold transition cursor-pointer",
            lang === l.code
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-foreground hover:bg-muted",
          )}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
