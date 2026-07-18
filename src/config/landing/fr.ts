import type { LandingContent } from "./types";

export const landingContentFr = {
  hero: {
    chipPrefix: "Le premier écart apparaît",
    chipWords: [
      { lead: "en", emphasis: "planification" },
      { lead: "en", emphasis: "programmation" },
      { lead: "en", emphasis: "exécution" },
      { lead: "en", emphasis: "adaptation" },
    ],
    title: "Le plan est parfait — jusqu'à ce que l'opération commence.",
    subtitle:
      "Nous construisons de l'IA, de l'optimisation et des logiciels qui comblent l'écart entre ce que vous planifiez et ce qui se passe réellement.",
    ctaPrimary: "Réservez votre diagnostic gratuit",
    ctaReassurance: "30 minutes · sans engagement",
    secondaryCtaLabel: "Découvrez notre approche →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Pour qui",
    title: "Nous travaillons avec des entreprises où les données, les systèmes et les équipes ne se parlent pas entre eux",
    intro: "",
    profiles: [
      {
        title: "Données sans analyse",
        description:
          "Les données sont là, mais les analyser à temps demande du personnel et des heures que l'opération n'a pas. Quand le problème apparaît dans un rapport, il a déjà un coût.",
        quote: "« Nous avons les données mais nous ne pouvons pas les utiliser. »",
        sectors: "Services · Distribution · Industrie · Banque · Médias",
      },
      {
        title: "Équipes qui travaillent en silos",
        description:
          "Le commercial promet sans savoir ce qui peut être produit. Les achats réapprovisionnent sans voir la demande réelle. Chaque service travaille avec sa propre version des données — et personne ne mesure ce que ça coûte.",
        quote: "« Chaque service travaille avec des chiffres différents et personne ne sait lequel est le bon. »",
        sectors: "Industrie · Distribution · Commerce · Agro-industrie",
      },
      {
        title: "Opération distribuée ou terrain",
        description:
          "Équipes sur le terrain, plusieurs sites, coordination par WhatsApp et e-mail. Sans registre partagé, difficile de savoir ce qui s'est passé, qui l'a fait et quand — jusqu'à ce que ça ait déjà des conséquences.",
        quote: "« Nous coordonnons tout sur WhatsApp et personne ne sait qui a fait quoi. »",
        sectors: "Logistique · Agro-industrie · Services de terrain",
      },
      {
        title: "Technologie sans intégration",
        description:
          "ERP, CRM, plateformes et applications — chacun fonctionne séparément. Sans intégration, l'opération dépend d'ajustements manuels et de décisions basées sur des données incomplètes.",
        quote: "« Nous avons plusieurs systèmes mais aucun ne parle à l'autre. »",
        sectors: "Toute industrie à opération complexe",
      },
    ],
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Trois façons de combler l'écart.",
    intro:
      "Trois capacités intégrées, un seul objectif : que ce qui se passe reste aussi proche que possible de ce que vous avez planifié.",
    cards: [
      {
        kind: "plan",
        title: "Planifiez mieux",
        summary:
          "Des modèles d'optimisation et de prédiction qui transforment vos contraintes en le meilleur plan possible.",
      },
      {
        kind: "execute",
        title: "Exécutez sans friction",
        summary: "Des applications et de l'automatisation qui portent le plan sur le terrain — avec une traçabilité complète.",
      },
      {
        kind: "adapt",
        title: "Détectez et adaptez à temps",
        summary:
          "De la visibilité, des alertes et des agents IA qui détectent les écarts avant qu'ils ne deviennent un coût.",
      },
    ],
  },
  experience: {
    eyebrow: "Expérience",
    title: "Combler l'écart, en pratique.",
    cases: [
      {
        industry: "Agriculture",
        pillar: "execute",
        headline: "Du terrain à la décision.",
        situation:
          "L'activité de récolte était suivie sur papier — aucun moyen de mesurer l'avancement par rapport aux objectifs du programme.",
        built:
          "Une plateforme de bout en bout : capture de données sur le terrain, cultures géoréférencées et rapports opérationnels générés par IA.",
        changed:
          "Le programme suit désormais ses objectifs avec des données de terrain en direct, pas avec des papiers.",
      },
      {
        industry: "Oil & Gas",
        pillar: "plan",
        headline: "La demande en eau satisfaite au coût énergétique minimum.",
        situation:
          "Une usine d'injection d'eau avait besoin de configurations de pompage qui répondaient à la demande sans gaspiller d'énergie.",
        built: "L'application web qui calcule la configuration de fréquence optimale pour chaque scénario.",
        changed: "L'opération fonctionne désormais au coût énergétique le plus bas que la demande permet.",
      },
      {
        industry: "Transport",
        pillar: "adapt",
        headline: "Voir la demande avant l'arrivée du bus.",
        situation: "L'affluence en station était une supposition jusqu'à l'arrivée du bus — trop tard pour ajuster.",
        built: "Un pilote de vision par ordinateur qui mesure la densité de personnes en station en temps réel.",
        changed:
          "La planification du service part désormais de ce qui se passe sur le quai, pas seulement des horaires fixes.",
      },
    ],
  },
  process: {
    eyebrow: "MÉTHODE",
    title: "D'abord comprendre. Ensuite construire.",
    intro:
      "Chaque étape a un livrable concret. Nous ne passons à la suivante qu'une fois que la précédente crée de la clarté.",
    resultLabel: "Résultat",
    steps: [
      {
        title: "Nous comprenons le contexte",
        body: "Nous échangeons avec vous pour comprendre comment fonctionne l'opération aujourd'hui, où sont les frictions et quelles décisions ont besoin d'un meilleur soutien.",
        result: "Clarté sur le problème qui vaut vraiment la peine d'être résolu.",
      },
      {
        title: "Nous concevons la solution",
        body: "Nous traduisons le diagnostic en une proposition concrète — pour que vous puissiez voir la solution avant d'investir dans son développement.",
        result: "Une solution claire, validée et alignée avec votre réalité.",
      },
      {
        title: "Nous construisons par étapes",
        body: "Nous développons avec des livraisons partielles et des validations continues, en priorisant d'abord ce qui apporte le plus de valeur.",
        result: "Une solution partielle fonctionnelle, validée avec de vrais utilisateurs avant la livraison finale.",
      },
      {
        title: "Nous déployons et ajustons",
        body: "Nous accompagnons la mise en œuvre et les ajustements nécessaires pour que la solution soit bien adoptée et produise des résultats dès le départ.",
        result: "Une solution en contexte réel, avec adoption et traçabilité.",
      },
    ],
    closing:
      "Et une fois qu'elle fonctionne, nous la préparons à croître — plus d'intégration, plus d'analytique, plus d'automatisation.",
    strategyNote:
      "À chaque étape : la discipline de stratégie et de gestion par les résultats qui garde la solution alignée avec l'entreprise — pas comme un service de conseil séparé.",
  },
  about: {
    panel: {
      eyebrow: "À PROPOS",
      headline: "Opération + données + technologie",
      body: "Nous avons construit des plateformes opérationnelles, des modèles ML et des automatisations avec l'IA dans des implémentations réelles.",
    },
    title: "L'équipe qui comprend votre opération et construit la solution.",
    members: [
      {
        name: "Luis Ramírez",
        role: "Opérations · Données · Architecture",
        credential: "Ingénieur industriel. 15 ans à connecter l'opération et la technologie en logistique, agro-industrie et intelligence des données.",
      },
      {
        name: "César Ramírez",
        role: "Stratégie · Résultats",
        credential: "5+ ans à accompagner des organisations dans la mise en œuvre de stratégies opérationnelles et la gestion par les résultats en distribution, télécommunications et ventes.",
      },
      {
        name: "John Ramírez",
        role: "Développement · IA · Cloud",
        credential: "10+ ans en apps, ML, vision par ordinateur, systèmes multi-agents et cloud.",
      },
    ],
    paragraphs: [
      "Nous ne sommes pas une agence de développement ni un cabinet de conseil en stratégie. Nous sommes ingénierie des opérations, développement propre et gestion par les résultats — travaillant comme une seule équipe du diagnostic à la mise en œuvre.",
    ],
    tags: [
      "Opération",
      "Données",
      "Automatisation",
      "Analytique",
      "IA",
      "SaaS",
      "Vision",
      "Multi-agents",
    ],
  },
  finalCta: {
    title: "Chaque semaine sans visibilité a un coût. Découvrons ensemble si nous pouvons vous aider à le réduire.",
    body: "Réservez une session de diagnostic de 30 minutes. Nous examinons ensemble comment fonctionne votre opération, identifions où se perdent données, temps ou décisions — et vous donnons une recommandation concrète, même si vous ne travaillez pas avec nous.",
    ctaPrimary: "Réservez votre diagnostic gratuit",
    ctaReassurance: "Sans pitch commercial · Sans engagement · 30 minutes",
  },
} satisfies LandingContent;
