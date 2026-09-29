/**
 * Contenido de /tratamiento-de-datos y /privacidad.
 * Fuente: docs/recomendaciones-sitio.md §1.1, Ley 1581 de 2012 y Decreto 1377 de 2013
 * (compilado en el Decreto 1074 de 2015): contenido mínimo de la política (art. 13) y del aviso de privacidad (art. 15).
 * Borrador redactado en el paso 7a: requiere revisión legal antes del lanzamiento (paso 8).
 * Solo en español hasta la fase de traducción (ADR 0004).
 */
import { EMPRESA } from "./empresa";
import { RUTAS } from "./mapa";

/**
 * Versión vigente de la política de tratamiento. Se guarda con cada autorización del formulario
 * de /agenda como prueba (Decreto 1377, art. 7). Cambiar el texto de la política obliga a cambiar la versión.
 */
export const VERSION_POLITICA = "2026-09-29";
const FECHA_POLITICA = "29 de septiembre de 2026";

const RESPONSABLE = `${EMPRESA.razonSocial} (“LATCON”), ${EMPRESA.nit}, con domicilio en Cajicá, Cundinamarca. Dirección: ${EMPRESA.direccion}. Correo: ${EMPRESA.correo}. Teléfono: ${EMPRESA.telefono}.`;

const escribenos = { etiqueta: `Escribir a ${EMPRESA.correo}`, ruta: `mailto:${EMPRESA.correo}` };

/** /tratamiento-de-datos: política completa. */
export const TRATAMIENTO_DATOS = {
  ruta: RUTAS.tratamientoDatos,
  metadatos: {
    titulo: "Política de tratamiento de datos personales",
    descripcion:
      "Cómo LATIN CONSULTING SERVICES SAS trata tus datos personales, para qué los usa y cómo ejercer tus derechos según la Ley 1581 de 2012.",
  },
  hero: {
    antetitulo: `Vigente desde el ${FECHA_POLITICA}`,
    titulo: "Política de tratamiento de datos personales",
    bajada:
      "Esta política explica qué datos personales recogemos, para qué los usamos, con quién los compartimos y cómo puedes conocerlos, corregirlos o pedir que los eliminemos. Aplica a los datos que recibimos por este sitio, por correo, por teléfono y en nuestras reuniones comerciales.",
  },
  bloques: [
    {
      titulo: "Responsable del tratamiento",
      texto: RESPONSABLE,
    },
    {
      titulo: "Qué datos tratamos",
      texto: "No pedimos datos sensibles ni datos de menores de edad. Tratamos solo estos:",
      lista: [
        "Identificación y contacto: nombre, cargo, correo electrónico y teléfono.",
        "Datos de tu empresa: nombre, sector, ciudad y país.",
        "Lo que nos cuentas de tu operación y de la necesidad que quieres resolver.",
        "El canal o la campaña por la que llegaste al sitio (por ejemplo, una feria o un enlace que te compartieron).",
        "Datos de navegación del sitio, solo si aceptas las cookies de analítica.",
      ],
    },
    {
      titulo: "Para qué los usamos",
      lista: [
        "Coordinar, confirmar y realizar la reunión de diagnóstico que solicitaste.",
        "Contactarte sobre esa reunión y hacer el seguimiento de la conversación: preguntas, propuestas y cotizaciones.",
        "Preparar una propuesta que corresponda a tu operación.",
        "Saber qué canales y campañas nos traen contactos, para decidir dónde invertir.",
        "Cumplir obligaciones legales, contables y tributarias.",
      ],
      resultado:
        "No vendemos tus datos. No te enviamos boletines ni publicidad masiva sin pedirte antes una autorización aparte.",
    },
    {
      titulo: "Cómo los tratamos y quién más los ve",
      texto:
        "Recogemos, guardamos, consultamos y actualizamos tus datos solo para las finalidades anteriores. Tienen acceso las personas de LATCON que atienden tu solicitud y los proveedores que operan nuestra infraestructura como encargados del tratamiento: Microsoft Azure (base de datos y envío de correos) y Google (analítica del sitio, solo con tu consentimiento). Sus servidores pueden estar fuera de Colombia; esa transmisión se hace a proveedores que aplican niveles de protección adecuados y bajo sus propias obligaciones de confidencialidad y seguridad.",
    },
    {
      titulo: "Tus derechos",
      texto: "Como titular de los datos, según el artículo 8 de la Ley 1581 de 2012, puedes:",
      lista: [
        "Conocer, actualizar y rectificar tus datos personales.",
        "Pedir prueba de la autorización que nos diste.",
        "Saber, si lo pides, qué uso les hemos dado.",
        "Revocar la autorización o pedir que suprimamos tus datos, cuando no exista un deber legal o contractual de conservarlos.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio, después de haber hecho tu consulta o reclamo ante nosotros.",
        "Acceder gratis a tus datos personales.",
      ],
    },
    {
      titulo: "Cómo ejercer tus derechos",
      texto: `Atiende tus consultas y reclamos el equipo de LATCON, en ${EMPRESA.correo} o al ${EMPRESA.telefono}. Indica tu nombre, el correo o teléfono con el que te registraste, lo que pides y, si es un reclamo, los hechos que lo sustentan y los documentos que quieras aportar.`,
      lista: [
        "Consultas: respondemos en máximo 10 días hábiles. Si no alcanzamos, te avisamos el motivo y respondemos en los 5 días hábiles siguientes.",
        "Reclamos (corrección, actualización, supresión o revocatoria): respondemos en máximo 15 días hábiles, prorrogables hasta 8 días hábiles más con aviso previo.",
        "Si el reclamo está incompleto, te pedimos lo que falta dentro de los 5 días siguientes. Si pasan 2 meses sin respuesta, entendemos que desististe.",
      ],
      enlace: escribenos,
    },
    {
      titulo: "Tu autorización",
      texto:
        "Te pedimos la autorización antes de recoger tus datos, con una casilla que marcas tú en el formulario de agenda. Guardamos la fecha, la hora y la versión de esta política que aceptaste, como prueba de la autorización.",
    },
    {
      titulo: "Seguridad",
      texto:
        "Los datos viajan cifrados entre tu navegador y nuestros servidores, y el acceso a la base de datos está restringido a las personas que atienden tu solicitud.",
    },
    {
      titulo: "Vigencia",
      texto: `Esta política rige desde el ${FECHA_POLITICA}. Conservamos tus datos mientras sean necesarios para las finalidades descritas o mientras exista un deber legal de conservarlos; después los suprimimos. Nuestras bases de datos estarán vigentes mientras LATCON desarrolle su objeto social. Si cambiamos esta política, publicamos aquí la nueva versión con su fecha y, si el cambio afecta las finalidades, te pedimos una nueva autorización.`,
    },
  ],
} as const;

/** /privacidad: aviso de privacidad del sitio y uso de cookies. Remite a la política completa. */
export const PRIVACIDAD = {
  ruta: RUTAS.privacidad,
  metadatos: {
    titulo: "Aviso de privacidad",
    descripcion: "Qué datos recoge latconservices.com, para qué los usa, cómo funcionan las cookies de analítica y dónde está la política completa.",
  },
  hero: {
    antetitulo: `Actualizado el ${FECHA_POLITICA}`,
    titulo: "Aviso de privacidad",
    bajada:
      "Qué datos recoge este sitio, para qué los usa y cómo funcionan las cookies. El detalle completo está en la política de tratamiento de datos.",
  },
  bloques: [
    {
      titulo: "Quién trata tus datos",
      texto: RESPONSABLE,
    },
    {
      titulo: "Qué recoge este sitio",
      texto:
        "Cuando agendas una reunión en /agenda recogemos tu nombre, cargo, correo, teléfono, los datos de tu empresa y lo que nos cuentas de tu necesidad. Junto con la reserva guardamos el canal o la campaña por la que llegaste. Los usamos para coordinar la reunión, hacer el seguimiento de la conversación y saber qué canales nos traen contactos.",
    },
    {
      titulo: "Cookies y analítica",
      texto:
        "Usamos Google Analytics para saber qué páginas se visitan, cuánto se leen y desde dónde llegan los visitantes. Esas cookies quedan desactivadas hasta que las aceptas en el aviso de cookies, y puedes rechazarlas. Los datos de navegación son estadísticos: no los cruzamos con los datos que nos das al agendar.",
    },
    {
      titulo: "Tus derechos",
      texto:
        "Puedes conocer, actualizar, rectificar y pedir que eliminemos tus datos, y revocar la autorización que nos diste. La política de tratamiento explica cómo hacerlo y en qué plazos respondemos.",
      enlace: { etiqueta: "Leer la política de tratamiento de datos →", ruta: RUTAS.tratamientoDatos },
    },
  ],
} as const;

/** Casilla de autorización del formulario de /agenda. */
export const AUTORIZACION_AGENDA = {
  version: VERSION_POLITICA,
  rutaPolitica: RUTAS.tratamientoDatos,
} as const;
