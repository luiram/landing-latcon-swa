import Image from "next/image";
import { cn } from "@/lib/cn";

export type DatosImagen = {
  src: string;
  alt: string;
};

type ImagenProps = DatosImagen & {
  /** `panorama`: 16:10 en móvil, 5:3 desde sm. */
  proporcion?: "panorama" | "cuadrada";
  /** Atributo `sizes` de next/image. */
  sizes?: string;
  prioridad?: boolean;
  className?: string;
};

const PROPORCIONES = {
  panorama: "aspect-[16/10] sm:aspect-[5/3]",
  cuadrada: "aspect-square",
} as const;

/** Imagen recortada a una proporción fija, con las esquinas de tarjeta. */
export function Imagen({ src, alt, proporcion = "panorama", sizes = "100vw", prioridad, className }: ImagenProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-card", PROPORCIONES[proporcion], className)}>
      <Image src={src} alt={alt} fill priority={prioridad} className="object-cover object-center" sizes={sizes} />
    </div>
  );
}
