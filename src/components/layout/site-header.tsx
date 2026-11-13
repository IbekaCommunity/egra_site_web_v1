import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  Images,
  Menu,
  Users,
} from "lucide-react";
import { useState } from "react";
import BrandLogo from "@/components/brand-logo.tsx";
import {
  LanguageSelector,
  LanguageToggleRow,
} from "@/components/layout/language-selector.tsx";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { NAV_ITEMS, type NavTo } from "@/lib/nav.ts";
import { site } from "@/lib/site.ts";
import { cn } from "@/lib/utils.ts";

const SCHOOL_ITEMS = [
  { icon: Building2, key: "facilities", to: "/{-$locale}/ecole", hash: "installations", tone: "bg-secondary text-primary" },
  { icon: Images, key: "gallery", to: "/{-$locale}/ecole", hash: "galerie", tone: "bg-accent/30 text-accent-foreground" },
  { icon: ClipboardCheck, key: "admissions", to: "/{-$locale}/admissions", hash: undefined, tone: "bg-primary/10 text-primary" },
  { icon: CreditCard, key: "fees", to: "/{-$locale}/fees", hash: undefined, tone: "bg-primary/10 text-primary" },
] as const satisfies ReadonlyArray<{ key: "facilities" | "gallery" | "admissions" | "fees"; to: NavTo; hash: string | undefined; icon: typeof Building2; tone: string }>;

const linkBase =
  "relative py-2 text-sm font-semibold text-foreground/80 transition hover:text-primary cursor-pointer";
const activeLink =
  "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent";

function SchoolMegaMenu() {
  const t = useT();
  const lang = useLang();
  const locale = localeParam(lang);
  const m = t.nav.schoolMenu;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        openOnHover
        delay={80}
        className={cn(linkBase, "flex items-center gap-1 outline-none")}
      >
        {t.nav.school}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={14}
        className="w-[580px] rounded-2xl p-5"
      >
        <div className="grid grid-cols-3 gap-3">
          {SCHOOL_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.key}
                render={<Link to={item.to} params={{ locale }} hash={item.hash} />}
                className="flex-col items-start gap-2 rounded-xl p-4 cursor-pointer"
              >
                <span className={cn("flex size-11 items-center justify-center rounded-xl", item.tone)}>
                  <Icon className="size-5" />
                </span>
                <span className="font-display text-sm font-bold text-primary">{m[item.key]}</span>
                <span className="text-xs leading-snug whitespace-normal text-muted-foreground">
                  {m[`${item.key}Desc`]}
                </span>
              </DropdownMenuItem>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">{m.learnMore}</p>
          <Link
            to="/{-$locale}/ecole"
            params={{ locale }}
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            {m.visit} <ArrowRight className="size-3" />
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function SiteHeader() {
  const t = useT();
  const lang = useLang();
  const locale = localeParam(lang);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <BrandLogo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) =>
            item.key === "school" ? (
              <SchoolMegaMenu key={item.key} />
            ) : (
              <Link
                key={item.key}
                to={item.to}
                params={{ locale }}
                activeOptions={{ exact: true }}
                className={linkBase}
                activeProps={{ className: activeLink }}
              >
                {t.nav[item.key]}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector />
          <a
            href={site.parentPortalUrl}
            className={cn(buttonVariants(), "h-10 rounded-full px-5 cursor-pointer")}
          >
            <Users className="size-4" /> {t.nav.parentsSpace}
          </a>
        </div>

        <Button
          variant="ghost"
          size="icon-lg"
          className="lg:hidden"
          onClick={() => setOpen(true)}
          aria-label={t.nav.menu}
        >
          <Menu className="size-6 text-primary" />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[86%] gap-0 p-0">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle className="font-display text-lg font-bold text-primary">
              {t.nav.menu}
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                params={{ locale }}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-semibold text-foreground/80 hover:bg-muted cursor-pointer"
                activeProps={{ className: "bg-primary/10 text-primary" }}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <div className="my-3 border-t" />
            <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t.nav.language}
            </p>
            <div className="px-3">
              <LanguageToggleRow />
            </div>
          </nav>
          <div className="border-t p-5">
            <a
              href={site.parentPortalUrl}
              className={cn(buttonVariants(), "h-12 w-full rounded-full cursor-pointer")}
            >
              <Users className="size-4" /> {t.nav.parentsSpace}
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
