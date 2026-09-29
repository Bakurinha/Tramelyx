# Design System — Tramelyx

## Direção visual

A interface deve transmitir ferramenta criativa profissional, técnica e calma. A referência é o padrão de aplicações de produtividade/narrative design: navegação lateral clara, grande área de trabalho, superfícies discretas e feedback contextual. A identidade não deve reproduzir a marca ou composição exclusiva de concorrentes.

## Princípios

- Conteúdo é mais importante que decoração.
- Informação complexa deve parecer organizada, não “cheia”.
- Cores fortes são reservadas para ação, estado e semântica.
- Densidade pode aumentar em desktop, mas nunca às custas de legibilidade.
- Mobile reorganiza prioridade; não apenas encolhe desktop.
- Toda decisão visual recorrente deve nascer de token.

## Tokens

Os tokens estão em `assets/css/tokens.css` e cobrem:

- cores de fundo, superfície, borda e texto;
- cores semânticas de destaque, sucesso, atenção e perigo;
- escala de espaçamento;
- raios;
- sombras;
- tipografia;
- velocidades de transição;
- largura da navegação.

## Estrutura de aplicação

```text
┌─────────────────────────────────────────────────────┐
│ Topbar / contexto do projeto                        │
├──────────────┬──────────────────────────────────────┤
│ Navegação    │                                      │
│ lateral      │           Workspace                  │
│              │                                      │
│ módulos      │                                      │
└──────────────┴──────────────────────────────────────┘
```

Em telas compactas, a navegação deixa de competir com a área central e passa para uma faixa horizontal/compacta.

## Componentes-base da v0.1

- App shell
- Sidebar navigation
- Topbar
- Page header
- Stat card
- Panel
- Badge/status
- Primary/secondary button
- Story node
- Timeline entry
- Table/list row
- Validation result
- Empty state

## Semântica visual

- **Accent:** ação principal e seleção.
- **Success:** regra válida/estado concluído.
- **Warning:** atenção, provisório, risco não bloqueante.
- **Danger:** inconsistência, erro, quebra de contrato.
- **Muted:** metadados e conteúdo secundário.

Nenhuma cor semântica deve ser usada apenas por estética.

## Responsividade

### Desktop amplo

Sidebar fixa, cards em múltiplas colunas e workspace com maior densidade.

### Tablet/notebook compacto

Sidebar mais estreita e grids reduzidos.

### Mobile

Navegação horizontal compacta, conteúdo em coluna única, botões críticos com área de toque confortável e ausência de interação obrigatória por hover.

### Navegadores antigos

A ordem semântica do HTML deve manter leitura possível mesmo quando grid, variáveis CSS ou recursos avançados não forem suportados. Não existe promessa de paridade visual.

## Acessibilidade

- `:focus-visible` não pode ser removido sem substituto.
- Contraste de texto e controles deve ser suficiente.
- `aria-current` identifica módulo atual.
- Botões devem ser elementos `<button>`, não `<div>` clicáveis.
- Redução de movimento deve desabilitar animações dispensáveis.

## Regra de evolução

Uma nova tela deve reutilizar componentes e tokens existentes. Se isso não for possível, a necessidade de um novo componente deve ser registrada aqui antes de espalhar o padrão pelo produto.
