/*
  Tramelyx UI Controller — v0.1
  -----------------------------
  Responsabilidade: renderizar o estado do domínio e encaminhar interações para
  o adaptador de estado. O DOM não é usado como fonte de verdade.
*/

(function (global, document) {
  "use strict";

  var currentView = "dashboard";
  var workspace;
  var nav;
  var projectName;
  var saveState;
  var themeToggle;

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(value) {
    var date = new Date(value);

    if (isNaN(date.getTime())) {
      return value || "—";
    }

    try {
      return date.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
      });
    } catch (error) {
      return date.toLocaleString();
    }
  }

  function statusBadge(status) {
    var className = "info";
    var label = status || "unknown";

    if (status === "canon" || status === "confirmed") {
      className = "success";
    } else if (status === "provisional" || status === "suspected" || status === "seeded") {
      className = "warning";
    } else if (status === "retcon") {
      className = "danger";
    } else if (status === "idea" || status === "hidden") {
      className = "accent";
    }

    return '<span class="badge ' + className + '">' + escapeHtml(label) + "</span>";
  }

  function pageHeader(kicker, title, description, actions) {
    return [
      '<section class="page-header">',
      "  <div>",
      '    <span class="eyebrow">' + escapeHtml(kicker) + "</span>",
      "    <h1>" + escapeHtml(title) + "</h1>",
      '    <p class="lead">' + escapeHtml(description) + "</p>",
      "  </div>",
      actions ? '  <div class="page-actions">' + actions + "</div>" : "",
      "</section>"
    ].join("");
  }

  function countByStatus(items, status) {
    var count = 0;
    var i;

    for (i = 0; i < items.length; i += 1) {
      if (items[i].status === status) {
        count += 1;
      }
    }

    return count;
  }

  function renderDashboard(state) {
    var provisional = countByStatus(state.canonFacts, "provisional");
    var html = "";

    html += pageHeader(
      "Visão geral",
      "Seu universo em uma única superfície.",
      "A fundação conecta estrutura, cânone, conhecimento e estado sem transformar a autoria em uma planilha infinita.",
      '<button class="button ghost" type="button" data-action="reset-demo">Restaurar demo</button>' +
        '<button class="button primary" type="button" data-view-jump="story">Abrir Story Graph</button>'
    );

    html += '<section class="stats-grid" aria-label="Resumo do projeto">';
    html += '<article class="stat-card"><span>Nós narrativos</span><strong>' + state.nodes.length + '</strong><small>cenas e decisões modeladas</small></article>';
    html += '<article class="stat-card"><span>Fatos de cânone</span><strong>' + state.canonFacts.length + '</strong><small>' + provisional + ' provisório(s)</small></article>';
    html += '<article class="stat-card"><span>Relações de conhecimento</span><strong>' + state.knowledge.length + '</strong><small>quem sabe o quê</small></article>';
    html += '<article class="stat-card"><span>Variáveis de estado</span><strong>' + state.stateVariables.length + '</strong><small>condições de rota</small></article>';
    html += "</section>";

    html += '<section class="module-grid" style="margin-top: var(--space-4);">';
    html += '<article class="panel"><span class="panel-kicker">Story Graph</span><h2>O que acontece</h2><p>Eventos, decisões, consequências e convergências formam a topologia da história.</p><button class="button ghost" type="button" data-view-jump="story">Explorar grafo</button></article>';
    html += '<article class="panel"><span class="panel-kicker">Canon Engine</span><h2>O que é verdade</h2><p>Fatos carregam estado e vigência para que alterações futuras possam medir impacto.</p><button class="button ghost" type="button" data-view-jump="canon">Revisar cânone</button></article>';
    html += '<article class="panel"><span class="panel-kicker">Knowledge Graph</span><h2>Quem sabe o quê</h2><p>Conhecimento pertence a sujeitos e possui origem narrativa, reduzindo revelações acidentais.</p><button class="button ghost" type="button" data-view-jump="knowledge">Ver conhecimento</button></article>';
    html += '<article class="panel"><span class="panel-kicker">Narrative Integrity</span><h2>O diferencial</h2><p>O Validator cruza referências e estados para transformar inconsistências em problemas localizáveis.</p><button class="button ghost" type="button" data-view-jump="validator">Executar validação</button></article>';
    html += "</section>";

    workspace.innerHTML = html;
  }

  function renderStory(state) {
    var html = "";
    var i;
    var node;

    html += pageHeader(
      "Story Graph",
      "A topologia da narrativa.",
      "Na v0.1 os nós já usam um modelo conectado. A canvas visual e conexões drag-and-drop entram após o armazenamento local-first real.",
      '<button class="button primary" type="button" data-action="add-node">+ Novo nó</button>'
    );

    html += '<section class="graph-grid" aria-label="Nós narrativos">';

    for (i = 0; i < state.nodes.length; i += 1) {
      node = state.nodes[i];
      html += '<article class="story-node" data-type="' + escapeHtml(node.type) + '">';
      html += '<div class="node-meta"><span class="badge accent">' + escapeHtml(node.type) + "</span>" + statusBadge(node.status) + "</div>";
      html += '<h3 style="margin-top: var(--space-3);">' + escapeHtml(node.title) + "</h3>";
      html += "<p>" + escapeHtml(node.summary) + "</p>";
      html += '<div class="tag-row"><span class="badge mono">' + escapeHtml(node.id) + "</span>";
      html += '<span class="badge">' + node.targets.length + " saída(s)</span></div>";
      html += "</article>";
    }

    html += "</section>";
    workspace.innerHTML = html;
  }

  function renderCanon(state) {
    var html = "";
    var i;
    var fact;

    html += pageHeader(
      "Canon Engine",
      "O que é verdade — e desde quando.",
      "O cânone deixa de ser texto espalhado e passa a ser dado rastreável, com estado, origem e vigência.",
      ""
    );

    html += '<section class="panel"><div class="panel-header"><div><span class="panel-kicker">Fatos</span><h2>Registro de cânone</h2></div><span class="badge">' + state.canonFacts.length + " fatos</span></div>";
    html += '<div class="list-stack">';

    for (i = 0; i < state.canonFacts.length; i += 1) {
      fact = state.canonFacts[i];
      html += '<article class="list-row"><div class="list-row-main"><strong>' + escapeHtml(fact.statement) + "</strong><small>Tags: " + escapeHtml(fact.tags.join(", ")) + '</small></div><div class="list-row-aside">' + statusBadge(fact.status) + '<div style="margin-top: .45rem;">vigência: ' + escapeHtml(fact.effectiveFrom || "não definida") + "</div></div></article>";
    }

    html += "</div></section>";
    workspace.innerHTML = html;
  }

  function findFact(state, factId) {
    var i;

    for (i = 0; i < state.canonFacts.length; i += 1) {
      if (state.canonFacts[i].id === factId) {
        return state.canonFacts[i];
      }
    }

    return null;
  }

  function renderKnowledge(state) {
    var html = "";
    var i;
    var edge;
    var fact;

    html += pageHeader(
      "Knowledge Graph",
      "Quem sabe o quê, quando e por quê.",
      "Uma história pode estar factualmente correta e ainda quebrar porque alguém sabe algo cedo demais. Este módulo modela essa diferença.",
      ""
    );

    html += '<section class="panel"><div class="panel-header"><div><span class="panel-kicker">Knowledge edges</span><h2>Conhecimento rastreável</h2></div><span class="badge">' + state.knowledge.length + " relações</span></div>";
    html += '<div class="list-stack">';

    for (i = 0; i < state.knowledge.length; i += 1) {
      edge = state.knowledge[i];
      fact = findFact(state, edge.factId);
      html += '<article class="list-row"><div class="list-row-main"><strong>' + escapeHtml(edge.subject) + " → " + escapeHtml(fact ? fact.statement : "Fato ausente") + "</strong><small>Origem: " + escapeHtml(edge.fromNodeId) + " · desde " + escapeHtml(edge.since) + '</small></div><div class="list-row-aside">' + statusBadge(edge.knows) + "</div></article>";
    }

    html += "</div></section>";
    workspace.innerHTML = html;
  }

  function renderTimeline(state) {
    var html = "";
    var i;
    var event;

    html += pageHeader(
      "Timeline",
      "Tempo sem perder causalidade.",
      "Eventos históricos e jogáveis podem coexistir. Futuramente, rotas alternativas terão seus próprios estados temporais.",
      ""
    );

    html += '<section class="panel"><div class="timeline">';

    for (i = 0; i < state.timeline.length; i += 1) {
      event = state.timeline[i];
      html += '<article class="timeline-entry"><time>' + escapeHtml(event.label) + "</time><h3>" + escapeHtml(event.title) + "</h3><p>" + escapeHtml(event.description) + "</p></article>";
    }

    html += "</div></section>";
    workspace.innerHTML = html;
  }

  function renderReveals(state) {
    var html = "";
    var i;
    var reveal;

    html += pageHeader(
      "Reveal Engine",
      "Segredos possuem ritmo.",
      "Planeje pista, suspeita e revelação para que mistérios não sejam entregues cedo demais ou resolvidos sem preparação.",
      ""
    );

    html += '<section class="module-grid">';

    for (i = 0; i < state.reveals.length; i += 1) {
      reveal = state.reveals[i];
      html += '<article class="panel"><div class="panel-header"><div><span class="panel-kicker">Segredo</span><h2>' + escapeHtml(reveal.secret) + '</h2></div>' + statusBadge(reveal.stage) + "</div>";
      html += '<p><strong style="color: var(--text);">Primeira preparação:</strong> ' + escapeHtml(reveal.plannedAt) + "</p>";
      html += '<p><strong style="color: var(--text);">Revelação completa:</strong> ' + escapeHtml(reveal.fullRevealAt) + "</p>";
      html += '<p style="margin-bottom: 0;">' + escapeHtml(reveal.notes) + "</p></article>";
    }

    html += "</section>";
    workspace.innerHTML = html;
  }

  /*
    O validador da fundação executa regras reais sobre referências. A proposta
    futura é permitir regras semânticas declaradas pelo próprio autor.
  */
  function validate(state) {
    var results = [];
    var nodeIds = {};
    var factIds = {};
    var i;
    var j;
    var node;
    var fact;
    var edge;

    for (i = 0; i < state.nodes.length; i += 1) {
      nodeIds[state.nodes[i].id] = true;
    }

    for (i = 0; i < state.canonFacts.length; i += 1) {
      factIds[state.canonFacts[i].id] = true;
    }

    for (i = 0; i < state.nodes.length; i += 1) {
      node = state.nodes[i];
      for (j = 0; j < node.targets.length; j += 1) {
        if (!nodeIds[node.targets[j]]) {
          results.push({
            level: "error",
            title: "Conexão quebrada",
            detail: node.id + " aponta para um nó inexistente: " + node.targets[j]
          });
        }
      }
    }

    for (i = 0; i < state.canonFacts.length; i += 1) {
      fact = state.canonFacts[i];

      if (fact.effectiveFrom && !nodeIds[fact.effectiveFrom]) {
        results.push({
          level: "error",
          title: "Origem de cânone inválida",
          detail: fact.id + " referencia uma vigência que não existe no Story Graph."
        });
      }

      if (fact.status === "provisional" && !fact.effectiveFrom) {
        results.push({
          level: "warning",
          title: "Fato provisório sem vigência",
          detail: "“" + fact.statement + "” ainda não possui um ponto narrativo de efetivação."
        });
      }
    }

    for (i = 0; i < state.knowledge.length; i += 1) {
      edge = state.knowledge[i];

      if (!factIds[edge.factId]) {
        results.push({
          level: "error",
          title: "Conhecimento órfão",
          detail: edge.id + " referencia um fato inexistente."
        });
      }

      if (edge.fromNodeId && !nodeIds[edge.fromNodeId]) {
        results.push({
          level: "error",
          title: "Origem de conhecimento inválida",
          detail: edge.id + " aponta para um nó narrativo inexistente."
        });
      }
    }

    if (!results.length) {
      results.push({
        level: "ok",
        title: "Estrutura consistente",
        detail: "Nenhuma referência quebrada foi encontrada nas regras disponíveis da v0.1."
      });
    } else {
      results.push({
        level: "ok",
        title: "Referências principais verificadas",
        detail: "Story Graph, Canon Engine e Knowledge Graph foram cruzados com sucesso; revise os avisos acima."
      });
    }

    return results;
  }

  function renderValidator(state) {
    var html = "";
    var results = validate(state);
    var errors = 0;
    var warnings = 0;
    var i;
    var result;
    var icon;

    for (i = 0; i < results.length; i += 1) {
      if (results[i].level === "error") {
        errors += 1;
      } else if (results[i].level === "warning") {
        warnings += 1;
      }
    }

    html += pageHeader(
      "Narrative Validator",
      "Faça a história reclamar antes do leitor.",
      "A v0.1 valida referências estruturais. O objetivo futuro é testar conhecimento, causalidade, estados e regras narrativas definidas pelo autor.",
      '<button class="button primary" type="button" data-action="run-validation">Executar novamente</button>'
    );

    html += '<section class="panel">';
    html += '<div class="validation-summary"><span class="badge danger">' + errors + ' erro(s)</span><span class="badge warning">' + warnings + ' aviso(s)</span><span class="badge success">' + state.nodes.length + " nós analisados</span></div>";
    html += '<div class="list-stack">';

    for (i = 0; i < results.length; i += 1) {
      result = results[i];
      icon = result.level === "error" ? "!" : result.level === "warning" ? "△" : "✓";
      html += '<article class="validation-item is-' + escapeHtml(result.level) + '"><span class="validation-icon" aria-hidden="true">' + icon + '</span><div><h3>' + escapeHtml(result.title) + "</h3><p>" + escapeHtml(result.detail) + "</p></div></article>";
    }

    html += "</div></section>";
    workspace.innerHTML = html;
  }

  function renderHistory(state) {
    var html = "";
    var i;
    var entry;

    html += pageHeader(
      "Narrative History",
      "Mudanças precisam deixar memória.",
      "Hoje o histórico registra ações locais. O Narrative Git futuro comparará impacto semântico entre versões, não apenas texto.",
      ""
    );

    html += '<section class="panel"><div class="list-stack">';

    for (i = 0; i < state.history.length; i += 1) {
      entry = state.history[i];
      html += '<article class="list-row"><div class="list-row-main"><strong>' + escapeHtml(entry.action) + "</strong><small>" + escapeHtml(entry.detail) + '</small></div><div class="list-row-aside">' + escapeHtml(formatDate(entry.at)) + "</div></article>";
    }

    html += "</div></section>";
    workspace.innerHTML = html;
  }

  function render() {
    var state = global.TramelyxState.getState();

    projectName.textContent = state.project.name;

    if (currentView === "story") {
      renderStory(state);
    } else if (currentView === "canon") {
      renderCanon(state);
    } else if (currentView === "knowledge") {
      renderKnowledge(state);
    } else if (currentView === "timeline") {
      renderTimeline(state);
    } else if (currentView === "reveals") {
      renderReveals(state);
    } else if (currentView === "validator") {
      renderValidator(state);
    } else if (currentView === "history") {
      renderHistory(state);
    } else {
      currentView = "dashboard";
      renderDashboard(state);
    }
  }

  function setActiveView(view) {
    var buttons = nav.querySelectorAll("[data-view]");
    var i;

    currentView = view;

    for (i = 0; i < buttons.length; i += 1) {
      if (buttons[i].getAttribute("data-view") === view) {
        buttons[i].classList.add("is-active");
        buttons[i].setAttribute("aria-current", "page");
      } else {
        buttons[i].classList.remove("is-active");
        buttons[i].removeAttribute("aria-current");
      }
    }

    render();
    workspace.focus();
  }

  function markSaved(message) {
    saveState.textContent = message || "Salvo localmente";

    global.setTimeout(function () {
      saveState.textContent = "Salvo localmente";
    }, 1600);
  }

  function handleNavClick(event) {
    var button = event.target.closest ? event.target.closest("[data-view]") : null;

    if (button) {
      setActiveView(button.getAttribute("data-view"));
    }
  }

  function handleWorkspaceClick(event) {
    var actionTarget = event.target.closest ? event.target.closest("[data-action]") : null;
    var jumpTarget = event.target.closest ? event.target.closest("[data-view-jump]") : null;
    var title;

    if (jumpTarget) {
      setActiveView(jumpTarget.getAttribute("data-view-jump"));
      return;
    }

    if (!actionTarget) {
      return;
    }

    if (actionTarget.getAttribute("data-action") === "add-node") {
      title = global.prompt("Título do novo nó narrativo:", "Nova cena");

      if (title !== null) {
        global.TramelyxState.addNode({ title: title || "Nova cena" });
        markSaved("Nó salvo localmente");
      }
    } else if (actionTarget.getAttribute("data-action") === "reset-demo") {
      global.TramelyxState.resetDemo();
      markSaved("Demonstração restaurada");
    } else if (actionTarget.getAttribute("data-action") === "run-validation") {
      render();
      markSaved("Validação concluída");
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    themeToggle.title = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
  }

  function initialize() {
    workspace = document.getElementById("workspace");
    nav = document.getElementById("module-nav");
    projectName = document.getElementById("project-name");
    saveState = document.getElementById("save-state");
    themeToggle = document.getElementById("theme-toggle");

    global.TramelyxState.load();
    applyTheme(global.TramelyxState.getTheme());

    nav.addEventListener("click", handleNavClick);
    workspace.addEventListener("click", handleWorkspaceClick);

    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "light" ? "dark" : "light";
      global.TramelyxState.setTheme(next);
      applyTheme(next);
    });

    /* Re-renderiza a view atual quando o domínio muda via State Adapter. */
    global.TramelyxState.subscribe(function () {
      render();
    });

    render();

    /*
      Service worker é um aprimoramento. Navegadores sem suporte simplesmente
      ignoram o recurso e continuam usando a aplicação online normalmente.
    */
    if ("serviceWorker" in global.navigator) {
      global.addEventListener("load", function () {
        global.navigator.serviceWorker.register("./sw.js").catch(function () {
          /* Offline cache não é crítico para o carregamento principal. */
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}(window, document));
