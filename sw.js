/*
  Tramelyx Service Worker — v0.1
  --------------------------------
  Cacheia somente a shell estática do protótipo. Dados do projeto continuam sob
  responsabilidade do State Adapter; não misturamos cache HTTP com persistência.
*/

var CACHE_NAME = "tramelyx-shell-v0.1.0";
var APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/css/tokens.css",
  "./assets/css/app.css",
  "./assets/js/data.js",
  "./assets/js/state.js",
  "./assets/js/app.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME && key.indexOf("tramelyx-shell-") === 0) {
            return caches.delete(key);
          }
          return Promise.resolve(false);
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  /* Apenas GET pertence ao cache da shell. */
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then(function (response) {
        /* Respostas externas ou inválidas não são adicionadas ao cache local. */
        if (!response || response.status !== 200 || response.type === "opaque") {
          return response;
        }

        return caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
