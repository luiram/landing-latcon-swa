import type { LandingContent } from "./types";

export const landingContentFr = {
  hero: {
    chip: "Architecture · Intégration · IA appliquée",
    title: "Connectez l’information, les processus et les décisions pour scaler avec visibilité et contrôle",
    subtitle:
      "Nous concevons des systèmes qui intègrent l’information, l’automatisation et l’intelligence artificielle appliquée pour offrir de la visibilité, améliorer la coordination et renforcer la prise de décision.",
    ctaPrimary: "Planifier un échange",
  },
  problems: {
    title: "Sans un système connecté, la gestion perd visibilité, coordination et contrôle",
    intro:
      "Le problème ne se manifeste rarement à un seul endroit. Il commence par une information dispersée, se reflète dans l’exécution quotidienne et finit par limiter la capacité de coordonner, décider et scaler avec contrôle.",
    signalsHeading: "Signaux habituels",
    groups: [
      {
        title: "01. Visibilité",
        narrative: "Lecture tardive de ce qui se passe, données fragmentées et peu de traçabilité pour la direction et les équipes.",
        signals: [
          { title: "Données dispersées", body: "Sources déconnectées et consolidation insuffisante pour décider avec une lecture commune." },
          { title: "Rapports tardifs", body: "Indicateurs qui arrivent quand ils ne nourrissent plus la gestion ni la réponse." },
          { title: "Faible traçabilité", body: "Difficile d’auditer ce qui s’est passé, quand et pourquoi—dans l’opération et la chaîne de décision." },
        ],
      },
      {
        title: "02. Exécution et coordination",
        narrative: "Suivi fragile, dépendance aux personnes et coordination qui ne scale pas avec la complexité.",
        signals: [
          { title: "Processus manuels", body: "Tâches répétitives qui concentrent le risque et libèrent peu de temps pour prioriser." },
          { title: "Dépendance aux personnes", body: "Savoir et jugement dans des têtes et des chats, pas gouvernés dans un système partagé." },
          { title: "Retravail et coordination fragile", body: "Désalignement entre les équipes, allers-retours et coût caché pour aligner tout le monde." },
        ],
      },
      {
        title: "03. Scalabilité et contrôle",
        narrative: "Quand le volume ou la complexité augmente, des goulots d’étranglement apparaissent et le contrôle de la gestion faiblit.",
        signals: [
          { title: "Difficulté à scaler", body: "Plus de demande ou d’équipes sans structure qui absorbe la croissance avec clarté." },
          { title: "Goulots d’étranglement", body: "Points de défaillance uniques qui freinent livraisons, réponse et capacité de prioriser." },
          { title: "Moindre contrôle de la gestion", body: "Moins de visibilité sur risques, délais et performance quand l’organisation s’élargit." },
        ],
      },
    ],
  },
  solutions: {
    title: "Des solutions pour connecter l’information, l’exécution et les décisions",
    intro:
      "Nous combinons architecture, automatisation et intelligence appliquée pour bâtir des capacités qui renforcent la gestion, de l’opération à la direction.",
    srOnlyCarousel:
      "Six capacités en carrousel horizontal. Des tons bleus, verts et ambrés regroupent visuellement chaque ligne de solution.",
    prevCapabilityAria: "Capacité précédente",
    nextCapabilityAria: "Capacité suivante",
    capabilitiesNavAria: "Navigation entre les capacités",
    capabilityNavAria: (title: string, index: number, total: number) =>
      `${title} (${index} sur ${total})`,
    capabilities: [
      {
        line: "integrate",
        image: "/solutions/arquitectura_sistemas.webp",
        imageAlt: "Architecture des systèmes : structure connectée de l’information et des processus.",
        title: "Architecture des systèmes",
        body: "Structure fonctionnelle et technique pour organiser l’information, les processus et les dépendances.",
      },
      {
        line: "integrate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automatisation et intégration : flux connectés entre outils et systèmes.",
        title: "Automatisation et intégration",
        body: "Connexions et flux entre outils pour consolider l’information et réduire la friction manuelle.",
      },
      {
        line: "coordinate",
        image: "/solutions/plataforma_saas_sistema.webp",
        imageAlt: "Plateformes SaaS et systèmes sur mesure : suivi et coordination des processus.",
        title: "Plateformes SaaS et systèmes sur mesure",
        body: "Solutions web pour surveiller, coordonner et soutenir les processus critiques avec traçabilité.",
      },
      {
        line: "coordinate",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Analytique avancée et machine learning : modèles et signaux pour la gestion.",
        title: "Analytique avancée et machine learning",
        body: "Modèles et analytique pour prioriser, anticiper et soutenir la gestion avec des signaux actionnables.",
      },
      {
        line: "amplify",
        image: "/solutions/deteccion_analisis_imagenes.webp",
        imageAlt: "Détection et analyse d’images : vision par ordinateur et données auditables.",
        title: "Détection et analyse d’images",
        body: "Comptage, classification et validation visuelle pour transformer les images en données utiles et auditables.",
      },
      {
        line: "amplify",
        image: "/solutions/sistemas_multiagente.webp",
        imageAlt: "Systèmes multi-agents avec IA : agents collaborant au suivi et à la coordination.",
        title: "Systèmes multi-agents avec IA",
        body: "Des agents qui collaborent au monitoring, au support et à la coordination répétitive, sans remplacer le jugement humain.",
      },
    ],
  },
  verticals: {
    title: "Activités et contextes où cette approche a le plus d’impact",
    intro:
      "Elle convient particulièrement lorsque la coordination, la traçabilité et la réactivité dépendent d’une meilleure intégration de l’information, des processus et des décisions.",
    useCasesLabel: "Cas d’usage",
    componentsLabel: "Composants",
    blocks: [
      {
        title: "Environnements à forte charge manuelle d’information",
        body: "Nous réduisons la dépendance aux saisies manuelles, aux formats dispersés et aux tâches répétitives grâce à des formulaires numériques, des flux de capture structurée, des validations automatiques et des tableaux de bord qui organisent l’information et accélèrent l’exécution.",
        image: "/verticals/entornos_alta_carga_manual_informacion.webp",
        imageAlt:
          "Environnements à charge manuelle d’information : formulaires numériques, capture structurée, validations et tableaux opérationnels.",
        useCases: [
          "Numérisation des formulaires et des enregistrements manuels",
          "Validation et consolidation de l’information dispersée",
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
        title: "Passage d’outils épars vers une plateforme",
        body: "Nous accompagnons la transition depuis des outils dispersés, des fichiers isolés et des processus déconnectés vers une plateforme plus structurée, connectée et scalable, capable de centraliser la gestion et d’accroître la visibilité sur l’opération et les décisions.",
        image: "/verticals/transicion_herramientas_a_plataforma.webp",
        imageAlt:
          "Illustration abstraite : passage d’outils dispersés à une plateforme intégrée et scalable.",
        useCases: [
          "Consolidation de l’information capturée depuis mobile, formulaires et messagerie",
          "Centralisation des indicateurs, enregistrements et suivi sur une seule plateforme",
          "Numérisation des flux qui impliquent aujourd’hui plusieurs outils",
          "Analyse et aide à la décision avec modèles et agents IA",
        ],
        components: [
          "Applications mobiles et formulaires numériques",
          "Intégration avec la messagerie et les canaux de capture",
          "Services cloud et consolidation des données",
          "Plateformes web avec tableaux de bord et enregistrement d’information",
          "Modèles mathématiques et analytique appliquée",
          "Agents IA intégrés au flux opérationnel",
        ],
      },
      {
        title: "Opérations terrain et services distribués",
        body: "Nous concevons des solutions pour coordonner ventes, maintenance, installations et livraisons dans des opérations distribuées—en optimisant itinéraires, affectations et suivi grâce à des modèles mathématiques et des agents IA qui soutiennent l’exécution là où c’est le plus nécessaire.",
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
          "Modèles mathématiques d’affectation et de routage",
          "Agents IA pour support opérationnel",
        ],
      },
      {
        title: "Agro-industrie et gestion terrain",
        body: "Nous intégrons la capture terrain, la géoréférence et l’analyse visuelle pour transformer images et données territoriales en traçabilité, visibilité et décisions plus précises sur le territoire.",
        image: "/verticals/agroindustria_gestion_campo.webp",
        imageAlt:
          "Agro-industrie et gestion terrain : capture terrain, géoréférence et analyse visuelle sur le territoire.",
        useCases: [
          "Mesure de la productivité par parcelle ou unité de production",
          "Détection précoce de maladies et d’anomalies sur la culture",
          "Suivi géoréférencé de variables d’environnement",
          "Suivi et validation des activités sur le terrain",
        ],
        components: [
          "Capture mobile géoréférencée",
          "Cartes opérationnelles et couches territoriales",
          "Vision par ordinateur sur images",
          "Tableaux de suivi de la production",
          "Intégration cloud",
          "Modèles d’analyse et agents IA",
        ],
      },
    ],
  },
  process: {
    title: "Comment nous passons d’un besoin réel à une solution qui fonctionne",
    intro:
      "Nous ne partons pas de la technologie. Nous commençons par comprendre le contexte, bien concevoir la solution et ne construire que ce qui apporte réellement de la valeur.",
    resultLabel: "Résultat",
    steps: [
      {
        title: "Nous comprenons le contexte",
        body: "Nous échangeons avec vous pour comprendre comment fonctionne l’opération aujourd’hui, où sont les frictions et quelles décisions ont besoin d’un meilleur soutien.",
        result: "Clarté sur le problème qui vaut vraiment la peine d’être résolu.",
      },
      {
        title: "Nous concevons la solution",
        body: "Nous traduisons ce besoin en une proposition concrète—structure, flux ou prototype—pour visualiser la solution avant de développer.",
        result: "Une solution claire, validée et alignée avec votre réalité.",
      },
      {
        title: "Nous construisons par étapes",
        body: "Nous développons avec des livraisons partielles et des validations continues, en priorisant d’abord ce qui apporte le plus de valeur.",
        result: "Des avancées visibles, un apprentissage rapide et un meilleur usage de l’investissement.",
      },
      {
        title: "Nous déployons et ajustons",
        body: "Nous accompagnons la mise en œuvre et les ajustements nécessaires pour que la solution soit bien adoptée et produise des résultats dès le départ.",
        result: "Une solution en contexte réel, avec adoption et traçabilité.",
      },
    ],
    closing:
      "Et une fois la solution opérationnelle, nous la préparons à croître avec plus d’intégration, d’analytique et d’automatisation.",
  },
  about: {
    panel: {
      eyebrow: "À PROPOS",
      headline: "Opération + données + technologie",
      body: "Une équipe interdisciplinaire pour concevoir des solutions adaptées à des contextes réels.",
    },
    title: "Une équipe qui relie opération, données et technologie",
    paragraphs: [
      "Nous sommes des professionnels qui combinent opération, données et technologie pour concevoir des solutions dans des contextes réels. Nous intégrons la capture d’information, l’automatisation, l’analytique et l’intelligence appliquée pour transformer des processus manuels en systèmes plus visibles, mesurables et scalables.",
      "Notre approche ne part pas du logiciel seul : nous comprenons d’abord l’opération, les frictions et les décisions qui ont besoin d’un meilleur soutien. Ensuite, nous concevons des solutions avec plus de contrôle, de traçabilité et de capacité de croissance.",
      "Nous travaillons avec l’automatisation, l’analytique avancée, le machine learning, la vision par ordinateur et les systèmes multi-agents pour bâtir des solutions utiles, adoptables et orientées valeur réelle.",
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
    ctaAgenda: "Planifier un échange",
  },
} satisfies LandingContent;
