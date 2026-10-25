/* Tramelyx API smoke tests — zero external dependencies. */

"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "tramelyx-api-"));
process.env.TRAMELYX_DB_FILE = path.join(tempDir, "db.json");
process.env.NODE_ENV = "test";

const { server } = require("../src/server");

async function request(baseUrl, pathname, options) {
  const response = await fetch(baseUrl + pathname, {
    headers: { "Content-Type": "application/json" },
    ...(options || {})
  });
  const body = await response.json();
  return { response, body };
}

async function run() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    let result = await request(baseUrl, "/health");
    assert.equal(result.response.status, 200);
    assert.equal(result.body.ok, true);

    result = await request(baseUrl, "/api/v1/projects");
    assert.equal(result.response.status, 200);
    assert.equal(result.body.data.length, 1);

    result = await request(baseUrl, "/api/v1/projects", {
      method: "POST",
      body: JSON.stringify({ name: "Teste automatizado", type: "Game" })
    });
    assert.equal(result.response.status, 201);
    const projectId = result.body.data.id;

    result = await request(baseUrl, `/api/v1/projects/${projectId}/nodes`, {
      method: "POST",
      body: JSON.stringify({ title: "Cena inicial", targets: ["missing-node"] })
    });
    assert.equal(result.response.status, 201);

    result = await request(baseUrl, `/api/v1/projects/${projectId}/validate`, {
      method: "POST",
      body: "{}"
    });
    assert.equal(result.response.status, 200);
    assert.equal(result.body.data.ok, false);
    assert.equal(result.body.data.errors, 1);
    assert.equal(result.body.data.results[0].code, "BROKEN_STORY_TARGET");

    result = await request(baseUrl, `/api/v1/projects/${projectId}/state`, {
      method: "PATCH",
      body: JSON.stringify({ name: "trust_operator", type: "number", value: 10 })
    });
    assert.equal(result.response.status, 200);
    assert.equal(result.body.data.value, 10);

    const before = (await request(baseUrl, "/api/v1/projects")).body.data.length;
    for (const headers of [
      { Origin: "https://attacker.example", "Content-Type": "application/json" },
      { Origin: "https://attacker.example", "Content-Type": "text/plain" },
      { "Content-Type": "text/plain" }
    ]) {
      result = await request(baseUrl, "/api/v1/projects", {
        method: "POST", headers, body: JSON.stringify({ name: "Rejected" })
      });
      assert.equal(result.response.status, headers.Origin ? 403 : 415);
    }
    assert.equal((await request(baseUrl, "/api/v1/projects")).body.data.length, before);
    result = await request(baseUrl, "/api/v1/projects", {
      method: "POST", headers: { Origin: "http://localhost:8080", "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Allowed local UI" })
    });
    assert.equal(result.response.status, 201);
    assert.equal(result.response.headers.get("X-Content-Type-Options"), "nosniff");
    console.log("Tramelyx API smoke and cross-origin security tests: OK");
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
