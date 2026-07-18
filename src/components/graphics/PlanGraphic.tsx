import styles from "./PlanGraphic.module.css";

const NODES = [
  { x: 34, y: 46, delay: 0 },
  { x: 48, y: 148, delay: 0.65 },
  { x: 156, y: 32, delay: 1.3 },
  { x: 166, y: 138, delay: 1.95 },
];
const CENTER = { x: 100, y: 92 };

/** "Nodos que convergen en una ruta óptima" — pulsos viajando hacia un panel central. */
export function PlanGraphic({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 200 184" className={styles.root} data-paused={paused} aria-hidden="true">
      {NODES.map((n, i) => (
        <line key={`link-${i}`} x1={n.x} y1={n.y} x2={CENTER.x} y2={CENTER.y} className={styles.link} />
      ))}
      {NODES.map((n, i) => (
        <line
          key={`pulse-${i}`}
          x1={n.x}
          y1={n.y}
          x2={CENTER.x}
          y2={CENTER.y}
          className={styles.pulse}
          style={{ animationDelay: `${n.delay}s` }}
        />
      ))}
      {NODES.map((n, i) => (
        <circle key={`node-${i}`} cx={n.x} cy={n.y} r={4} className={styles.node} />
      ))}
      <circle cx={CENTER.x} cy={CENTER.y} r={10} className={styles.centerRing} />
      <circle cx={CENTER.x} cy={CENTER.y} r={5} className={styles.centerCore} />
    </svg>
  );
}
