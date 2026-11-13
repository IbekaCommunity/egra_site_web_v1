import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useT } from "@/hooks/use-locale.ts";
import { site } from "@/lib/site.ts";

export default function ContactInfo() {
  const t = useT().contactPage.info;
  const items = [
    { icon: MapPin, label: t.address, value: t.addressValue },
    { icon: Phone, label: t.phone, value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: t.email, value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Clock, label: t.hours, value: t.hoursValue },
  ];

  return (
    <aside className="space-y-6">
      <div className="rounded-[2rem] bg-[oklch(0.3_0.13_268)] p-8 text-white">
        <h2 className="mb-6 font-display text-2xl font-extrabold">{t.title}</h2>
        <ul className="space-y-5">
          {items.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-wider text-white/60 uppercase">{label}</p>
                {href ? (
                  <a href={href} className="break-words font-medium hover:text-accent cursor-pointer">
                    {value}
                  </a>
                ) : (
                  <p className="break-words font-medium">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={site.parentPortalUrl}
        className="group block rounded-[2rem] bg-accent p-8 text-[oklch(0.24_0.08_268)] transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
      >
        <h3 className="mb-2 flex items-center justify-between gap-3 font-display text-xl font-extrabold">
          {t.parentsTitle}
          <ExternalLink className="size-5 shrink-0 transition group-hover:translate-x-0.5" />
        </h3>
        <p className="text-sm text-[oklch(0.3_0.08_268)]">{t.parentsDesc}</p>
      </a>

      <img
        src={site.images.celebration}
        alt=""
        loading="lazy"
        className="hidden aspect-[4/3] w-full rounded-[2rem] object-cover shadow-md lg:block"
      />
    </aside>
  );
}
