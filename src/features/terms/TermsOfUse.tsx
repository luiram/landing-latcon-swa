import Link from "next/link";
import { getTermsContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/localePaths";

export function TermsOfUse({ locale }: { locale: LocaleCode }) {
  const t = getTermsContent(locale);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{t.pageTitle}</h1>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">{t.lastUpdated}</p>
      <p className="mt-6 text-sm leading-relaxed text-text-muted sm:text-base">{t.intro}</p>

      <div className="mt-10 space-y-8">
        {t.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold text-text-primary">{s.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border-subtle bg-bg-panel p-5">
        <p className="text-sm text-text-muted">
          {t.contactLabel}{" "}
          <a
            href={`mailto:${t.contactEmail}`}
            className="font-semibold text-blue-mid-2 underline-offset-4 hover:underline"
          >
            {t.contactEmail}
          </a>
        </p>
      </div>

      <Link
        href={withLocalePrefix("/", locale)}
        className="mt-8 inline-flex text-sm font-semibold text-blue-mid-2 underline-offset-4 hover:underline"
      >
        {t.backLink}
      </Link>
    </div>
  );
}
