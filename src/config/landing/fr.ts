import type { LandingContent } from "./types";

export const landingContentFr = {
  hero: {
    chip: "Opération · Données · Technologie — pour les entreprises en croissance",
    title: "Combien cela coûte-t-il à votre entreprise de décider tard ou avec des informations incomplètes ?",
    subtitle:
      "Nous concevons des systèmes qui intègrent vos données, automatisent vos processus et donnent à votre équipe l'information dont elle a besoin — au moment où elle peut encore conduire à l'action.",
    ctaPrimary: "Réservez votre diagnostic gratuit",
    ctaReassurance: "30 minutes · Sans engagement · Nous vous dirons honnêtement si nous sommes l'équipe adaptée à votre cas",
    secondaryCtaLabel: "Découvrez notre approche →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Pour qui",
    title: "Nous travaillons avec des entreprises où décider tard ou sans information claire a déjà un coût visible",
    intro: "Nos clients nous contactent généralement lorsque l'une de ces situations leur semble familière :",
    painSignals: [
      "De mauvaises décisions ont été prises parce que les données sont arrivées tard ou étaient dispersées.",
      "L'opération dépend de personnes clés et personne d'autre n'a le contexte complet.",
      "Les rapports arrivent tard ou sont répartis sur plusieurs feuilles de calcul sans consolidation.",
      "Grandir signifie recruter plus de personnes, pas disposer de meilleurs systèmes.",
      "La traçabilité a été perdue : difficile de savoir ce qui s'est passé, quand et pourquoi.",
    ],
    profiles: [
      {
        title: "Entreprise en croissance",
        description:
          "L'opération croît ou se complexifie, mais les systèmes et processus n'ont pas évolué au même rythme. Cela concerne aussi bien une entreprise en expansion qu'un département au sein d'une grande organisation ayant besoin de plus de visibilité et d'autonomie opérationnelle.",
        quote: "« Nous avons les données mais nous ne pouvons pas les utiliser. »",
        sectors: "Services · Distribution · Industrie · Banque · Médias",
      },
      {
        title: "Opération distribuée ou terrain",
        description:
          "Équipes sur le terrain, plusieurs sites ou processus qui dépendent de la coordination entre services. L'exécution échoue dans la communication.",
        quote: "« Nous coordonnons tout sur WhatsApp et personne ne sait qui a fait quoi. »",
        sectors: "Logistique · Agro-industrie · Services de terrain",
      },
      {
        title: "Entreprise ayant déjà investi dans la technologie sans résultats",
        description:
          "Elle a acheté un ERP, un CRM ou une plateforme qui n'a pas été adoptée. Elle a investi dans un développement resté inachevé. Elle cherche maintenant une équipe qui comprend le métier avant de proposer un logiciel.",
        quote: "« Nous avons déjà investi dans la technologie et cela n'a pas fonctionné comme prévu. »",
        sectors: "Toute industrie à opération complexe",
      },
    ],
  },
  problems: {
    title: "Sans un système connecté, la gestion perd visibilité, coordination et contrôle",
    intro:
      "Le problème ne se manifeste rarement à un seul endroit. Il commence par une information dispersée, se reflète dans l'exécution quotidienne et finit par limiter la capacité de coordonner, décider et grandir avec contrôle.",
    signalsHeading: "Signaux habituels",
    groups: [
      {
        title: "01. Visibilité",
        narrative: "Lecture tardive de ce qui se passe, données fragmentées et peu de traçabilité pour la direction et les équipes.",
        signals: [
          { title: "Données dispersées", body: "Sources déconnectées sans lecture commune pour décider." },
          { title: "Rapports tardifs", body: "Indicateurs qui arrivent quand ils ne servent plus à agir." },
          { title: "Faible traçabilité", body: "Difficile d'auditer ce qui s'est passé, quand et pourquoi." },
        ],
      },
      {
        title: "02. Exécution et coordination",
        narrative: "Suivi fragile, dépendance aux personnes et coordination qui ne scale pas avec la complexité.",
        signals: [
          { title: "Processus manuels", body: "Tâches répétitives qui concentrent le risque et consomment du temps." },
          { title: "Dépendance aux personnes", body: "Savoir dans des têtes et des chats, pas dans des systèmes partagés." },
          { title: "Retravail et coordination fragile", body: "Désalignement entre équipes avec un coût caché d'alignement." },
        ],
      },
      {
        title: "03. Scalabilité et contrôle",
        narrative: "Quand le volume ou la complexité augmente, des goulots d'étranglement apparaissent et le contrôle de la gestion faiblit.",
        signals: [
          { title: "Difficulté à grandir", body: "Plus de demande sans structure qui absorbe la croissance." },
          { title: "Goulots d'étranglement", body: "Points de défaillance uniques qui freinent livraisons et réponse." },
          { title: "Moindre contrôle de la gestion", body: "Moins de visibilité sur risques et performance à mesure que l'organisation grandit." },
        ],
      },
    ],
  },
  solutions: {
    title: "Trois capacités pour que votre équipe cesse de décider tard ou avec des informations incomplètes",
    intro:
      "Nous ne vendons pas la technologie séparément. Nous construisons des capacités intégrées — chacune orientée vers un résultat métier concret.",
    srOnlyCarousel: "Trois capacités en carrousel horizontal avec navigation par points.",
    prevCapabilityAria: "Capacité précédente",
    nextCapabilityAria: "Capacité suivante",
    capabilitiesNavAria: "Navigation entre les capacités",
    capabilityNavAria: (title: string, index: number, total: number) =>
      `${title} (${index} sur ${total})`,
    includesLabel: "Ce qui est inclus",
    resultLabel: "Résultat",
    capabilities: [
      {
        line: "integrate",
        image: "/solutions/arquitectura_sistemas.webp",
        imageAlt: "Visibilité opérationnelle : tableaux de bord et intégration de données.",
        title: "Une visibilité qui arrive à temps",
        body: "Nous consolidons vos données dispersées et construisons des tableaux opérationnels qui offrent une lecture claire de ce qui se passe — sans attendre de rapports manuels.",
        includes: [
          "Architecture de données et intégration des sources",
          "Tableaux de bord opérationnels en temps réel",
          "Alertes automatiques sur les indicateurs critiques",
        ],
        result: "Moins de temps à attendre des données · Des décisions qui arrivent quand elles peuvent encore conduire à l'action",
      },
      {
        line: "coordinate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automatisation et intégration des processus opérationnels.",
        title: "Une exécution sans friction manuelle",
        body: "Nous automatisons les processus qui dépendent aujourd'hui de personnes ou de messages WhatsApp — pour que votre équipe se concentre sur ce qui crée réellement de la valeur.",
        includes: [
          "Flux de travail digitalisés et validés",
          "Intégration entre outils (apps, ERP, formulaires, messagerie)",
          "Agents IA pour classification, support et coordination",
        ],
        result: "Moins d'erreurs, moins de retravail et une opération qui scale sans recruter plus de personnes.",
      },
      {
        line: "amplify",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Analytique avancée et machine learning appliqués à la gestion.",
        title: "Des décisions appuyées sur l'intelligence, pas sur l'intuition",
        body: "Nous construisons des modèles analytiques et des systèmes d'IA appliquée qui anticipent les problèmes, optimisent les ressources et donnent à votre équipe des signaux actionnables.",
        includes: [
          "Modèles prédictifs et d'optimisation",
          "Machine learning appliqué à l'opération et à la demande",
          "Vision par ordinateur et systèmes multi-agents",
        ],
        result: "Des coûts opérationnels plus bas et la capacité d'anticiper les problèmes avant qu'ils surviennent.",
      },
    ],
  },
  verticals: {
    title: "Industries et contextes où nous intervenons",
    intro:
      "Nos solutions s'adaptent à différents contextes opérationnels. Voici ceux que nous connaissons le mieux :",
    useCasesLabel: "Cas d'usage",
    componentsLabel: "Composants",
    midCtaLabel: "Votre industrie n'est pas listée ? Parlez-nous de votre cas →",
    blocks: [
      {
        title: "Environnements à forte charge manuelle d'information",
        body: "Nous réduisons la dépendance aux saisies manuelles, aux formats dispersés et aux tâches répétitives grâce à des formulaires numériques, des flux de capture structurée, des validations automatiques et des tableaux de bord qui organisent l'information et accélèrent l'exécution.",
        image: "/verticals/entornos_alta_carga_manual_informacion.webp",
        imageAlt:
          "Environnements à charge manuelle d'information : formulaires numériques, capture structurée, validations et tableaux opérationnels.",
        useCases: [
          "Numérisation des formulaires et des enregistrements manuels",
          "Validation et consolidation de l'information dispersée",
          "Suivi des incidents, constats ou activités répétitives",
          "Classification, priorisation et assistance avec des agents IA",
        ],
        components: [
          "Formulaires numériques et capture structurée",
          "Règles et validations automatiques",
          "Consolidation des données et traçabilité",
          "Tableaux de bord de suivi et de contrôle",
          "Intégration cloud",
          "Agents IA pour classification et assistance",
        ],
      },
      {
        title: "Passage d'outils épars vers une plateforme",
        body: "Nous accompagnons la transition depuis des outils dispersés, des fichiers isolés et des processus déconnectés vers une plateforme plus structurée, connectée et scalable, capable de centraliser la gestion et d'accroître la visibilité sur l'opération et les décisions.",
        image: "/verticals/transicion_herramientas_a_plataforma.webp",
        imageAlt:
          "Illustration abstraite : passage d'outils dispersés à une plateforme intégrée et scalable.",
        useCases: [
          "Consolidation de l'information capturée depuis mobile, formulaires et messagerie",
          "Centralisation des indicateurs, enregistrements et suivi sur une seule plateforme",
          "Numérisation des flux qui impliquent aujourd'hui plusieurs outils",
          "Analyse et aide à la décision avec modèles et agents IA",
        ],
        components: [
          "Applications mobiles et formulaires numériques",
          "Intégration avec la messagerie et les canaux de capture",
          "Services cloud et consolidation des données",
          "Plateformes web avec tableaux de bord et enregistrement d'information",
          "Modèles mathématiques et analytique appliquée",
          "Agents IA intégrés au flux opérationnel",
        ],
      },
      {
        title: "Opérations terrain et services distribués",
        body: "Nous concevons des solutions pour coordonner ventes, maintenance, installations et livraisons dans des opérations distribuées — en optimisant itinéraires, affectations et suivi grâce à des modèles mathématiques et des agents IA qui soutiennent l'exécution là où c'est le plus nécessaire.",
        image: "/verticals/operaciones_campo_servicios_distribuidos.webp",
        imageAlt:
          "Opérations distribuées : coordination des ventes, maintenance, installations et livraisons avec optimisation et aide IA.",
        useCases: [
          "Coordination des visites commerciales et ventes terrain",
          "Suivi des installations et de la maintenance",
          "Coordination des livraisons et services distribués",
          "Affectation intelligente des ressources et support par agents IA",
        ],
        components: [
          "Applications mobiles pour équipes terrain",
          "Cartes opérationnelles et géolocalisation",
          "Ordres de travail et suivi en temps réel",
          "Tableaux de coordination et de contrôle",
          "Modèles mathématiques d'affectation et de routage",
          "Agents IA pour support opérationnel",
        ],
      },
      {
        title: "Agro-industrie et gestion terrain",
        body: "Nous intégrons la capture terrain, la géoréférence et l'analyse visuelle pour transformer images et données territoriales en traçabilité, visibilité et décisions plus précises sur le territoire.",
        image: "/verticals/agroindustria_gestion_campo.webp",
        imageAlt:
          "Agro-industrie et gestion terrain : capture terrain, géoréférence et analyse visuelle sur le territoire.",
        useCases: [
          "Mesure de la productivité par parcelle ou unité de production",
          "Détection précoce de maladies et d'anomalies sur la culture",
          "Suivi géoréférencé de variables d'environnement",
          "Suivi et validation des activités sur le terrain",
        ],
        components: [
          "Capture mobile géoréférencée",
          "Cartes opérationnelles et couches territoriales",
          "Vision par ordinateur sur images",
          "Tableaux de suivi de la production",
          "Intégration cloud",
          "Modèles d'analyse et agents IA",
        ],
      },
    ],
  },
  process: {
    title: "Comment nous passons d'un besoin réel à une solution qui fonctionne",
    intro:
      "Nous ne partons pas de la technologie. Nous commençons par comprendre le contexte, bien concevoir la solution et ne construire que ce qui apporte réellement de la valeur.",
    resultLabel: "Résultat",
    steps: [
      {
        title: "Nous comprenons le contexte",
        body: "Nous échangeons avec vous pour comprendre comment fonctionne l'opération aujourd'hui, où sont les frictions et quelles décisions ont besoin d'un meilleur soutien.",
        result: "Clarté sur le problème qui vaut vraiment la peine d'être résolu.",
      },
      {
        title: "Nous concevons la solution",
        body: "Nous traduisons ce besoin en une proposition concrète — structure, flux ou prototype — pour visualiser la solution avant de développer.",
        result: "Une solution claire, validée et alignée avec votre réalité.",
      },
      {
        title: "Nous construisons par étapes",
        body: "Nous développons avec des livraisons partielles et des validations continues, en priorisant d'abord ce qui apporte le plus de valeur.",
        result: "Des avancées visibles, un apprentissage rapide et un meilleur usage de l'investissement.",
      },
      {
        title: "Nous déployons et ajustons",
        body: "Nous accompagnons la mise en œuvre et les ajustements nécessaires pour que la solution soit bien adoptée et produise des résultats dès le départ.",
        result: "Une solution en contexte réel, avec adoption et traçabilité.",
      },
    ],
    closing:
      "Et une fois la solution opérationnelle, nous la préparons à croître avec plus d'intégration, d'analytique et d'automatisation.",
  },
  about: {
    panel: {
      eyebrow: "À PROPOS",
      headline: "Opération + données + technologie",
      body: "Nous avons construit des plateformes opérationnelles, des modèles ML et des automatisations avec l'IA dans des implémentations réelles.",
    },
    title: "L'équipe derrière Latcon",
    paragraphs: [
      "L'équipe Latcon a une expérience directe dans la construction des solutions qu'elle propose : nous avons conçu des plateformes opérationnelles intégrant une application web, des tableaux de bord, un référentiel de données en nuage et des applications mobiles pour iOS et Android — et mis en œuvre des modèles de machine learning et des automatisations avec des systèmes multi-agents d'IA dans des contextes opérationnels réels.",
      "Nous réunissons trois profils complémentaires : un cabinet avec plus de cinq ans d'expérience en mise en œuvre de stratégie et gestion par les résultats, et deux ingénieurs avec plus d'une décennie en automatisation, développement logiciel, analytique appliquée, vision par ordinateur et systèmes d'IA.",
      "Notre approche ne part pas du logiciel : nous comprenons d'abord comment fonctionne votre opération, où sont les frictions réelles et quelles décisions ont besoin d'un meilleur soutien. Ensuite, nous concevons et mettons en œuvre la solution.",
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
    body: "Réservez une session de diagnostic de 30 minutes. Nous examinons ensemble votre opération, identifions les principaux points de friction et vous donnons une recommandation concrète — même si vous ne travaillez pas avec nous.",
    ctaPrimary: "Réservez votre diagnostic gratuit",
    ctaReassurance: "Sans pitch commercial · Sans engagement · 30 minutes",
  },
} satisfies LandingContent;
