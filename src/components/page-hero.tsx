import type { ReactNode } from "react";

/** Navy banner at the top of every inner page. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.3_0.13_268)] text-white">
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[oklch(0.66_0.13_240)]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        {eyebrow && (
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-accent uppercase">
            <span className="h-0.5 w-6 rounded-full bg-accent" />
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
