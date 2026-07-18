import type { BlogPost } from "./types";

export const blogPostsEn: BlogPost[] = [
  {
    slug: "field-data-paper-cost",
    title: "Why your field data still lives on paper — and what that's costing you",
    excerpt:
      "Most operations don't have a data problem in the office. They have one in the field, where the record of what actually happened is still a paper form.",
    metaDescription:
      "Field data still lives on paper in a lot of operations — and by the time it reaches a spreadsheet, the decision it should have informed has already been made. What closing that gap actually looks like.",
    date: "2026-06-30",
    dateLabel: "June 30, 2026",
    topic: "Field productivity",
    body: [
      {
        type: "paragraph",
        text: "Walk into most head offices and you'll find dashboards, forecasts, and someone whose job is to make sense of the numbers. Walk out to where the work actually happens — the plantation, the plant floor, the route — and the record of what happened today is often still a paper form, a WhatsApp message, or someone's memory of how the week went.",
      },
      { type: "heading", text: "The gap between the field and the office" },
      {
        type: "paragraph",
        text: "That gap isn't a technology problem so much as a timing problem. A paper form gets filled out, collected, transcribed, and eventually reaches someone who can act on it — days or weeks after the fact. By then, the decision it should have informed has usually already been made some other way: based on last season's numbers, on a supervisor's estimate, or on whichever number sounded right in the meeting.",
      },
      {
        type: "paragraph",
        text: "None of this is because the people in the field aren't capable of using better tools. It's because nobody has connected the two ends — what happens on the ground, and what the organization needs to decide.",
      },
      {
        type: "paragraph",
        text: "Paper became the default for good reasons: field conditions are harsh on hardware, connectivity is unreliable in a lot of the places this work happens, and turnover means whatever system you use has to be simple enough for someone new to pick up in a day. Those constraints are real. They're also solvable — they're not a reason to give up on a live record, just a reason to design one that survives contact with the actual field.",
      },
      { type: "heading", text: "What that actually costs" },
      {
        type: "list",
        items: [
          "Decisions get made on estimates instead of measurements — because the measurement, if it exists, arrives too late to matter.",
          "The same information gets re-entered two or three times, by different people, with different chances to introduce an error.",
          "There's no reliable way to compare one site, crew, or season against another — every comparison depends on whoever remembers the details.",
          "Program or operational goals get tracked by feel, not by data, which makes it hard to know if you're on pace until the result is already in.",
        ],
      },
      { type: "heading", text: "What closing the gap looks like" },
      {
        type: "paragraph",
        text: "This doesn't always require a sophisticated model. Sometimes what's missing is simply a way to capture what's happening in the field, in the moment, in a form that reaches the right system without a manual step in between. Other times, it's worth going further.",
      },
      {
        type: "paragraph",
        text: "In a cocoa-sector program we worked on, the goal was straightforward: measure productivity across plantations objectively, not by estimate. We built a computer vision application that reads productivity directly from field imagery, plus an end-to-end platform — field data capture, geo-referenced crops, and an analytics layer with AI-generated operational reports. Harvest and post-harvest activity, previously tracked on paper with no way to see progress against program goals, now shows up as a live record. Yield decisions get made on what was measured, not what was guessed.",
      },
      {
        type: "paragraph",
        text: "The pattern holds beyond agriculture: wherever the real operation happens somewhere the head office can't see directly, the first win usually isn't a dashboard — it's a reliable way to capture what actually happened, as it happens.",
      },
      {
        type: "paragraph",
        text: "If your field data still lives on paper, the question worth asking isn't whether to digitize it — it's what decision is being made right now without it, and what that's quietly costing you.",
      },
    ],
  },
  {
    slug: "energy-inefficiency-real-cost",
    title: "The real cost of energy inefficiency in production",
    excerpt:
      "Energy efficiency usually shows up as an audit finding — something you fix once and move on from. Treated as an operating variable instead, it becomes a place where the numbers keep moving.",
    metaDescription:
      "Most operations treat energy efficiency as a one-time audit finding. Treating it as an operating variable — managed continuously, from individual equipment configuration to plant-wide performance — is where the real cost shows up.",
    date: "2026-07-09",
    dateLabel: "July 9, 2026",
    topic: "Energy",
    body: [
      {
        type: "paragraph",
        text: "Energy efficiency tends to enter the conversation the same way: an audit gets commissioned, a report comes back with a list of findings, a few of them get actioned, and the topic goes quiet again until the next audit. That pattern treats efficiency as an event. In practice, it behaves more like an operating variable — something that drifts, site by site and month by month, whether or not anyone is watching it.",
      },
      { type: "heading", text: "An audit finding vs. an operating variable" },
      {
        type: "paragraph",
        text: "An audit tells you where you stood on the day someone measured. It doesn't tell you what happens six months later when a pump is reconfigured for a different demand scenario, or when a motor keeps running at a “safe” setting because nobody had the information to run it at the efficient one. Efficiency treated as a finding gets fixed once. Efficiency treated as a variable gets managed — continuously, and usually more cheaply than the fix implied by the audit.",
      },
      { type: "heading", text: "Where the inefficiency actually hides" },
      {
        type: "list",
        items: [
          "Equipment configured for a demand scenario that no longer matches current operating conditions — nobody revisits the setup once it's running.",
          "Failure reports, capex and opex, and energy-savings targets tracked in separate spreadsheets, so no one has the full picture at once.",
          "Alerts that require an expert to read them, which means response time depends on who's available, not on how urgent the issue actually is.",
          "Savings that get calculated once, at the start of a project, and never checked again against what's actually happening in operation.",
        ],
      },
      { type: "heading", text: "What managing it continuously looks like" },
      {
        type: "paragraph",
        text: "A water injection plant we worked with needed pump configurations that met water demand without wasting energy — a balance that shifts as conditions change, not a setting you pick once. We built the web application that calculates the optimal frequency setup for the scenario in front of it, so the operation runs at the lowest energy cost the demand allows, on an ongoing basis rather than at a single point in time.",
      },
      {
        type: "paragraph",
        text: "Elsewhere, the constraint wasn't the equipment — it was visibility. Monitoring artificial lift systems meant juggling failure reports, capex/opex tracking, and motor-replacement savings targets across disconnected tools. We built an end-to-end business intelligence layer, from the underlying data model to the dashboard, so failures, budget, and savings show up in one place instead of three. And because well-sensor alerts required expert time just to interpret, we built an AI agent that reads the alert, identifies the likely cause, and supports the response — so the time to act doesn't depend on who happens to be on shift.",
      },
      {
        type: "paragraph",
        text: "None of this required replacing the equipment. It required treating efficiency as something to manage every day, with the visibility to know where it's slipping before the next audit finds it.",
      },
    ],
  },
  {
    slug: "early-warning-not-fire-alarm",
    title: "Early warning, not the fire alarm",
    excerpt:
      "Most operations only find out something went wrong once it's already an incident. The difference between an early warning system and a fire alarm is when you find out — and how much room you still have to act.",
    metaDescription:
      "A fire alarm tells you the building is already burning. An early warning system tells you before there's a fire. Most operational monitoring is still built like the first — here's what it takes to build the second.",
    date: "2026-07-18",
    dateLabel: "July 18, 2026",
    topic: "Risk & resilience",
    body: [
      {
        type: "paragraph",
        text: "A fire alarm is a good piece of engineering doing a limited job: it tells you, reliably, that there is already a fire. It doesn't tell you the wiring was overloaded last week, or that a room has been running hotter than it should for months. By the time it goes off, the only options left are react and evacuate.",
      },
      {
        type: "paragraph",
        text: "A lot of operational monitoring is built the same way. A threshold gets crossed, an alert fires, and someone responds to a problem that has already become one. That's not a failure of the alert — it's doing exactly what it was built to do. The gap is that it was built to detect the fire, not the conditions that led to it.",
      },
      { type: "heading", text: "Why most operations default to the fire alarm" },
      {
        type: "paragraph",
        text: "Detecting an incident after it happens is comparatively simple: pick a threshold, wire up a sensor, and alert when it's crossed. Detecting the conditions that precede an incident is harder, because those conditions usually don't live in one signal — they show up as a pattern across several systems that, in most operations, don't talk to each other. Building the fire alarm is a wiring problem. Building early warning is an integration problem, and integration problems get postponed.",
      },
      { type: "heading", text: "What early warning actually requires" },
      {
        type: "list",
        items: [
          "Signals from more than one source, connected — a single sensor rarely tells the whole story on its own.",
          "Thresholds calibrated to how the operation actually behaves, not generic defaults that either miss real problems or cry wolf until everyone ignores them.",
          "Something — a person or a model — fast enough to interpret the signal and act on it, not just log it for a report nobody reads until later.",
        ],
      },
      { type: "heading", text: "Beyond a single sensor" },
      {
        type: "paragraph",
        text: "The same logic extends past equipment failure. Operations exposed to field conditions, weather, or supply disruption face the same structural choice: react once the disruption has already hit, or build enough visibility into the leading signals to see it coming while there's still room to adjust. It's the same problem as the pump that fails or the machine that overheats — just with a wider set of inputs and a longer lead time, which is exactly what makes the early warning worth more.",
      },
      {
        type: "paragraph",
        text: "We've built this pattern for equipment and process signals — models that turn operational data into an early warning instead of an incident report, and the orchestration underneath that lets a new detection rule go from idea to running safely in days, not a manual, risky deployment each time. The same approach — connect the signals, calibrate to reality, make sure something acts on it fast — is what it takes to move any operation from reacting to fires toward seeing them coming.",
      },
      {
        type: "paragraph",
        text: "The honest question isn't whether your operation has monitoring. It's whether that monitoring tells you about a fire, or about the conditions that lead to one.",
      },
    ],
  },
];
