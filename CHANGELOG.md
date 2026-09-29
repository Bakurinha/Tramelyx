# Changelog

Todas as mudanças relevantes do Tramelyx devem ser registradas neste arquivo.

O projeto seguirá princípios de Semantic Versioning à medida que os contratos amadurecerem.

## [Unreleased]

### Documentation

- Guia `ZERO-COST-LAUNCH.md` com publicação gratuita, limites do GitHub Pages, caminho para backend gratuito e checklist de lançamento.
- README atualizado para refletir a estrutura real da v0.1 e apontar o guia de lançamento.

## [0.1.0] - 2026-09-29

### Added

- Fundação conceitual baseada em Story Graph, Canon Engine, Knowledge Graph e State Engine.
- Prompt de fundação auditado e regras permanentes de produto.
- Benchmark funcional e limites explícitos de originalidade.
- Arquitetura local-first com rota de migração para IndexedDB e nuvem.
- Design System baseado em tokens e componentes reutilizáveis.
- App shell responsivo com navegação lateral em desktop e navegação compacta em mobile.
- Tema claro/escuro persistido localmente.
- Dashboard de projeto.
- Story Graph demonstrável com criação de nós locais.
- Canon Engine demonstrável.
- Knowledge Graph demonstrável.
- Timeline e planejamento de revelações.
- Narrative Validator com checagem real de referências entre Story Graph, cânone e conhecimento.
- Histórico local de alterações.
- Service worker para cache da shell e funcionamento offline após primeiro carregamento.
- Manifesto web básico.
- Roadmap progressivo até v1.0.

### Decisions

- Sem framework obrigatório na v0.1.
- Sem backend obrigatório na v0.1.
- Sem dependências externas de runtime.
- Progressive enhancement no lugar de promessa impossível de paridade com navegadores obsoletos.
- Recursos de concorrentes são referência de problema/padrão de UX, nunca fonte para copiar identidade, código ou assets.

### Known limitations

- Story Graph ainda não possui canvas drag-and-drop.
- Persistência de projeto usa localStorage e será migrada para IndexedDB.
- Edição profunda de fatos, conhecimento, timeline e revelações ainda não está disponível.
- Manifesto ainda não contém pacote completo de ícones para instalação PWA em todos os navegadores.
- Não há autenticação, sincronização ou colaboração na nuvem.
