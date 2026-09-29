# Regras permanentes do produto

Estas regras protegem a identidade, a arquitetura e a experiência do Tramelyx ao longo das versões.

## 1. Originalidade

- Concorrentes podem ser estudados para padrões de UX, ergonomia, nomenclaturas genéricas e fluxos de trabalho.
- É proibido copiar código, assets, identidade visual, textos, ilustrações, marca, layout distintivo ou solução proprietária de terceiros.
- Cada recurso deve ser reinterpretado a partir do problema do usuário e integrado aos diferenciais do Tramelyx.

## 2. Núcleo imutável por contrato

Os quatro sistemas abaixo são contratos centrais e não podem ser removidos ou renomeados sem decisão de versão principal:

- Story Graph
- Canon Engine
- Knowledge Graph
- State Engine

A implementação pode mudar; o contrato conceitual permanece.

## 3. Regra de diferencial

Antes de uma feature entrar no roadmap, deve responder ao menos uma destas perguntas:

1. Ajuda a compreender ou editar causalidade narrativa?
2. Protege o cânone ou detecta inconsistência?
3. Controla quem sabe o quê e quando?
4. Modela consequência, condição, variável ou estado do mundo?
5. Reduz trabalho repetitivo sem substituir a autoria criativa?

Features puramente cosméticas ou genéricas precisam de justificativa clara.

## 4. Frontend protegido

- Todo estilo novo deve preferir tokens existentes.
- Componentes reutilizáveis devem preceder duplicação de marcação.
- Mudanças globais de cor, raio, sombra, espaçamento ou tipografia exigem atualização de `DESIGN-SYSTEM.md`.
- O layout deve ser testado conceitualmente em 320 px, 768 px, 1024 px e 1440 px.
- Navegação essencial não pode depender apenas de hover.
- Estados de foco devem permanecer visíveis.
- Conteúdo nunca deve depender exclusivamente de cor para transmitir significado.
- Feature nova não pode alterar silenciosamente comportamento de componente compartilhado.

## 5. Compatibilidade e progressive enhancement

- HTML semântico é a primeira camada.
- CSS cria apresentação, mas conteúdo deve continuar compreensível quando recursos avançados falharem.
- JavaScript adiciona interação; falha de um recurso não deve apagar toda a página.
- Navegadores muito antigos recebem uma experiência básica, não equivalência total.
- Mobile é cenário de primeira classe, não adaptação tardia.

## 6. Código

- Indentação consistente.
- Funções pequenas e com responsabilidade clara.
- Estado do domínio separado de DOM/visual.
- Comentários obrigatórios em decisões, regras, fallbacks, integrações e trechos não óbvios.
- Comentário redundante de sintaxe deve ser evitado.
- Não introduzir dependência externa para resolver algo pequeno sem justificativa.
- Toda dependência futura deve ter motivo, licença e estratégia de remoção/migração documentados.

## 7. Dados

- Dados do projeto pertencem ao usuário.
- A v0.1 usa persistência local e dados de demonstração.
- A aplicação deve caminhar para exportação/importação portátil antes de depender de nuvem.
- Estruturas persistidas devem possuir versão de schema.
- Migrações nunca devem simplesmente apagar dados antigos.

## 8. Versionamento

- Seguir SemVer quando o produto amadurecer: `MAJOR.MINOR.PATCH`.
- Toda alteração funcional relevante atualiza `CHANGELOG.md`.
- Mudança de contrato central exige documentação e justificativa.
- Commits devem explicar intenção, não apenas “update”.

## 9. Performance

- Carregamento inicial deve permanecer leve.
- Recursos pesados devem ser carregados sob demanda quando possível.
- Não adicionar bibliotecas apenas por conveniência estética.
- O Story Graph deve ser projetado para virtualização futura, evitando presumir que todos os nós sempre caberão no DOM.

## 10. Acessibilidade

- Elementos interativos devem ser utilizáveis por teclado.
- Labels e nomes acessíveis são obrigatórios.
- Contraste deve permanecer adequado.
- Redução de movimento (`prefers-reduced-motion`) deve ser respeitada.
- Ícones não podem ser a única forma de identificar uma ação crítica.

## 11. Critério de conclusão

Uma feature só é considerada concluída quando:

- funciona no fluxo principal;
- possui estado vazio/erro quando aplicável;
- não quebra layout responsivo;
- não viola tokens/contratos visuais;
- documentação afetada foi atualizada;
- changelog foi atualizado;
- foi verificada contra as regras de diferencial.
