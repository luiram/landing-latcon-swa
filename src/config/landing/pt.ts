import type { LandingContent } from "./types";

export const landingContentPt = {
  hero: {
    chipPrefix: "Quebra primeiro",
    chipWords: [
      { lead: "no", emphasis: "planejamento" },
      { lead: "na", emphasis: "programação" },
      { lead: "na", emphasis: "execução" },
      { lead: "na", emphasis: "adaptação" },
    ],
    title: "O plano é perfeito — até a operação começar.",
    subtitle:
      "Construímos IA, otimização e software que fecham a lacuna entre o que você planeja e o que realmente acontece.",
    ctaPrimary: "Agende seu diagnóstico gratuito",
    ctaReassurance: "30 minutos · sem compromisso",
    secondaryCtaLabel: "Conheça nossa abordagem →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Para quem",
    title: "Trabalhamos com empresas onde os dados, os sistemas e as equipes não conversam entre si",
    intro: "",
    profiles: [
      {
        title: "Dados sem análise",
        description:
          "Os dados estão lá, mas analisá-los a tempo exige pessoal e horas que a operação não tem disponíveis. Quando o problema aparece em um relatório, já tem um custo.",
        quote: "\"Temos os dados, mas não conseguimos usá-los.\"",
        sectors: "Serviços · Varejo · Manufatura · Serviços Financeiros · Mídia",
      },
      {
        title: "Equipes que trabalham em silos",
        description:
          "Vendas promete sem saber o que pode ser produzido. Compras reabastece sem ver a demanda real. Cada área trabalha com sua própria versão dos dados — e ninguém mede o que isso custa.",
        quote: "\"Cada área trabalha com números diferentes e ninguém sabe qual é o real.\"",
        sectors: "Manufatura · Varejo · Distribuição · Agroindústria",
      },
      {
        title: "Operação distribuída ou em campo",
        description:
          "Equipes em campo, múltiplas unidades, coordenação por WhatsApp e e-mail. Sem um registro compartilhado, é difícil saber o que aconteceu, quem fez e quando — até que já tenha consequências.",
        quote: "\"Coordenamos tudo pelo WhatsApp e ninguém sabe quem fez o quê.\"",
        sectors: "Logística · Agroindústria · Serviços de campo",
      },
      {
        title: "Tecnologia sem integração",
        description:
          "ERP, CRM, plataformas e aplicativos — cada um funcionando separadamente. Sem integração, a operação depende de ajustes manuais e decisões baseadas em dados incompletos.",
        quote: "\"Temos vários sistemas, mas nenhum fala com o outro.\"",
        sectors: "Qualquer indústria com operação complexa",
      },
    ],
  },
  solutions: {
    eyebrow: "Soluções",
    title: "Três formas de fechar a lacuna.",
    intro:
      "Três capacidades integradas, um único objetivo: manter o que acontece o mais próximo possível do que você planejou.",
    cards: [
      {
        kind: "plan",
        title: "Planeje melhor",
        summary: "Modelos de otimização e previsão que transformam suas restrições no melhor plano possível.",
      },
      {
        kind: "execute",
        title: "Execute sem atrito",
        summary: "Aplicações e automação que levam o plano para o campo — com rastreabilidade completa.",
      },
      {
        kind: "adapt",
        title: "Detecte e adapte a tempo",
        summary: "Visibilidade, alertas e agentes de IA que detectam desvios antes que se tornem custo.",
      },
    ],
  },
  experience: {
    eyebrow: "Experiência",
    title: "Assim se vê fechar a lacuna.",
    cases: [
      {
        industry: "Agricultura",
        pillar: "execute",
        headline: "Do campo à decisão.",
        situation:
          "A atividade de colheita era registrada em papel — sem forma de medir o avanço frente aos objetivos do programa.",
        built:
          "Uma plataforma de ponta a ponta: captura de dados em campo, cultivos georreferenciados e relatórios operacionais gerados por IA.",
        changed: "O programa agora monitora seus objetivos com dados de campo ao vivo, não com papéis.",
      },
      {
        industry: "Oil & Gas",
        pillar: "plan",
        headline: "Demanda de água atendida ao menor custo energético.",
        situation:
          "Uma planta de injeção de água precisava de configurações de bombeamento que atendessem a demanda sem desperdiçar energia.",
        built: "A aplicação web que calcula a configuração ótima de frequência para cada cenário.",
        changed: "A operação agora funciona no menor custo energético que a demanda permite.",
      },
      {
        industry: "Transporte",
        pillar: "adapt",
        headline: "Ver a demanda antes de o ônibus chegar.",
        situation: "A lotação nas estações era um palpite até o ônibus chegar — tarde demais para ajustar.",
        built: "Um piloto de visão computacional que mede a densidade de pessoas nas estações em tempo real.",
        changed:
          "O planejamento do serviço agora parte do que acontece na plataforma, não só dos horários fixos.",
      },
    ],
  },
  process: {
    eyebrow: "MÉTODO",
    title: "Primeiro entendemos. Depois construímos.",
    intro:
      "Cada etapa tem uma entrega concreta. Não avançamos para a próxima até que a anterior gere clareza.",
    resultLabel: "Resultado",
    steps: [
      {
        title: "Entendemos o contexto",
        body: "Conversamos com você para entender como a operação funciona hoje, onde estão as fricções e quais decisões precisam de melhor suporte.",
        result: "Clareza sobre o problema que realmente vale a pena resolver.",
      },
      {
        title: "Projetamos a solução",
        body: "Traduzimos o diagnóstico em uma proposta concreta — para que você veja a solução antes de investir em desenvolvê-la.",
        result: "Uma solução clara, validada e alinhada à sua realidade.",
      },
      {
        title: "Construímos por etapas",
        body: "Desenvolvemos com entregas parciais e validações contínuas, focando primeiro no que mais agrega valor.",
        result: "Solução parcial funcionando, validada com usuários reais antes da entrega final.",
      },
      {
        title: "Implementamos e ajustamos",
        body: "Acompanhamos a implantação e os ajustes necessários para a solução ser bem adotada e gerar resultados desde o início.",
        result: "Uma solução funcionando em contexto real, com adoção e rastreabilidade.",
      },
    ],
    closing: "E quando já funciona, a preparamos para crescer — mais integração, mais analítica, mais automação.",
    strategyNote:
      "A cada etapa: a disciplina de estratégia e gestão por resultados que mantém a solução alinhada ao negócio — não como uma consultoria à parte.",
  },
  about: {
    panel: {
      eyebrow: "QUEM SOMOS",
      headline: "Operação + dados + tecnologia",
      body: "Desenvolvemos plataformas operacionais, modelos de ML e automações com IA em implementações reais.",
    },
    title: "A equipe que entende sua operação e constrói a solução.",
    members: [
      {
        name: "Luis Ramírez",
        role: "Operação · Dados · Arquitetura",
        credential: "Engenheiro Industrial. 15 anos conectando operação e tecnologia em logística, agroindústria e inteligência de dados.",
      },
      {
        name: "César Ramírez",
        role: "Estratégia · Resultados",
        credential: "5+ anos acompanhando organizações na implementação de estratégias operacionais e gestão por resultados em distribuição, telecomunicações e vendas.",
      },
      {
        name: "John Ramírez",
        role: "Desenvolvimento · IA · Cloud",
        credential: "10+ anos em apps, ML, visão computacional, sistemas multiagente e cloud.",
      },
    ],
    paragraphs: [
      "Não somos uma agência de desenvolvimento nem uma consultoria de estratégia. Somos engenharia de operações, desenvolvimento próprio e gestão por resultados — trabalhando como uma única equipe do diagnóstico à implementação.",
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
    body: "Agende uma sessão de diagnóstico de 30 minutos. Revisamos juntos como flui sua operação, identificamos onde se perdem dados, tempo ou decisões — e damos uma recomendação concreta, mesmo que você não trabalhe conosco.",
    ctaPrimary: "Agende seu diagnóstico gratuito",
    ctaReassurance: "Sem pitch de vendas · Sem compromisso · 30 minutos",
  },
} satisfies LandingContent;
