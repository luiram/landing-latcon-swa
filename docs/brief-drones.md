# Brief · Módulo de Drones

**LATCON SERVICES SAS** | Tecnología aplicada a la agricultura

## Objetivo

Incorporar al sitio web de LATCON una sección específica que presente nuestra línea de tecnología aplicada a la agricultura mediante drones, transmitiendo capacidad técnica y comercial sin convertir el sitio en una tienda de equipos.

---

## 1. Impacto en la página principal

**Propuesta:** incorporar en el hero/home una animación o video corto y sobrio de un dron agrícola volando sobre un cultivo. Debe integrarse con la identidad actual de LATCON, sin parecer publicidad de una marca de drones.

- **Mensaje:** "Tecnología aérea para una agricultura más inteligente"
- **Subtítulo:** "Drones para monitoreo, mapeo y captura de información agrícola." (Sin pulverización desde el paso 8a: ADR 0007.)
- **CTA:** "Conoce nuestras soluciones con drones →"

**Uso de imágenes:** para esta primera versión utilizar material propio o recursos con licencia comercial clara. No reutilizar fotografías, videos o logos oficiales de DJI sin autorización. DJI señala que su contenido y marcas están protegidos y que el uso comercial no autorizado puede estar restringido.

> **Nota de arquitectura (decisión posterior al brief):** el video de dron NO va en el hero del home. El hero es lo único que ve todo el público, incluidos los sectores de energía, avicultura y floricultura, y un dron agrícola ahí reduce a LATCON a una empresa de agricultura. El video con toda su fuerza va en `/lp/drones`, la landing de campaña. Ver §1.6b del documento de recomendaciones.

---

## 2. Nuevo módulo: Tecnología agrícola con drones

**Título:** Tecnología aérea para una agricultura más inteligente

**Texto:** Integramos drones, sensores, datos y analítica para ayudar a productores y organizaciones agrícolas a mejorar la eficiencia de sus operaciones y tomar mejores decisiones en campo.

| Frente | Descripción | Equipos |
|---|---|---|
| ~~**Pulverización agrícola**~~ (retirada, ADR 0007) | Soluciones para aplicación de productos agrícolas mediante drones, con configuraciones adaptables a diferentes escalas y tipos de cultivo | T25P · T55 |
| **Monitoreo y análisis** | Captura de información RGB y multiespectral para seguimiento, análisis y toma de decisiones agrícolas | Mavic 3 Multispectral |
| **Posicionamiento de alta precisión** | Tecnología RTK para operaciones que requieren precisión, repetibilidad y control de información geoespacial | D-RTK 3 |
| **Datos que se convierten en decisiones** | Integración de captura en campo con procesamiento, almacenamiento, analítica e inteligencia artificial | — |

> **Regla de redacción:** el modelo del equipo va al final de cada bloque como dato técnico, nunca como encabezado. Primero el problema del cultivo, después la configuración, y el modelo al cierre. Si el modelo encabeza el bloque, es catálogo.

---

## 3. Posicionamiento de LATCON

**No vendemos solamente drones. Diseñamos soluciones para el campo.**

Nuestro enfoque combina equipo + configuración + capacitación + datos + tecnología + acompañamiento. La solución se define de acuerdo con las características del cultivo, la operación y los objetivos del cliente.

---

## 4. Cómo trabajamos

| Paso | Qué hacemos |
|---|---|
| **01 · Entendemos** | Conocemos el cultivo, la operación y la necesidad |
| **02 · Diseñamos** | Definimos la tecnología y configuración adecuada |
| **03 · Validamos** | Probamos y ajustamos la solución en condiciones reales |
| **04 · Implementamos** | Acompañamos la puesta en operación y evolución de la solución |

---

## 5. Cierre / llamado a la acción

**¿Quieres conocer qué solución con drones puede aplicarse a tu operación?**

Hablemos de tu proyecto →

---

## 6. Lineamientos visuales

- Mantener la identidad visual actual de LATCON
- Estética tecnológica, sobria y agrícola; evitar apariencia de catálogo o tienda
- Utilizar imágenes libres para uso comercial o con licencia verificable
- No utilizar logos ni fotografías oficiales de DJI hasta contar con autorización
- Priorizar imágenes de drones agrícolas en operación, cultivos, mapas, sensores y datos
- El módulo debe poder crecer posteriormente con casos de uso, cultivos, videos y casos de éxito

---

## 7. Estructura mínima

```
Home/hero → Módulo Drones → 4 soluciones → Cómo trabajamos → CTA
```

La primera versión debe ser simple, rápida y creíble. No necesitamos construir todavía un catálogo completo de productos.

---

## 8. Dónde vive esto en el sitio

Según el mapa definido en `docs/recomendaciones-sitio.md`:

| Vehículo | Qué lleva |
|---|---|
| `/soluciones/drones` | El módulo completo de este brief: 4 frentes, posicionamiento, cómo trabajamos, CTA |
| `/sectores/agroindustria` | Bloque propio con enlace destacado |
| `/lp/drones` | Landing de campaña. **Aquí sí va el video en el hero.** Destino de pauta, del QR en ferias y de la firma de correo |
| `/` (home) | Nada propio: entra dentro de la tarjeta de la familia "Capturar y ver" |

La página `/soluciones/drones` pertenece al escalón 2 de la escalera metodológica (capturar el dato) y su titular es *"Del recorrido a pie a la información de todo el lote"*.
