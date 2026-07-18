import type { LocaleCode } from "@/lib/locales";
import type { SolutionsPageContent } from "./types";

const solutionsEs: SolutionsPageContent = {
  metaTitle: "Soluciones — Latcon",
  metaDescription:
    "Planea mejor, ejecuta sin fricción, detecta y adapta a tiempo — las capacidades detrás de cómo Latcon cierra la brecha entre el plan y la operación.",
  eyebrow: "Soluciones",
  title: "Tres momentos donde se abre la brecha — y cómo cerramos cada uno.",
  intro: "Planea mejor, ejecuta sin fricción, detecta y adapta a tiempo. A continuación, qué incluye cada una.",
  labels: { includes: "Qué incluye", result: "Resultado", capabilities: "Capacidades" },
  pillars: [
    {
      kind: "plan",
      title: "Planea mejor",
      lead: "De todas formas tomas decisiones todos los días. La diferencia es si se basan en lo que ya pasó, o en modelos que anticipan lo que viene — antes de que sea urgente.",
      includes: [
        "modelos predictivos para demanda, inventario y cuellos de botella",
        "modelos de optimización (LP/MIP) que convierten restricciones en el mejor plan posible",
        "sistemas que aprenden del comportamiento de tu operación y mejoran sus recomendaciones con el tiempo",
      ],
      result: [
        "Decisiones basadas en lo que viene, no solo en lo que ya pasó",
        "Problemas detectados antes de que tengan un costo visible",
      ],
      capabilities: ["Investigación de operaciones y optimización (LP/MIP)", "Estrategia y ejecución de equipos de alto desempeño"],
    },
    {
      kind: "execute",
      title: "Ejecuta sin fricción",
      lead: "Cada proceso manual es un punto de fallo. Identificamos los que frenan tu operación y los convertimos en flujos automáticos, trazables y confiables.",
      includes: [
        "procesos manuales convertidos en flujos automáticos, validados y trazables",
        "ERP, aplicativos, formularios y mensajería integrados en un solo flujo de información",
        "agentes de IA que ejecutan tareas repetitivas — sin intervención humana",
      ],
      result: ["Una operación que fluye sin cuellos de botella, completamente trazable, capaz de crecer sin agregar complejidad"],
      capabilities: [
        "Aplicaciones de gestión de operaciones",
        "Desarrollo de software — con o sin IA",
        "Aplicaciones de eficiencia energética",
      ],
    },
    {
      kind: "adapt",
      title: "Detecta y adapta a tiempo",
      lead: "Tu operación genera datos en múltiples sistemas. Los conectamos, los organizamos y los convertimos en señales claras para que tu equipo actúe.",
      includes: [
        "tus fuentes de datos conectadas en un solo lugar — sin consolidación manual",
        "tableros operativos actualizados en tiempo real — sin depender de reportes manuales",
        "alertas que llegan antes de que el problema sea visible",
      ],
      result: ["Menos tiempo esperando datos", "Decisiones que llegan mientras todavía pueden cambiar el resultado"],
      capabilities: ["Modelos de IA y machine learning", "Inteligencia de negocio de extremo a extremo"],
    },
  ],
  closing: { title: "¿Listo para ver dónde tu plan y tu operación se alejan más?" },
};

const solutionsEn: SolutionsPageContent = {
  metaTitle: "Solutions — Latcon",
  metaDescription:
    "Plan smarter, execute without friction, see and adapt in time — the capabilities behind how Latcon closes the gap between plan and operation.",
  eyebrow: "Solutions",
  title: "Three moments where the gap opens — and how we close each one.",
  intro: "Plan smarter, execute without friction, see and adapt in time. Below, what each one actually includes.",
  labels: { includes: "What's included", result: "Result", capabilities: "Capabilities" },
  pillars: [
    {
      kind: "plan",
      title: "Plan smarter",
      lead: "You make decisions every day either way. The difference is whether they're based on what already happened, or on models that see what's coming — before it's urgent.",
      includes: [
        "predictive models for demand, inventory and bottlenecks",
        "optimization models (LP/MIP) that turn constraints into the best achievable plan",
        "systems that learn from your operation's behavior and improve their recommendations over time",
      ],
      result: [
        "Decisions based on what's coming, not just what already happened",
        "Problems caught before they have a visible cost",
      ],
      capabilities: ["Operations research & optimization (LP/MIP)", "Strategy & high-performance team execution"],
    },
    {
      kind: "execute",
      title: "Execute without friction",
      lead: "Every manual process is a point of failure. We find the ones slowing your operation down and turn them into automated, traceable, reliable flows.",
      includes: [
        "manual processes converted into automated, validated and traceable flows",
        "ERP, apps, forms and messaging integrated into a single flow of information",
        "AI agents that execute repetitive tasks — without human intervention",
      ],
      result: ["An operation that flows without bottlenecks, fully traceable, able to grow without adding complexity"],
      capabilities: [
        "Operations management applications",
        "Application development — with or without AI",
        "Energy efficiency applications",
      ],
    },
    {
      kind: "adapt",
      title: "See and adapt in time",
      lead: "Your operation generates data across multiple systems. We connect it, organize it, and turn it into clear signals your team can act on.",
      includes: [
        "your data sources connected in one place — no manual consolidation",
        "operational dashboards updated in real time — no dependence on manual reports",
        "alerts that arrive before the problem becomes visible",
      ],
      result: ["Less time waiting on data", "Decisions that arrive while they can still change the outcome"],
      capabilities: ["AI & ML models", "End-to-end business intelligence"],
    },
  ],
  closing: { title: "Ready to see where your plan and your operation are furthest apart?" },
};

const solutionsPt: SolutionsPageContent = {
  metaTitle: "Soluções — Latcon",
  metaDescription:
    "Planeje melhor, execute sem atrito, detecte e adapte a tempo — as capacidades por trás de como a Latcon fecha a lacuna entre o plano e a operação.",
  eyebrow: "Soluções",
  title: "Três momentos onde a lacuna se abre — e como fechamos cada um.",
  intro: "Planeje melhor, execute sem atrito, detecte e adapte a tempo. A seguir, o que cada uma realmente inclui.",
  labels: { includes: "O que inclui", result: "Resultado", capabilities: "Capacidades" },
  pillars: [
    {
      kind: "plan",
      title: "Planeje melhor",
      lead: "De qualquer forma, você toma decisões todos os dias. A diferença é se elas se baseiam no que já aconteceu, ou em modelos que veem o que vem — antes que seja urgente.",
      includes: [
        "modelos preditivos para demanda, inventário e gargalos",
        "modelos de otimização (LP/MIP) que transformam restrições no melhor plano possível",
        "sistemas que aprendem com o comportamento da sua operação e melhoram suas recomendações ao longo do tempo",
      ],
      result: [
        "Decisões baseadas no que vem, não só no que já aconteceu",
        "Problemas detectados antes de terem um custo visível",
      ],
      capabilities: ["Pesquisa operacional e otimização (LP/MIP)", "Estratégia e execução de equipes de alta performance"],
    },
    {
      kind: "execute",
      title: "Execute sem atrito",
      lead: "Cada processo manual é um ponto de falha. Identificamos os que travam sua operação e os transformamos em fluxos automatizados, rastreáveis e confiáveis.",
      includes: [
        "processos manuais convertidos em fluxos automatizados, validados e rastreáveis",
        "ERP, aplicativos, formulários e mensageria integrados em um único fluxo de informação",
        "agentes de IA que executam tarefas repetitivas — sem intervenção humana",
      ],
      result: ["Uma operação que flui sem gargalos, totalmente rastreável, capaz de crescer sem adicionar complexidade"],
      capabilities: [
        "Aplicações de gestão de operações",
        "Desenvolvimento de software — com ou sem IA",
        "Aplicações de eficiência energética",
      ],
    },
    {
      kind: "adapt",
      title: "Detecte e adapte a tempo",
      lead: "Sua operação gera dados em múltiplos sistemas. Nós os conectamos, organizamos e transformamos em sinais claros para sua equipe agir.",
      includes: [
        "suas fontes de dados conectadas em um só lugar — sem consolidação manual",
        "painéis operacionais atualizados em tempo real — sem depender de relatórios manuais",
        "alertas que chegam antes que o problema se torne visível",
      ],
      result: ["Menos tempo esperando dados", "Decisões que chegam enquanto ainda podem mudar o resultado"],
      capabilities: ["Modelos de IA e machine learning", "Business intelligence de ponta a ponta"],
    },
  ],
  closing: { title: "Pronto para ver onde seu plano e sua operação mais se distanciam?" },
};

const solutionsFr: SolutionsPageContent = {
  metaTitle: "Solutions — Latcon",
  metaDescription:
    "Planifiez mieux, exécutez sans friction, détectez et adaptez à temps — les capacités derrière la façon dont Latcon comble l'écart entre le plan et l'opération.",
  eyebrow: "Solutions",
  title: "Trois moments où l'écart se creuse — et comment nous comblons chacun.",
  intro: "Planifiez mieux, exécutez sans friction, détectez et adaptez à temps. Voici ce que chacune inclut réellement.",
  labels: { includes: "Ce qui est inclus", result: "Résultat", capabilities: "Capacités" },
  pillars: [
    {
      kind: "plan",
      title: "Planifiez mieux",
      lead: "De toute façon, vous prenez des décisions tous les jours. La différence, c'est si elles se basent sur ce qui s'est déjà passé, ou sur des modèles qui anticipent ce qui arrive — avant que ce soit urgent.",
      includes: [
        "modèles prédictifs pour la demande, les stocks et les goulots d'étranglement",
        "modèles d'optimisation (LP/MIP) qui transforment les contraintes en le meilleur plan possible",
        "systèmes qui apprennent du comportement de votre opération et améliorent leurs recommandations avec le temps",
      ],
      result: [
        "Des décisions basées sur ce qui arrive, pas seulement sur ce qui s'est déjà passé",
        "Des problèmes détectés avant qu'ils n'aient un coût visible",
      ],
      capabilities: ["Recherche opérationnelle et optimisation (LP/MIP)", "Stratégie et exécution d'équipes à haute performance"],
    },
    {
      kind: "execute",
      title: "Exécutez sans friction",
      lead: "Chaque processus manuel est un point de défaillance. Nous identifions ceux qui ralentissent votre opération et les transformons en flux automatisés, traçables et fiables.",
      includes: [
        "processus manuels convertis en flux automatisés, validés et traçables",
        "ERP, applications, formulaires et messagerie intégrés dans un seul flux d'information",
        "agents IA qui exécutent des tâches répétitives — sans intervention humaine",
      ],
      result: ["Une opération qui fonctionne sans goulots d'étranglement, entièrement traçable, capable de croître sans ajouter de complexité"],
      capabilities: [
        "Applications de gestion des opérations",
        "Développement logiciel — avec ou sans IA",
        "Applications d'efficacité énergétique",
      ],
    },
    {
      kind: "adapt",
      title: "Détectez et adaptez à temps",
      lead: "Votre opération génère des données dans plusieurs systèmes. Nous les connectons, les organisons et les transformons en signaux clairs sur lesquels votre équipe peut agir.",
      includes: [
        "vos sources de données connectées en un seul endroit — sans consolidation manuelle",
        "tableaux de bord opérationnels mis à jour en temps réel — sans dépendre de rapports manuels",
        "alertes qui arrivent avant que le problème ne devienne visible",
      ],
      result: ["Moins de temps à attendre les données", "Des décisions qui arrivent quand elles peuvent encore changer le résultat"],
      capabilities: ["Modèles d'IA et de machine learning", "Business intelligence de bout en bout"],
    },
  ],
  closing: { title: "Prêt à voir où votre plan et votre opération s'éloignent le plus ?" },
};

const byLocale: Record<LocaleCode, SolutionsPageContent> = {
  es: solutionsEs,
  en: solutionsEn,
  pt: solutionsPt,
  fr: solutionsFr,
};

export function getSolutionsPageContent(locale: LocaleCode): SolutionsPageContent {
  return byLocale[locale] ?? solutionsEs;
}
