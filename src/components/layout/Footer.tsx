import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";

const footLink =
  "rounded-md text-text-muted transition-colors duration-200 hover:text-blue-mid-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-warm";

export function Footer() {
  return (
    <footer id="privacidad" className="border-t border-border-subtle bg-bg-page py-16">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-semibold text-text-primary">{site.brand}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{site.descriptor}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm md:items-end">
          <a className={footLink} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className={footLink} href={site.linkedinUrl} rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>
          <a className={footLink} href={site.agendaUrl} rel="noopener noreferrer" target="_blank">
            Agenda
          </a>
          <a className={footLink} href={site.privacyUrl}>
            Privacidad
          </a>
        </div>
      </Container>
      <Container className="mt-12 border-t border-border-subtle pt-8">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} {site.brand}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
