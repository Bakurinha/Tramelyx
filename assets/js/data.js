/*
  Tramelyx Demo Domain Data
  -------------------------
  Dados narrativos ficam separados da interface. Nesta v0.1, o projeto de
  demonstração prova os contratos do domínio sem depender de backend.
*/

(function (global) {
  "use strict";

  global.TramelyxData = {
    schemaVersion: 1,

    project: {
      id: "demo-project",
      name: "A Última Estação",
      type: "Interactive Story",
      status: "Prototype",
      updatedAt: "2026-09-29T10:30:00-03:00"
    },

    /*
      Story Graph: cada nó possui destinos explícitos. A v0.1 não implementa
      ainda uma canvas drag-and-drop; o modelo já nasce pronto para isso.
    */
    nodes: [
      {
        id: "node-001",
        title: "Sinal na plataforma",
        type: "scene",
        summary: "A protagonista encontra uma transmissão impossível numa estação abandonada.",
        status: "canon",
        targets: ["node-002"]
      },
      {
        id: "node-002",
        title: "Responder ou observar",
        type: "decision",
        summary: "O jogador decide se responde ao sinal ou investiga a origem silenciosamente.",
        status: "canon",
        targets: ["node-003", "node-004"]
      },
      {
        id: "node-003",
        title: "Contato antecipado",
        type: "scene",
        summary: "Responder cria uma relação direta, mas altera o estado de confiança da rota.",
        status: "provisional",
        targets: ["node-005"]
      },
      {
        id: "node-004",
        title: "Sala de manutenção",
        type: "scene",
        summary: "A investigação revela um registro técnico que contradiz a versão oficial.",
        status: "canon",
        targets: ["node-005"]
      },
      {
        id: "node-005",
        title: "Primeiro ponto sem retorno",
        type: "ending",
        summary: "As rotas convergem, mas carregam estados e conhecimentos diferentes.",
        status: "canon",
        targets: []
      }
    ],

    /*
      Canon Engine: fatos possuem status e ponto de vigência. O campo
      effectiveFrom usa IDs narrativos para permitir análise de impacto futura.
    */
    canonFacts: [
      {
        id: "fact-001",
        statement: "A estação foi oficialmente desativada há doze anos.",
        status: "canon",
        effectiveFrom: "node-001",
        tags: ["world", "station"]
      },
      {
        id: "fact-002",
        statement: "A transmissão usa uma chave que não deveria existir na rede atual.",
        status: "canon",
        effectiveFrom: "node-004",
        tags: ["mystery", "signal"]
      },
      {
        id: "fact-003",
        statement: "O operador do sinal conhece a protagonista antes do primeiro contato.",
        status: "provisional",
        effectiveFrom: "",
        tags: ["mystery", "character"]
      }
    ],

    /*
      Knowledge Graph: subject pode futuramente ser personagem, facção, leitor
      ou sistema. knows aceita estados mais ricos que apenas booleano.
    */
    knowledge: [
      {
        id: "knowledge-001",
        subject: "Mara",
        factId: "fact-001",
        knows: "confirmed",
        fromNodeId: "node-001",
        since: "Abertura"
      },
      {
        id: "knowledge-002",
        subject: "Mara",
        factId: "fact-002",
        knows: "confirmed",
        fromNodeId: "node-004",
        since: "Investigação"
      },
      {
        id: "knowledge-003",
        subject: "Leitor",
        factId: "fact-003",
        knows: "suspected",
        fromNodeId: "node-003",
        since: "Rota de contato"
      }
    ],

    stateVariables: [
      {
        id: "state-001",
        name: "trust_operator",
        type: "number",
        initialValue: 0,
        scope: "route"
      },
      {
        id: "state-002",
        name: "maintenance_log_found",
        type: "boolean",
        initialValue: false,
        scope: "route"
      }
    ],

    timeline: [
      {
        id: "event-001",
        label: "T-12 anos",
        title: "Desativação oficial",
        description: "A administração declara a estação permanentemente encerrada."
      },
      {
        id: "event-002",
        label: "T-3 dias",
        title: "Primeiro ruído detectado",
        description: "Um padrão criptografado reaparece na frequência da antiga rede."
      },
      {
        id: "event-003",
        label: "T0",
        title: "Entrada de Mara",
        description: "A história jogável começa com a chegada à plataforma principal."
      }
    ],

    reveals: [
      {
        id: "reveal-001",
        secret: "Quem controla a transmissão",
        stage: "seeded",
        plannedAt: "Capítulo 1",
        fullRevealAt: "Capítulo 5",
        notes: "A v0.1 registra planejamento; o Reveal Engine fará validação profunda futuramente."
      },
      {
        id: "reveal-002",
        secret: "Motivo real da desativação",
        stage: "hidden",
        plannedAt: "Capítulo 2",
        fullRevealAt: "Capítulo 4",
        notes: "Pistas devem existir antes da confirmação completa."
      }
    ],

    history: [
      {
        id: "history-001",
        at: "2026-09-29T09:40:00-03:00",
        action: "Foundation created",
        detail: "Projeto demonstrativo inicial criado para validar os quatro contratos centrais."
      },
      {
        id: "history-002",
        at: "2026-09-29T10:05:00-03:00",
        action: "Canon reviewed",
        detail: "O fato sobre o operador foi marcado como provisório até existir evidência narrativa suficiente."
      }
    ]
  };
}(window));
