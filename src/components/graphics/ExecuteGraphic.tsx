import styles from "./ExecuteGraphic.module.css";

const BLOCKS = [0, 1, 2, 3];

/** "Bloques que pasan de manual a automático por una compuerta" — cinta transportadora. */
export function ExecuteGraphic({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 200 100" className={styles.root} data-paused={paused} aria-hidden="true">
      <line x1="8" y1="58" x2="192" y2="58" className={styles.track} />

      {BLOCKS.map((i) => (
        <rect
          key={i}
          x="4"
          y="49"
          width="16"
          height="16"
          rx="3"
          className={styles.block}
          style={{ animationDelay: `${i * 0.95}s` }}
        />
      ))}

      {/* Compuerta: ícono manual (contorno) cruza a automático (relleno) */}
      <g transform="translate(92, 24)">
        <rect x="0" y="0" width="16" height="16" rx="2" className={styles.gateManual} />
        <rect x="0" y="0" width="16" height="16" rx="2" className={styles.gateAuto} />
      </g>
    </svg>
  );
}
