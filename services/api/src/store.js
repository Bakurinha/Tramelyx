/*
  Tramelyx API — Storage Adapter
  -----------------------------
  A API conversa com este módulo em vez de manipular arquivos diretamente.
  Essa fronteira permite trocar JSON local por SQLite, D1 ou Postgres sem
  alterar rotas nem contratos HTTP.
*/

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const DATA_DIR = path.resolve(__dirname, "../data");
const DB_FILE = process.env.TRAMELYX_DB_FILE || path.join(DATA_DIR, "db.json");
const SEED_FILE = path.join(DATA_DIR, "seed.json");

function ensureDatabase() {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

  if (!fs.existsSync(DB_FILE)) {
    const initial = fs.existsSync(SEED_FILE)
      ? fs.readFileSync(SEED_FILE, "utf8")
      : JSON.stringify({ schemaVersion: 1, projects: [] }, null, 2);
    fs.writeFileSync(DB_FILE, initial, "utf8");
  }
}

function readDatabase() {
  ensureDatabase();
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDatabase(database) {
  ensureDatabase();
  const tempFile = DB_FILE + ".tmp";
  fs.writeFileSync(tempFile, JSON.stringify(database, null, 2) + "\n", "utf8");
  fs.renameSync(tempFile, DB_FILE);
}

function nowIso() {
  return new Date().toISOString();
}

function createProject(input) {
  const database = readDatabase();
  const now = nowIso();
  const project = {
    id: randomUUID(),
    schemaVersion: 1,
    name: String(input.name || "Novo projeto").trim().slice(0, 120),
    type: String(input.type || "Narrative Project").trim().slice(0, 80),
    status: "draft",
    createdAt: now,
    updatedAt: now,
    nodes: [],
    canonFacts: [],
    knowledge: [],
    stateVariables: [],
    timeline: [],
    reveals: [],
    history: [
      {
        id: randomUUID(),
        at: now,
        action: "Project created",
        detail: "Projeto criado pelo Tramelyx API."
      }
    ]
  };

  database.projects.push(project);
  writeDatabase(database);
  return project;
}

function listProjects() {
  return readDatabase().projects.map((project) => ({
    id: project.id,
    name: project.name,
    type: project.type,
    status: project.status,
    updatedAt: project.updatedAt
  }));
}

function getProject(projectId) {
  return readDatabase().projects.find((project) => project.id === projectId) || null;
}

function updateProject(projectId, updater, historyEntry) {
  const database = readDatabase();
  const index = database.projects.findIndex((project) => project.id === projectId);

  if (index === -1) {
    return null;
  }

  const project = database.projects[index];
  updater(project);
  project.updatedAt = nowIso();

  if (historyEntry) {
    project.history.unshift({
      id: randomUUID(),
      at: project.updatedAt,
      action: historyEntry.action,
      detail: historyEntry.detail
    });
  }

  database.projects[index] = project;
  writeDatabase(database);
  return project;
}

function addNode(projectId, input) {
  let created = null;

  const project = updateProject(
    projectId,
    (draft) => {
      created = {
        id: randomUUID(),
        title: String(input.title || "Novo nó").trim().slice(0, 160),
        type: String(input.type || "scene").trim().slice(0, 40),
        summary: String(input.summary || "").trim().slice(0, 2000),
        status: String(input.status || "idea").trim().slice(0, 40),
        targets: Array.isArray(input.targets) ? input.targets.filter(Boolean).slice(0, 100) : []
      };
      draft.nodes.push(created);
    },
    {
      action: "Story node created",
      detail: "Um novo nó foi criado pela API."
    }
  );

  return project ? created : null;
}

function addCanonFact(projectId, input) {
  let created = null;

  const project = updateProject(
    projectId,
    (draft) => {
      created = {
        id: randomUUID(),
        statement: String(input.statement || "").trim().slice(0, 2000),
        status: String(input.status || "idea").trim().slice(0, 40),
        effectiveFrom: input.effectiveFrom ? String(input.effectiveFrom) : "",
        tags: Array.isArray(input.tags) ? input.tags.map(String).slice(0, 30) : []
      };
      draft.canonFacts.push(created);
    },
    {
      action: "Canon fact created",
      detail: "Um fato de cânone foi criado pela API."
    }
  );

  return project ? created : null;
}

function addKnowledge(projectId, input) {
  let created = null;

  const project = updateProject(
    projectId,
    (draft) => {
      created = {
        id: randomUUID(),
        subject: String(input.subject || "").trim().slice(0, 160),
        factId: String(input.factId || ""),
        knows: String(input.knows || "confirmed").slice(0, 40),
        fromNodeId: input.fromNodeId ? String(input.fromNodeId) : "",
        since: String(input.since || "").trim().slice(0, 160)
      };
      draft.knowledge.push(created);
    },
    {
      action: "Knowledge relation created",
      detail: "Uma relação de conhecimento foi criada pela API."
    }
  );

  return project ? created : null;
}

function upsertStateVariable(projectId, input) {
  let saved = null;

  const project = updateProject(
    projectId,
    (draft) => {
      const name = String(input.name || "").trim().slice(0, 120);
      const index = draft.stateVariables.findIndex((item) => item.name === name);
      const value = {
        id: index >= 0 ? draft.stateVariables[index].id : randomUUID(),
        name,
        type: String(input.type || typeof input.value).slice(0, 40),
        value: input.value,
        scope: String(input.scope || "route").slice(0, 40)
      };

      if (index >= 0) {
        draft.stateVariables[index] = value;
      } else {
        draft.stateVariables.push(value);
      }
      saved = value;
    },
    {
      action: "State variable changed",
      detail: "Uma variável de estado foi criada ou atualizada pela API."
    }
  );

  return project ? saved : null;
}

module.exports = {
  createProject,
  listProjects,
  getProject,
  addNode,
  addCanonFact,
  addKnowledge,
  upsertStateVariable
};
