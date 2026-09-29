# Backend Service — Tramelyx

## Objetivo

Criar uma camada de serviço para o Tramelyx sem acoplar o frontend ao banco, ao provedor de nuvem ou a uma implementação específica de autenticação.

A primeira versão é intencionalmente simples: API REST em Node.js, sem dependências externas, armazenamento JSON local e validator reaproveitável. Ela serve para validar contratos antes de escolher infraestrutura definitiva.

## Princípios

1. O frontend não conhece o banco.
2. Rotas HTTP não contêm regras narrativas profundas.
3. Story Graph, Canon, Knowledge e State permanecem contratos centrais.
4. Persistência é substituível atrás de um adapter.
5. Escrita pública sem autenticação é proibida em produção.
6. Nenhum segredo deve existir no JavaScript público.
7. Toda mudança incompatível deve versionar a API (`/api/v1`, `/api/v2`, etc.).
8. Validação narrativa deve ser reutilizável por API, CLI e CI.

## Arquitetura

```text
GitHub Pages / Web Client
          |
          | HTTPS / JSON
          v
    Tramelyx API v1
          |
    +-----+-------------------------+
    | Router                        |
    | - CORS                        |
    | - parsing                     |
    | - autenticação (futura)       |
    +-----+-------------------------+
          |
    +-----+-------------------------+
    | Narrative services            |
    | - Validator                   |
    | - Story Graph (futuro)        |
    | - Canon Engine (futuro)       |
    | - Knowledge Engine (futuro)   |
    | - State Engine (futuro)       |
    +-----+-------------------------+
          |
    +-----+-------------------------+
    | Storage adapter               |
    | JSON agora                    |
    | SQLite/D1/Postgres depois     |
    +-------------------------------+
```

## Contratos HTTP v0.1

Base: `/api/v1`

### Saúde

`GET /health`

Permite monitorar versão e disponibilidade do serviço.

### Projetos

`GET /projects`

`POST /projects`

`GET /projects/:id`

### Story Graph

`GET /projects/:id/nodes`

`POST /projects/:id/nodes`

### Canon Engine

`GET /projects/:id/canon`

`POST /projects/:id/canon`

### Knowledge Graph

`GET /projects/:id/knowledge`

`POST /projects/:id/knowledge`

### State Engine

`GET /projects/:id/state`

`POST|PATCH /projects/:id/state`

A fundação já permite materializar variáveis de estado pelo backend, mesmo antes da simulação completa de rotas.

### Narrative Validator

`POST /projects/:id/validate`

O backend já cruza Story Graph, Canon e Knowledge para detectar referências inválidas e fatos provisórios sem vigência.

## Persistência local

O adapter atual usa JSON em disco apenas para desenvolvimento e testes. Escritas são feitas por arquivo temporário + rename para reduzir risco de arquivo parcialmente gravado.

Não é a persistência planejada para colaboração multiusuário.

## Segurança

A API inicia em `127.0.0.1` por padrão. Isso evita expor o servidor local acidentalmente na rede.

Em produção:

- escrita sem `TRAMELYX_WRITE_TOKEN` é bloqueada na fundação;
- o token nunca pode ser colocado no frontend público;
- antes de sincronização real, substituir esse mecanismo por autenticação de usuário e autorização por projeto;
- CORS deve aceitar apenas origens explicitamente configuradas;
- rate limiting, auditoria e limites por usuário entram antes de abertura pública.

## Integração com o frontend

O frontend atual é síncrono/local-first. Não será convertido abruptamente para chamadas remotas porque isso quebraria o contrato existente.

A integração deverá usar um **Sync Bridge**:

```text
UI
 |
 v
Local State / IndexedDB
 |
 +---- autosave local
 |
 +---- Sync Bridge ----> API
```

Assim, a interface continua rápida e utilizável offline. O backend adiciona sincronização e colaboração sem substituir destrutivamente o modo local.

## Critério para trocar o JSON

Migrar o adapter quando pelo menos uma destas necessidades existir:

- mais de um processo escrevendo no mesmo banco;
- múltiplos usuários;
- hospedagem serverless;
- busca/indexação persistente;
- transações reais;
- colaboração concorrente;
- backups remotos.

A troca deve preservar os contratos `/api/v1` sempre que possível.
