# Plano de lançamento com custo obrigatório zero

Este documento descreve como transformar a fundação do Tramelyx em uma demonstração pública utilizável sem custo obrigatório.

## Objetivo da v0.1

A v0.1 não é o produto final. Ela serve para validar três coisas antes de investir em infraestrutura:

1. se a interface é agradável e compreensível;
2. se os quatro contratos centrais fazem sentido na prática;
3. se o Narrative Validator e o modelo de integridade narrativa realmente geram valor.

## Stack atual

- Repositório: GitHub
- Frontend: HTML, CSS e JavaScript próprios
- Dependências externas de runtime: nenhuma
- Persistência: localStorage
- Offline: service worker
- CI: GitHub Actions
- Hospedagem de demonstração recomendada: GitHub Pages

## Publicar a demonstração no GitHub Pages

Como a aplicação já é estática e está na raiz do repositório, não existe etapa de build.

### Passo único no GitHub

1. Abra o repositório `Bakurinha/Tramelyx`.
2. Vá em **Settings**.
3. Abra **Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Branch: `main`.
6. Pasta: `/ (root)`.
7. Salve.

Depois da primeira publicação, o endereço esperado segue o padrão:

```text
https://bakurinha.github.io/Tramelyx/
```

## Limite importante do GitHub Pages

GitHub Pages é excelente para protótipo, documentação e demonstração pública, mas não deve ser tratado como infraestrutura definitiva de um SaaS comercial.

Quando o Tramelyx precisar de autenticação, colaboração, compartilhamento privado ou lógica de servidor, mantenha o frontend desacoplado e migre a hospedagem para uma plataforma adequada.

## Alternativa gratuita para produção inicial

Cloudflare Pages pode hospedar o mesmo frontend sem alteração estrutural. A vantagem é permitir evolução posterior para Functions/Workers e outros serviços sem transformar o frontend em dependente do provedor.

## Backend: quando adicionar

Não adicionar backend apenas porque “todo app tem backend”. Introduza somente quando houver uma necessidade concreta:

- sincronizar projetos entre dispositivos;
- login;
- compartilhamento;
- colaboração;
- backup remoto;
- equipes e permissões.

## Caminho gratuito sugerido para backend

Quando chegar esse momento:

1. Supabase Free para Postgres + autenticação + storage inicial.
2. Interface de persistência no frontend continua a mesma.
3. IndexedDB permanece como cache/local-first.
4. Sincronização remota entra como camada adicional, não como substituição destrutiva do modo local.

## O que fazer antes de cadastrar usuários reais

- Implementar exportação/importação JSON.
- Migrar localStorage para IndexedDB.
- Criar CRUD completo de projetos/nós/fatos/conhecimento.
- Criar versionamento de schema e migrações.
- Definir política de privacidade.
- Definir exclusão e exportação de dados.
- Adicionar testes de regressão de frontend.
- Testar acessibilidade por teclado.
- Testar em Chrome, Firefox e navegador móvel.

## Checklist visual mínimo

Validar pelo menos estas larguras:

- 320 px
- 360 px
- 390 px
- 768 px
- 1024 px
- 1366 px
- 1440 px

Em cada largura conferir:

- nenhuma ação crítica inacessível;
- nenhuma rolagem horizontal inesperada;
- navegação alcançável;
- botões com área de toque adequada;
- texto sem corte;
- contraste e foco visível;
- nenhum módulo depende somente de hover.

## Sobre dispositivos muito antigos

O Tramelyx usa progressive enhancement. Um navegador muito antigo pode receber somente a camada básica/legível e não todas as funções modernas.

A meta é:

```text
moderno = experiência completa
limitado = experiência reduzida, mas compreensível
obsoleto = conteúdo básico sempre que tecnicamente possível
```

Isso preserva a evolução do produto sem amarrá-lo ao navegador de um console antigo.

## Próximo marco recomendado

A v0.2 deve transformar a demonstração em ferramenta local utilizável:

- IndexedDB;
- criar/editar/remover nós;
- conexões visuais;
- importação/exportação JSON;
- projetos múltiplos;
- autosave;
- busca global;
- backup manual.

Somente depois disso vale aprofundar Canon Engine e Knowledge Graph.
