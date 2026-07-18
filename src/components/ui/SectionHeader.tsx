import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Frase puente / insight breve (p. ej. secciones tipo diagnóstico) */
  bridge?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  bridge,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-text-muted sm:text-lg">{intro}</p>
      ) : null}
      {bridge ? (
        <p
          className={cn(
            "mt-5 text-pretty text-sm font-medium leading-relaxed text-text-primary sm:text-base",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl border-l-2 border-accent/45 pl-4",
          )}
        >
          {bridge}
        </p>
      ) : null}
    </div>
  );
}
