import type { LandingContent } from "./types";

export const landingContentEn = {
  hero: {
    chip: "Architecture · Integration · Applied AI",
    title: "Connect information, processes, and decisions to scale with visibility and control",
    subtitle:
      "We design systems that integrate information, automation, and applied artificial intelligence to improve visibility, coordination, and decision-making.",
    ctaPrimary: "Schedule a conversation",
  },
  problems: {
    title: "Without a connected system, management loses visibility, coordination, and control",
    intro:
      "The issue rarely shows up in one place alone. It starts with scattered information, shows up in day-to-day execution, and ends up limiting your ability to coordinate, decide, and scale with control.",
    signalsHeading: "Common signals",
    groups: [
      {
        title: "01. Visibility",
        narrative: "Late insight into what is happening, fragmented data, and limited traceability for leadership and teams.",
        signals: [
          { title: "Scattered data", body: "Disconnected sources and weak consolidation, making it hard to decide from a shared view." },
          { title: "Late reporting", body: "Indicators arrive when they no longer support management or timely response." },
          { title: "Low traceability", body: "Hard to audit what happened, when, and why—in operations and across the chain of decisions." },
        ],
      },
      {
        title: "02. Execution and coordination",
        narrative: "Fragile follow-ups, reliance on individuals, and coordination that does not scale with complexity.",
        signals: [
          { title: "Manual processes", body: "Repetitive tasks that concentrate risk and free little time for priorities." },
          { title: "Reliance on people", body: "Knowledge and judgment live in heads and chats, not governed in a shared system." },
          { title: "Rework and fragile coordination", body: "Misalignment across teams, back-and-forth, and a hidden cost of getting everyone aligned." },
        ],
      },
      {
        title: "03. Scalability and control",
        narrative: "As volume or complexity grows, bottlenecks appear and control over management weakens.",
        signals: [
          { title: "Scaling difficulty", body: "More demand or more teams without a structure that absorbs growth with clarity." },
          { title: "Bottlenecks", body: "Single points of failure that slow deliveries, response, and the ability to prioritize." },
          { title: "Weaker management control", body: "Less visibility into risks, timelines, and performance as the organization grows." },
        ],
      },
    ],
  },
  solutions: {
    title: "Solutions to connect information, execution, and decisions",
    intro:
      "We combine architecture, automation, and applied intelligence to build capabilities that improve management from operations to leadership.",
    srOnlyCarousel:
      "Six capabilities in a horizontal carousel. Blue, green, and amber tones visually group each solution line.",
    prevCapabilityAria: "Previous capability",
    nextCapabilityAria: "Next capability",
    capabilitiesNavAria: "Navigate between capabilities",
    capabilityNavAria: (title: string, index: number, total: number) =>
      `${title} (${index} of ${total})`,
    capabilities: [
      {
        line: "integrate",
        image: "/solutions/arquitectura_sistemas.webp",
        imageAlt: "Systems architecture: connected structure of information and processes.",
        title: "Systems architecture",
        body: "Functional and technical structure to organize information, processes, and dependencies.",
      },
      {
        line: "integrate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automation and integration: connected flows across tools and systems.",
        title: "Automation and integration",
        body: "Connections and flows across tools to consolidate information and reduce manual friction.",
      },
      {
        line: "coordinate",
        image: "/solutions/plataforma_saas_sistema.webp",
        imageAlt: "SaaS platforms and custom systems: monitoring and coordination of processes.",
        title: "SaaS platforms and custom systems",
        body: "Web solutions to monitor, coordinate, and sustain critical processes with traceability.",
      },
      {
        line: "coordinate",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Advanced analytics and machine learning: models and signals for management.",
        title: "Advanced analytics and machine learning",
        body: "Models and analytics to prioritize, anticipate, and support management with actionable signals.",
      },
      {
        line: "amplify",
        image: "/solutions/deteccion_analisis_imagenes.webp",
        imageAlt: "Image detection and analysis: computer vision and auditable data.",
        title: "Image detection and analysis",
        body: "Counting, classification, and visual validation to turn images into useful, auditable data.",
      },
      {
        line: "amplify",
        image: "/solutions/sistemas_multiagente.webp",
        imageAlt: "Multi-agent AI systems: agents collaborating on monitoring and coordination.",
        title: "Multi-agent AI systems",
        body: "Agents that collaborate on monitoring, support, and repetitive coordination—without replacing human judgment.",
      },
    ],
  },
  verticals: {
    title: "Activities and contexts where this approach creates the most impact",
    intro:
      "It fits especially well where coordination, traceability, and responsiveness depend on integrating information, processes, and decisions more effectively.",
    useCasesLabel: "Use cases",
    componentsLabel: "Components",
    blocks: [
      {
        title: "Environments with heavy manual information load",
        body: "We reduce reliance on manual records, scattered formats, and repetitive tasks through digital forms, structured capture flows, automatic validations, and dashboards that organize information and speed execution.",
        image: "/verticals/entornos_alta_carga_manual_informacion.webp",
        imageAlt:
          "High manual information load environments: digital forms, structured capture, validations, and operational dashboards.",
        useCases: [
          "Digitizing manual forms and records",
          "Validation and consolidation of scattered information",
          "Tracking incidents, findings, or repetitive activities",
          "Classification, prioritization, and support with AI agents",
        ],
        components: [
          "Digital forms and structured capture",
          "Rules and automatic validations",
          "Data consolidation and traceability",
          "Monitoring and control dashboards",
          "Cloud integration",
          "AI agents for classification and assistance",
        ],
      },
      {
        title: "Transition from loose tools to a platform",
        body: "We guide the shift from scattered tools, loose files, and disconnected processes toward a more structured, connected, and scalable platform—able to centralize management and increase visibility into operations and decisions.",
        image: "/verticals/transicion_herramientas_a_plataforma.webp",
        imageAlt:
          "Abstract illustration: moving from scattered tools to an integrated, scalable platform.",
        useCases: [
          "Consolidating information captured from mobile, forms, and messaging",
          "Centralizing indicators, records, and tracking in one platform",
          "Digitizing flows that today span multiple tools",
          "Decision support with models and AI agents",
        ],
        components: [
          "Mobile apps and digital forms",
          "Integration with messaging and capture channels",
          "Cloud services and data consolidation",
          "Web platforms with dashboards and information logging",
          "Mathematical models and applied analytics",
          "AI agents embedded in operational flows",
        ],
      },
      {
        title: "Field operations and distributed services",
        body: "We design solutions to coordinate sales, maintenance, installations, and deliveries in distributed operations—optimizing routes, assignments, and tracking with mathematical models and AI agents that support execution where it matters most.",
        image: "/verticals/operaciones_campo_servicios_distribuidos.webp",
        imageAlt:
          "Distributed operations: coordination of sales, maintenance, installations, and deliveries with optimization and AI support.",
        useCases: [
          "Coordination of commercial visits and field sales",
          "Tracking installations and maintenance",
          "Coordination of deliveries and distributed services",
          "Intelligent resource assignment and agent support",
        ],
        components: [
          "Mobile apps for field teams",
          "Operational maps and geolocation",
          "Work orders and real-time tracking",
          "Coordination and control dashboards",
          "Mathematical models for assignment and routing",
          "AI agents for operational support",
        ],
      },
      {
        title: "Agribusiness and field management",
        body: "We integrate field capture, georeferencing, and visual analysis to turn images and territorial data into traceability, visibility, and more precise decisions on the ground.",
        image: "/verticals/agroindustria_gestion_campo.webp",
        imageAlt:
          "Agribusiness and field management: field capture, georeferencing, and visual analysis over the territory.",
        useCases: [
          "Measuring productivity by plot or production unit",
          "Early detection of diseases and anomalies in crops",
          "Georeferenced monitoring of environmental variables",
          "Tracking and validation of field activities",
        ],
        components: [
          "Georeferenced mobile capture",
          "Operational maps and territorial layers",
          "Computer vision on images",
          "Productivity monitoring dashboards",
          "Cloud integration",
          "Analysis models and AI agents",
        ],
      },
    ],
  },
  process: {
    title: "How we take a real need to a solution that works",
    intro:
      "We do not start from technology. We start by understanding the context, designing the solution well, and building only what truly adds value.",
    resultLabel: "Outcome",
    steps: [
      {
        title: "We understand the context",
        body: "We talk with you to learn how operations work today, where friction lives, and which decisions need stronger support.",
        result: "Clarity on the problem actually worth solving.",
      },
      {
        title: "We design the solution",
        body: "We translate that need into a concrete proposal—structure, flow, or prototype—so you can visualize the solution before development.",
        result: "A clear solution, validated and aligned with your reality.",
      },
      {
        title: "We build in stages",
        body: "We develop with incremental deliveries and continuous validation, focusing first on what delivers the most value.",
        result: "Visible progress, fast learning, and better use of investment.",
      },
      {
        title: "We implement and refine",
        body: "We support rollout and the adjustments needed so the solution is adopted effectively and delivers results from day one.",
        result: "A solution running in a real context, with adoption and traceability.",
      },
    ],
    closing:
      "And once the solution works, we prepare it to grow with more integration, analytics, and automation.",
  },
  about: {
    panel: {
      eyebrow: "ABOUT US",
      headline: "Operations + data + technology",
      body: "An interdisciplinary team designing solutions for real contexts.",
    },
    title: "A team that connects operations, data, and technology",
    paragraphs: [
      "We are professionals who blend operations, data, and technology to design solutions for real contexts. We integrate information capture, automation, analytics, and applied intelligence to turn manual processes into systems that are more visible, measurable, and scalable.",
      "Our approach does not start with software alone: we first understand operations, friction, and the decisions that need better support. From there, we design solutions with more control, traceability, and room to grow.",
      "We work with automation, advanced analytics, machine learning, computer vision, and multi-agent systems to build useful, adoptable solutions focused on real value.",
    ],
    tags: [
      "Operations",
      "Data",
      "Automation",
      "Analytics",
      "AI",
      "SaaS",
      "Vision",
      "Multi-agent",
    ],
    ctaAgenda: "Schedule a conversation",
  },
} satisfies LandingContent;
