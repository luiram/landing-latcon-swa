import type { LandingContent } from "./types";

export const landingContentEn = {
  hero: {
    chipPrefix: "It breaks first",
    chipWords: [
      { lead: "in", emphasis: "planning" },
      { lead: "in", emphasis: "scheduling" },
      { lead: "in", emphasis: "execution" },
      { lead: "in", emphasis: "adaptation" },
    ],
    title: "Plans are perfect — until the operation starts.",
    subtitle:
      "We build AI, optimization and software that close the gap between what you plan and what actually happens.",
    ctaPrimary: "Book your free diagnostic",
    ctaReassurance: "30 min · no strings attached",
    secondaryCtaLabel: "See our approach →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Who we work with",
    title: "We work with companies where data, systems and teams don't talk to each other",
    intro: "",
    profiles: [
      {
        title: "Data without analysis",
        description:
          "The data exists, but analyzing it in time takes people and hours the operation doesn't have. By the time a problem shows up in a report, it already has a cost.",
        quote: "\"We have the data. We just can't use it.\"",
        sectors: "Services · Retail · Manufacturing · Banking · Media",
      },
      {
        title: "Teams working in silos",
        description:
          "Sales promises without knowing what can be produced. Purchasing restocks without seeing real demand. Every area works from its own version of the truth — and no one measures what that costs.",
        quote: "\"Every area works with different numbers, and no one knows which one is real.\"",
        sectors: "Manufacturing · Retail · Distribution · Agribusiness",
      },
      {
        title: "Distributed or field operations",
        description:
          "Field teams, multiple sites, work coordinated over WhatsApp and email. Without a shared record, it's hard to know what happened, who did it, and when — until it already has consequences.",
        quote: "\"We coordinate everything over WhatsApp, and no one knows who did what.\"",
        sectors: "Logistics · Agribusiness · Field services",
      },
      {
        title: "Technology without integration",
        description:
          "ERP, CRM, platforms and tools — each running on its own. Without integration, the operation runs on manual workarounds and decisions based on incomplete data.",
        quote: "\"We have several systems, but none of them talk to each other.\"",
        sectors: "Any industry with complex operations",
      },
    ],
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Three ways we close the gap.",
    intro:
      "Three integrated capabilities, one goal: keep what's happening as close as possible to what you planned.",
    cards: [
      {
        kind: "plan",
        title: "Plan smarter",
        summary: "Optimization and predictive models that turn your constraints into the best possible plan.",
      },
      {
        kind: "execute",
        title: "Execute without friction",
        summary: "Applications and automation that carry the plan into the field — with full traceability.",
      },
      {
        kind: "adapt",
        title: "See and adapt in time",
        summary: "Visibility, alerts and AI agents that detect deviation before it becomes cost.",
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "What closing the gap looks like.",
    cases: [
      {
        industry: "Agriculture",
        pillar: "execute",
        headline: "From field to decision.",
        situation:
          "Harvest activity was tracked on paper — no way to measure progress against program goals.",
        built:
          "An end-to-end platform: field data capture, geo-referenced crops, AI-generated operational reports.",
        changed: "The program now monitors its objectives with live field data, not paper trails.",
      },
      {
        industry: "Oil & Gas",
        pillar: "plan",
        headline: "Water demand met at minimum energy cost.",
        situation:
          "A water injection plant needed pump configurations that met demand without wasting energy.",
        built: "The web application that calculates the optimal frequency setup for every scenario.",
        changed: "The operation now runs at the lowest energy cost demand allows.",
      },
      {
        industry: "Transportation",
        pillar: "adapt",
        headline: "Seeing demand before the bus arrives.",
        situation: "Station crowding was a guess until the bus showed up — too late to adjust.",
        built: "A computer vision pilot that measures crowd density at stations in real time.",
        changed:
          "Service planning now starts from what's happening at the platform, not fixed schedules alone.",
      },
    ],
  },
  process: {
    eyebrow: "METHOD",
    title: "First we understand. Then we build.",
    intro:
      "Every stage ends in something concrete. We don't move to the next one until the last one is clear.",
    resultLabel: "Outcome",
    steps: [
      {
        title: "Understand the context",
        body: "We talk to you to understand how the operation actually runs today, where the friction is, and which decisions need better support.",
        result: "Clarity on the problem that's actually worth solving.",
      },
      {
        title: "Design the solution",
        body: "We translate the diagnostic into a concrete proposal — so you see the solution before investing in building it.",
        result: "A clear solution, validated and aligned with your reality.",
      },
      {
        title: "Build in stages",
        body: "We develop the solution through partial deliveries and continuous validation, starting with what creates the most value.",
        result: "A working partial solution, validated with real users before final delivery.",
      },
      {
        title: "Implement and adjust",
        body: "We support the rollout and the adjustments needed so the solution gets adopted well and starts producing results from day one.",
        result: "A solution running in a real context, adopted and traceable.",
      },
    ],
    closing: "Once it's working, we prepare it to grow — more integration, more analytics, more automation.",
    strategyNote:
      "Through every stage: the strategy and results-management discipline that keeps the solution aligned with the business — not a separate consulting track.",
  },
  about: {
    panel: {
      eyebrow: "ABOUT US",
      headline: "Operations + data + technology",
      body: "We've built operational platforms, ML models and AI automation in real-world implementations.",
    },
    title: "The team that understands your operation and builds the solution.",
    members: [
      {
        name: "Luis Ramírez",
        role: "Operations · Data · Architecture",
        credential: "Industrial Engineer. 15 years connecting operations and technology across logistics, agribusiness and data intelligence.",
      },
      {
        name: "César Ramírez",
        role: "Strategy · Results",
        credential: "5+ years helping organizations implement operating strategy and results-driven management across distribution, telecom and sales.",
      },
      {
        name: "John Ramírez",
        role: "Development · AI · Cloud",
        credential: "10+ years in applications, ML, computer vision, multi-agent systems and cloud.",
      },
    ],
    paragraphs: [
      "Not a dev agency. Not a strategy firm. We're operations engineering, in-house development and results-driven management — working as one team, from diagnosis through implementation.",
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
    body: "Book a 30-minute diagnostic session. We'll look at how your operation actually flows, where data, time or decisions are getting lost — and give you a concrete recommendation, even if you don't end up working with us.",
    ctaPrimary: "Book your free diagnostic",
    ctaReassurance: "No sales pitch · No strings attached · 30 minutes",
  },
} satisfies LandingContent;
