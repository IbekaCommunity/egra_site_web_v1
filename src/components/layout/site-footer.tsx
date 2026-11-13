import { Link } from "@tanstack/react-router";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogoIcon,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import BrandLogo from "@/components/brand-logo.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { localeParam } from "@/lib/i18n/index.ts";
import { NAV_ITEMS } from "@/lib/nav.ts";
import { site } from "@/lib/site.ts";


const SOCIALS = [
  { icon: FacebookLogo, label: "Facebook", href: "https://www.facebook.com/share/1H1kgwTYS4/" },
  { icon: InstagramLogo, label: "Instagram", href: "https://www.instagram.com/egra_international_school?igsh=NTJjenRxMDg4NW93" },
  { icon: YoutubeLogo, label: "YouTube", href: "https://youtube.com/@egrainternationalschool?si=T98Uj6K8PdjnGe1r" },
  { icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com" },
  { icon:TiktokLogoIcon, label: "TikTok", href:"https://www.tiktok.com/@egra_internationa?_t=ZM-8urUuIG5jC3&_r=1"},
];

export default function SiteFooter() {
  const t = useT();
  const locale = localeParam(useLang());
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.22_0.09_268)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <BrandLogo inverted />
          <p className="font-script text-2xl text-[oklch(0.8_0.1_240)]">{t.footer.motto}</p>
          <div className="flex gap-2">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <Icon size={18} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold tracking-wider text-white/60 uppercase">
            {t.footer.explore}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.to}
                  params={{ locale }}
                  className="text-white/80 transition hover:text-white cursor-pointer"
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold tracking-wider text-white/60 uppercase">
            {t.footer.families}
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/{-$locale}/admissions"
                params={{ locale }}
                className="text-white/80 transition hover:text-white cursor-pointer"
              >
                {t.nav.enroll}
              </Link>
            </li>
            <li>
              <a href={site.parentPortalUrl} className="text-white/80 transition hover:text-white cursor-pointer">
                {t.nav.parentsSpace}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/60 md:px-6">
          © {year} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
