# Benchmark funcional e direção de originalidade

Este documento registra o que estudamos em ferramentas existentes e qual problema o Tramelyx deve resolver de forma própria.

## Referências de mercado

### Arcweave

Padrões observados: workspace visual, narrativa ramificada, playtest, variáveis, componentes e integrações.

**Não copiar:** identidade, composição específica, nomenclaturas exclusivas, assets ou fluxo proprietário.

**Aprendizado:** narrativa visual precisa de contexto permanente, navegação simples e feedback rápido.

### articy:draft X

Padrões observados: flow editor, game object database, scripting, checkup tools, exportações e integrações.

**Aprendizado:** projetos complexos precisam separar dados narrativos da visualização e oferecer validação.

### Plottr

Padrões observados: timeline visual, scene cards, plotlines, story bible e planejamento de séries.

**Aprendizado:** autores precisam trocar de perspectiva sem duplicar informação.

### World Anvil / LegendKeeper

Padrões observados: worldbuilding, wiki, timeline, relações, mapas e organização de lore.

**Aprendizado:** universo narrativo não é apenas sequência de cenas; entidades e história do mundo precisam se relacionar.

### Twine / Yarn Spinner / ink

Padrões observados: narrativa condicional, branching e formatos próximos da execução.

**Aprendizado:** uma estrutura narrativa deve poder sair do planejamento e virar dado consumível por um jogo.

## Espaço próprio do Tramelyx

O Tramelyx não compete apenas por possuir mais ferramentas. O diferencial pretendido é a relação entre quatro modelos:

```text
Story Graph ────────┐
                    ├── Narrative Integrity
Canon Engine ───────┤
                    │
Knowledge Graph ────┤
                    │
State Engine ───────┘
```

### Narrative Integrity

A ideia central é permitir perguntas que ferramentas de escrita tradicionais normalmente não respondem automaticamente:

- Esta cena contradiz algo já canônico?
- Este personagem poderia saber esta informação neste ponto?
- Esta revelação aconteceu antes da pista necessária?
- Esta alteração invalida quais cenas e rotas?
- Este final ainda é alcançável depois desta mudança?
- Qual evento causou este estado do personagem?

## Regra de benchmark

Quando uma ferramenta concorrente ganhar uma nova feature, não devemos copiá-la automaticamente. Primeiro classificar:

1. **Padrão esperado de categoria** — pode ser implementado de forma própria.
2. **Diferencial do concorrente** — estudar o problema, não a solução visual/técnica.
3. **Irrelevante ao núcleo** — ignorar.
4. **Ameaça direta ao diferencial Tramelyx** — avaliar e responder com profundidade, não imitação.

## Regra de UX

O Tramelyx pode parecer imediatamente familiar a quem usa software profissional, mas não deve parecer uma cópia de um produto específico.

Familiaridade vem de:

- sidebar;
- topbar;
- workspace;
- inspector contextual;
- atalhos;
- breadcrumbs;
- status e feedback;
- painéis redimensionáveis futuramente.

Identidade própria vem de:

- modelo de integridade narrativa;
- linguagem visual;
- tipos de informação;
- validação;
- relações entre Canon, Knowledge, State e Story.
