/*
  Tramelyx API — Narrative Validator
  ----------------------------------
  Validação estrutural reutilizável pelo backend. O objetivo é manter regras
  narrativas fora das rotas HTTP para que CLI, CI e outros clientes possam
  reutilizar o mesmo motor futuramente.
*/

"use strict";

function validateProject(project) {
  const results = [];
  const nodeIds = new Set(project.nodes.map((node) => node.id));
  const factIds = new Set(project.canonFacts.map((fact) => fact.id));

  project.nodes.forEach((node) => {
    (node.targets || []).forEach((targetId) => {
      if (!nodeIds.has(targetId)) {
        results.push({
          level: "error",
          code: "BROKEN_STORY_TARGET",
          entityId: node.id,
          message: `${node.id} aponta para um nó inexistente: ${targetId}`
        });
      }
    });
  });

  project.canonFacts.forEach((fact) => {
    if (fact.effectiveFrom && !nodeIds.has(fact.effectiveFrom)) {
      results.push({
        level: "error",
        code: "INVALID_CANON_ORIGIN",
        entityId: fact.id,
        message: `${fact.id} possui ponto de vigência inexistente.`
      });
    }

    if (fact.status === "provisional" && !fact.effectiveFrom) {
      results.push({
        level: "warning",
        code: "PROVISIONAL_WITHOUT_EFFECTIVE_FROM",
        entityId: fact.id,
        message: "Fato provisório ainda não possui ponto narrativo de vigência."
      });
    }
  });

  project.knowledge.forEach((edge) => {
    if (!factIds.has(edge.factId)) {
      results.push({
        level: "error",
        code: "ORPHAN_KNOWLEDGE_FACT",
        entityId: edge.id,
        message: `${edge.id} referencia um fato inexistente.`
      });
    }

    if (edge.fromNodeId && !nodeIds.has(edge.fromNodeId)) {
      results.push({
        level: "error",
        code: "INVALID_KNOWLEDGE_ORIGIN",
        entityId: edge.id,
        message: `${edge.id} possui origem narrativa inexistente.`
      });
    }
  });

  return {
    ok: !results.some((item) => item.level === "error"),
    errors: results.filter((item) => item.level === "error").length,
    warnings: results.filter((item) => item.level === "warning").length,
    checked: {
      nodes: project.nodes.length,
      canonFacts: project.canonFacts.length,
      knowledgeRelations: project.knowledge.length,
      stateVariables: project.stateVariables.length
    },
    results
  };
}

module.exports = { validateProject };
