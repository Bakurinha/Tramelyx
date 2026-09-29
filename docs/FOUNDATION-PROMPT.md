# Prompt de Fundação — Tramelyx v0.1

Este documento é o contrato de execução usado para construir a primeira base do Tramelyx. Ele deve ser relido antes de alterações estruturais relevantes.

## Prompt aplicado

> Construa o Tramelyx como um ambiente original de engenharia narrativa para jogos, livros, visual novels e histórias ramificadas. Use produtos existentes apenas como referência de padrões maduros de UX, organização, navegação e clareza; não copie identidade visual, textos, assets, código, nomenclatura proprietária ou disposição distintiva de um concorrente.
>
> O núcleo do produto deve ser formado por quatro contratos estáveis: Story Graph, Canon Engine, Knowledge Graph e State Engine. Recursos futuros devem se conectar a esses contratos sem acoplamento desnecessário ao frontend.
>
> A versão 0.1 deve ser funcional, publicável com custo obrigatório zero, sem backend pago, sem dependência obrigatória de framework e sem exigir instalação para ser testada. Deve oferecer uma demonstração navegável, persistência local mínima, visual profissional, dark/light mode, validação narrativa inicial, histórico local e um Story Graph demonstrável.
>
> A interface deve adotar padrões profissionais comuns a ferramentas criativas: navegação lateral, barra superior contextual, área central de trabalho, painéis/cards claros, hierarquia visual consistente e inspector/feedback contextual quando necessário. A identidade visual e a linguagem do Tramelyx devem ser próprias.
>
> Toda interface deve ser construída a partir de tokens de design e componentes reutilizáveis. Nenhuma atualização deve alterar arbitrariamente espaçamentos, tipografia, superfícies, cores semânticas ou comportamento responsivo fora desses contratos. Novas funcionalidades devem estender componentes existentes ou justificar explicitamente um novo padrão.
>
> O frontend deve seguir progressive enhancement. Em navegadores modernos, oferecer a experiência completa. Em telas pequenas e ambientes limitados, manter conteúdo legível, navegação alcançável e operações essenciais sempre que a plataforma permitir. Não prometer compatibilidade funcional total com navegadores obsoletos.
>
> O código deve ser legível, indentado e comentado onde houver intenção, regra de negócio, integração, fallback, estado ou decisão arquitetural. Comentários não devem repetir literalmente o que a linha já diz.
>
> Dados narrativos devem permanecer separados da apresentação. Alterações estruturais devem ser versionadas, documentadas no CHANGELOG e, quando afetarem contratos do produto, refletidas na documentação correspondente.
>
> Priorize simplicidade reversível na v0.1. Não implemente infraestrutura complexa antes que exista necessidade real. Escolhas temporárias devem ter uma rota de migração documentada.
>
> O projeto deve ser flexível como água nas extensões e sólido como pedra nos contratos centrais.

## Releitura crítica do prompt

A primeira versão mental deste prompt tinha falhas. Elas foram corrigidas antes da implementação.

### 1. “Funcionar em qualquer dispositivo” era absoluto demais

**Falha:** dispositivos como Nintendo 3DS usam navegadores antigos e não suportam diversos recursos modernos. Tentar garantir equivalência total obrigaria o projeto a ficar preso a tecnologia obsoleta.

**Correção:** adotar progressive enhancement. O conteúdo básico deve degradar com dignidade; a experiência completa exige navegador moderno.

### 2. “Todo código comentado” poderia gerar comentários inúteis

**Falha:** comentar cada linha reduz a legibilidade e aumenta manutenção.

**Correção:** comentários são obrigatórios para intenção, contratos, regras, fallbacks, estado e trechos não óbvios. Código autoexplicativo não recebe comentário redundante.

### 3. “Parecer igual aos concorrentes” poderia virar cópia

**Falha:** reproduzir layout distintivo, identidade ou assets cria risco de plágio visual e reduz a identidade do Tramelyx.

**Correção:** reutilizar apenas padrões genéricos consolidados de produtos profissionais — shell de aplicação, hierarquia, navegação contextual, painéis, estados e affordances — com sistema visual próprio.

### 4. “Zero custo” poderia travar a arquitetura

**Falha:** exigir que qualquer escala futura permaneça para sempre em R$ 0 é incompatível com crescimento real de usuários, armazenamento e colaboração.

**Correção:** custo obrigatório zero durante protótipo e validação. A arquitetura deve permitir migração para infraestrutura paga apenas quando uso real justificar.

### 5. “Não quebrar o frontend” precisava virar regra verificável

**Falha:** sem contratos visuais, a regra seria apenas intenção.

**Correção:** tokens de design, breakpoints documentados, componentes reutilizáveis, checklist de regressão, changelog e versões semânticas passam a ser parte do contrato.

### 6. O diferencial precisava estar protegido contra feature creep

**Falha:** adicionar dezenas de recursos genéricos poderia transformar o produto em mais um editor de roteiro.

**Correção:** toda funcionalidade futura deve responder a pelo menos uma destas perguntas: melhora o Story Graph? protege o cânone? modela conhecimento? simula estado/consequência? Se não, precisa justificar seu valor estratégico.

## Critérios de aceite da v0.1

- Interface navegável em desktop e mobile.
- Dark/light mode.
- Dashboard funcional.
- Story Graph demonstrável e extensível.
- Canon Engine, Knowledge Graph, Timeline, Reveals, Validator e History representados na interface.
- Persistência local mínima para alterações do protótipo.
- Validador produz feedback real a partir dos dados do projeto.
- Sem dependências externas obrigatórias para carregar a aplicação.
- Documentação de arquitetura, design e roadmap presente.
- CHANGELOG atualizado.
