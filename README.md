# Tramelyx

> **Narrative engineering workspace** — crie, conecte, valide e mantenha histórias complexas sem perder o cânone.

Tramelyx é um projeto original para planejamento narrativo de jogos, livros, visual novels e histórias ramificadas. A proposta combina padrões consolidados de editores visuais e ferramentas de worldbuilding com um núcleo próprio focado em **consistência narrativa**.

## Diferencial do produto

O Tramelyx não deve ser apenas um editor de fluxogramas. Seu núcleo é composto por quatro sistemas:

1. **Story Graph** — o que acontece e como os eventos se conectam.
2. **Canon Engine** — o que é verdade no universo e em qual momento.
3. **Knowledge Graph** — quem sabe o quê, quando e por qual origem.
4. **State Engine** — como escolhas, condições e variáveis alteram o mundo.

Sobre esses quatro sistemas vivem recursos como timeline, personagens, worldbuilding, segredos/revelações, histórico, validação, simulação de rotas e exportações.

## Estado atual

- **Versão:** `0.1.x-foundation`
- **Status:** fundação / protótipo funcional
- **Custo obrigatório para desenvolvimento e publicação:** R$ 0
- **Frontend:** HTML, CSS e JavaScript sem dependência obrigatória de framework
- **Persistência web atual:** local/offline
- **Backend Service:** API REST Node.js v0.1, sem dependências externas, com adapter de persistência substituível
- **Hospedagem da demonstração:** GitHub Pages
- **Quality gate:** GitHub Actions valida frontend, backend, JSON, HTML e smoke tests da API

## Princípios permanentes

- Código próprio; referências externas servem apenas para estudar padrões de UX e arquitetura.
- Nenhuma atualização pode quebrar silenciosamente o frontend existente.
- Componentes visuais devem respeitar o Design System e os tokens definidos no projeto.
- Layout responsivo e progressive enhancement desde o início.
- Código-fonte comentado nos pontos de intenção, regra de negócio, integração e decisão arquitetural.
- HTML semanticamente organizado e indentado.
- Mudanças relevantes exigem atualização do `CHANGELOG.md` e da documentação correspondente.
- Dados narrativos, interface, API e persistência devem permanecer desacoplados.
- O sistema deve ser **flexível como água para extensão e sólido como pedra em seus contratos centrais**.

## Estrutura atual

```text
/
├── .github/workflows/quality.yml
├── index.html
├── manifest.webmanifest
├── sw.js
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   └── app.css
│   └── js/
│       ├── data.js
│       ├── state.js
│       └── app.js
├── services/
│   └── api/
│       ├── src/
│       │   ├── server.js
│       │   ├── router.js
│       │   ├── store.js
│       │   └── validator.js
│       ├── data/seed.json
│       ├── test/api.test.js
│       └── package.json
├── docs/
│   ├── FOUNDATION-PROMPT.md
│   ├── PRODUCT-RULES.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN-SYSTEM.md
│   ├── BENCHMARK.md
│   ├── BACKEND-SERVICE.md
│   ├── BACKLOG.md
│   ├── ZERO-COST-LAUNCH.md
│   └── ROADMAP.md
└── CHANGELOG.md
```

## Rodando o frontend localmente

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Rodando o Backend Service

```bash
cd services/api
npm start
```

A API inicia em `http://127.0.0.1:8787` por padrão.

Testes:

```bash
cd services/api
npm test
```

A documentação da API e da arquitetura está em [`docs/BACKEND-SERVICE.md`](docs/BACKEND-SERVICE.md). O trabalho futuro priorizado está em [`docs/BACKLOG.md`](docs/BACKLOG.md).

## Colocando o frontend no ar por R$ 0

O passo a passo está em [`docs/ZERO-COST-LAUNCH.md`](docs/ZERO-COST-LAUNCH.md). O GitHub Pages publica a interface estática; o Backend Service precisa de um ambiente separado quando for exposto por HTTPS.

## Licença

Ainda não definida. Enquanto isso, considere o conteúdo do projeto como **todos os direitos reservados** ao autor do repositório.
