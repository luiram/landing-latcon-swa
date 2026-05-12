import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";

const footLink =
  "inline-flex rounded-md text-sm font-medium text-text-muted transition-colors duration-200 hover:text-blue-mid-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page";

export function Footer() {
  return (
    <footer id="privacidad" className="border-t border-border-subtle bg-bg-page py-11 sm:py-12">
      <Container className="flex flex-col gap-7 sm:gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="max-w-lg md:min-w-0 md:flex-1">
          <p className="text-base font-semibold tracking-tight text-text-primary">{site.brand}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted sm:mt-2.5 sm:text-[0.9375rem] sm:leading-relaxed">
            {site.descriptor}
          </p>
        </div>
        <nav
          className="flex shrink-0 flex-col border-t border-border-subtle pt-6 text-sm md:border-t-0 md:pt-0 md:text-right"
          aria-label="Enlaces de pie de página"
        >
          <a className={footLink} href={site.privacyUrl}>
            Privacidad
          </a>
        </nav>
      </Container>
      <Container className="mt-7 border-t border-border-subtle pt-5 sm:mt-8 sm:pt-6">
        <p className="text-xs leading-relaxed text-text-muted">
          © 2026 {site.brand}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
