/*
  Tramelyx Local State Adapter
  ----------------------------
  O frontend conversa com este módulo em vez de acessar localStorage espalhado
  pelas telas. Isso cria uma rota de migração limpa para IndexedDB ou nuvem.
*/

(function (global) {
  "use strict";

  var STORAGE_KEY = "tramelyx.v0.1.project";
  var THEME_KEY = "tramelyx.theme";
  var listeners = [];
  var state = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function notify() {
    var snapshot = clone(state);
    var i;

    for (i = 0; i < listeners.length; i += 1) {
      listeners[i](snapshot);
    }
  }

  function load() {
    var raw;
    var parsed;

    try {
      raw = global.localStorage ? global.localStorage.getItem(STORAGE_KEY) : null;
      parsed = raw ? JSON.parse(raw) : null;
    } catch (error) {
      parsed = null;
    }

    /*
      A v0.1 aceita apenas o schema conhecido. Versões futuras devem migrar o
      conteúdo; nunca devem apagar dados silenciosamente.
    */
    if (parsed && parsed.schemaVersion === global.TramelyxData.schemaVersion) {
      state = parsed;
    } else {
      state = clone(global.TramelyxData);
    }

    return clone(state);
  }

  function persist() {
    try {
      if (global.localStorage) {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
      return true;
    } catch (error) {
      /*
        Falhas de quota, privacidade ou navegador não derrubam a aplicação.
        A UI continua utilizável e pode informar que a persistência falhou.
      */
      return false;
    }
  }

  function commit(action, detail) {
    state.project.updatedAt = nowIso();
    state.history.unshift({
      id: "history-" + Date.now(),
      at: nowIso(),
      action: action,
      detail: detail
    });

    persist();
    notify();
  }

  function getState() {
    if (!state) {
      load();
    }
    return clone(state);
  }

  function addNode(input) {
    var id;
    var node;

    if (!state) {
      load();
    }

    id = "node-local-" + Date.now();
    node = {
      id: id,
      title: input && input.title ? input.title : "Novo nó narrativo",
      type: input && input.type ? input.type : "scene",
      summary: input && input.summary ? input.summary : "Nó criado localmente na fundação v0.1.",
      status: "idea",
      targets: []
    };

    state.nodes.push(node);
    commit("Story node created", "O nó “" + node.title + "” foi criado no projeto local.");

    return clone(node);
  }

  function resetDemo() {
    state = clone(global.TramelyxData);
    persist();
    notify();
  }

  function subscribe(listener) {
    if (typeof listener === "function") {
      listeners.push(listener);
    }
  }

  function getTheme() {
    var value;

    try {
      value = global.localStorage ? global.localStorage.getItem(THEME_KEY) : null;
    } catch (error) {
      value = null;
    }

    return value === "light" ? "light" : "dark";
  }

  function setTheme(theme) {
    var safeTheme = theme === "light" ? "light" : "dark";

    try {
      if (global.localStorage) {
        global.localStorage.setItem(THEME_KEY, safeTheme);
      }
    } catch (error) {
      /* Preferência visual é não crítica; falha de storage pode ser ignorada. */
    }

    return safeTheme;
  }

  global.TramelyxState = {
    load: load,
    getState: getState,
    addNode: addNode,
    resetDemo: resetDemo,
    subscribe: subscribe,
    getTheme: getTheme,
    setTheme: setTheme
  };
}(window));
