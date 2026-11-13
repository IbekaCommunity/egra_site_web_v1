import type { ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

/** Small uppercase label + display title used at the top of each section. */
export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  inverted = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <p
        className={cn(
          "mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase",
          inverted ? "text-accent" : "text-[oklch(0.55_0.13_70)] dark:text-accent",
        )}
      >
        <span className="h-0.5 w-6 rounded-full bg-accent" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-3xl font-extrabold tracking-tight text-balance md:text-4xl",
          inverted ? "text-white" : "text-primary",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
