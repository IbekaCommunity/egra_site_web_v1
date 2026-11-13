import SectionHeading from "@/components/section-heading.tsx";
import { useT } from "@/hooks/use-locale.ts";

export default function SchoolValues() {
  const t = useT().schoolPage.values;
  return (
    <section className="bg-[oklch(0.22_0.09_268)] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} inverted align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((value, i) => (
            <div
              key={value.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
            >
              <span className="font-display text-4xl font-extrabold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 mb-2 font-display text-xl font-bold text-white">{value.title}</h3>
              <p className="text-white/70">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
