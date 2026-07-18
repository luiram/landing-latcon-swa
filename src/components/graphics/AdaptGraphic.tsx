import styles from "./AdaptGraphic.module.css";

/** Curva real (sólida) vs. proyección (punteada, "se dibuja") + alerta que parpadea antes del pico. */
export function AdaptGraphic({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 200 100" className={styles.root} data-paused={paused} aria-hidden="true">
      <path d="M8,78 C40,74 60,66 92,52" className={styles.actual} />
      <path d="M92,52 C120,40 140,24 192,12" className={styles.projection} />
      <circle cx="150" cy="26" r="3.5" className={styles.alert} />
      <circle cx="92" cy="52" r="3" className={styles.now} />
    </svg>
  );
}
