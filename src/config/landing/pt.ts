import type { LandingContent } from "./types";

export const landingContentPt = {
  hero: {
    chip: "Arquitetura · Integração · IA aplicada",
    title: "Conecte informação, processos e decisões para escalar com visibilidade e controle",
    subtitle:
      "Projetamos sistemas que integram informação, automação e inteligência artificial aplicada para dar visibilidade, melhorar a coordenação e fortalecer a tomada de decisões.",
    ctaPrimary: "Agendar uma conversa",
  },
  problems: {
    title: "Sem um sistema conectado, a gestão perde visibilidade, coordenação e controle",
    intro:
      "O problema raramente aparece em um único ponto. Começa com informação dispersa, reflete-se na execução diária e acaba limitando a capacidade de coordenar, decidir e escalar com controle.",
    signalsHeading: "Sinais recorrentes",
    groups: [
      {
        title: "01. Visibilidade",
        narrative: "Leitura tardia do que acontece, dados fragmentados e pouca rastreabilidade para a direção e as equipes.",
        signals: [
          { title: "Dados dispersos", body: "Fontes desconectadas e pouca consolidação para decidir com uma leitura comum." },
          { title: "Relatórios tardios", body: "Indicadores que chegam quando já não alimentam a gestão nem a resposta." },
          { title: "Baixa rastreabilidade", body: "Dificulta auditar o que ocorreu, quando e por quê—na operação e na cadeia de decisões." },
        ],
      },
      {
        title: "02. Execução e coordenação",
        narrative: "Acompanhamento frágil, dependência de pessoas e coordenação que não escala com a complexidade.",
        signals: [
          { title: "Processos manuais", body: "Tarefas repetitivas que concentram risco e não liberam tempo para priorizar." },
          { title: "Dependência de pessoas", body: "Conhecimento e critério em cabeças e chats, não governados em um sistema compartilhado." },
          { title: "Retrabalho e coordenação frágil", body: "Desalinhamento entre áreas, idas e vindas e custo oculto de alinhar equipes." },
        ],
      },
      {
        title: "03. Escalabilidade e controle",
        narrative: "Ao crescer volume ou complexidade, surgem gargalos e o controle na gestão se enfraquece.",
        signals: [
          { title: "Dificuldade de escalar", body: "Mais demanda ou mais equipes sem uma estrutura que absorva o crescimento com clareza." },
          { title: "Gargalos", body: "Pontos únicos de falha que freiam entregas, resposta e capacidade de priorizar." },
          { title: "Menos controle na gestão", body: "Menos visibilidade de riscos, prazos e desempenho quando a organização se amplia." },
        ],
      },
    ],
  },
  solutions: {
    title: "Soluções para conectar informação, execução e decisões",
    intro:
      "Combinamos arquitetura, automação e inteligência aplicada para construir capacidades que melhoram a gestão da operação até a direção.",
    srOnlyCarousel:
      "Seis capacidades em carrossel horizontal. Tons azuis, verdes e âmbar agrupam visualmente cada linha de solução.",
    prevCapabilityAria: "Capacidade anterior",
    nextCapabilityAria: "Próxima capacidade",
    capabilitiesNavAria: "Navegação entre capacidades",
    capabilityNavAria: (title: string, index: number, total: number) =>
      `${title} (${index} de ${total})`,
    capabilities: [
      {
        line: "integrate",
        image: "/solutions/arquitectura_sistemas.webp",
        imageAlt: "Arquitetura de sistemas: estrutura conectada de informação e processos.",
        title: "Arquitetura de sistemas",
        body: "Estrutura funcional e tecnológica para organizar informação, processos e dependências.",
      },
      {
        line: "integrate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automação e integração: fluxos conectados entre ferramentas e sistemas.",
        title: "Automação e integração",
        body: "Conexões e fluxos entre ferramentas para consolidar informação e reduzir atrito manual.",
      },
      {
        line: "coordinate",
        image: "/solutions/plataforma_saas_sistema.webp",
        imageAlt: "Plataformas SaaS e sistemas sob medida: monitoramento e coordenação de processos.",
        title: "Plataformas SaaS e sistemas sob medida",
        body: "Soluções web para monitorar, coordenar e sustentar processos críticos com rastreabilidade.",
      },
      {
        line: "coordinate",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Analítica avançada e machine learning: modelos e sinais para a gestão.",
        title: "Analítica avançada e machine learning",
        body: "Modelos e analítica para priorizar, antecipar e apoiar a gestão com sinais acionáveis.",
      },
      {
        line: "amplify",
        image: "/solutions/deteccion_analisis_imagenes.webp",
        imageAlt: "Detecção e análise de imagens: visão computacional e dados auditáveis.",
        title: "Detecção e análise de imagens",
        body: "Contagem, classificação e validação visual para transformar imagens em dados úteis e auditáveis.",
      },
      {
        line: "amplify",
        image: "/solutions/sistemas_multiagente.webp",
        imageAlt: "Sistemas multiagente com IA: agentes colaborando em monitoramento e coordenação.",
        title: "Sistemas multiagente com IA",
        body: "Agentes que colaboram em monitoramento, suporte e coordenação repetitiva, sem substituir o critério humano.",
      },
    ],
  },
  verticals: {
    title: "Atividades e contextos em que essa abordagem gera mais impacto",
    intro:
      "Aplica-se especialmente bem onde coordenação, rastreabilidade e capacidade de resposta dependem de integrar melhor informação, processos e decisões.",
    useCasesLabel: "Casos de uso",
    componentsLabel: "Componentes",
    blocks: [
      {
        title: "Ambientes com alta carga manual de informação",
        body: "Reduzimos a dependência de registros manuais, formatos dispersos e tarefas repetitivas por meio de formulários digitais, fluxos de captura estruturada, validações automáticas e painéis que organizam a informação e tornam a execução mais ágil.",
        image: "/verticals/entornos_alta_carga_manual_informacion.webp",
        imageAlt:
          "Ambientes com carga manual de informação: formulários digitais, captura estruturada, validações e painéis operacionais.",
        useCases: [
          "Digitalização de formulários e registros manuais",
          "Validação e consolidação de informação dispersa",
          "Acompanhamento de incidentes, achados ou atividades repetitivas",
          "Classificação, priorização e suporte com agentes de IA",
        ],
        components: [
          "Formulários digitais e captura estruturada",
          "Regras e validações automáticas",
          "Consolidação de dados e rastreabilidade",
          "Painéis de acompanhamento e controle",
          "Integração na nuvem",
          "Agentes de IA para classificação e assistência",
        ],
      },
      {
        title: "Transição de ferramentas soltas para plataforma",
        body: "Acompanhamos a transição de ferramentas dispersas, arquivos soltos e processos desconectados para uma plataforma mais estruturada, conectada e escalável, capaz de centralizar a gestão e aumentar a visibilidade sobre a operação e as decisões.",
        image: "/verticals/transicion_herramientas_a_plataforma.webp",
        imageAlt:
          "Ilustração abstrata: passagem de ferramentas dispersas para uma plataforma integrada e escalável.",
        useCases: [
          "Consolidação de informação capturada por mobile, formulários e mensageria",
          "Centralização de indicadores, registros e acompanhamento em uma única plataforma",
          "Digitalização de fluxos em que hoje intervêm várias ferramentas",
          "Análise e suporte a decisões com modelos e agentes de IA",
        ],
        components: [
          "Aplicativos móveis e formulários digitais",
          "Integração com mensageria e canais de captura",
          "Serviços na nuvem e consolidação de dados",
          "Plataformas web com painéis e registro de informação",
          "Modelos matemáticos e analítica aplicada",
          "Agentes de IA integrados ao fluxo operacional",
        ],
      },
      {
        title: "Operações de campo e serviços distribuídos",
        body: "Projetamos soluções para coordenar vendas, manutenções, instalações e entregas em operações distribuídas, otimizando rotas, alocações e acompanhamento com modelos matemáticos e agentes de IA que apoiam a execução onde mais se precisa.",
        image: "/verticals/operaciones_campo_servicios_distribuidos.webp",
        imageAlt:
          "Operações distribuídas: coordenação de vendas, manutenção, instalações e entregas com otimização e apoio de IA.",
        useCases: [
          "Coordenação de visitas comerciais e vendas de campo",
          "Acompanhamento de instalações e manutenções",
          "Coordenação de entregas e serviços distribuídos",
          "Alocação inteligente de recursos e suporte com agentes de IA",
        ],
        components: [
          "Aplicativos móveis para equipes de campo",
          "Mapas operacionais e geolocalização",
          "Ordens de serviço e acompanhamento em tempo real",
          "Painéis de coordenação e controle",
          "Modelos matemáticos de alocação e roteamento",
          "Agentes de IA para suporte operacional",
        ],
      },
      {
        title: "Agroindústria e gestão no campo",
        body: "Integramos captura no campo, georreferenciamento e análise visual para transformar imagens e dados territoriais em rastreabilidade, visibilidade e decisões mais precisas sobre o território.",
        image: "/verticals/agroindustria_gestion_campo.webp",
        imageAlt:
          "Agroindústria e gestão no campo: captura no campo, georreferenciamento e análise visual sobre o território.",
        useCases: [
          "Medição de produtividade por talhão ou unidade produtiva",
          "Detecção precoce de doenças e anomalias na lavoura",
          "Monitoramento georreferenciado de variáveis ambientais",
          "Acompanhamento e validação de atividades no campo",
        ],
        components: [
          "Captura móvel georreferenciada",
          "Mapas operacionais e camadas territoriais",
          "Visão computacional sobre imagens",
          "Painéis de acompanhamento produtivo",
          "Integração na nuvem",
          "Modelos de análise e agentes de IA",
        ],
      },
    ],
  },
  process: {
    title: "Como levamos uma necessidade real a uma solução que funciona",
    intro:
      "Não começamos pela tecnologia. Começamos entendendo o contexto, projetando bem a solução e construindo só o que realmente agrega valor.",
    resultLabel: "Resultado",
    steps: [
      {
        title: "Entendemos o contexto",
        body: "Conversamos com você para entender como a operação funciona hoje, onde estão as fricções e quais decisões precisam de melhor suporte.",
        result: "Clareza sobre o problema que realmente vale a pena resolver.",
      },
      {
        title: "Projetamos a solução",
        body: "Traduzimos essa necessidade em uma proposta concreta: estrutura, fluxo ou protótipo, para que você visualize a solução antes de desenvolver.",
        result: "Uma solução clara, validada e alinhada à sua realidade.",
      },
      {
        title: "Construímos por etapas",
        body: "Desenvolvemos com entregas parciais e validações contínuas, focando primeiro no que mais agrega valor.",
        result: "Avanços visíveis, aprendizado rápido e melhor uso do investimento.",
      },
      {
        title: "Implementamos e ajustamos",
        body: "Acompanhamos a implantação e os ajustes necessários para a solução ser bem adotada e gerar resultados desde o início.",
        result: "Uma solução funcionando em contexto real, com adoção e rastreabilidade.",
      },
    ],
    closing:
      "E quando a solução já funciona, a preparamos para crescer com mais integração, analítica e automação.",
  },
  about: {
    panel: {
      eyebrow: "QUEM SOMOS",
      headline: "Operação + dados + tecnologia",
      body: "Equipe interdisciplinar para projetar soluções aplicadas a contextos reais.",
    },
    title: "Uma equipe que conecta operação, dados e tecnologia",
    paragraphs: [
      "Somos profissionais que combinam operação, dados e tecnologia para projetar soluções aplicadas a contextos reais. Integramos captura de informação, automação, analítica e inteligência aplicada para transformar processos manuais em sistemas mais visíveis, mensuráveis e escaláveis.",
      "Nossa abordagem não parte só do software: entendemos primeiro a operação, as fricções e as decisões que precisam de melhor suporte. A partir daí, projetamos soluções com mais controle, rastreabilidade e capacidade de crescimento.",
      "Trabalhamos com automação, analítica avançada, machine learning, visão computacional e sistemas multiagente para construir soluções úteis, adotáveis e orientadas a valor real.",
    ],
    tags: [
      "Operação",
      "Dados",
      "Automação",
      "Analítica",
      "IA",
      "SaaS",
      "Visão",
      "Multiagentes",
    ],
    ctaAgenda: "Agendar uma conversa",
  },
} satisfies LandingContent;
