import type { LandingContent } from "./types";

export const landingContentPt = {
  hero: {
    chip: "Dados · Automação · IA · Antecipação",
    title: "Sua empresa já tem os dados mas ainda não consegue usá-los para decidir a tempo?",
    subtitle:
      "Integramos seus dados, automatizamos seus processos e construímos sistemas de IA que dão à sua equipe sinais claros para agir — antes que o problema se torne visível.",
    ctaPrimary: "Agende seu diagnóstico gratuito",
    ctaReassurance: "30 minutos · Sem compromisso · Diremos com honestidade se somos a equipe certa para o seu caso",
    secondaryCtaLabel: "Conheça nossa abordagem →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Para quem",
    title: "Trabalhamos com empresas onde os dados, os sistemas e as equipes não estão conectados",
    intro: "",
    profiles: [
      {
        title: "Dados sem análise",
        description:
          "Os dados estão lá, mas analisá-los em tempo real requer tempo e pessoal que a operação não tem disponível. As oportunidades passam e os problemas são detectados tarde — quando já têm um custo visível.",
        quote: "\"Temos os dados, mas não conseguimos usá-los.\"",
        sectors: "Serviços · Varejo · Manufatura · Serviços Financeiros · Mídia",
      },
      {
        title: "Áreas que operam em silos",
        description:
          "Vendas promete sem saber o que pode ser produzido. Compras reabastece sem ver a demanda real. Produção planifica sem saber o que está por vir. Cada área trabalha com sua própria versão dos dados — e a descoordenaçāo tem um custo que ninguém mede.",
        quote: "\"Cada área trabalha com números diferentes e ninguém sabe qual é o real.\"",
        sectors: "Manufatura · Varejo · Distribuição · Agroindústria",
      },
      {
        title: "Operação distribuída ou em campo",
        description:
          "Equipes em campo, múltiplas unidades ou processos entre áreas coordenados por WhatsApp e e-mail. Sem rastreabilidade centralizada, é difícil saber o que aconteceu, quem fez e quando — até que o erro já tenha consequências.",
        quote: "\"Coordenamos tudo pelo WhatsApp e ninguém sabe quem fez o quê.\"",
        sectors: "Logística · Agroindústria · Serviços de campo",
      },
      {
        title: "Tecnologia sem integração",
        description:
          "Têm ERP, CRM, plataformas e aplicativos — cada um funcionando separadamente. Sem integração entre sistemas, a operação gera ajustes manuais, retrabalho e decisões baseadas em dados incompletos. Buscam uma equipe que conecte o que já têm antes de propor algo novo.",
        quote: "\"Temos vários sistemas, mas nenhum fala com o outro.\"",
        sectors: "Qualquer indústria com operação complexa",
      },
    ],
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
          { title: "Dados dispersos", body: "Fontes desconectadas sem uma leitura comum para decidir." },
          { title: "Relatórios tardios", body: "Indicadores que chegam quando já não servem para agir." },
          { title: "Baixa rastreabilidade", body: "Dificulta auditar o que ocorreu, quando e por quê." },
        ],
      },
      {
        title: "02. Execução e coordenação",
        narrative: "Acompanhamento frágil, dependência de pessoas e coordenação que não escala com a complexidade.",
        signals: [
          { title: "Processos manuais", body: "Tarefas repetitivas que concentram risco e consomem tempo." },
          { title: "Dependência de pessoas", body: "Conhecimento em cabeças e chats, não em sistemas compartilhados." },
          { title: "Retrabalho e coordenação frágil", body: "Desalinhamento entre áreas com alto custo oculto de alinhamento." },
        ],
      },
      {
        title: "03. Escalabilidade e controle",
        narrative: "Ao crescer volume ou complexidade, surgem gargalos e o controle na gestão se enfraquece.",
        signals: [
          { title: "Dificuldade de escalar", body: "Mais demanda sem estrutura que absorva o crescimento." },
          { title: "Gargalos", body: "Pontos únicos de falha que freiam entregas e resposta." },
          { title: "Menos controle na gestão", body: "Menos visibilidade de riscos e desempenho ao crescer." },
        ],
      },
    ],
  },
  solutions: {
    eyebrow: "SOLUÇÕES",
    title: "É assim que conectamos o que hoje está desconectado na sua operação.",
    intro:
      "Três capacidades integradas. Um único objetivo: que sua equipe atue com informação real e a tempo.",
    srOnlyCarousel: "Três capacidades em carrossel horizontal com navegação por pontos.",
    prevCapabilityAria: "Capacidade anterior",
    nextCapabilityAria: "Próxima capacidade",
    capabilitiesNavAria: "Navegação entre capacidades",
    capabilityNavAria: (title: string, index: number, total: number) =>
      `${title} (${index} de ${total})`,
    includesLabel: "O que inclui",
    resultLabel: "Resultado",
    capabilities: [
      {
        line: "integrate",
        image: "/solutions/arquitectura_sistemas.webp",
        imageAlt: "Visibilidade operacional: painéis e integração de dados.",
        title: "Visibilidade que chega a tempo",
        body: "Sua operação gera dados em múltiplos sistemas. Nós os conectamos, organizamos e convertemos em sinais claros para que sua equipe aja.",
        includes: [
          "Suas fontes de dados conectadas em um só lugar — sem consolidação manual",
          "Painéis operacionais atualizados em tempo real — sem depender de relatórios manuais",
          "Alertas que chegam antes que o problema se torne visível",
        ],
        result: "Menos tempo esperando dados · Decisões que chegam quando ainda servem para agir",
      },
      {
        line: "coordinate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automação e integração de processos operacionais.",
        title: "Execução sem atrito manual",
        body: "Cada processo manual é um ponto de falha. Identificamos quais travam sua operação e os convertemos em fluxos automáticos, rastreáveis e confiáveis.",
        includes: [
          "Processos manuais convertidos em fluxos automáticos, validados e rastreáveis",
          "ERP, apps, formulários e mensageria integrados em um único fluxo de informação",
          "Agentes de IA que executam tarefas repetitivas — sem intervenção humana",
        ],
        result: "Operação que flui sem gargalos, com rastreabilidade completa e capacidade de crescer sem adicionar complexidade.",
      },
      {
        line: "amplify",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Analítica avançada e machine learning aplicados à gestão.",
        title: "Decisões apoiadas em inteligência, não em intuição",
        body: "Sua equipe já toma decisões todos os dias. A diferença é se as toma com dados do passado ou com modelos que veem o que vem — antes que seja urgente.",
        includes: [
          "Modelos preditivos para demanda, inventário e gargalos",
          "Machine learning aplicado à operação e demanda",
          "Visão computacional e sistemas multiagente",
        ],
        result: "Decisões baseadas no que vem, não no que já passou · Problemas detectados antes de terem um custo visível.",
      },
    ],
  },
  verticals: {
    title: "Indústrias e contextos onde atuamos",
    intro:
      "Nossas soluções se adaptam a diferentes contextos operacionais. Estes são os que conhecemos com maior profundidade:",
    useCasesLabel: "Casos de uso",
    componentsLabel: "Componentes",
    midCtaLabel: "Sua indústria não está aqui? Conte-nos seu caso →",
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
    eyebrow: "MÉTODO",
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
      body: "Desenvolvemos plataformas operacionais, modelos de ML e automações com IA em implementações reais.",
    },
    title: "A equipe por trás da Latcon",
    paragraphs: [
      "A equipe da Latcon tem experiência direta construindo as soluções que oferece: projetamos plataformas operacionais que integram aplicação web, painéis, repositório de dados na nuvem e apps móveis para iOS e Android — e implementamos modelos de machine learning e automações com sistemas multiagente de IA em contextos reais de operação.",
      "Integramos três perfis complementares: uma consultoria com mais de cinco anos em implementação de estratégia e gestão por resultados, e dois engenheiros com mais de uma década em automação, desenvolvimento de software, analítica aplicada, visão computacional e sistemas de IA.",
      "Nossa abordagem não parte do software: primeiro entendemos como funciona a sua operação, onde estão as fricções reais e quais decisões precisam de melhor suporte. A partir daí, projetamos e implementamos a solução.",
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
  },
  finalCta: {
    title: "Cada semana sem visibilidade tem um custo. Vamos descobrir juntos se podemos ajudá-lo a reduzi-lo.",
    body: "Agende uma sessão de diagnóstico de 30 minutos. Revisamos juntos a sua operação, identificamos os principais pontos de fricção e damos uma recomendação concreta — mesmo que você não trabalhe conosco.",
    ctaPrimary: "Agende seu diagnóstico gratuito",
    ctaReassurance: "Sem pitch de vendas · Sem compromisso · 30 minutos",
  },
} satisfies LandingContent;
