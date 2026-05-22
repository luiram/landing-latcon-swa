import type { LandingContent } from "./types";

export const landingContentEn = {
  hero: {
    chip: "Operations · Data · Technology — for growing companies",
    title: "How much is it costing your company to decide late or with incomplete information?",
    subtitle:
      "We design systems that integrate your data, automate your processes, and give your team the information they need — at the moment it can still drive action.",
    ctaPrimary: "Book your free diagnostic session",
    ctaReassurance: "30 minutes · No commitment · We will honestly tell you if we are the right team for your case",
    secondaryCtaLabel: "Explore our approach →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Who we work with",
    title: "We work with companies where deciding late or without clear information already has a visible cost",
    intro: "Our clients usually come to us when one of these situations feels familiar:",
    painSignals: [
      "Poor decisions were made because data arrived late or was scattered.",
      "Operations depend on key people and no one else has the full context.",
      "Reports arrive late or sit across multiple spreadsheets without consolidation.",
      "Scaling means hiring more people, not building better systems.",
      "Traceability has been lost: it is hard to know what happened, when, and why.",
    ],
    profiles: [
      {
        title: "Growing company",
        description:
          "Operations are growing or becoming more complex, but systems and processes have not evolved at the same pace. This applies to expanding companies and to areas within large organizations that need greater visibility and operational autonomy.",
        quote: "\"We have the data but we cannot use it.\"",
        sectors: "Services · Retail · Manufacturing · Banking · Media",
      },
      {
        title: "Distributed or field-based operations",
        description:
          "Field teams, multiple sites, or processes that depend on coordination across departments. Execution breaks down in communication.",
        quote: "\"We coordinate everything on WhatsApp and no one knows who did what.\"",
        sectors: "Logistics · Agribusiness · Field services",
      },
      {
        title: "Company that already invested in technology without results",
        description:
          "They bought an ERP, CRM, or platform that was never adopted. They invested in development that stalled halfway. Now they need a team that understands the business before proposing software.",
        quote: "\"We already invested in technology and it did not work as we expected.\"",
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
    title: "Three capabilities so your team stops deciding late or with incomplete information",
    intro:
      "We do not sell technology in isolation. We build integrated capabilities — each one aimed at a concrete business outcome.",
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
        body: "We consolidate your scattered data and build operational dashboards that provide a clear view of what is happening — without waiting for manual reports.",
        includes: [
          "Data architecture and source integration",
          "Real-time operational dashboards",
          "Automatic alerts on critical indicators",
        ],
        result: "Less time waiting for data · Decisions that arrive when they can still drive action",
      },
      {
        line: "coordinate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automation and integration of operational processes.",
        title: "Execution without manual friction",
        body: "We automate the processes that today depend on people or WhatsApp messages — so your team can focus on what truly creates value.",
        includes: [
          "Digitized and validated workflows",
          "Integration across tools (apps, ERP, forms, messaging)",
          "AI agents for classification, support, and coordination",
        ],
        result: "Fewer errors, less rework, and operations that scale without hiring more people.",
      },
      {
        line: "amplify",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Advanced analytics and machine learning applied to management.",
        title: "Decisions backed by intelligence, not intuition",
        body: "We build analytical models and applied AI systems that anticipate problems, optimize resources, and give your team actionable signals.",
        includes: [
          "Predictive and optimization models",
          "Machine learning applied to operations and demand",
          "Computer vision and multi-agent systems",
        ],
        result: "Lower operating costs and the ability to anticipate problems before they occur.",
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
        body: "We translate that need into a concrete proposal — structure, flow, or prototype — so you can visualize the solution before development.",
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
      body: "We have built operational platforms, ML models, and AI automations in real implementations.",
    },
    title: "The team behind Latcon",
    paragraphs: [
      "The Latcon team has direct hands-on experience building the solutions it offers: we have designed operational platforms integrating web applications, dashboards, cloud data repositories, and mobile apps for iOS and Android — and implemented machine learning models and AI multi-agent automations in real operational contexts.",
      "We bring together three complementary profiles: a consultant with more than five years in strategy implementation and results-based management, and two engineers with over a decade in automation, software development, applied analytics, computer vision, and AI systems.",
      "Our approach does not start with software: we first understand how your operations work, where the real friction is, and which decisions need better support. From there, we design and implement the solution.",
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
    body: "Book a 30-minute diagnostic session. We review your operations together, identify the main friction points, and give you a concrete recommendation — even if you do not work with us.",
    ctaPrimary: "Book your free diagnostic session",
    ctaReassurance: "No sales pitch · No commitment · 30 minutes",
  },
} satisfies LandingContent;
