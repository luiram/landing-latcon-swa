# Consulta legal preliminar: manejo legal del sitio latconservices.com

**Empresa:** LATIN CONSULTING SERVICES SAS (LATCON), NIT 901.229.904-6, Cajicá (Cundinamarca)
**Fecha de corte de la investigación:** 29 de septiembre de 2026
**Naturaleza del documento:** investigación preparatoria para revisión por abogado. **No es concepto jurídico ni política final.** Identifica obligaciones, huecos y riesgos, con fuentes.

**Convención de verificación usada en todo el documento**

- **[V]** Verificado en fuente oficial (texto normativo en secretariasenado.gov.co, funcionpublica.gov.co, normogramas oficiales de entidades del Estado, sic.gov.co, aerocivil.gov.co, ica.gov.co, dian.gov.co) o en la fuente primaria del tercero (p. ej. términos de DJI o documentación de Google).
- **[S]** Verificado solo en fuente secundaria (prensa, firmas, portales jurídicos). Debe confirmarse.
- **[NV]** No verificado. Se deja como hipótesis o pregunta para el abogado.

---

## (a) Resumen ejecutivo

1. **El borrador de `legal.ts` cubre casi todo el mínimo formal del art. 13 (política) y del art. 15 (aviso) del Decreto 1377 de 2013, pero con tres huecos formales:** no nombra una **persona o área responsable** de peticiones y reclamos (art. 13 num. 4; "el equipo de LATCON" no basta); no se compromete a **comunicar los cambios sustanciales antes de aplicarlos** (art. 13, inciso final); y su alcance declarado ("sitio, correo, teléfono y reuniones") **es más amplio que lo que regula**: solo trata prospectos. No cubre clientes, proveedores, empleados y candidatos, ni, sobre todo, los datos que LATCON trata **como encargado** en proyectos (sensores, sistemas, analítica, imágenes de drones, IA). Riesgo: **medio**.
2. **Hay desalineación entre lo que dice la política y lo que hace el sitio.** (i) GA4 está implementado en **modo de consentimiento "avanzado"**: gtag.js carga y envía *pings* sin cookies a Google antes de que el usuario acepte, aunque la política dice que los datos de navegación se tratan "solo si aceptas". (ii) La casilla de /agenda autoriza "coordinar esta reunión y hacer su seguimiento", pero la política agrega otras finalidades (preparar propuesta, medir canales y campañas) que el titular no autoriza en la casilla. (iii) El formulario rotula el teléfono como "Teléfono / WhatsApp" y los mensajes de error remiten a WhatsApp, pero WhatsApp (Meta) no figura en la política. Riesgo: **medio**.
3. **Transmisión internacional (Azure, Google):** con contrato de transmisión en los términos del art. 25 del Decreto 1377, no hay que informar al titular ni pedirle consentimiento (art. 24). Estados Unidos y la UE están en la lista de países con nivel adecuado de la Circular Externa SIC 005 de 2017 [V]. La afirmación del borrador ("proveedores que aplican niveles de protección adecuados") es genérica. **Falta verificar que los DPA de Microsoft y Google tengan el contenido del art. 25** y documentarlo. Riesgo: **medio-bajo**.
4. **RNBD: con alta probabilidad LATCON no está obligada a inscribir sus bases de datos.** Solo están obligadas las sociedades con activos totales superiores a 100.000 UVT (Decreto 090 de 2018) [V]. Con la UVT 2026 de $52.374 (Resolución DIAN 000238 de 2025) [S; confirmar con el texto oficial], el umbral es **$5.237.400.000**. Aunque no inscriba, sigue obligada a todo lo demás: política, manual interno, prueba de autorización y reporte de incidentes a la SIC en 15 días hábiles por el módulo web. Riesgo: **bajo** si el contador confirma los activos.
5. **IA:** no hay ley de IA vigente en Colombia a septiembre de 2026. Los proyectos de ley siguen en trámite [S]. **Sí rige la Circular Externa SIC 002 de 2024** [V], que aplica a responsables **y encargados**. Exige ponderar idoneidad, necesidad, razonabilidad y proporcionalidad; gestionar riesgos; hacer un **estudio de impacto de privacidad** antes de diseñar sistemas de alto riesgo; aplicar privacidad desde el diseño y seguridad auditable; y **no usar datos "accesibles al público" en internet sin autorización**. Esto pesa sobre la oferta comercial de IA y agentes más que sobre el sitio. Riesgo: **medio** para la operación, **bajo** para el sitio.
6. **Drones:** el RAC 100 (Resolución Aerocivil 01983 de 2023, enmendado por la 3034 de 2024) exige, para operación comercial (categoría específica), registro de la aeronave, **certificado de explotador UAS**, pilotos con certificado de idoneidad y autorización de vuelo [V en lo esencial]. La aspersión de plaguicidas añade requisitos sanitarios y agronómicos (ICA y salud) que **no pude verificar en fuente oficial** [NV]. **El sitio no debe afirmar que LATCON presta servicios de aspersión mientras no tenga (o no subcontrate) un explotador certificado**, ni mostrar logos o fotos de DJI ni sugerir que es distribuidor oficial (términos de DJI [V]; Decisión 486, arts. 155 y 157 [V]; Ley 256 de 1996, arts. 10, 11 y 15 [V]). Riesgo: **alto** si se publica tal como está pensado, **bajo** si se ajusta.
7. **Ley 2300 de 2023:** extiende los horarios de contacto (lunes a viernes de 7:00 a. m. a 7:00 p. m., sábados de 8:00 a. m. a 3:00 p. m., nunca domingos ni festivos) al **envío de publicidad** por SMS, mensajería, correo y llamadas comerciales dirigidas al "consumidor" [V]. Para prospectos B2B su aplicación es discutible, pero conviene adoptarla como regla interna. Riesgo: **bajo**.
8. **Comercio electrónico y consumo:** el sitio no vende en línea. El art. 50 de la Ley 1480 (identificación del proveedor, condiciones, PQR con radicado) no aplica hoy [V], pero **se activaría si se venden drones o equipos en línea o a consumidores**. No existe obligación legal expresa de publicar "términos de uso" en un sitio B2B informativo; es muy recomendable (propiedad intelectual, carácter no vinculante del contenido, marcas de terceros, ley aplicable). Queda por evaluar el art. 91 de la Ley 633 de 2000 (inscripción en el registro mercantil de sitios web comerciales, condicionalmente exequible) [V en su texto]. Riesgo: **bajo**.

---

## (b) Análisis por tema

### 1. Política y aviso de privacidad (Ley 1581 de 2012; Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015, Libro 2, Parte 2, Título 2, Capítulo 25)

**Normas [V]:**
- Ley 1581, art. 3 (definiciones de responsable y encargado), art. 4 (principios), art. 8 (derechos), art. 12 (deber de informar al titular), arts. 14 y 15 (consultas: 10 días hábiles prorrogables 5; reclamos: 15 días hábiles prorrogables 8; reclamo incompleto: requerir en 5 días, desistimiento a los 2 meses; leyenda "reclamo en trámite" en 2 días hábiles; traslado en 2 días hábiles si quien lo recibe no es competente), art. 17 (deberes del responsable, entre ellos el literal k, manual interno de políticas y procedimientos, y el literal n, informar a la SIC los incidentes de seguridad), art. 18 (deberes del encargado), art. 23 (multas de hasta 2.000 SMMLV, suspensión y cierre).
- Decreto 1377: art. 5 (autorización previa, informando **todas las finalidades específicas**; nueva autorización si cambia la finalidad), art. 7 (autorización por escrito, oral o por conductas inequívocas), **art. 8 (conservar prueba de la autorización)**, art. 11 (limitación temporal: documentar conservación y supresión), **art. 13 (contenido mínimo de la política; hoy art. 2.2.2.25.3.1 del Decreto 1074)**, art. 14 (aviso de privacidad), **art. 15 (contenido mínimo del aviso; art. 2.2.2.25.3.3)**, art. 16 (conservar el modelo del aviso), art. 18 (procedimientos accesibles), art. 26 (responsabilidad demostrada).
- Concepto SIC sobre idioma: la autorización y la información al titular deben darse en castellano [V]. Las traducciones EN, PT y FR previstas deben aclarar que prevalece la versión en español.

**Contraste punto por punto con el borrador (`TRATAMIENTO_DATOS`):**

| Requisito del art. 13 del Decreto 1377 | ¿Está? | Observación |
|---|---|---|
| 1. Razón social, domicilio, dirección, correo y teléfono | Sí | `RESPONSABLE` usa los datos de `empresa.ts`. Correcto. |
| 2. Tratamiento y finalidades | Parcial | Solo cubre prospectos del sitio. Faltan los grupos de titulares (clientes, proveedores, empleados, candidatos, usuarios finales de soluciones), las **finalidades de marketing** propias (si en algún momento se enviará información comercial) y el tratamiento como **encargado**. |
| 3. Derechos del titular | Sí | Reproduce el art. 8. Puede agregarse "abstenerse de responder preguntas sobre datos sensibles o de menores". |
| 4. **Persona o área responsable** de peticiones, consultas y reclamos | **No** | "El equipo de LATCON" no identifica un área ni un cargo. Hay que designar uno (p. ej. "Gerencia General – Protección de datos") y un correo propio (p. ej. `datos@latconservices.com`). |
| 5. Procedimiento para ejercer los derechos | Sí, incompleto | Tiene plazos correctos. Faltan: cómo se verifica la identidad, el traslado a quien sea competente en 2 días hábiles, la leyenda "reclamo en trámite" y el canal para causahabientes y representantes. |
| 6. Fecha de vigencia de la política y período de vigencia de las bases | Sí | Correcto. |
| Inciso final: comunicar los cambios sustanciales **antes** de implementarlos | Parcial | El borrador dice "publicamos aquí la nueva versión". Debe comprometerse a avisar a los titulares por un medio eficiente (correo) antes de aplicar el cambio, y a pedir nueva autorización si cambia la finalidad (art. 5). |

**Contraste con el aviso (`PRIVACIDAD`):** cumple el art. 15 en lo formal (responsable, tratamiento y finalidad, derechos y enlace a la política). Observaciones:
- Describe "el canal o la campaña por la que llegaste", pero el sitio también guarda la **página de entrada y el referente**. Conviene decirlo.
- La frase "Esas cookies quedan desactivadas hasta que las aceptas" es cierta respecto a las cookies, pero con el modo avanzado de Consent Mode el sitio sí envía señales sin cookies a Google antes del consentimiento (ver tema 4).
- No menciona el tratamiento técnico de la **dirección IP** (limitador de solicitudes en la API y telemetría de Azure/Application Insights en `api/host.json`).

**Otros hallazgos del borrador:**
- **Datos sensibles:** el borrador dice "No pedimos datos sensibles". El campo libre de descripción puede recibirlos igual. Conviene una línea en el formulario: "No incluyas datos sensibles ni de terceros".
- **Datos de contacto B2B:** el nombre, cargo, correo y teléfono de un empleado de otra empresa son datos personales para la Ley 1581, que protege a personas naturales y no excluye los datos "corporativos". El borrador lo trata bien. Solo lo aclaro porque es un error común.
- **Seguridad:** el texto es correcto pero escueto. No debe prometer más de lo que se hace. Conviene documentar internamente las medidas (cifrado en tránsito y en reposo de Azure SQL, control de acceso, registros).
- **Comentario técnico en `legal.ts`, línea 13:** cita "Decreto 1377, art. 7" como base de la prueba de la autorización. El deber de **conservar la prueba** está en el **art. 8** (art. 7 es el modo de obtenerla).
- **Prueba de la autorización:** guardar fecha, hora y versión es buena práctica. Para que la versión sirva como prueba (art. 8 del Decreto 1377 y art. 16 respecto al modelo del aviso), **hay que conservar el texto exacto de cada versión** de la política y de la casilla (archivo histórico público o interno con fecha). El historial de git sirve, pero conviene un archivo legible.
- **Encargados no listados:** plataforma de videollamada de la reunión de diagnóstico (Teams, Meet u otra), proveedor del buzón `contacto@latconservices.com` (Microsoft 365 o Google Workspace), WhatsApp (Meta) si se usa para contactar, y cualquier CRM futuro.

**Riesgo:** medio. Las fallas son subsanables y el borrador está por encima del promedio del mercado, pero la SIC sanciona con frecuencia la falta de manual interno y los canales de PQR mal definidos. Varias sanciones de 2024 y 2025 se refieren a no tener manual interno de políticas y procedimientos [S: resumen de búsqueda sobre las páginas de sanciones de la SIC; no revisé cada resolución].

### 2. Registro Nacional de Bases de Datos (RNBD)

**Norma [V]:** Ley 1581, art. 25; Decreto 886 de 2014 modificado por el Decreto 090 de 2018 (Decreto 1074, art. 2.2.2.26.1.2). Según las preguntas frecuentes de la SIC, están obligadas **las sociedades y entidades sin ánimo de lucro con activos totales superiores a 100.000 UVT** y las personas jurídicas de naturaleza pública. La actualización anual va del 2 de enero al 31 de marzo.

**UVT 2026:** $52.374 (Resolución DIAN 000238 del 15 de diciembre de 2025) [S: INCP, Actualícese y Gosocket; el comunicado DIAN 128 de 2025 aparece en resultados, pero no abrí el texto de la resolución]. **Umbral 2026: 100.000 × $52.374 = $5.237.400.000.**

**Situación de LATCON:** consultora pequeña. Es muy probable que no supere el umbral. **No pude verificar** qué fecha de corte y qué UVT se usan exactamente (activos a 31 de diciembre del año anterior, con la UVT de qué año) [NV]. Debe confirmarlo el contador. **Si en algún momento supera el umbral** (por ejemplo, con inventario de drones si llega a revender), queda obligada a inscribirse.

**Lo que se mantiene aunque no inscriba [V]:** reportar incidentes de seguridad a la SIC en 15 días hábiles desde su detección. Los responsables no obligados al RNBD y los encargados lo hacen por el módulo "Reporte de incidentes de seguridad" del micrositio de la Delegatura de Protección de Datos.

**Riesgo:** bajo, sujeto a la confirmación contable.

### 3. Transmisión y transferencia internacional (Azure, Google)

**Normas [V]:**
- Ley 1581, art. 26: prohíbe transferir datos a países sin nivel adecuado, salvo excepciones (autorización expresa, ejecución de un contrato, etc.). La SIC expide declaraciones de conformidad.
- Decreto 1377, art. 24: **las transmisiones internacionales del responsable a un encargado no requieren informar al titular ni pedir su consentimiento cuando exista un contrato en los términos del art. 25.**
- Decreto 1377, **art. 25 (hoy art. 2.2.2.25.5.2 del Decreto 1074)**: el contrato debe señalar el alcance del tratamiento, las actividades por cuenta del responsable y las obligaciones del encargado con el titular y el responsable. El encargado se compromete a aplicar la política del responsable y a tratar los datos solo para las finalidades autorizadas. Debe incluir como mínimo: tratar los datos conforme a los principios, salvaguardar la seguridad de las bases y guardar confidencialidad (los tres numerales mínimos se citan de memoria; la extracción automática no los devolvió textualmente [NV en su redacción literal]).
- **Circular Externa SIC 005 de 2017** (Circular Única, Título V, Capítulo Tercero), según el normograma oficial de la JEP [V]. Declara con nivel adecuado a Alemania, Austria, Bélgica, Bulgaria, Chipre, Costa Rica, Croacia, Dinamarca, Eslovaquia, Eslovenia, Estonia, España, **Estados Unidos de América**, Finlandia, Francia, Grecia, Hungría, Irlanda, Islandia, Italia, Letonia, Lituania, Luxemburgo, Malta, México, Noruega, Países Bajos, Perú, Polonia, Portugal, Reino Unido, República Checa, República de Corea, Rumania, Serbia y Suecia, además de los países que la Comisión Europea declare con nivel adecuado. Aclara que la transmisión a esos países procede en los términos que rigen la transferencia.
- **Actualizaciones posteriores:** existe un proyecto de circular de 2018 para incluir a Australia (sic.gov.co). **No pude confirmar si se adoptó ni si hubo cambios posteriores a la lista** [NV].

**Situación del sitio:** Microsoft (Azure SQL, Functions, Static Web Apps, Communication Services) y Google (GA4) actúan como encargados. **No pude verificar en qué región de Azure están los recursos.** Si están en EE. UU. o en la UE, el país tiene nivel adecuado. Si están en Brasil u otro país fuera de la lista, se necesita apoyarse en el contrato de transmisión o en una excepción [NV].

**Qué falta:**
1. Descargar y archivar el **Microsoft Products and Services Data Protection Addendum** y los **términos de tratamiento de datos de Google** aceptados en la cuenta de GA4. Verificar con el abogado si su contenido cumple el art. 25 (el alcance, la instrucción de seguir la política del responsable y la confidencialidad suelen estar; hay que confirmarlo) [NV].
2. Aceptar en la consola de GA4 los términos de tratamiento de datos, si no se ha hecho [NV].
3. En la política, identificar a los encargados por categoría y país (o región) y declarar que existe contrato de transmisión, en vez de la fórmula genérica "aplican niveles de protección adecuados".
4. Registrar la región de cada recurso de Azure en el manual interno.

**Riesgo:** medio-bajo.

### 4. Cookies y analítica

**Postura de la SIC:**
- Boletín Jurídico SIC (2016) [V]: las cookies pueden llegar a constituir datos personales y una base de datos en los términos de la Ley 1581, cuando permiten identificar a la persona por sí solas o combinadas con otros datos. En ese caso aplican todos los principios del art. 4.
- **Resolución SIC 32126 de 2022** (orden contra Google), descrita como el primer pronunciamiento sobre cookies [S: OCH Group; no ubiqué el texto oficial]. Según esa fuente, clasifica las cookies en persistentes, propias, de terceros y supercookies, y **ninguna categoría está exenta de consentimiento**. Colombia no tiene la exención de cookies "estrictamente necesarias" del régimen europeo. Es una postura más estricta.
- Con base en la Ley 1581, la autorización debe ser previa, expresa e informada. No se admite el consentimiento tácito (art. 3 lit. a y art. 4 lit. c de la Ley 1581 [V]).
- **No encontré guía oficial de la SIC específica sobre cookies ni sanciones recientes (2024–2026) por cookies** [NV]. La Circular Externa 4 de 2024 que aparece en búsquedas se refiere al numeral 2.16 del Título II (protección al consumidor), no a cookies.

**Cómo está el sitio (revisado en el código):**
- `GoogleAnalytics.tsx` fija `analytics_storage` y `ad_storage` en `denied` por defecto, pero **carga gtag.js y ejecuta `gtag('config', ...)` antes del consentimiento**. En la terminología de Google eso es el **modo avanzado**: "los tags de Google cargan cuando el usuario abre el sitio" y, mientras el consentimiento está denegado, "envían pings sin cookies" con el estado de consentimiento, información funcional (cabeceras del navegador) y señales de clics de anuncios [V: documentación de Google]. En el **modo básico** los tags no cargan hasta que el usuario interactúa con el banner y "no se transmite ningún dato a Google" antes.
- Banner (`CookieConsentBanner.tsx`): la primera capa ofrece "Personalizar" y "Aceptar", **pero no "Rechazar"**. Rechazar exige dos clics y aceptar solo uno. Además, el banner **bloquea el scroll y la interacción con el sitio** hasta elegir, lo que se acerca a un "muro de cookies". El texto dice solo "Usamos cookies para analizar el uso del sitio" y "Más info". No hay en el pie un enlace para **cambiar o retirar el consentimiento** después, y la revocación es un derecho (art. 8 lit. e).
- `sessionStorage` con el origen (UTM, página de entrada, referente) se guarda aunque se rechacen las cookies y solo sale del navegador con la reserva, que lleva autorización. Es defendible porque no se transmite sin el formulario, pero debe describirse en el aviso ("almacenamiento local de sesión").

**Qué falta:**
1. Pasar a **modo básico** (no cargar gtag.js hasta aceptar) o, si se mantiene el avanzado, declararlo en el aviso. Con la postura estricta colombiana, **se recomienda el básico**.
2. Botón **"Rechazar"** en la primera capa, con el mismo peso visual que "Aceptar".
3. Enlace permanente "Configurar cookies" en el pie para cambiar o retirar el consentimiento.
4. Tabla de cookies en `/privacidad`: nombre (`_ga`, `_ga_<ID>`), proveedor (Google), finalidad, duración (hasta 2 años por defecto; la retención en GA4 se piensa subir a 14 meses) y la clave `latcon-cookie-consent` en `localStorage`.
5. No activar señales de Google (remarketing) ni vincular Google Ads sin otra capa de consentimiento.

**Riesgo:** medio. No hay un régimen sancionatorio específico conocido, pero la contradicción entre lo que dice el texto y lo que hace el código viola el principio de transparencia.

### 5. Inteligencia artificial

**Circular Externa SIC 002 del 21 de agosto de 2024 (Diario Oficial 52.856)** [V, texto completo en el normograma de la CRC]. Dirigida a los vigilados por la SIC como autoridad de datos. La nota 2 define "Administradores de datos" como **responsables y encargados**, así que **aplica a LATCON cuando trata datos de sus clientes en sistemas de IA**. Instrucciones:
- I. Ponderar cuatro criterios: idoneidad, necesidad, razonabilidad y proporcionalidad en sentido estricto.
- II. Si no hay certeza sobre los daños potenciales, abstenerse o adoptar medidas precautorias.
- III. Sistemas de administración de riesgos (identificar, medir, controlar y monitorear), incluidos sesgos, fallas técnicas y vulnerabilidades (nota 7).
- IV. **Antes del diseño y desarrollo**, si es probable un alto riesgo para los titulares, hacer y documentar un **estudio de impacto de privacidad**: descripción de las operaciones, evaluación de riesgos y medidas previstas.
- V. Datos veraces, completos, exactos y actualizados.
- VI. Privacidad desde el diseño y por defecto (por ejemplo, privacidad diferencial).
- VII. Derecho del titular a obtener información sobre el tratamiento en cualquier momento.
- VIII. Seguridad tecnológica, humana, administrativa, física y **contractual**, con medidas auditables.
- IX. **Lo "accesible al público" no es dato público**: no se pueden tratar sin autorización datos recolectados en internet (cita la Resolución 71406 de 2023 contra LinkedIn).
- X. Estrategias demostrables para garantizar los derechos.

**Ley de IA:** a septiembre de 2026 **no hay ley de IA vigente**. El PL 043 de 2025 Senado / 324 de 2025 Cámara (marco por niveles de riesgo, MinCiencias como autoridad) se reporta como archivado por cambio de legislatura, y cursa un nuevo **PL 025 de 2026** que replica buena parte de su articulado [S: Megatek y Cambio, agosto de 2026; no consulté la ficha oficial en Senado ni Cámara]. Referencias de política pública: CONPES 3975 de 2019 (citado por la Circular 002) y CONPES 4144 de 2025 [NV].

**Efecto en el sitio y en la oferta:**
- El sitio no usa IA sobre datos de visitantes. Si algún día incorpora un chatbot o agente conversacional, habrá que actualizar la política y el aviso, y posiblemente pedir otra autorización.
- En `/soluciones/agentes-ia` y en las páginas de "inteligencia predictiva" conviene **no prometer decisiones automatizadas sin control humano** sobre personas. La página ya aborda "qué decide solo, qué requiere aprobación humana, qué queda registrado", lo cual está alineado con la Circular.
- En la operación: plantilla de **estudio de impacto de privacidad** para proyectos de IA, cláusula de IA en propuestas y política de uso de proveedores de modelos (qué datos del cliente se envían a APIs de terceros y en qué país se procesan).

**Riesgo:** medio para la operación; bajo para el sitio.

### 6. LATCON como encargado del tratamiento

**Normas [V]:** Ley 1581, art. 3 lit. d (encargado: trata datos **por cuenta del** responsable) y art. 18 (deberes del encargado: hábeas data, seguridad, actualizar en 5 días hábiles, tramitar consultas y reclamos, **manual interno** (lit. f), leyendas, acceso restringido, **informar incidentes a la SIC** (lit. k), cumplir las instrucciones de la SIC). Si concurren las calidades de responsable y encargado, se exigen ambos grupos de deberes. Decreto 1377, art. 25 (contrato de transmisión). Circular SIC 002 de 2024 (aplica a encargados).

**Dónde es encargado LATCON:** analítica y BI sobre bases del cliente con datos de empleados o clientes finales; software a la medida que aloja datos personales; automatización y agentes que leen correos o documentos; sensores IoT que registran la ubicación o actividad de operarios (datos que identifican trabajadores); imágenes de drones con personas, placas o viviendas; trazabilidad con datos de productores.

**Cómo está hoy:** el sitio y el borrador no lo mencionan. Según el skill `latcon-recursos-comerciales`, las propuestas tienen cláusulas legales estándar, pero **no revisé si incluyen cláusula de encargado** [NV].

**Qué falta:**
1. **Cláusula de encargado del tratamiento** en toda propuesta técnico-económica y contrato. Debe incluir: objeto y alcance, instrucciones documentadas del cliente como responsable, finalidades, confidencialidad, seguridad, subencargados (Azure, proveedores de modelos de IA) con autorización previa, ubicación de los datos, apoyo al cliente en consultas y reclamos, notificación de incidentes al cliente (plazo corto, p. ej. 72 horas, para que el cliente pueda cumplir los 15 días hábiles ante la SIC), devolución o supresión al terminar, auditoría y cumplimiento de la Circular 002 cuando haya IA.
2. **Declaración del cliente** de que obtuvo las autorizaciones de los titulares (empleados, productores) para las finalidades del proyecto. Esto es clave en sensores y drones que captan a personas.
3. Sección en la política pública: "Cuando actuamos como encargados", con referencia a la política del cliente.
4. Manual interno con un procedimiento para encargos.

**Riesgo:** medio-alto para la operación: es el mayor riesgo real del negocio, no del sitio.

### 7. Ley 2300 de 2023 (contacto y publicidad)

**Norma [V]:** Ley 2300 de 2023, "por medio de la cual se establecen medidas que protejan el derecho a la intimidad de los consumidores". El art. 3 fija horarios (lunes a viernes de 7:00 a. m. a 7:00 p. m.; sábados de 8:00 a. m. a 3:00 p. m.; nada domingos ni festivos) y periodicidad (para cobranza: no varios canales en la misma semana ni más de un contacto al día). Un artículo posterior extiende la ley "en los mismos términos a las relaciones comerciales entre los productores y proveedores de bienes y servicios... y el consumidor" frente al envío de mensajes publicitarios por SMS, mensajería, correo y llamadas, que "solo podrán hacerlo dentro de los horarios establecidos en el artículo 3o". La ley ordena adaptar el Registro de Números Excluidos y la sancionan la SIC y la Superfinanciera. (La extracción no devolvió con certeza el número de ese artículo; es probable que sea el art. 5 [NV sobre la numeración].)

**Aplicación a LATCON:**
- La ley protege al "consumidor". Según la Ley 1480, art. 5 num. 3 [V], lo es la persona natural o jurídica que actúa como destinatario final, y en lo empresarial solo "cuando no esté ligada intrínsecamente a su actividad económica". El gerente de una agroindustria que pide un diagnóstico **probablemente no es consumidor**, así que la Ley 2300 no aplicaría de forma directa. La SIC podría interpretarla con amplitud [NV].
- **Seguimiento de una reunión que el prospecto pidió:** no es "publicidad" en sentido estricto, pero enviar después información comercial no solicitada sí podría serlo.

**Recomendación:** adoptar como política interna los horarios del art. 3 para todo contacto comercial por teléfono, WhatsApp o SMS; no enviar boletines sin una autorización separada (el borrador ya lo promete); llevar una lista de exclusión; y respetar el Registro de Números Excluidos de la CRC si se hacen llamadas o SMS masivos.

**Riesgo:** bajo.

### 8. Comercio electrónico, consumidor y términos de uso

**Normas [V]:**
- Ley 527 de 1999: validez de los mensajes de datos. Respalda que la casilla electrónica sea una prueba válida de la autorización, junto con el art. 7 del Decreto 1377 (conductas inequívocas).
- Ley 1480 de 2011, art. 5 (consumidor; ventas a distancia) y **art. 50** (obligaciones de quien vende por comercio electrónico): a) identidad con razón social, **NIT, dirección de notificación judicial, teléfono y correo**; b) información cierta de los productos (modificado por la Ley 2439 de 2024); c) medios de pago, entrega y **derecho de retracto**; d) condiciones generales publicadas, resumen del pedido y acuse de recibo; e) prueba de la transacción; f) seguridad; g) canal de PQR con número de radicado y seguimiento (Ley 2439 de 2024); h) plazo de entrega de hasta 30 días.
- Ley 1480, art. 30 (responsabilidad del anunciante por publicidad engañosa frente a consumidores) y Ley 256 de 1996, arts. 10, 11 y 15 (actos de confusión, engaño y explotación de la reputación ajena), que aplican también entre empresas.
- Ley 633 de 2000, art. 91: "todas las páginas web y sitios de internet de origen colombiano... cuya actividad económica sea de carácter comercial, financiero o de prestación de servicios, deberán inscribirse en el Registro Mercantil y suministrar a la DIAN la información de transacciones económicas en los términos que esta entidad lo requiera". El artículo es **condicionalmente exequible con apartes inexequibles** (Corte Constitucional). **No verifiqué el alcance del condicionamiento ni la práctica actual de las cámaras de comercio** [NV].

**Situación de LATCON:**
- Hoy **no hay venta en línea ni a consumidores**, así que el art. 50 no aplica. Aun así, el footer ya muestra razón social, NIT y régimen, lo que coincide con el lit. a.
- **Si se revenden drones o equipos:** vender a productores agrícolas para su operación probablemente no crea una relación de consumo (el uso está ligado a su actividad). Pero si se vende a personas naturales para un uso ajeno a su actividad, o se habilita compra en línea, aplican la garantía legal (arts. 7 y ss.), la información (art. 23), el retracto (art. 47) y el art. 50 completo [V en el texto; la calificación del caso es NV].
- **Términos de uso:** ninguna norma los exige para un sitio B2B informativo. Se recomiendan para cubrir propiedad intelectual (Ley 23 de 1982 y Decisión 351 de la CAN [NV, no consultadas]), que el contenido es informativo y no constituye oferta mercantil (arts. 845 y ss. del Código de Comercio, no consultados [NV]), marcas de terceros (DJI) sin afiliación, limitación de responsabilidad, enlaces externos, ley y jurisdicción colombianas y prevalencia del español.

**Riesgo:** bajo hoy; medio si se lanza la venta de equipos sin adecuar el sitio.

### 9. Drones: Aerocivil, ICA y marca DJI

**9.1 Aerocivil [V en lo esencial]:**
- **RAC 100** "Operación de sistemas de aeronaves no tripuladas UAS", adoptado por la **Resolución 01983 del 27 de septiembre de 2023** y enmendado por la **Resolución 03034 del 27 de diciembre de 2024**. Ambas aparecen en la página oficial de la Aerocivil, actualizada en noviembre de 2025. También está listado el RAC 219 (gestión de seguridad operacional, SMS).
- Preguntas frecuentes de la Aerocivil [V]: la **categoría abierta** es para vuelos no comerciales (recreación, hobby, deporte) de personas naturales y no requiere autorización de vuelo. La **categoría específica** comprende actividades **comerciales, profesionales** o sin ánimo de lucro con UAS de hasta 250 kg y riesgo aumentado; requiere autorización de vuelo. Se exige registrar la aeronave en la Plataforma UAS (en categoría específica, sin importar el peso), obtener el certificado de idoneidad del piloto (curso aprobado, examen PUAS y certificado médico) y el **certificado de explotador UAS** por el SGDEA (Circular Informativa 100-MAUT-5.0-22-011-CI). Los mecanismos de aspersión se consideran "equipo tecnológico asociado".
- Según fuentes secundarias [S]: desde el 1 de enero de 2025 solo los explotadores certificados en categoría específica pueden pedir autorizaciones de vuelo; hacen falta póliza de responsabilidad civil, manual de operaciones, jefe de pilotos y gerente de seguridad operacional; hay límites de 122 m AGL y 30 m de distancia a personas; y habría una excepción de aspersión en categoría abierta dentro de predio propio con hasta dos equipos. Deben confirmarse en el texto del RAC 100.

**9.2 ICA y salud (aspersión de plaguicidas) [NV]:** no encontré en fuente oficial una norma del ICA específica para aspersión con drones. Las fuentes secundarias mencionan un "registro como operador agrícola ante el ICA" y una "Resolución ICA 00059587 de 2021" que **no pude ubicar** en ica.gov.co. La Resolución ICA 1580 de 2022 regula el registro de fabricantes, formuladores, importadores y distribuidores de plaguicidas químicos de uso agrícola, no la aplicación. Queda para el abogado confirmar: el régimen de uso y manejo de plaguicidas (Decreto 1843 de 1991, compilado en el Decreto 780 de 2016, con posibles exigencias sanitarias para empresas aplicadoras aéreas), el RAC 137 de aviación agrícola si aplica a UAS, el uso exclusivo de productos con registro ICA que autoricen aplicación aérea en su etiqueta, y la recomendación técnica de un ingeniero agrónomo.

**Qué no afirmar en el sitio sin permisos:**
- "Prestamos servicio de pulverización o fumigación con drones", "operamos drones en su finca", "pilotos certificados" o "cumplimos toda la normatividad", salvo que LATCON tenga certificado de explotador UAS en categoría específica, o que el texto diga con claridad que la operación la hace un explotador certificado aliado.
- Cifras de rendimiento (hectáreas por hora, ahorro de agroquímico, precisión en cm) sin fuente propia (regla 6 de `CLAUDE.md`; Ley 256, art. 11).
- "Distribuidor oficial / autorizado DJI", "Partner DJI", el logo DJI, fotos o videos oficiales de DJI, o nombres de modelos como encabezado de producto.
- **El texto actual de `/soluciones/drones`** ("Aplicación de productos agrícolas mediante drones, con configuraciones adaptables") describe una capacidad sin decir quién opera. Conviene precisar que el diseño es de LATCON y que la operación la hace un explotador certificado (propio o aliado), o dejarlo como diseño, configuración y capacitación.

**9.3 Marca DJI:**
- **Decisión 486 de la CAN, art. 155** [V]: el titular puede impedir el uso en el comercio de un signo idéntico o similar que cause confusión o **riesgo de asociación**, y protege especialmente la marca notoria contra la dilución y el aprovechamiento de su prestigio. **Art. 157** [V]: un tercero puede, sin consentimiento, usar la marca "para anunciar... ofrecer en venta o indicar la existencia o disponibilidad de productos... legítimamente marcados" o para indicar compatibilidad, **siempre que sea de buena fe, se limite a informar y no induzca a confusión sobre el origen empresarial**. Es la base del "uso nominativo".
- **Términos de DJI** [V, dji.com/terms]: no se puede usar el logo ni otras marcas o material protegido de DJI "on or in connection with web sites... except pursuant to an express written license". Sus reglas incluyen: no sugerir patrocinio ni respaldo de DJI; no usar la marca en el nombre de un producto o servicio propio ni en dominios; usar la marca como adjetivo seguido del término genérico ("dron AGRAS™ T25P", no "el T25P"); incluir la nota "X es marca de DJI"; y, para usos legítimos no licenciados, un descargo como "no autorizado, patrocinado ni aprobado por DJI".
- **Ley 256 de 1996, art. 15** [V]: es desleal el "empleo no autorizado de signos distintivos ajenos".
- **Recomendación:** si LATCON no es distribuidor autorizado, el nombre del modelo puede aparecer **como dato técnico al final** (como ya propone `docs/recomendaciones-sitio.md` §1.6b), en texto plano, sin logo ni tipografía de DJI, con la nota "DJI, AGRAS y MAVIC son marcas de SZ DJI Technology Co., Ltd. LATCON no está afiliada ni es distribuidor oficial de DJI" (ajustar si llega a serlo) y sin frases como "somos DJI" o "equipos DJI originales con garantía oficial". Si revende, conviene pedir al distribuidor en Colombia una autorización escrita del uso de marca y confirmar el canal de garantía.

**Riesgo:** alto si se publica "servicio de aspersión" más modelos DJI sin estos resguardos; bajo con los ajustes.

### 10. Reformas a la Ley 1581 (estado a 2026)

- El Gobierno radicó en agosto de 2025 un proyecto de ley estatutaria que reforma la Ley 1581 (Congreso Visible lo registra como **PL 214/25 Cámara**, radicado el 11 de agosto de 2025; la SIC y MinCIT publicaron notas sobre la radicación). Según el ABC de la SIC y fuentes secundarias, trae nuevos derechos (portabilidad, oposición, no ser objeto de decisiones automatizadas), el tratamiento de datos de mayores de 14 años con su autorización, multas de hasta 10.000 SMMLV o el 5 % de los ingresos operacionales, un **oficial de protección de datos obligatorio**, notificación de incidentes, aplicación extraterritorial, reglas de perfiles y explicabilidad [S].
- En septiembre de 2026 se reporta el **PLE 282 de 2026 Cámara**, con contenido similar [S: CiberLATAM, 19 de septiembre de 2026]. Como es ley estatutaria, debe aprobarse en una sola legislatura (art. 153 de la Constitución) y pasar control previo de la Corte Constitucional. **No encontré evidencia de que se haya aprobado ninguna reforma.** A la fecha, **la Ley 1581 sigue vigente sin reforma** [S/NV: no hallé en secretariasenado.gov.co anotaciones de modificación de la Ley 1581].
- **Efecto práctico:** nada cambia hoy. Pero diseñar ya con criterios de la reforma (derecho de oposición, información sobre decisiones automatizadas, registro de incidentes, responsable de datos designado) evita rehacer. La SIC ya recomienda designar un oficial de protección de datos como parte de la responsabilidad demostrada (Guía SIC del Oficial de Protección de Datos) [V que existe la guía; no revisé su contenido].

**Riesgo:** bajo hoy.

### 11. Otras obligaciones del sitio corporativo

| Tema | Norma | Situación | Riesgo |
|---|---|---|---|
| Razón social con "S.A.S." | Ley 1258 de 2008, art. 5 num. 2 [V] | El footer y la política usan "LATIN CONSULTING SERVICES SAS". Correcto. Usar "LATCON" como marca comercial. | Bajo |
| Datos de la sociedad visibles | Ley 1480, art. 50 lit. a (solo e-commerce) [V]; art. 13 del Decreto 1377 [V] | Ya visibles (NIT, dirección, correo, teléfono, régimen). Conviene publicar la dirección de notificación judicial si es distinta. | Bajo |
| Registro mercantil del sitio | Ley 633 de 2000, art. 91 [V texto; NV alcance] | Verificar con la Cámara de Comercio de Bogotá (jurisdicción de Cajicá, no verificada [NV]) si basta con la matrícula de la sociedad. | Bajo |
| Propiedad intelectual del contenido | Ley 23 de 1982; Decisión 351 CAN [NV] | Falta un aviso de derechos ("© 2026 LATIN CONSULTING SERVICES SAS"; el footer tiene "Todos los derechos reservados"). Revisar las **licencias de las imágenes** (`/verticals/*.webp` parecen ilustraciones generadas o de banco; documentar su origen y licencia). Si alguna imagen se generó con IA, revisar los términos de la herramienta. | Medio-bajo |
| Registro de la marca LATCON | Decisión 486 [V general] | **No verifiqué** si "LATCON" está registrada ante la SIC en las clases 35, 42 y 9. Recomendado antes de invertir en marca. | Medio (comercial) |
| Accesibilidad | Resolución MinTIC 1519 de 2020 (WCAG 2.1 AA) [S/V parcial] | Obligatoria para sujetos obligados de la Ley 1712 de 2014 (públicos y privados que prestan servicios públicos o administran recursos públicos). **No aplica a LATCON** como privado. Es buena práctica y útil si vende a entidades públicas. | Bajo |
| Facturación electrónica | Estatuto Tributario, art. 616-1 [NV no consultado] | El sitio no factura. Si se menciona "facturación electrónica" como servicio (catálogo del skill de demos), no afirmar que LATCON es "proveedor tecnológico habilitado por la DIAN" salvo que lo sea; hoy `docs/recomendaciones-sitio.md` indica que falta seleccionar ese proveedor. | Bajo |
| Correos transaccionales (ACS) | Ley 1581; Ley 2300 [V] | Correos de confirmación: legítimos, porque ejecutan la solicitud. No mezclar en ellos contenido promocional sin autorización. | Bajo |
| Datos de menores | Ley 1581, art. 7 [V por referencia] | Formulario B2B. Agregar "el formulario es para mayores de edad que actúan en nombre de una empresa". | Bajo |
| Remisión a WhatsApp | Ley 1581 (encargados y terceros) | Los mensajes de error remiten a WhatsApp y el campo se llama "Teléfono / WhatsApp". Incluir WhatsApp en la política o quitarlo (el `CLAUDE.md` además dice "No usar WhatsApp como CTA"). | Medio-bajo |

---

## (c) Cambios concretos al borrador `src/config/sitio/legal.ts`

*(Propuestas para el abogado; no se modificó ningún archivo.)*

**Generales**
1. Constante nueva `AREA_RESPONSABLE` con el cargo o área designada (p. ej. "Gerencia General, responsable de protección de datos") y un correo dedicado (`datos@latconservices.com` o equivalente). Usarla en "Cómo ejercer tus derechos" (art. 13 num. 4).
2. Corregir el comentario de la línea 13: "Decreto 1377, art. 7" → "art. 8 (prueba de la autorización); art. 16 (conservación del modelo del aviso)".
3. Crear un archivo de versiones (p. ej. `/tratamiento-de-datos/versiones` o un anexo interno) con el texto íntegro de cada `VERSION_POLITICA` y de la casilla de /agenda.

**`TRATAMIENTO_DATOS`**
4. **Alcance (hero.bajada):** o se restringe a "datos de contactos comerciales y visitantes del sitio", o (mejor) se amplía la política a todos los grupos de titulares con subsecciones: prospectos y visitantes; clientes y sus contactos; proveedores y contratistas; empleados, exempleados y candidatos (hojas de vida); **datos que tratamos por cuenta de nuestros clientes (encargado)**.
5. **"Qué datos tratamos":** agregar la página de entrada, el sitio de referencia (referente) y los parámetros de campaña (UTM); la dirección IP y los datos técnicos del navegador para seguridad y prevención de abuso; los datos de navegación con cookies solo si hay aceptación. Aclarar que el campo libre no debe incluir datos sensibles ni de terceros.
6. **"Para qué los usamos":** separar las finalidades por grupo de titulares. Para prospectos, mantener las actuales. Agregar, si se quiere, "enviarte información comercial de LATCON **solo si nos das una autorización separada**" (y crear esa casilla opcional). Agregar "atender tus consultas y reclamos" y "seguridad del sitio".
7. **"Cómo los tratamos y quién más los ve":** reemplazar la frase genérica por una lista de encargados con categoría y país o región: Microsoft Azure (alojamiento, base de datos, envío de correos; región según configuración), Google (analítica, EE. UU., solo con consentimiento), proveedor de correo corporativo, plataforma de videollamada y WhatsApp/Meta si se usa. Redactar: "Transmitimos datos a estos encargados bajo contratos de transmisión de datos en los términos del artículo 2.2.2.25.5.2 del Decreto 1074 de 2015; los países de destino cuentan con nivel adecuado de protección según la Superintendencia de Industria y Comercio" (solo si se confirma la región).
8. **Nueva sección "Cuando actuamos como encargados":** LATCON trata datos por cuenta de sus clientes según sus instrucciones y la política del cliente. Los titulares deben ejercer sus derechos ante el cliente, y LATCON apoya su atención.
9. **Nueva sección "Inteligencia artificial"** (opcional para el sitio, recomendada por la oferta): LATCON no usa los datos del formulario para entrenar modelos; en proyectos con IA aplica la Circular Externa SIC 002 de 2024 (evaluación de impacto, privacidad desde el diseño).
10. **"Tus derechos":** agregar "Abstenerte de responder preguntas sobre datos sensibles o de menores".
11. **"Cómo ejercer tus derechos":** agregar la verificación de identidad; quién más puede pedir (causahabientes, representantes, apoderados); el traslado en 2 días hábiles si no somos competentes; la leyenda "reclamo en trámite"; y el aviso de que el requisito de procedibilidad ante la SIC se cumple tras agotar el trámite con LATCON.
12. **"Seguridad":** mencionar el cifrado en tránsito y en reposo (confirmar Azure SQL TDE), el acceso por roles y el procedimiento de gestión de incidentes con reporte a la SIC.
13. **"Vigencia":** agregar "Si hacemos cambios sustanciales te los comunicaremos por correo antes de aplicarlos; si cambian las finalidades, te pediremos una nueva autorización". Indicar un plazo de conservación concreto para los prospectos (p. ej. 24 meses desde el último contacto, salvo relación comercial), para cumplir el art. 11 del Decreto 1377.
14. **Idioma:** "Esta política se rige por su versión en español; las traducciones son informativas".

**`PRIVACIDAD`**
15. "Qué recoge este sitio": incluir la página de entrada, el referente y el almacenamiento de sesión (`sessionStorage`), que no sale del navegador salvo que envíes el formulario.
16. "Cookies y analítica": corregir según el modo de Consent Mode elegido. Con el modo básico: "No cargamos Google Analytics hasta que aceptas". Con el avanzado: "Antes de que aceptes, Google puede recibir señales sin cookies con información técnica del navegador". Añadir una tabla de cookies (nombre, proveedor, finalidad, duración) y el enlace "Configurar cookies".
17. Añadir "Encargados y transmisión internacional" en una línea, con remisión a la política.

**Casilla de `/agenda` (`bookingCopy.ts`, fuera de `legal.ts`)**
18. Alinear el texto de la casilla con las finalidades de la política, p. ej.: "Autorizo a LATIN CONSULTING SERVICES SAS a tratar mis datos para coordinar la reunión, hacer su seguimiento, preparar una propuesta y medir por qué canal llegué, según la Política de tratamiento de datos." Casilla opcional aparte para comunicaciones comerciales.
19. Rotular el campo como "Teléfono" (o mantener WhatsApp e incluirlo como canal en la política).

**Banner de cookies (fuera de `legal.ts`)**
20. Botón "Rechazar" en la primera capa; no bloquear el sitio; enlace permanente para reabrir las preferencias; modo básico de Consent Mode.

---

## (d) Documentos nuevos recomendados

1. **Manual interno de políticas y procedimientos de protección de datos** (Ley 1581, art. 17 lit. k y art. 18 lit. f). Obligatorio. Debe incluir: inventario de bases de datos (prospectos, clientes, proveedores, empleados, datos de encargos); roles y área responsable; procedimiento de consultas y reclamos con plazos y formatos; control de acceso; conservación y supresión (art. 11 del Decreto 1377); **gestión de incidentes con reporte a la SIC en 15 días hábiles**; capacitación; auditoría anual.
2. **Términos y condiciones de uso del sitio:** propiedad intelectual, contenido informativo que no es oferta, marcas de terceros sin afiliación (DJI), limitación de responsabilidad, enlaces, ley y jurisdicción colombianas y prevalencia del español.
3. **Formato de contrato de transmisión de datos** (Decreto 1377, art. 25), en dos versiones: (a) LATCON como responsable frente a sus proveedores (freelancers, desarrolladores, call center, CRM); (b) LATCON como **encargado** frente a sus clientes.
4. **Cláusula de encargado del tratamiento para propuestas técnico-económicas**, alineada con el skill `latcon-recursos-comerciales`: rol, instrucciones, subencargados, ubicación de los datos, seguridad, incidentes en 72 horas, devolución o supresión, auditoría, declaración del cliente sobre las autorizaciones de sus titulares y cumplimiento de la Circular SIC 002 de 2024 en proyectos de IA.
5. **Plantilla de estudio de impacto de privacidad** para proyectos de IA, IoT con datos de trabajadores y drones con captura de imágenes (Circular SIC 002 de 2024, num. IV).
6. **Formato de autorización para empleados y candidatos** (hojas de vida, nómina, datos sensibles de salud en seguridad social) y **cláusula de protección de datos para proveedores**.
7. **Política de cookies** (puede ir dentro de /privacidad) con una tabla detallada.
8. **Protocolo de contacto comercial:** horarios de la Ley 2300, lista de exclusión, sin boletines sin autorización y canales autorizados.
9. **Registro de encargados y regiones** (Azure, Google, correo, videollamada, IA), con copia de los DPA aceptados.
10. **Lineamiento de marca de terceros y afirmaciones regulatorias** para el sitio y las propuestas: DJI, certificaciones Aerocivil, habilitaciones DIAN, sin cifras no verificables.
11. **Protocolo de operación de drones** (si se opera): explotador certificado propio o subcontratado, póliza, verificación de productos con registro ICA y recomendación agronómica.

---

## (e) Preguntas para el abogado

1. ¿Basta el Microsoft Products and Services DPA y los términos de tratamiento de datos de Google (GA4) como "contrato de transmisión" en los términos del art. 2.2.2.25.5.2 del Decreto 1074, o conviene un anexo propio?
2. Con la postura de la SIC (Resolución 32126 de 2022, sin cookies exentas), ¿es exigible el modo básico de Consent Mode, o es aceptable el avanzado con información clara? ¿Hace falta autorización incluso para la clave técnica de consentimiento en `localStorage`?
3. ¿El "origen de la visita" (UTM, página de entrada, referente) guardado en `sessionStorage` antes de cualquier autorización es tratamiento de datos personales que requiera consentimiento previo, dado que solo se transmite con el formulario autorizado?
4. ¿Qué cargo o área conviene designar como responsable de peticiones y reclamos en una empresa de este tamaño? ¿Conviene nombrar ya un oficial de protección de datos en previsión de la reforma?
5. ¿Una sola política para todos los grupos de titulares (prospectos, clientes, proveedores, empleados) o políticas separadas? ¿Cómo redactar la sección de encargado sin asumir responsabilidades del cliente?
6. ¿Con qué fecha de corte y con la UVT de qué año se mide el umbral de 100.000 UVT del RNBD? Confirmar que LATCON no está obligada.
7. ¿Aplica la Ley 2300 de 2023 al contacto con prospectos B2B que pidieron la reunión? ¿El seguimiento por WhatsApp de una propuesta es "publicidad"?
8. ¿Aplica hoy a LATCON el art. 91 de la Ley 633 de 2000 (registro mercantil del sitio) según el condicionamiento de la Corte? ¿Qué exige la cámara de comercio competente?
9. Drones: ¿puede LATCON ofrecer en su sitio "pulverización agrícola" si la operación la ejecuta un explotador certificado aliado? ¿Qué redacción evita la publicidad engañosa? ¿Qué exigencias del ICA y de salud aplican hoy a la aspersión de plaguicidas con UAS (Decreto 1843 de 1991 / Decreto 780 de 2016, RAC 137, registro de empresa aplicadora)? ¿Hay requisitos de importación o registro para revender drones agrícolas?
10. Marca DJI: si LATCON no es distribuidor autorizado, ¿es suficiente el uso nominativo del art. 157 de la Decisión 486 con un descargo de afiliación para mencionar modelos? Si llega a serlo, ¿qué revisar del contrato de distribución (uso de marca, territorio, garantía)?
11. Si LATCON revende drones a productores, ¿los compradores son "consumidores" según el art. 5 de la Ley 1480? ¿Qué garantía debe ofrecer y quién responde, LATCON o el importador?
12. En proyectos de IA: ¿cuándo es obligatorio el estudio de impacto de privacidad del num. IV de la Circular 002 de 2024 ("alto riesgo")? ¿Qué cláusulas usar para los proveedores de modelos (OpenAI, Anthropic, Azure OpenAI) como subencargados con procesamiento fuera de Colombia?
13. En IoT y drones que captan datos de trabajadores o terceros (ubicación, imágenes): ¿quién debe obtener la autorización y cómo se reparte la responsabilidad en el contrato?
14. ¿Conviene registrar la marca LATCON (clases 9, 35 y 42) antes del lanzamiento?
15. ¿Cómo manejar las versiones EN, PT y FR de la política (prevalencia del español)?

---

## (f) Fuentes

**Fuentes oficiales consultadas [V]**
- Ley 1581 de 2012, Secretaría del Senado: http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html
- Decreto 1377 de 2013, Gestor Normativo de Función Pública: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646
- Decreto 1074 de 2015, Función Pública: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=76608
- SIC, preguntas frecuentes del RNBD: https://www.sic.gov.co/preguntas-frecuentes-rnbd
- SIC, Registro Nacional de Bases de Datos: https://www.sic.gov.co/registro-nacional-de-bases-de-datos
- Circular Externa SIC 005 de 2017 (normograma oficial JEP): https://jurinfo.jep.gov.co/normograma/compilacion/docs/circular_superindustria_0005_2017.htm
- Proyecto de circular SIC para incluir a Australia (2018): https://www.sic.gov.co/sites/default/files/normatividad/032018/Proy_Circular_Modifica_Nral_3_2_Capitulo_3_CU_Inclus_Australia_Formato.pdf
- Circular Externa SIC 002 de 2024 (normograma CRC): http://normograma.crcom.gov.co/crc/compilacion/docs/circular_superindustria_0002_2024.htm
- Circular Externa SIC 002 de 2024 (PDF, sede electrónica SIC): https://sedeelectronica.sic.gov.co/sites/default/files/normativa/Circular%20Externa%20No.%20002%20del%2021%20de%20agosto%20de%202024.pdf
- SIC, Boletín Jurídico, tratamiento de datos a través de cookies: https://www.sic.gov.co/recursos_user/boletin-juridico-sep2016/articulo/datos/tratamiento-datos-personales-a-traves-de-cookies.html
- SIC, Guía de tratamiento de datos personales para fines de comercio electrónico (2019): https://www.sic.gov.co/sites/default/files/files/pdf/Guia%20SIC%20Tratamiento%20Datos%20Personales%20ComercioElectronico(1).pdf
- SIC, concepto sobre el idioma de las políticas y avisos: https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/idioma-de-las-politicas-para-el-tratamiento-de-datos-personales-y-aviso-de-privacidad
- SIC, reporte de incidentes de seguridad: https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/cumplimiento-de-la-obligacion-del-reporte-de-incidentes-de-seguridad
- SIC, Guía de gestión de incidentes (2020): https://www.sic.gov.co/sites/default/files/files/Publicaciones/Guia_gestion_incidentes_dic21_2020.pdf
- SIC, ABC del proyecto de ley de protección de datos: https://sedeelectronica.sic.gov.co/noticias/abc-del-proyecto-de-ley-de-proteccion-de-datos-personales-en-colombia
- SIC, radicación del proyecto de reforma: https://sedeelectronica.sic.gov.co/noticias/gobierno-nacional-radico-proyecto-de-ley-para-actualizar-la-normatividad-vigente-en-la-proteccion-de-datos-personales-en-colombia
- SIC, Circular Externa 4 de 2024 (Título II, no se refiere a cookies): https://sedeelectronica.sic.gov.co/transparencia/normativa/circular-externa-no-4-de-2024-de-la-superintendencia-de-industria-y-comercio-derogar-la-circular-externa-no-004-de-13-de
- Ley 2300 de 2023, Secretaría del Senado: http://www.secretariasenado.gov.co/senado/basedoc/ley_2300_2023.html
- Ley 1480 de 2011, Secretaría del Senado: http://www.secretariasenado.gov.co/senado/basedoc/ley_1480_2011.html y http://www.secretariasenado.gov.co/senado/basedoc/ley_1480_2011_pr001.html
- Ley 633 de 2000, art. 91: http://www.secretariasenado.gov.co/senado/basedoc/ley_0633_2000_pr001.html
- Ley 256 de 1996: http://www.secretariasenado.gov.co/senado/basedoc/ley_0256_1996.html
- Ley 1258 de 2008: http://www.secretariasenado.gov.co/senado/basedoc/ley_1258_2008.html
- Aerocivil, preguntas frecuentes sobre drones: https://www.aerocivil.gov.co/preguntas-frecuentes/18/drones-y-movilidad-urbana-aerea/
- Aerocivil, Aviación No Tripulada – UAS/Drones (RAC 100, Resoluciones 1983 de 2023 y 3034 de 2024): https://www.aerocivil.gov.co/autoridad_aeronautica/publicaciones/3781/aviacion-no-tripulada-uasdrones/
- ICA, Resolución 9271 de 2023 (modifica la 1580 de 2022; no trata drones): https://www.ica.gov.co/getattachment/72d30544-7bd9-419f-9a75-e55fcee4a001/2023R00009271.aspx
- ICA, Resolución 1580 de 2022 (normograma Invima): https://normograma.invima.gov.co/compilacion/docs/resolucion_ica_1580_2022.htm
- Resolución MinTIC 1519 de 2020: https://normograma.mintic.gov.co/mintic/compilacion/docs/resolucion_mintic_1519_2020.htm
- DIAN, proyecto de resolución UVT 2026: https://www.dian.gov.co/normatividad/Proyectosnormas/Proyecto%20Resoluci%C3%B3n%20000000%20de%2019-11-2025.pdf
- Decisión 486 de la CAN, arts. 155 y 157 (transcritos en la interpretación prejudicial 177-IP-2020, WIPO Lex): https://www.wipo.int/wipolex/en/text/584038
- DJI, Terms of Use y Guidelines for Using DJI Trademarks: https://www.dji.com/terms
- Google, About consent mode (modos básico y avanzado): https://support.google.com/analytics/answer/10000067?hl=en y https://developers.google.com/tag-platform/security/concepts/consent-mode

**Fuentes secundarias [S]**
- UVT 2026 (Resolución DIAN 000238 de 2025): https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2025/12/dian-fijo-en-52-374-en-valor-de-la-uvt-para-el-ano-gravable-2026/ y https://actualicese.com/uvt-2026/
- Resolución SIC 32126 de 2022 sobre cookies: https://www.ochgroup.co/en/cookies-y-datos-personales-en-colombia/
- Proyecto de ley de IA (PL 043/2025, PL 025/2026): https://megatek.ai/es/regulation/proyecto-ley-inteligencia-artificial-colombia-2025/ y https://cambiocolombia.com/ciencia/articulo/2026/8/ley-nuclear-y-de-inteligencia-artificial-en-que-van-estas-regulaciones-en-colombia
- Reforma a la Ley 1581 (PL 214/25 Cámara): https://congresovisible.uniandes.edu.co/proyectos-de-ley/ppor-la-cual-se-reforma-la-ley-1581-de-2012-y-se-dictan-otras-disposiciones-generales-relativas-a-la-proteccion-de-datos-personales-proteccion-de-datos-personales/14922/
- PLE 282 de 2026 Cámara: https://ciberlatam.com/noticias/colombia-reforma-ley-1581-proyecto
- RAC 100, categoría específica y aspersión: https://rac100.org/categoria-especifica/ y https://e7.legal/obligacion-de-certificacion-como-explotador-uas-bajo-el-rac-100-operacion-de-sistemas-de-aeronaves-no-tripuladas-uas/
- Resolución 3034 de 2024 (SUIN): https://www.suin-juriscol.gov.co/clp/contenidos.dll/Resolucion/30054417?fn=document-frame.htm$f%3Dtemplates$3.0

**Lo que no pude verificar en fuente oficial (resumen)**
- El texto de la Resolución DIAN 000238 de 2025 (el valor de la UVT viene de fuentes secundarias coincidentes).
- La fecha de corte y la UVT aplicable para medir el umbral del RNBD.
- Si la lista de países con nivel adecuado de la Circular 005 de 2017 se modificó después de 2017.
- El texto oficial de la Resolución SIC 32126 de 2022 y sanciones recientes por cookies.
- El estado oficial del PL 025 de 2026 (IA) y de los proyectos 214/25 y 282/26 (reforma a la Ley 1581).
- Los requisitos del ICA y de salud para aspersión de plaguicidas con drones, y la "Resolución ICA 00059587 de 2021".
- Los detalles del RAC 100 que vienen de fuentes secundarias (póliza, manual de operaciones, límites de altura y distancia, excepción de predio propio, fecha del 1 de enero de 2025).
- La numeración exacta del artículo de la Ley 2300 que extiende sus reglas a la publicidad.
- El alcance del condicionamiento de exequibilidad del art. 91 de la Ley 633 de 2000.
- La región de los recursos de Azure de LATCON, el contenido de los DPA de Microsoft y Google, y si las propuestas actuales traen cláusula de encargado.
- La redacción literal de los tres numerales mínimos del art. 25 del Decreto 1377.
