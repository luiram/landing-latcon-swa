"use client";

/**
 * Captura errores lanzados por el layout raíz (ej. componentes que viven ahí como
 * el banner de cookies). A diferencia de error.tsx, este reemplaza <html>/<body>
 * por completo, así que usa estilos inline: no podemos confiar en que el CSS del
 * sitio haya cargado si el error ocurrió muy temprano.
 */
export default function GlobalError({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f4f2",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "26rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f58220", margin: 0 }}>Latcon</p>
          <h1 style={{ marginTop: "1rem", fontSize: "1.15rem", fontWeight: 600, color: "#4a4b50" }}>
            Algo no cargó correctamente
          </h1>
          <p style={{ marginTop: "0.5rem", color: "#65666c", fontSize: "0.9rem", lineHeight: 1.5 }}>
            Puede ser un problema temporal de conexión. Intenta de nuevo.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: "#f58220",
                color: "#ffffff",
                padding: "0.6rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
            <a
              href="/"
              style={{
                color: "#4a4b50",
                padding: "0.6rem 1.5rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(74,75,80,0.16)",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                background: "#ffffff",
              }}
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
