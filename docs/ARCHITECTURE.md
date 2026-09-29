# Arquitetura — Tramelyx v0.1

## Objetivo

A v0.1 valida produto e interação sem criar dívida desnecessária de infraestrutura. A aplicação é estática, local-first e separa domínio, estado e apresentação para permitir evolução posterior.

## Camadas

### 1. Domain data

Representa projetos, nós narrativos, fatos de cânone, conhecimento, eventos, revelações e histórico. Nesta versão, dados de demonstração ficam em `assets/js/data.js`.

### 2. State

`assets/js/state.js` controla leitura, escrita e versionamento local. O contrato é deliberadamente simples para ser substituído futuramente por IndexedDB e/ou sincronização remota sem reescrever as telas.

### 3. Presentation

`assets/js/app.js` traduz o estado em interface e registra eventos de interação. O DOM não é a fonte de verdade.

### 4. Design System

`assets/css/tokens.css` centraliza decisões visuais. `assets/css/app.css` implementa os componentes e layouts.

## Modelo conceitual central

```text
Project
 ├── Story Graph
 │    ├── Node
 │    └── Connection
 ├── Canon Engine
 │    └── Canon Fact
 ├── Knowledge Graph
 │    └── Knowledge Edge
 ├── State Engine
 │    └── State Variable
 ├── Timeline
 │    └── Event
 ├── Reveals
 │    └── Reveal Plan
 └── History
      └── Change Entry
```

## Contratos previstos

### Node

```text
id, title, type, summary, status, targets[]
```

### Canon Fact

```text
id, statement, status, effectiveFrom, tags[]
```

### Knowledge Edge

```text
id, subject, factId, knows, fromNodeId, since
```

### State Variable

```text
id, name, type, initialValue, scope
```

Esses formatos ainda podem evoluir antes da v1.0, mas mudanças devem passar por migração de schema.

## Persistência

### v0.1

- `localStorage` para protótipo e alterações leves.
- Dados de demonstração incorporados ao bundle.
- `schemaVersion` salvo junto ao projeto.

### v0.2 planejada

- IndexedDB para projetos maiores e dados estruturados.
- Importação/exportação JSON.
- Migrações de schema.

### Nuvem futura

A camada de persistência deverá implementar a mesma interface do armazenamento local. Supabase é um candidato para autenticação/Postgres no estágio de colaboração, mas não é dependência do produto nesta versão.

## Publicação gratuita

### Opção principal para demo

GitHub Pages, por ser suficiente para o protótipo estático.

### Alternativa

Cloudflare Pages, principalmente se no futuro forem necessários deploys mais flexíveis ou Functions.

A aplicação não deve assumir detalhes específicos do provedor de hospedagem.

## Responsividade

Breakpoints são definidos por necessidade do layout, não por marcas de dispositivo:

- Base: 320 px+
- Compacto: até 720 px
- Médio: 721–1024 px
- Amplo: 1025 px+

A experiência moderna completa é alvo de navegadores atuais. Dispositivos antigos devem receber conteúdo básico legível sempre que possível.

## Estratégia de crescimento

### Quando adotar framework?

Somente quando complexidade de componentes, routing, testes e estado tornar o custo do Vanilla JS maior do que o benefício. A migração recomendada, se necessária, é React + TypeScript ou equivalente, preservando contratos de domínio e tokens.

### Quando adotar backend?

Quando houver pelo menos uma necessidade validada de:

- autenticação;
- sincronização entre dispositivos;
- colaboração;
- compartilhamento de projetos;
- backup remoto;
- equipes/permissões.

Não antecipar essa infraestrutura na v0.1.

## Segurança e privacidade

- A v0.1 não recebe credenciais nem dados sensíveis em servidor próprio.
- Nenhuma chave privada deve existir no frontend.
- Serviços futuros deverão usar regras de acesso por usuário/projeto.
- Exportação e exclusão de dados devem ser funções de primeira classe quando nuvem for introduzida.

## Regra de migração

Toda substituição de tecnologia deve preservar, nesta ordem:

1. dados do usuário;
2. contratos do domínio;
3. comportamento das features;
4. identidade visual;
5. implementação interna.

Implementação é descartável; dados e contratos não são.
