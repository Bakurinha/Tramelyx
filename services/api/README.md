# Tramelyx Backend Service v0.1

Backend REST separado do frontend do Tramelyx. A fundação usa apenas módulos nativos do Node.js e armazenamento JSON local para manter custo obrigatório zero e permitir migração posterior sem alterar os contratos HTTP.

## Rodar

```bash
cd services/api
npm start
```

Por padrão, o serviço fica em `http://127.0.0.1:8787`.

## Testar

```bash
cd services/api
npm test
```

## Rotas v0.1

- `GET /health`
- `GET /api/v1/projects`
- `POST /api/v1/projects`
- `GET /api/v1/projects/:id`
- `GET|POST /api/v1/projects/:id/nodes`
- `GET|POST /api/v1/projects/:id/canon`
- `GET|POST /api/v1/projects/:id/knowledge`
- `GET|POST|PATCH /api/v1/projects/:id/state`
- `POST /api/v1/projects/:id/validate`

## Segurança

No modo local de desenvolvimento, escrita é permitida sem token. Em `NODE_ENV=production`, a API bloqueia operações de escrita quando `TRAMELYX_WRITE_TOKEN` não estiver configurado.

Um token estático **não deve ser colocado no frontend público**. O bloqueio existe apenas para impedir que a fundação seja publicada acidentalmente como uma API de escrita aberta. Autenticação real faz parte do backlog antes de sincronização pública.

Variáveis úteis:

```text
HOST=127.0.0.1
PORT=8787
TRAMELYX_DB_FILE=/caminho/db.json
TRAMELYX_ALLOWED_ORIGINS=http://localhost:8080,https://bakurinha.github.io
TRAMELYX_WRITE_TOKEN=segredo-apenas-no-servidor
NODE_ENV=development
```

## Regra arquitetural

As rotas dependem de um `store` abstrato em `src/store.js`. A troca de JSON para SQLite, Cloudflare D1 ou Postgres deve ocorrer atrás desse adaptador, sem obrigar o frontend a conhecer o banco usado.
