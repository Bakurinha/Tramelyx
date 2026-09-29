/*
  Tramelyx API — Server Bootstrap
  -------------------------------
  Servidor HTTP sem dependências externas para manter a fundação reproduzível.
  A aplicação de domínio vive fora deste arquivo para facilitar testes e migração.
*/

"use strict";

const http = require("node:http");
const { route } = require("./router");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 8787);

const server = http.createServer((request, response) => {
  route(request, response);
});

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`Tramelyx API v0.1 em http://${HOST}:${PORT}`);
  });
}

module.exports = { server };
