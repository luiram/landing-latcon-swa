import type { LandingContent } from "./types";

export const landingContentEn = {
  hero: {
    chip: "Data · Automation · AI · Anticipation",
    title: "Does your company already have the data but still can't use it to decide in time?",
    subtitle:
      "We integrate your data, automate your processes and build AI systems that give your team clear signals to act — before the problem becomes visible.",
    ctaPrimary: "Book your free diagnostic session",
    ctaReassurance: "30 minutes · No commitment · We'll honestly tell you if we're the right team for your case",
    secondaryCtaLabel: "See our approach →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Who we work with",
    title: "We work with companies where data, systems and teams are not connected",
    intro: "",
    profiles: [
      {
        title: "Data without analysis",
        description:
          "The data is there, but analyzing it in real time requires time and staff the operation does not have available. Opportunities pass and problems are detected late — when they already have a visible cost.",
        quote: "\"We have the data but we cannot use it.\"",
        sectors: "Services · Retail · Manufacturing · Banking · Media",
      },
      {
        title: "Areas operating in silos",
        description:
          "Sales promises without knowing what can be produced. Purchasing restocks without seeing real demand. Production plans without knowing what is coming. Each area works with its own version of the data — and the misalignment has a cost that no one measures.",
        quote: "\"Each area works with different numbers and no one knows which one is real.\"",
        sectors: "Manufacturing · Retail · Distribution · Agribusiness",
      },
      {
        title: "Distributed or field-based operations",
        description:
          "Field teams, multiple sites or cross-area processes coordinated over WhatsApp and email. Without centralized traceability, it is hard to know what happened, who did it and when — until the error already has consequences.",
        quote: "\"We coordinate everything on WhatsApp and no one knows who did what.\"",
        sectors: "Logistics · Agribusiness · Field services",
      },
      {
        title: "Technology without integration",
        description:
          "They have ERP, CRM, platforms and applications — each running separately. Without integration between systems, operations generate manual adjustments, rework and decisions based on incomplete data. They need a team that connects what they already have before proposing something new.",
        quote: "\"We have multiple systems but none of them talk to each other.\"",
        sectors: "Any industry with complex operations",
      },
    ],
  },
  problems: {
    title: "Without a connected system, management loses visibility, coordination, and control",
    intro:
      "The problem rarely shows up in one place alone. It starts with scattered information, shows up in day-to-day execution, and ends up limiting your ability to coordinate, decide, and scale with control.",
    signalsHeading: "Common signals",
    groups: [
      {
        title: "01. Visibility",
        narrative: "Late insight into what is happening, fragmented data, and limited traceability for leadership and teams.",
        signals: [
          { title: "Scattered data", body: "Disconnected sources with no shared view for decision-making." },
          { title: "Late reporting", body: "Indicators arrive when they no longer support timely action." },
          { title: "Low traceability", body: "Hard to audit what happened, when, and why." },
        ],
      },
      {
        title: "02. Execution and coordination",
        narrative: "Fragile follow-ups, reliance on individuals, and coordination that does not scale with complexity.",
        signals: [
          { title: "Manual processes", body: "Repetitive tasks that concentrate risk and consume time." },
          { title: "Reliance on people", body: "Knowledge lives in heads and chats, not in shared systems." },
          { title: "Rework and fragile coordination", body: "Misalignment across teams with a hidden cost of getting everyone aligned." },
        ],
      },
      {
        title: "03. Scalability and control",
        narrative: "As volume or complexity grows, bottlenecks appear and control over management weakens.",
        signals: [
          { title: "Scaling difficulty", body: "More demand without a structure that absorbs growth." },
          { title: "Bottlenecks", body: "Single points of failure that slow deliveries and response." },
          { title: "Weaker management control", body: "Less visibility into risks and performance as the organization grows." },
        ],
      },
    ],
  },
  solutions: {
    eyebrow: "SOLUTIONS",
    title: "This is how we connect what is disconnected in your operation today.",
    intro:
      "Three integrated capabilities. One goal: your team acts on real information, on time.",
    srOnlyCarousel: "Three capabilities in a horizontal carousel with dot navigation.",
    prevCapabilityAria: "Previous capability",
    nextCapabilityAria: "Next capability",
    capabilitiesNavAria: "Navigate between capabilities",
    capabilityNavAria: (title: string, index: number, total: number) =>
      `${title} (${index} of ${total})`,
    includesLabel: "What's included",
    resultLabel: "Outcome",
    capabilities: [
      {
        line: "integrate",
        image: "/solutions/arquitectura_sistemas.webp",
        imageAlt: "Operational visibility: dashboards and data integration.",
        title: "Visibility that arrives on time",
        body: "Your operation generates data across multiple systems. We connect it, organize it and turn it into clear signals so your team can act.",
        includes: [
          "Your data sources connected in one place — no manual consolidation",
          "Operational dashboards updated in real time — without depending on manual reports",
          "Alerts that arrive before the problem becomes visible",
        ],
        result: "Less time waiting for data · Decisions that arrive when they can still drive action",
      },
      {
        line: "coordinate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automation and integration of operational processes.",
        title: "Execution without manual friction",
        body: "Every manual process is a failure point. We identify which ones slow your operation and turn them into automated, traceable and reliable flows.",
        includes: [
          "Manual processes converted into automated, validated and traceable flows",
          "ERP, apps, forms and messaging integrated into a single information flow",
          "AI agents that execute repetitive tasks — without human intervention",
        ],
        result: "Operations that flow without bottlenecks, with full traceability and the ability to grow without adding complexity.",
      },
      {
        line: "amplify",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Advanced analytics and machine learning applied to management.",
        title: "Decisions backed by intelligence, not intuition",
        body: "Your team already makes decisions every day. The difference is whether they make them with past data or with models that see what is coming — before it becomes urgent.",
        includes: [
          "Predictive models for demand, inventory and bottlenecks",
          "Machine learning applied to operations and demand",
          "Computer vision and multi-agent systems",
        ],
        result: "Decisions based on what is coming, not what already happened · Problems detected before they have a visible cost.",
      },
    ],
  },
  verticals: {
    title: "Industries and contexts where we work",
    intro:
      "Our solutions adapt to different operational contexts. These are the ones we know most deeply:",
    useCasesLabel: "Use cases",
    componentsLabel: "Components",
    midCtaLabel: "Your industry is not listed? Tell us about your case →",
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
        body: "We guide the shift from scattered tools, loose files, and disconnected processes toward a more structured, connected, and scalable platform — able to centralize management and increase visibility into operations and decisions.",
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
        body: "We design solutions to coordinate sales, maintenance, installations, and deliveries in distributed operations — optimizing routes, assignments, and tracking with mathematical models and AI agents that support execution where it matters most.",
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
    eyebrow: "METHOD",
    title: "How we work: first we understand, then we build.",
    intro:
      "Each stage has a concrete deliverable. We don't move to the next until the previous one creates clarity.",
    resultLabel: "Outcome",
    steps: [
      {
        title: "We understand the context",
        body: "We talk with you to learn how operations work today, where friction lives, and which decisions need stronger support.",
        result: "Clarity on the problem actually worth solving.",
      },
      {
        title: "We design the solution",
        body: "We turn the diagnosis into a concrete proposal — so you can see the solution before investing in building it.",
        result: "A clear solution, validated and aligned with your reality.",
      },
      {
        title: "We build in stages",
        body: "We develop with incremental deliveries and continuous validation, focusing first on what delivers the most value.",
        result: "A working partial solution, validated with real users before final delivery.",
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
      body: "We have built operational platforms, ML models, and AI automations in real implementations.",
    },
    title: "The team that understands your operation and builds the solution.",
    members: [
      {
        name: "Luis Ramírez",
        role: "Operations · Data · Architecture",
        credential: "Industrial Engineer. 15 years connecting operations and technology in logistics, agribusiness and data intelligence.",
      },
      {
        name: "César Ramírez",
        role: "Strategy · Results",
        credential: "5+ years guiding organizations in the implementation of operational strategies and results-based management in distribution, telecommunications and sales.",
      },
      {
        name: "John Ramírez",
        role: "Development · AI · Cloud",
        credential: "10+ years in apps, ML, computer vision, multi-agent systems and cloud.",
      },
    ],
    paragraphs: [
      "We are not a development agency or a strategy consultancy. We are operations engineering, in-house development and results-based management — working as one team from diagnosis to implementation.",
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
  },
  finalCta: {
    title: "Every week without visibility has a cost. Let's find out together if we can help you reduce it.",
    body: "Book a 30-minute diagnostic session. We review together how your operation flows, identify where data, time or decisions are being lost — and give you a concrete recommendation, even if you don't work with us.",
    ctaPrimary: "Book your free diagnostic session",
    ctaReassurance: "No sales pitch · No commitment · 30 minutes",
  },
} satisfies LandingContent;
