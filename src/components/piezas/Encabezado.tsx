import { cn } from "@/lib/cn";
import { Texto } from "@/components/ui/Texto";
import { Titulo, type RolTitulo } from "@/components/ui/Titulo";

export type DatosEncabezado = {
  antetitulo?: string;
  titulo: string;
  bajada?: string;
};

type EncabezadoProps = DatosEncabezado & {
  rol?: Extract<RolTitulo, "heading-lg" | "heading" | "heading-sm">;
  nivel?: 1 | 2;
  alineacion?: "izquierda" | "centro";
  className?: string;
};

/** Antetítulo, título y bajada de una sección. Una bajada vacía no se muestra. */
export function Encabezado({
  antetitulo,
  titulo,
  bajada,
  rol = "heading",
  nivel = 2,
  alineacion = "izquierda",
  className,
}: EncabezadoProps) {
  const centro = alineacion === "centro";
  return (
    <header className={cn("max-w-prose-wide", centro && "mx-auto text-center", className)}>
      {antetitulo ? (
        <Texto rol="eyebrow" className="mb-3">
          {antetitulo}
        </Texto>
      ) : null}
      <Titulo nivel={nivel} rol={rol}>
        {titulo}
      </Titulo>
      {bajada ? <Texto className={cn("mt-4 max-w-prose", centro && "mx-auto")}>{bajada}</Texto> : null}
    </header>
  );
}
