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

- **Versão:** `0.1.0-foundation`
- **Status:** fundação / protótipo funcional
- **Custo obrigatório para desenvolvimento e publicação:** R$ 0
- **Frontend:** HTML, CSS e JavaScript sem dependência obrigatória de framework
- **Persistência inicial:** local/offline
- **Hospedagem recomendada da demonstração:** GitHub Pages ou Cloudflare Pages
- **Quality gate:** GitHub Actions valida sintaxe JavaScript, manifesto, HTML e documentos obrigatórios

## Princípios permanentes

- Código próprio; referências externas servem apenas para estudar padrões de UX e arquitetura.
- Nenhuma atualização pode quebrar silenciosamente o frontend existente.
- Componentes visuais devem respeitar o Design System e os tokens definidos no projeto.
- Layout responsivo e progressive enhancement desde o início.
- Código-fonte comentado nos pontos de intenção, regra de negócio, integração e decisão arquitetural.
- HTML semanticamente organizado e indentado.
- Mudanças relevantes exigem atualização do `CHANGELOG.md` e da documentação correspondente.
- Dados narrativos e interface devem permanecer desacoplados.
- O sistema deve ser **flexível como água para extensão e sólido como pedra em seus contratos centrais**.

## Estrutura da v0.1

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
├── docs/
│   ├── FOUNDATION-PROMPT.md
│   ├── PRODUCT-RULES.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN-SYSTEM.md
│   ├── BENCHMARK.md
│   ├── ZERO-COST-LAUNCH.md
│   └── ROADMAP.md
└── CHANGELOG.md
```

## Rodando localmente

Como a base é estática, qualquer servidor HTTP simples funciona. Exemplo com Python:

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

> Abrir o `index.html` diretamente também exibe a interface, mas recursos de PWA/service worker exigem HTTPS ou localhost.

## Colocando no ar por R$ 0

O passo a passo está em [`docs/ZERO-COST-LAUNCH.md`](docs/ZERO-COST-LAUNCH.md). Para a demonstração atual, basta habilitar GitHub Pages apontando para `main` e `/ (root)`.

## Licença

Ainda não definida. Enquanto isso, considere o conteúdo do projeto como **todos os direitos reservados** ao autor do repositório.
