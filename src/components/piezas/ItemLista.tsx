type ItemListaProps = {
  children: React.ReactNode;
};

/** Elemento de una lista con viñeta de acento. Va dentro de un `<ul>`. */
export function ItemLista({ children }: ItemListaProps) {
  return (
    <li className="flex gap-2">
      <span className="text-accent/70" aria-hidden>
        ·
      </span>
      <span>{children}</span>
    </li>
  );
}
