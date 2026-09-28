# Buenas prácticas de desarrollo y reutilización de código

**LATIN CONSULTING SERVICES SAS (LATCON)**
Documento de referencia y procedimiento · Versión 2.0 · Septiembre 2026
Aplica a: Florasens, AgriCount, IMS Fairtrade, plataforma de ventas, CRM/ERP y todo desarrollo futuro

---

## Cómo usar este documento

Tiene tres partes con propósitos distintos:

- **Parte A — Fundamentos.** Por qué trabajamos así. Se lee una vez y se consulta cuando hay una duda de criterio.
- **Parte B — Procedimiento.** El orden a seguir **cada vez** que arrancamos un proyecto de desarrollo. Es la parte operativa.
- **Parte C — Plantillas y referencia.** De donde se copia y pega al momento de crear los archivos.

Este documento vive en `latcon-packages/docs/` y se actualiza cuando cambia el portafolio de productos o el tamaño del equipo.

---

## El orden, en una página

Resumen del procedimiento completo. El detalle está en la Parte B.

| Fase | Qué se hace | Salida |
|---|---|---|
| **F0 · Antes de escribir código** | Crear el repositorio y el kit de seis archivos. Traducir las directrices del cliente a reglas verificables | Repo con `CLAUDE.md`, glosario, reglas del cliente, ADR iniciales, README y `.env.example` |
| **F1 · Durante el desarrollo** | Declarar paquetes en versión fija, ramas cortas, pruebas en el núcleo, revisión cruzada de cambios al núcleo | Código con dependencias fijadas y CHANGELOG al día |
| **F2 · Durante las pruebas con cliente** | Registrar cada petición clasificada. Escribir la regla **antes** de implementarla | `ajustes-pruebas.md` con rastro fechado y reglas promovidas |
| **F3 · Al cerrar** | Consolidar reglas, cerrar el registro de ajustes, ADR de cierre y evaluar qué sube al núcleo | Proyecto entregado y capacidad acumulada para el siguiente |

**Regla que ordena todo el procedimiento:** nunca romper algo que ya funciona para construir algo que todavía no existe.

---

# PARTE A · FUNDAMENTOS

---

# 1. El problema que resuelve todo esto

Todo producto multi-tenant tiene dos partes:

- **Fontanería** — identidad y sesión, tenants y aislamiento de datos, usuarios, roles y permisos, invitaciones, suscripciones, límites de uso, auditoría, notificaciones, archivos, panel de administración.
- **Dominio** — lo que hace único al producto: camas y barillas en Florasens, conteo de mazorcas en AgriCount, prima Fairtrade en el IMS, carrito y agente de WhatsApp en la plataforma de ventas.

La fontanería es aproximadamente el **30–40% del esfuerzo** de cada producto y el **0% de la diferenciación**. Ningún cliente la paga explícitamente y ninguno la nota, salvo cuando falla.

## 1.1 Modelo de costo

Suponiendo 100 unidades de esfuerzo por producto (35 fontanería, 65 dominio):

| Enfoque | Cálculo | Total fontanería |
|---|---|---|
| Silos (cada producto con su copia) | 5 × 35 | **175 unidades** |
| Núcleo compartido | 45 (núcleo genérico) + 5 × 5 (adaptadores) | **70 unidades** |

Diferencia ≈ **105 unidades**, aproximadamente un producto completo.

Y eso es solo construcción. El mantenimiento pesa más: un parche de seguridad en autenticación son **cinco correcciones en silos** y **una en núcleo**, todos los años.

## 1.2 Los costos reales del enfoque compartido

No se adopta sin contras. Hay tres:

1. **Prima de generalización.** El núcleo cuesta más que una instancia suelta, y se paga antes de que ningún cliente pague.
2. **Acoplamiento.** Un cambio mal hecho en el núcleo puede afectar a varios productos.
3. **Abstracción equivocada.** Si los productos no necesitan realmente lo mismo, se construye algo que no le sirve bien a ninguno.

**La condición que hace viable el enfoque en LATCON:** el dominio de los productos no se parece en nada (offline-first con Flutter y TimescaleDB, Android con YOLO, cumplimiento documental, tienda con agente), pero la fontanería es **literalmente idéntica** en todos. Esa asimetría es lo que valida la decisión.

---

# 2. Arquitectura de paquetes compartidos

## 2.1 Se separa por peso y por audiencia, no por tema

El criterio decisivo es el peso de las dependencias: si el YOLO estuviera dentro del núcleo, la plataforma de ventas descargaría PyTorch solo para poder hacer login.

| Paquete | Contenido | Quién lo necesita | Peso |
|---|---|---|---|
| `latcon-core` | Logeo, tenants, roles, permisos, suscripciones, auditoría, notificaciones | Todos | Liviano |
| `latcon-geo` | Captura de polígonos, validación, cálculo de áreas, GeoJSON, mapas | Los agro | Medio |
| `latcon-vision` | Carga de modelo YOLO, inferencia, devolución de detecciones | Pocos | Pesado |

## 2.2 Dirección de dependencias

**Las flechas van siempre hacia el núcleo, nunca hacia los lados ni hacia arriba.**

- `latcon-geo` **puede** usar `latcon-core`. OK
- `latcon-vision` **puede** usar `latcon-core`. OK
- `latcon-core` **nunca** usa a los otros dos. NO
- `latcon-geo` y `latcon-vision` **nunca** se usan entre sí. NO

Si el núcleo llegara a necesitar algo de `latcon-geo`, se pierde la independencia: ya no se puede actualizar uno sin el otro.

## 2.3 Es copia, no conexión en vivo

Cada proyecto instala **su propia copia** del paquete y corre con ella. Si el CRM tiene `core 1.4.0` y Florasens tiene `core 1.2.0`, cada uno funciona con lo suyo. No hay ningún cable en vivo entre productos.

La diferencia con copiar y pegar carpetas: la copia **lleva etiqueta de origen y versión**, así que puede descartarse entera y reemplazarse por una versión nueva.

> **Regla crítica:** la copia instalada dentro de un proyecto **nunca se edita**. Si el logeo necesita un cambio, el cambio se hace en `latcon-core` y baja como versión nueva. Editar la copia local es exactamente cómo se vuelve a tener cinco versiones distintas con parches diferentes.

## 2.4 Compartir código no es compartir base de datos

Cada producto conserva su propia base de datos, sus propios clientes y sus propios datos. Lo único compartido es el código. El núcleo no "corre" en ningún lado: es una pieza que cada proyecto lleva adentro.

---

# 3. Qué va y qué no va en un paquete compartido

## 3.1 El método para separar

**Copiar el componente y borrar todo lo que mencione el producto.**

- Lo que se puede borrar sin drama → era específico, no va.
- Lo que al borrarlo rompe todo → era genérico, se queda.
- Lo que no es ni una cosa ni la otra → se convierte en **una pregunta que el paquete le hace al proyecto** (configuración o punto de extensión).

## 3.2 Ejemplo aplicado: logeo federado

| Elemento | Destino |
|---|---|
| Redirigir al proveedor, recibir token, validarlo, crear sesión | Núcleo |
| Renovación y expiración de sesión, cierre de sesión | Núcleo |
| ID de aplicación, secreto, URL de retorno | Configuración del proyecto |
| Qué campo del token es el correo, cuál el nombre | Configuración del proyecto |
| Los roles que existen ("agrónomo", "auditor", "supervisor") | Del proyecto. El núcleo sabe *que hay roles*, no cuáles |
| Qué pasa cuando entra un usuario nuevo por primera vez | Del proyecto. El núcleo avisa, el proyecto decide |

## 3.3 La regla general

**El núcleo pregunta, el proyecto responde.**

- `latcon-geo` sabe dibujar un polígono, validar que cierre, que no se cruce, calcular área y guardarla en formato estándar. **No** sabe qué es una parcela de cacao ni cómo se evalúa riesgo de deforestación.
- `latcon-vision` devuelve "encontré 14 objetos de la clase 0 con esta confianza". El proyecto es quien dice "eso son 14 mazorcas maduras".

## 3.4 La prueba de contaminación

> Si una línea de código menciona **finca, lote, mazorca, productor o pedido**, no va en el paquete compartido.

Sin esta regla el núcleo se contamina y en seis meses se vuelve a tener silos, pero con más pasos.

## 3.5 Cuándo extraer un paquete

**La regla de las dos ocasiones:** algo se extrae cuando **dos proyectos ya lo necesitan de verdad**, no cuando se cree que lo van a necesitar.

| Paquete | Consumidores reales | Decisión |
|---|---|---|
| `latcon-core` | Los cinco productos | **Extraer ya.** Es el que produce el ahorro |
| `latcon-geo` | AgriCount + IMS Fairtrade | **Califica.** Extraer cuando el IMS llegue a esa parte |
| `latcon-vision` | Solo AgriCount | **Todavía no.** Un solo consumidor obliga a adivinar cómo lo usará el segundo |

Extraer antes de tiempo cuesta más que extraer después, porque hay que deshacer la abstracción equivocada además de construir la buena.

---

# 4. Versionado

## 4.1 Versionado semántico (SemVer)

Formato `MAYOR.MENOR.PARCHE`, por ejemplo `1.4.1`:

| Posición | Significa | ¿Actualizar es seguro? |
|---|---|---|
| **Parche** (1.4.**1**) | Se arregló un error, nada cambió por fuera | Sí |
| **Menor** (1.**4**.1) | Se agregó algo nuevo sin dañar lo anterior | Sí |
| **Mayor** (**1**.4.1) | Cambió cómo se usa el paquete | No, requiere ajustes |

## 4.2 Cada paquete versiona por separado

Puede coexistir `core 2.1.0`, `geo 0.6.2` y `vision 1.0.0`. **No existe una "versión de LATCON".**

Cuando un paquete depende del núcleo, se declara un rango, no una versión exacta:

```
latcon-core >= 1.4, < 2.0
```

Significa "funciono con cualquier núcleo de la familia 1, pero no me metan el 2 sin avisar".

## 4.3 Matriz de versiones por proyecto

| Proyecto | core | geo | vision |
|---|---|---|---|
| Florasens | 1.4.0 | — | — |
| AgriCount | 1.4.0 | 0.6.2 | 1.0.0 |
| IMS Fairtrade | 1.3.0 | 0.6.2 | — |
| Plataforma ventas | 1.4.0 | — | — |
| CRM | 1.4.1 | — | — |

Cada proyecto sube de versión **cuando le conviene**, no cuando el núcleo cambia.

## 4.4 Las versiones no se sobrescriben

Etiquetar `core-v1.4.1` **crea un marcador nuevo, no reemplaza** al `core-v1.4.0`. Los dos conviven y siguen siendo instalables indefinidamente.

Esto da tres cosas:

- **Nadie está obligado a moverse** cuando sale una versión nueva.
- **Se puede devolver:** si `1.4.1` rompe algo, se vuelve a `1.4.0` y queda exactamente como estaba.
- **Un despliegue viejo se puede reconstruir** instalando las versiones de esa fecha.

> **Regla:** una versión publicada nunca se modifica. Git permite mover una etiqueta a la fuerza; hacerlo significa tener cosas diferentes con el mismo nombre en máquinas diferentes. Si hubo un error en la `1.4.1`, se saca la `1.4.2`. Los números son baratos, la confianza no.

## 4.5 Caso especial: modelos de IA

Los pesos del modelo YOLO **no van dentro del paquete**. Van en Azure Blob y el paquete los descarga al arrancar.

Esto implica **dos versiones separadas e independientes**:

| Versión | Qué es | Ejemplo |
|---|---|---|
| Código | Cómo se corre la inferencia | `latcon-vision 1.0.0` |
| Modelo | Con qué datos fue entrenado | `mazorcas-v3` |

Se puede reentrenar el modelo sin tocar código, y mejorar el código sin reentrenar. Confundir ambas versiones es un error clásico y caro.

---

# 5. Almacenamiento y acceso

## 5.1 Monorepo para los tres paquetes

Para un equipo de tres personas, **un solo repositorio Git privado con los tres paquetes dentro** es más manejable que tres separados. Cada paquete se publica y versiona por aparte, con etiquetas prefijadas: `core-v1.4.0`, `geo-v0.6.2`, `vision-v1.0.0`.

## 5.2 Dónde alojarlo

| Opción | Veredicto |
|---|---|
| Git local sin servidor (`git+file:///`) | Solo sirve en una máquina. El socio no puede instalar y el despliegue falla |
| GitHub Enterprise Server autohospedado | Desproporcionado: contrato anual por asientos, servidor dedicado, administración |
| Gitea autohospedado | Viable técnicamente, pero exige servidor encendido, respaldos y accesible desde el despliegue |
| **GitHub privado en la nube** | **Recomendado.** Gratis, privado, accesible por socios y por Azure |

Con Git **siempre** hay una copia completa del historial en disco local: se trabaja y se hacen commits sin internet; la conexión solo hace falta para sincronizar o desplegar.

## 5.3 Advertencia sobre carpetas sincronizadas

> **No poner repositorios Git dentro de Google Drive, OneDrive o Dropbox.**

Sincronizan archivo por archivo sin entender qué es Git. La carpeta `.git` tiene cientos de archivos pequeños que cambian juntos; una sincronización parcial o dos máquinas escribiendo a la vez corrompen el repositorio.

Los repositorios van fuera del servicio de sincronización, por ejemplo `C:\Repos\`. La copia de seguridad la da el repositorio remoto.

## 5.4 Acceso desde despliegues

El repositorio es privado, así que la máquina que instala necesita credenciales. Funciona en la máquina propia por la llave SSH ya configurada, pero **falla en Azure o dentro de Docker**.

Solución: un **Deploy Key** de GitHub, de solo lectura, específico para ese repositorio, y URL en formato SSH. Conviene resolverlo la primera vez con calma y dejarlo documentado: es el tropiezo que se repite en cada proyecto nuevo y siempre aparece el día del despliegue.

---

# PARTE B · PROCEDIMIENTO

*Esta es la parte que se sigue cada vez que John y Luis arrancan un proyecto.*

---

# 6. Fase 0 · Antes de escribir código

## 6.1 El kit de seis archivos

Menos que esto se queda corto; más que esto nadie lo mantiene.

| Archivo | Para qué |
|---|---|
| `CLAUDE.md` | Índice de contexto para el asistente de código. Importa lo demás |
| `docs/glosario.md` | El vocabulario del cliente, definido con precisión |
| `docs/reglas-cliente.md` | Las directrices del cliente como reglas verificables |
| `docs/decisiones/` | Los ADR de las decisiones que se vayan tomando |
| `README.md` | Qué es el proyecto y cómo se corre |
| `.env.example` | Todas las variables de configuración, con ejemplos, sin secretos reales |

Los paquetes compartidos llevan además `CHANGELOG.md`. Un proyecto de cliente normalmente no lo necesita.

## 6.2 `CLAUDE.md`: corto, es un índice

Claude Code carga automáticamente archivos `CLAUDE.md` al arrancar, en una jerarquía donde los niveles superiores se cargan primero:

| Archivo | Alcance | Compartido con |
|---|---|---|
| `./CLAUDE.md` en la raíz del repo | Instrucciones del proyecto | El equipo, vía control de versiones |
| `~/.claude/CLAUDE.md` | Preferencias personales, todos los proyectos | Solo su dueño |

**Reparto correcto:** en el archivo de usuario van solo preferencias personales (idioma, estilo de nombres, atajos). **Las reglas de LATCON van en el `CLAUDE.md` de cada repositorio, comiteado.** Aunque parezca lógico ponerlas en el archivo global, ahí solo las ve su dueño: el otro socio desarrollaría sin ellas.

Los `CLAUDE.md` pueden importar otros archivos con la sintaxis `@ruta/al/archivo`, con rutas relativas o absolutas. Así las reglas compartidas se escriben una vez:

```markdown
# IMS Fairtrade

@../latcon-packages/docs/reglas-nucleo.md
@docs/glosario.md
@docs/reglas-cliente.md

## Este proyecto
- SaaS de cumplimiento Fairtrade. Cliente piloto: La Cacaotera Real
- Paquetes: latcon-core 1.4.0, latcon-geo 0.6.2
- Comandos: pytest / ruff check / uvicorn app.main:app --reload
```

La importación por ruta relativa exige tener los repositorios como hermanos bajo `C:\Repos\`. Si no, se copia el bloque de reglas en cada repositorio.

## 6.3 El glosario: el archivo más subestimado

Define el vocabulario del cliente con precisión. Qué es un lote, qué es una parcela, qué es un miembro, qué es la prima.

Sin él, el modelo usa el término genérico de la industria y no el del cliente, y se terminan con nombres de tablas y de pantallas que el cliente no reconoce. Además, "lote" no significa lo mismo en cacao que en flores.

## 6.4 Cómo se escriben las reglas para que el modelo las siga

Una regla por línea, en imperativo, verificable:

- Mal: "el cliente prefiere que los pesos se manejen con cuidado"
- Bien: "los pesos se registran en kilogramos con 2 decimales; nunca en libras, nunca redondear a entero"

Los modelos siguen bien las reglas concretas y mal las que requieren interpretación. Si una regla necesita explicación, la explicación va al ADR, no al archivo de reglas.

---

# 7. Fase 1 · Durante el desarrollo

## 7.1 Declarar los paquetes

En `requirements.txt` o `pyproject.toml`:

```
latcon-core @ git+ssh://git@github.com/latcon/latcon-packages.git@core-v1.4.0#subdirectory=latcon-core
latcon-vision @ git+ssh://git@github.com/latcon/latcon-packages.git@vision-v1.0.0#subdirectory=latcon-vision
```

Anatomía de la línea:

| Fragmento | Qué es |
|---|---|
| `latcon-core` | Nombre con el que se importa en el código |
| `git+ssh://git@github.com/...` | De dónde se baja |
| `@core-v1.4.0` | Qué versión exacta (etiqueta de Git) |
| `#subdirectory=latcon-core` | En qué carpeta del monorepo está |

Uso en código:

```python
from latcon_core.auth import configurar_login

configurar_login(app, proveedor="azure_b2c", roles=["agrónomo", "supervisor"])
```

**Versión fija siempre.** Si dice "la última", dos instalaciones en fechas distintas dan código distinto y se pierde toda la ventaja del versionado.

**Dependencias externas críticas en rango cerrado.** En `latcon-vision`, PyTorch debe ir como `torch >= 2.2, < 2.6`. Si acepta cualquier versión, un día se instala una nueva y el modelo deja de cargar.

## 7.2 Modo desarrollo: instalación editable

Mientras se construye el núcleo y el proyecto al mismo tiempo:

```
pip install -e ../latcon-packages/latcon-core
```

Apunta a la carpeta local en disco: se edita el núcleo y el proyecto lo ve al instante.

> **Regla:** no dejarlo así. Antes de desplegar se vuelve a la versión etiquetada. Un despliegue apuntando a una carpeta local funciona en esa máquina y en ninguna otra.

## 7.3 Pruebas automáticas, concentradas en el núcleo

Es la práctica no negociable, por multiplicación de riesgo: un error en el logeo de Florasens afecta a Florasens; un error en `latcon-core` afecta a cinco productos a la vez.

También es lo que hace que actualizar sea rápido. Si cada versión nueva obliga a probar a mano los cinco productos, se dejan de sacar versiones y el núcleo se estanca.

> **No perseguir cobertura alta en los productos.** Un 30% bien puesto en el núcleo vale más que un 80% repartido. En los productos se prueba solo la lógica de negocio que duele si se rompe: cálculo de prima Fairtrade, compuertas de margen del CRM.

## 7.4 Integración continua

Que cada cambio dispare las pruebas automáticamente y que publicar una etiqueta genere la versión sola. GitHub Actions lo cubre gratis con un archivo de configuración.

Valor adicional no técnico: es el mecanismo por el cual John y Luis pueden tocar el mismo núcleo sin pisarse. Sin esto, "funciona en mi máquina" se vuelve una discusión semanal.

## 7.5 Ramas cortas y revisión cruzada

Basta con *trunk-based development*: una rama principal siempre funcional y ramas de trabajo de pocos días.

- **Ningún cambio en `latcon-core` entra sin que el otro socio lo revise.** No por desconfianza, sino porque es el único código cuyo error se propaga a todo.
- En los productos, cada uno puede trabajar directo.
- Commits diarios y ramas de menos de una semana. Una rama de un mes garantiza una fusión dolorosa.

## 7.6 Ritual de publicación de una versión

Tres pasos, siempre juntos:

1. Cerrar la sección `[Unreleased]` del CHANGELOG poniéndole número y fecha.
2. Subir el número de versión en el `pyproject.toml` del paquete.
3. Etiquetar: `git tag core-v1.4.1` y `git push origin core-v1.4.1`

El CHANGELOG y la etiqueta siempre dicen el mismo número. Si se desincronizan, el CHANGELOG deja de servir para decidir si actualizar, que es para lo que existe.

## 7.7 Actualizar un proyecto a una versión nueva

1. Cambiar `core-v1.4.0` por `core-v1.4.1` en el archivo de dependencias.
2. `pip install -r requirements.txt`
3. Desplegar.

**No es automático, y es mejor así.** Si lo fuera, un error en el núcleo tumbaría los cuatro productos el mismo día. Con este esquema se prueba primero en el CRM interno y luego se sube el resto.

---

# 8. Fase 2 · Durante las pruebas con el cliente

Aquí es donde estos sistemas fallan: las directrices del inicio quedan escritas y las que salen en pruebas se quedan en un chat.

## 8.1 Registrar cada petición, clasificada

En `docs/ajustes-pruebas.md`, una tabla con todas las peticiones:

| # | Fecha | Quién | Qué pidió | Tipo | Estado |
|---|---|---|---|---|---|
| 12 | 2026-09-10 | Cliente | El peso debe ir a 2 decimales | Aclaración | Aplicado |
| 13 | 2026-09-10 | Cliente | Agregar reporte de trazabilidad por lote | Cambio de alcance | Cotizado aparte |
| 14 | 2026-09-11 | Interno | El filtro de fecha no respeta zona horaria | Defecto | Aplicado |

La clasificación en tres tipos es lo importante:

| Tipo | Qué es | Qué se hace |
|---|---|---|
| **Defecto** | No funciona lo acordado | Se corrige, sin discusión |
| **Aclaración** | Funciona, pero el cliente precisa cómo debía ser | Se aplica **y se promueve a regla** en `reglas-cliente.md` |
| **Cambio de alcance** | Es algo nuevo | Se cotiza aparte |

Sirve dos veces: en lo técnico deja el rastro de por qué el código quedó como quedó; en lo comercial es el protocolo de protección de alcance con evidencia fechada en vez de memoria. Cuando el cliente diga "eso siempre estuvo acordado", el registro dice otra cosa.

## 8.2 El hábito clave: la regla se escribe antes de implementarla

Cuando el cliente pide un ajuste de tipo aclaración, el orden es: **primero se escribe en `reglas-cliente.md`, después se le pide al modelo que lo implemente.** Nunca al revés.

Si se implementa primero y se anota después, la mayoría de las veces no se anota. Y entonces en dos meses el modelo, el socio o uno mismo revierten el ajuste sin saber que era una petición del cliente, porque en el código no hay nada que lo diga.

Escribiendo primero, el modelo implementa **desde el archivo**, la regla queda registrada por construcción, y no hay paso que se pueda olvidar.

## 8.3 Sobre la memoria automática del asistente

Claude Code también guarda notas propias a partir de las correcciones, sin que uno escriba nada. Es útil, pero **no reemplaza estos archivos**: son notas del asistente, no un registro mostrable al cliente, y viven en ese repositorio y esa máquina.

Reparto: la memoria automática captura lo mecánico (cómo se corren las pruebas aquí, dónde está tal cosa); nosotros escribimos lo que tiene consecuencias contractuales o de diseño.

---

# 9. Fase 3 · Al cerrar el proyecto

Media hora de consolidación antes de entregar.

1. **Integrar las reglas dispersas.** Las que se acumularon en `reglas-cliente.md` durante las pruebas quedan ordenadas por tema, no por orden de llegada.
2. **Cerrar `ajustes-pruebas.md`** con todo resuelto o explícitamente aplazado.
3. **ADR de cierre** con las decisiones tomadas sobre la marcha que no alcanzaron a registrarse.
4. **Revisar qué resultó genérico.** Si algo construido aquí ya lo necesita un segundo proyecto, aplica la regla de las dos ocasiones (§3.5) y se evalúa subirlo al núcleo.

El punto 4 es el que cierra el círculo: **el núcleo no crece porque nos sentemos a diseñarlo, crece porque cada proyecto deja algo.**

---

# PARTE C · PLANTILLAS Y REFERENCIA

---

# 10. Los tres documentos que no se solapan

| Documento | Responde | Cuándo se escribe |
|---|---|---|
| README | Qué es y cómo lo uso hoy | Cuando cambia la forma de usarlo |
| CHANGELOG | Qué cambió entre versiones | En cada cambio |
| ADR | Por qué decidimos esto | Una vez, al decidir |

Un README que empieza a contar historia debería ser CHANGELOG. Un CHANGELOG que empieza a justificar debería ser ADR.

## 10.1 Plantilla de README

Responde una sola pregunta: *"llegué a este paquete sin contexto, ¿qué hago?"*.

```markdown
# latcon-core

Fontanería común de los productos LATCON: autenticación federada,
multi-tenancy, roles y permisos, suscripciones, auditoría y notificaciones.

No contiene lógica de negocio de ningún producto.

## Instalación

    latcon-core @ git+ssh://git@github.com/latcon/latcon-packages.git@core-v1.4.0#subdirectory=latcon-core

## Uso mínimo

    from latcon_core.auth import configurar_login

    configurar_login(app, proveedor="azure_b2c", roles=["admin", "operador"])

## Configuración

| Variable | Obligatoria | Descripción |
|---|---|---|
| LATCON_AUTH_CLIENT_ID | sí | ID de aplicación del proveedor |
| LATCON_AUTH_SECRET | sí | Secreto de la aplicación |
| LATCON_AUTH_REDIRECT_URI | sí | URL de retorno tras el login |

## Qué NO va en este paquete

Nada que mencione finca, lote, mazorca, productor o pedido.
Ver docs/reglas-nucleo.md.

## Desarrollo

    pip install -e .
    pytest

## Requisitos

Python 3.11+
```

Lo que lo hace bueno: la primera frase dice qué es sin rodeos, el ejemplo de uso está arriba y funciona copiado tal cual, y la tabla de configuración está completa. Lo que lo arruina: párrafos de introducción, historia del proyecto, o ejemplos que ya no compilan.

**`latcon-vision` necesita dos secciones adicionales:** de dónde se bajan los pesos del modelo y cuál es la versión vigente, y el rango de PyTorch soportado.

## 10.2 Plantilla de CHANGELOG

Formato estándar **Keep a Changelog**: lo más nuevo arriba, una sección por versión con número y fecha ISO, cambios agrupados en categorías fijas (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`), incluyendo solo las que apliquen. Arriba de todo, `[Unreleased]` para ir anotando.

```markdown
# Changelog

Formato basado en Keep a Changelog. Versionado según SemVer.

## [Unreleased]

## [1.4.1] - 2026-09-04

### Fixed
- La renovación de sesión fallaba si el token expiraba durante una
  petición en curso.

## [1.4.0] - 2026-08-20

### Added
- Invitación de usuarios por correo con enlace de un solo uso.

### Changed
- configurar_login() acepta roles como lista. El parámetro
  rol_unico sigue funcionando pero queda deprecado.

### Deprecated
- rol_unico. Se elimina en 2.0.0.
```

**Criterio:** el CHANGELOG es para quien *usa* el paquete, no para quien lo desarrolla. Se anota lo que cambia por fuera; una refactorización interna sin cambio de comportamiento no va, eso ya está en el historial de Git.

**Redacción:** el efecto sobre el usuario, no la operación técnica.

- Mal: "se modificó el método refresh_token en la clase SessionManager"
- Bien: "la sesión ya no se cae si el token expira durante una petición"

## 10.3 Plantilla de ADR

Un archivo por decisión en `docs/decisiones/`, numerado y con nombre descriptivo: `0001-nucleo-compartido.md`.

```markdown
# 0001 · Núcleo compartido en paquetes versionados

Fecha: 2026-09-04
Estado: aceptada

## Contexto
Cinco productos multi-tenant repitiendo la misma fontanería.

## Decisión
Extraer la fontanería a paquetes versionados que cada proyecto
instala como dependencia.

## Alternativas descartadas
- Silos: 175 unidades de esfuerzo contra 70, y cinco lugares que parchar.
- Plataforma única: si cae el núcleo caen todos, y no se puede vender
  ni ceder un producto por separado.

## Consecuencias
Se paga una prima de generalización antes de que ningún cliente pague.
A cambio, cada producto nuevo arranca con la fontanería resuelta.
```

## 10.4 Plantilla de `docs/reglas-cliente.md`

```markdown
# Reglas del cliente · [Proyecto]

Cada regla en imperativo y verificable. Las que salgan en pruebas
se agregan AQUÍ antes de implementarlas.

## Unidades y formatos
- Los pesos se registran en kilogramos con 2 decimales. Nunca libras.
- Las fechas se muestran dd/mm/aaaa y se guardan en ISO con zona horaria.

## Reglas de negocio
- Un miembro no puede tener dos parcelas con el mismo código.
- La prima se calcula sobre kilogramos entregados, no sobre kilogramos comprados.

## Interfaz
- Todo listado permite exportar a Excel.
```

## 10.5 Plantilla de `docs/glosario.md`

```markdown
# Glosario · [Proyecto]

Vocabulario del cliente. Se usa este, no el genérico de la industria.

| Término | Definición | No confundir con |
|---|---|---|
| Lote | Cantidad de cacao entregada en una sola transacción | Parcela |
| Parcela | Polígono de terreno con un único propietario registrado | Finca |
| Miembro | Productor con vínculo formal a la organización certificada | Proveedor |
```

## 10.6 Estructura de carpetas de referencia

```
latcon-packages/
├── README.md
├── CLAUDE.md
├── docs/
│   ├── buenas-practicas-desarrollo.md   ← este documento
│   ├── reglas-nucleo.md
│   └── decisiones/
├── latcon-core/
│   ├── README.md
│   ├── CHANGELOG.md
│   ├── pyproject.toml
│   └── latcon_core/
├── latcon-geo/
└── latcon-vision/

proyecto-cliente/
├── README.md
├── CLAUDE.md
├── .env.example
├── requirements.txt
└── docs/
    ├── glosario.md
    ├── reglas-cliente.md
    ├── ajustes-pruebas.md
    └── decisiones/
```

**Sobre herramientas tipo Notion:** sirven como capa de lectura para gestión o para compartir con clientes. El riesgo es tener el mismo documento en dos lados y que se desincronicen. Si se usan, que sea para documentos distintos: en Git lo técnico, en la otra herramienta lo comercial.

---

# 11. Prácticas que NO conviene adoptar todavía

Aparecen recomendadas en todas partes; para un equipo de tres son costo sin beneficio.

| Práctica | Por qué no, hoy |
|---|---|
| **Microservicios** | Multiplica la operación por N sin ganar nada. Aplicaciones separadas por producto sobre un núcleo común es lo correcto para este tamaño |
| **Kubernetes** | Contenedores sí, orquestador no. Azure Container Apps o App Service sobra por años |
| **Arquitectura hexagonal completa** | El principio de inversión de dependencias sí aplica; la ceremonia de puertos y adaptadores es papeleo con tres personas |
| **Documentación extensa** | El kit de seis archivos y ya. Documentación que nadie mantiene es peor que no tenerla, porque miente |

---

# 12. Glosario de términos

Nombres establecidos de lo que contiene este documento. Sirven para buscar material y para hablar con desarrolladores que se contraten después.

| Término | Qué nombra |
|---|---|
| **Shared library / shared kernel** | Extraer código común a paquetes versionados |
| **Monorepo** | Varios paquetes en un solo repositorio con historial común (lo contrario: *polyrepo*) |
| **Versionado semántico (SemVer)** | Los tres números y su significado. Estándar en semver.org |
| **Keep a Changelog** | Formato estándar de CHANGELOG con categorías fijas y sección `[Unreleased]` |
| **ADR (Architecture Decision Record)** | Registro corto de una decisión de arquitectura y su razón |
| **Pinning / lockfiles** | Fijar versión exacta en vez de "la última" |
| **Rule of three** | No generalizar hasta tener dos o tres casos reales |
| **Inversión de dependencias** | "El núcleo pregunta, el proyecto responde" |
| **Trunk-based development** | Rama principal siempre funcional, ramas de trabajo cortas |
| **Deploy key** | Credencial de solo lectura para que una máquina de despliegue acceda a un repositorio privado |

Y un principio que conviene tener presente, de Sandi Metz:

> **La abstracción equivocada cuesta más que la duplicación.**

Es más barato tener código repetido dos veces que una abstracción que no encaja bien en ninguno de los dos casos.

---

# 13. Checklist maestro

## 13.1 Primera vez: crear `latcon-packages`

- [ ] Crear repositorio privado en GitHub, **fuera de la carpeta sincronizada de Drive**
- [ ] Crear `latcon-core` vacío con su estructura de paquete
- [ ] **Copiar** el logeo federado de Florasens al núcleo, sin tocar Florasens todavía
- [ ] Quitar lo específico de Florasens aplicando el método de §3.1
- [ ] Escribir pruebas automáticas del logeo en el núcleo
- [ ] Configurar GitHub Actions para correr las pruebas en cada cambio
- [ ] Escribir `docs/reglas-nucleo.md`
- [ ] Escribir el `CLAUDE.md` del repositorio importando ese archivo
- [ ] Escribir `README.md` y `CHANGELOG.md` del paquete
- [ ] Registrar los ADR de las decisiones ya tomadas
- [ ] Usar el núcleo en el **CRM interno** primero, en modo editable
- [ ] Etiquetar `core-v1.0.0` cuando el CRM funcione con él
- [ ] Configurar el Deploy Key y validar la instalación desde Azure
- [ ] Solo entonces: migrar Florasens para que use el núcleo

## 13.2 Cada proyecto nuevo

**F0 · Antes de código**
- [ ] Repositorio creado fuera de la carpeta sincronizada
- [ ] `CLAUDE.md` importando `reglas-nucleo.md`, glosario y reglas del cliente
- [ ] `docs/glosario.md` con el vocabulario del cliente
- [ ] `docs/reglas-cliente.md` con las directrices traducidas a reglas verificables
- [ ] `README.md` y `.env.example`
- [ ] ADR inicial con las decisiones de arranque

**F1 · Desarrollo**
- [ ] Paquetes declarados en versión fija
- [ ] Dependencias externas críticas en rango cerrado
- [ ] Pruebas de la lógica de negocio que duele si se rompe
- [ ] Ramas cortas; cambios al núcleo revisados por el otro socio

**F2 · Pruebas con cliente**
- [ ] `docs/ajustes-pruebas.md` creado desde la primera sesión
- [ ] Cada petición registrada y clasificada en defecto / aclaración / cambio de alcance
- [ ] Cada aclaración escrita en `reglas-cliente.md` **antes** de implementarla
- [ ] Los cambios de alcance cotizados aparte, no absorbidos

**F3 · Cierre**
- [ ] Reglas consolidadas por tema
- [ ] Registro de ajustes cerrado
- [ ] ADR de cierre
- [ ] Evaluación de qué resultó genérico y podría subir al núcleo
- [ ] Volver a versiones etiquetadas si quedó alguna instalación editable

---

*Documento de referencia — revisar cuando cambie el portafolio de productos o el tamaño del equipo.*
