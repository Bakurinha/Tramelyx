/*
  Tramelyx API — Router
  ---------------------
  Define os contratos HTTP da v0.1. Rotas devem permanecer finas: recebem,
  validam minimamente e delegam regras para serviços/motores específicos.
*/

"use strict";

const store = require("./store");
const { validateProject } = require("./validator");

function sendJson(response, statusCode, payload, extraHeaders) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...(extraHeaders || {})
  });
  response.end(JSON.stringify(payload));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(Object.assign(new Error("Payload muito grande"), { statusCode: 413 }));
        request.destroy();
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(Object.assign(new Error("JSON inválido"), { statusCode: 400 }));
      }
    });

    request.on("error", reject);
  });
}

function isWriteMethod(method) {
  return ["POST", "PUT", "PATCH", "DELETE"].includes(method);
}

function authorizeWrite(request) {
  const token = process.env.TRAMELYX_WRITE_TOKEN;
  const production = process.env.NODE_ENV === "production";

  /*
    Em produção, escrita sem autenticação explícita é bloqueada. Não existe
    token embutido no frontend: isso seria apenas um segredo público disfarçado.
  */
  if (production && !token) {
    return false;
  }

  if (!token) {
    return true;
  }

  return request.headers.authorization === `Bearer ${token}`;
}

function getCorsHeaders(request) {
  const origin = request.headers.origin || "";
  const configured = (process.env.TRAMELYX_ALLOWED_ORIGINS || "http://localhost:8080,http://127.0.0.1:8080,https://bakurinha.github.io")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!origin || configured.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin || "*",
      "Vary": "Origin",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    };
  }

  return {};
}

function matchProjectPath(pathname) {
  const match = pathname.match(/^\/api\/v1\/projects\/([^/]+)(?:\/(nodes|canon|knowledge|state|validate))?$/);
  return match ? { projectId: decodeURIComponent(match[1]), resource: match[2] || "project" } : null;
}

async function route(request, response) {
  const url = new URL(request.url, "http://localhost");
  const pathname = url.pathname;
  const cors = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    response.writeHead(204, cors);
    response.end();
    return;
  }

  if (isWriteMethod(request.method) && !authorizeWrite(request)) {
    sendJson(response, 401, {
      error: "WRITE_NOT_AUTHORIZED",
      message: "Escrita não autorizada neste ambiente."
    }, cors);
    return;
  }

  try {
    if (request.method === "GET" && pathname === "/health") {
      sendJson(response, 200, {
        ok: true,
        service: "tramelyx-api",
        version: "0.1.0",
        mode: process.env.NODE_ENV || "development"
      }, cors);
      return;
    }

    if (pathname === "/api/v1/projects" && request.method === "GET") {
      sendJson(response, 200, { data: store.listProjects() }, cors);
      return;
    }

    if (pathname === "/api/v1/projects" && request.method === "POST") {
      const body = await readJson(request);
      if (!String(body.name || "").trim()) {
        sendJson(response, 422, { error: "PROJECT_NAME_REQUIRED" }, cors);
        return;
      }
      sendJson(response, 201, { data: store.createProject(body) }, cors);
      return;
    }

    const matched = matchProjectPath(pathname);

    if (matched) {
      const project = store.getProject(matched.projectId);
      if (!project) {
        sendJson(response, 404, { error: "PROJECT_NOT_FOUND" }, cors);
        return;
      }

      if (matched.resource === "project" && request.method === "GET") {
        sendJson(response, 200, { data: project }, cors);
        return;
      }

      if (matched.resource === "nodes") {
        if (request.method === "GET") {
          sendJson(response, 200, { data: project.nodes }, cors);
          return;
        }
        if (request.method === "POST") {
          const body = await readJson(request);
          const node = store.addNode(matched.projectId, body);
          sendJson(response, 201, { data: node }, cors);
          return;
        }
      }

      if (matched.resource === "canon") {
        if (request.method === "GET") {
          sendJson(response, 200, { data: project.canonFacts }, cors);
          return;
        }
        if (request.method === "POST") {
          const body = await readJson(request);
          if (!String(body.statement || "").trim()) {
            sendJson(response, 422, { error: "CANON_STATEMENT_REQUIRED" }, cors);
            return;
          }
          sendJson(response, 201, { data: store.addCanonFact(matched.projectId, body) }, cors);
          return;
        }
      }

      if (matched.resource === "knowledge") {
        if (request.method === "GET") {
          sendJson(response, 200, { data: project.knowledge }, cors);
          return;
        }
        if (request.method === "POST") {
          const body = await readJson(request);
          if (!String(body.subject || "").trim() || !String(body.factId || "").trim()) {
            sendJson(response, 422, { error: "KNOWLEDGE_SUBJECT_AND_FACT_REQUIRED" }, cors);
            return;
          }
          sendJson(response, 201, { data: store.addKnowledge(matched.projectId, body) }, cors);
          return;
        }
      }

      if (matched.resource === "state") {
        if (request.method === "GET") {
          sendJson(response, 200, { data: project.stateVariables }, cors);
          return;
        }
        if (request.method === "POST" || request.method === "PATCH") {
          const body = await readJson(request);
          if (!String(body.name || "").trim()) {
            sendJson(response, 422, { error: "STATE_NAME_REQUIRED" }, cors);
            return;
          }
          sendJson(response, 200, { data: store.upsertStateVariable(matched.projectId, body) }, cors);
          return;
        }
      }

      if (matched.resource === "validate" && request.method === "POST") {
        sendJson(response, 200, { data: validateProject(project) }, cors);
        return;
      }
    }

    sendJson(response, 404, {
      error: "ROUTE_NOT_FOUND",
      message: `${request.method} ${pathname} não existe na API v0.1.`
    }, cors);
  } catch (error) {
    sendJson(response, error.statusCode || 500, {
      error: "API_ERROR",
      message: error.statusCode ? error.message : "Falha interna do serviço."
    }, cors);
  }
}

module.exports = { route };
