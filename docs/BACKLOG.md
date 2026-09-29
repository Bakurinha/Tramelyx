# Backlog — Tramelyx Backend

Este backlog prioriza colocar o backend em produção sem sacrificar o diferencial narrativo nem quebrar o frontend local-first.

## P0 — obrigatório antes de escrita pública

### B-001 — Storage adapter de produção

**Objetivo:** substituir JSON local por persistência adequada a múltiplos usuários.

**Aceite:**
- adapter mantém os contratos atuais;
- migra schema versionado;
- operações críticas são transacionais;
- testes cobrem criação/leitura/alteração;
- backup/exportação documentados.

### B-002 — Autenticação e autorização por projeto

**Objetivo:** garantir que cada usuário só acesse projetos permitidos.

**Aceite:**
- sessão segura;
- owner/editor/viewer;
- nenhum segredo no frontend;
- rotas de escrita exigem identidade;
- testes negativos de permissão.

### B-003 — Sync Bridge web ↔ API

**Objetivo:** sincronizar sem substituir o armazenamento local.

**Aceite:**
- IndexedDB continua como fonte local;
- fila de mudanças offline;
- retry controlado;
- indicador de sincronização;
- conflito não apaga conteúdo silenciosamente.

### B-004 — Deploy HTTPS e configuração de ambiente

**Objetivo:** tornar a API acessível ao GitHub Pages de forma segura.

**Aceite:**
- URL HTTPS estável;
- CORS limitado ao frontend oficial;
- healthcheck externo;
- variáveis de ambiente separadas;
- documentação de rollback.

## P1 — tornar os quatro motores realmente conectados

### B-005 — Story Graph CRUD completo

- editar/excluir nós;
- criar/remover arestas;
- IDs imutáveis;
- impedir exclusão destrutiva sem análise de impacto;
- detectar nós órfãos e inalcançáveis.

### B-006 — Canon Engine Service

- estados de cânone tipados;
- vigência;
- retcon;
- origem/evidência;
- análise de impacto inicial;
- referências reversas.

### B-007 — Knowledge Engine Service

- conhecimento por personagem/facção/leitor;
- origem;
- momento de aquisição;
- informação suspeita/falsa/confirmada;
- alerta de conhecimento precoce.

### B-008 — State Engine Service

- tipos boolean/number/string/enum;
- condições;
- efeitos por Story Node;
- snapshots por rota;
- cálculo de estado após sequência de escolhas;
- nós bloqueados por estado.

### B-009 — Validator v2

- regras declarativas;
- códigos de erro estáveis;
- dead ends;
- fatos órfãos;
- conhecimento impossível;
- condições impossíveis;
- relatório de cobertura narrativa.

## P2 — confiabilidade e colaboração

### B-010 — Schema migrations

- versão de schema por projeto;
- migrations reversíveis quando possível;
- backup antes de migration destrutiva;
- testes com projetos antigos.

### B-011 — Observabilidade

- request id;
- logs estruturados;
- métricas de erro/latência;
- sem registrar conteúdo narrativo sensível desnecessariamente.

### B-012 — Proteções de API

- rate limiting;
- limites de payload;
- validação forte de entrada;
- proteção contra abuso;
- headers de segurança.

### B-013 — Histórico semântico no servidor

- snapshots;
- diff narrativo;
- autoria da mudança;
- restauração;
- integração com Narrative Git futuro.

## P3 — integrações futuras

### B-014 — Export/import service

- JSON estável;
- Markdown;
- backups portáveis;
- verificação de schema na importação.

### B-015 — Engine adapters

Somente após estabilização dos contratos:
- Godot;
- Unity;
- Unreal;
- CLI/CI.

## Ordem sugerida

```text
B-001 -> B-002 -> B-003 -> B-004
                    |
                    v
B-005 -> B-006 -> B-007 -> B-008 -> B-009
                    |
                    v
B-010 -> B-011 -> B-012 -> B-013
                    |
                    v
             B-014 -> B-015
```

A prioridade continua sendo: primeiro consistência e segurança; depois colaboração e escala.
