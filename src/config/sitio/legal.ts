/**
 * Contenido de /tratamiento-de-datos y /privacidad.
 * Fuente: Ley 1581 de 2012 y Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015, Libro 2,
 * Parte 2, Título 2, Capítulo 25): contenido mínimo de la política (art. 13) y del aviso (art. 15).
 * Investigación y decisiones: docs/consulta-legal.md y ADR 0007. Redactado por LATCON sin concepto
 * de abogado (decisión del paso 8a).
 * Solo en español hasta la fase de traducción (ADR 0004); las traducciones serán informativas.
 */
import { EMPRESA } from "./empresa";
import { RUTAS } from "./mapa";

/**
 * Versión vigente de la política. Se guarda con cada autorización del formulario de /agenda como
 * prueba (Decreto 1377, art. 8; el modelo del aviso se conserva según el art. 16).
 * Cambiar el texto de la política o de la casilla obliga a cambiar la versión y a registrarla en
 * docs/legal/versiones.md.
 */
export const VERSION_POLITICA = "2026-11-10";
const FECHA_POLITICA = "10 de noviembre de 2026";

/** Área designada para consultas y reclamos (art. 13, num. 4, del Decreto 1377). */
const AREA_RESPONSABLE = "la Gerencia General de LATCON";

const RESPONSABLE = `${EMPRESA.razonSocial} (“LATCON”), ${EMPRESA.nit}, con domicilio en Cajicá, Cundinamarca. Dirección: ${EMPRESA.direccion}. Correo: ${EMPRESA.correo}. Teléfono: ${EMPRESA.telefono}.`;

const escribenos = { etiqueta: `Escribir a ${EMPRESA.correo}`, ruta: `mailto:${EMPRESA.correo}` };

/** Proveedores que tratan datos por cuenta de LATCON, con el lugar donde lo hacen. */
const ENCARGADOS = [
  "Microsoft Azure: base de datos de las reservas (Brasil), servicio que procesa el formulario y envío de correos de confirmación (Estados Unidos).",
  "Google: correo corporativo y videollamadas de Google Meet (Estados Unidos y otros países donde Google opera), y Google Analytics (Estados Unidos), este último solo si aceptas las cookies de analítica.",
  "Meta (WhatsApp): mensajes de coordinación y seguimiento, solo si nos escribes por ese canal o nos das tu número para ello (Estados Unidos).",
] as const;

/** /tratamiento-de-datos: política completa. */
export const TRATAMIENTO_DATOS = {
  ruta: RUTAS.tratamientoDatos,
  metadatos: {
    titulo: "Política de tratamiento de datos personales",
    descripcion:
      "Cómo LATIN CONSULTING SERVICES SAS trata los datos personales de prospectos, clientes, proveedores y empleados, y cómo ejercer tus derechos según la Ley 1581 de 2012.",
  },
  hero: {
    antetitulo: `Vigente desde el ${FECHA_POLITICA}`,
    titulo: "Política de tratamiento de datos personales",
    bajada:
      "Qué datos personales tratamos, de quién, para qué, con quién los compartimos y cómo puedes conocerlos, corregirlos o pedir que los eliminemos. Aplica a los datos que recibimos por este sitio, por correo, por teléfono, por WhatsApp, en reuniones y en la relación con clientes, proveedores y empleados.",
  },
  bloques: [
    {
      titulo: "Responsable del tratamiento",
      texto: RESPONSABLE,
    },
    {
      titulo: "De quién tratamos datos",
      lista: [
        "Prospectos y visitantes del sitio: quienes agendan un diagnóstico, nos escriben o navegan el sitio.",
        "Clientes y las personas de contacto de sus empresas.",
        "Proveedores, contratistas y sus personas de contacto.",
        "Empleados, exempleados y candidatos que nos envían su hoja de vida.",
      ],
      resultado:
        "Los datos de contacto de una persona en su empresa (nombre, cargo, correo, teléfono) también son datos personales, y los tratamos como tales.",
    },
    {
      titulo: "Qué datos tratamos",
      texto:
        "No pedimos datos sensibles ni datos de menores de edad. Te pedimos que no los incluyas en los campos libres del formulario ni en tus mensajes. Según el grupo, tratamos:",
      lista: [
        "Identificación y contacto: nombre, cargo, correo electrónico y teléfono.",
        "Datos de tu empresa: nombre, sector, ciudad y país.",
        "Lo que nos cuentas de tu operación y de la necesidad que quieres resolver.",
        "Cómo llegaste al sitio: la primera página que visitaste, el sitio desde el que llegaste y los parámetros de campaña del enlace (por ejemplo, el de una feria).",
        "Datos técnicos de la conexión, como la dirección IP, para la seguridad del sitio y para evitar abusos del formulario.",
        "Datos de navegación del sitio, solo si aceptas las cookies de analítica.",
        "De clientes y proveedores: los datos necesarios para contratar, facturar y pagar.",
        "De empleados y candidatos: los de la hoja de vida y los que exige la relación laboral. Los datos de salud de la seguridad social se tratan solo para cumplir la ley y con autorización expresa.",
      ],
    },
    {
      titulo: "Para qué los usamos",
      lista: [
        "Prospectos: coordinar, confirmar y realizar la reunión de diagnóstico; hacer su seguimiento; preparar y enviar una propuesta; y saber qué canales y campañas nos traen contactos.",
        "Clientes: ejecutar el contrato, coordinar el proyecto, facturar y dar soporte.",
        "Proveedores: contratar, recibir el servicio y pagar.",
        "Empleados y candidatos: evaluar candidaturas y cumplir las obligaciones laborales y de seguridad social.",
        "Todos: atender consultas y reclamos, proteger la seguridad del sitio y de nuestros sistemas, y cumplir obligaciones legales, contables y tributarias.",
      ],
      resultado:
        "No vendemos tus datos. No te enviamos boletines ni publicidad sin pedirte antes una autorización aparte. Si nos contactamos contigo por teléfono o WhatsApp, lo hacemos de lunes a viernes de 7:00 a. m. a 7:00 p. m. y los sábados de 8:00 a. m. a 3:00 p. m.",
    },
    {
      titulo: "Quién más los ve y dónde se guardan",
      texto:
        "Tienen acceso las personas de LATCON que atienden cada caso y los proveedores que operan nuestra infraestructura, como encargados del tratamiento. Algunos guardan o procesan los datos fuera de Colombia. Al autorizar el tratamiento autorizas también esa transmisión, que hacemos solo para las finalidades de esta política y con proveedores obligados a la confidencialidad y la seguridad de los datos:",
      lista: ENCARGADOS,
    },
    {
      titulo: "Cuando tratamos datos por cuenta de un cliente",
      texto:
        "En los proyectos (sensores, sistemas, analítica, imágenes de campo, inteligencia artificial) tratamos datos que pertenecen a nuestros clientes y a las personas con las que ellos se relacionan. En esos casos el responsable es el cliente: seguimos sus instrucciones y su política, y el contrato del proyecto fija las condiciones. Si tus datos llegaron a nosotros por un cliente, ejerce tus derechos ante él; nosotros lo apoyamos para atenderte.",
    },
    {
      titulo: "Inteligencia artificial",
      texto:
        "No usamos los datos que nos das en el formulario para entrenar modelos de inteligencia artificial. En los proyectos con inteligencia artificial aplicamos la Circular Externa 002 de 2024 de la Superintendencia de Industria y Comercio: evaluamos la necesidad y la proporcionalidad del uso de datos personales, protegemos la privacidad desde el diseño y, cuando el riesgo lo exige, hacemos un estudio de impacto antes de empezar.",
    },
    {
      titulo: "Tus derechos",
      texto: "Como titular de los datos, según el artículo 8 de la Ley 1581 de 2012, puedes:",
      lista: [
        "Conocer, actualizar y rectificar tus datos personales.",
        "Pedir prueba de la autorización que nos diste.",
        "Saber, si lo pides, qué uso les hemos dado.",
        "Revocar la autorización o pedir que suprimamos tus datos, cuando no exista un deber legal o contractual de conservarlos.",
        "No responder preguntas sobre datos sensibles o sobre datos de niños, niñas y adolescentes.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio, después de haber hecho tu consulta o reclamo ante nosotros.",
        "Acceder gratis a tus datos personales.",
      ],
    },
    {
      titulo: "Cómo ejercer tus derechos",
      texto: `Atiende las consultas y los reclamos ${AREA_RESPONSABLE}, en ${EMPRESA.correo} o al ${EMPRESA.telefono}. Pueden pedir el titular, sus causahabientes, su representante o su apoderado, acreditando esa calidad. Indica tu nombre, el correo o teléfono con el que te registraste, lo que pides y, si es un reclamo, los hechos que lo sustentan y los documentos que quieras aportar. Antes de responder verificamos tu identidad.`,
      lista: [
        "Consultas: respondemos en máximo 10 días hábiles. Si no alcanzamos, te avisamos el motivo y respondemos en los 5 días hábiles siguientes.",
        "Reclamos (corrección, actualización, supresión o revocatoria): respondemos en máximo 15 días hábiles, prorrogables hasta 8 días hábiles más con aviso previo. Dentro de los 2 días hábiles siguientes a recibirlo, marcamos el dato con la leyenda “reclamo en trámite”.",
        "Si el reclamo está incompleto, te pedimos lo que falta dentro de los 5 días siguientes. Si pasan 2 meses sin respuesta, entendemos que desististe.",
        "Si el reclamo no nos corresponde, lo trasladamos a quien deba resolverlo en máximo 2 días hábiles y te avisamos.",
      ],
      enlace: escribenos,
    },
    {
      titulo: "Tu autorización",
      texto:
        "Te pedimos la autorización antes de recoger tus datos. En el formulario de agenda la das con una casilla que marcas tú; guardamos la fecha, la hora y la versión de esta política que aceptaste, y conservamos el texto de cada versión, como prueba de la autorización.",
    },
    {
      titulo: "Seguridad",
      texto:
        "Los datos viajan cifrados entre tu navegador y nuestros servidores, y se guardan cifrados. El acceso está restringido a las personas que los necesitan para su trabajo. Si ocurre un incidente de seguridad que afecte tus datos, lo informamos a la Superintendencia de Industria y Comercio y lo atendemos según nuestro procedimiento interno.",
    },
    {
      titulo: "Cuánto tiempo los conservamos",
      lista: [
        "Prospectos que no llegan a una relación comercial: 24 meses desde el último contacto. Después los suprimimos.",
        "Clientes y proveedores: mientras dure la relación y, después, el tiempo que exija la ley para los documentos contables y comerciales.",
        "Empleados: el tiempo que exijan las normas laborales y de seguridad social. Candidatos no seleccionados: 12 meses, salvo que pidas antes que eliminemos tu hoja de vida.",
      ],
    },
    {
      titulo: "Vigencia y cambios",
      texto: `Esta política rige desde el ${FECHA_POLITICA}. Nuestras bases de datos estarán vigentes mientras LATCON desarrolle su objeto social. Si hacemos un cambio sustancial, te lo comunicamos por correo antes de aplicarlo; si cambian las finalidades, te pedimos una nueva autorización. Esta política se rige por su versión en español; las traducciones son informativas.`,
    },
  ],
} as const;

/** /privacidad: aviso de privacidad del sitio y uso de cookies. Remite a la política completa. */
export const PRIVACIDAD = {
  ruta: RUTAS.privacidad,
  metadatos: {
    titulo: "Aviso de privacidad",
    descripcion:
      "Qué datos recoge latconservices.com, para qué los usa, qué cookies usa y cómo cambiar tu elección. La política completa está en tratamiento de datos.",
  },
  hero: {
    antetitulo: `Actualizado el ${FECHA_POLITICA}`,
    titulo: "Aviso de privacidad",
    bajada:
      "Qué datos recoge este sitio, para qué los usa y qué cookies usa. El detalle completo está en la política de tratamiento de datos.",
  },
  bloques: [
    {
      titulo: "Quién trata tus datos",
      texto: RESPONSABLE,
    },
    {
      titulo: "Qué recoge este sitio",
      texto:
        "Cuando agendas una reunión en /agenda recogemos tu nombre, cargo, correo, teléfono, los datos de tu empresa y lo que nos cuentas de tu necesidad. Junto con la reserva guardamos cómo llegaste: la primera página que visitaste, el sitio desde el que llegaste y la campaña del enlace. Ese dato se guarda en tu navegador mientras dura la visita y solo nos llega si envías el formulario. El servidor también registra la dirección IP para proteger el formulario de abusos. Usamos todo esto para coordinar la reunión, hacer su seguimiento, preparar una propuesta y saber qué canales nos traen contactos.",
    },
    {
      titulo: "Cookies y analítica",
      texto:
        "No cargamos Google Analytics hasta que aceptas las cookies de analítica en el aviso de cookies; si las rechazas, no se envía nada a Google. Puedes cambiar tu elección cuando quieras con “Configurar cookies”, al pie de cada página. Los datos de navegación son estadísticos: no los cruzamos con los datos que nos das al agendar. Esto es lo que guarda el sitio en tu navegador:",
      lista: [
        "latcon-cookie-consent (LATCON, almacenamiento local): tu elección sobre las cookies. Dura hasta que la borres.",
        "latcon-origen (LATCON, almacenamiento de sesión): cómo llegaste al sitio. Se borra al cerrar la pestaña.",
        "_ga y _ga_<ID> (Google Analytics, cookies): distinguen visitas para las estadísticas. Duran hasta 2 años y solo existen si aceptas la analítica.",
      ],
    },
    {
      titulo: "Quién más los ve",
      texto:
        "Microsoft Azure guarda las reservas en Brasil y procesa el formulario y los correos en Estados Unidos; Google presta el correo, Google Meet y la analítica; y Meta, WhatsApp, si usamos ese canal. La política explica cada uno.",
    },
    {
      titulo: "Tus derechos",
      texto: `Puedes conocer, actualizar, rectificar y pedir que eliminemos tus datos, y revocar la autorización que nos diste, escribiendo a ${EMPRESA.correo}. La política de tratamiento explica cómo hacerlo y en qué plazos respondemos.`,
      enlace: { etiqueta: "Leer la política de tratamiento de datos →", ruta: RUTAS.tratamientoDatos },
    },
  ],
} as const;

/** Casilla de autorización del formulario de /agenda. */
export const AUTORIZACION_AGENDA = {
  version: VERSION_POLITICA,
  rutaPolitica: RUTAS.tratamientoDatos,
} as const;
