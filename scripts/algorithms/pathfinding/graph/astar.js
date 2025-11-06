export const graphAStar = {
  key: "astar",
  name: "A* (A-Star)",
  description:
    "Uses a heuristic estimate (straight-line distance) to guide the search toward the goal while still guaranteeing the minimum-cost path.",
  async run({ graph, helpers }) {
    const {
      resetVisualization,
      resetResult,
      updateOutputs,
      animateNodeVisit,
      reconstructPath,
      visualizePath,
      getEdgeElements,
      euclideanDistance,
    } = helpers;

    resetVisualization();
    resetResult();

    if (!graph.nodes.length) {
      return;
    }

    const startId = graph.start;
    const endId = graph.end;
    const parents = new Map();
    const gScore = new Map();
    const fScore = new Map();
    const openSet = [startId];
    const inOpenSet = new Set([startId]);

    graph.nodes.forEach((node) => {
      gScore.set(node.id, Infinity);
      fScore.set(node.id, Infinity);
    });
    gScore.set(startId, 0);
    fScore.set(startId, euclideanDistance(graph.nodes[startId], graph.nodes[endId]));

    let steps = 0;
    let nodesVisited = 0;

    while (openSet.length > 0) {
      openSet.sort((a, b) => fScore.get(a) - fScore.get(b));
      const currentId = openSet.shift();
      inOpenSet.delete(currentId);

      steps += 1;
      nodesVisited += 1;
      graph.pathResult.steps = steps;
      graph.pathResult.nodesVisited = nodesVisited;
      updateOutputs();

      await animateNodeVisit(currentId);

      if (currentId === endId) {
        const path = reconstructPath(parents, endId);
        graph.pathResult.found = true;
        graph.pathResult.path = path;
        graph.pathResult.cost = gScore.get(endId);
        updateOutputs();
        await visualizePath(path, parents);
        return;
      }

      const currentNode = graph.nodes[currentId];
      currentNode.neighbors.forEach((neighbor) => {
        const tentative = gScore.get(currentId) + neighbor.weight;
        if (tentative < gScore.get(neighbor.id)) {
          parents.set(neighbor.id, { nodeId: currentId, edgeId: neighbor.edgeId });
          gScore.set(neighbor.id, tentative);
          const heuristic = euclideanDistance(graph.nodes[neighbor.id], graph.nodes[endId]);
          fScore.set(neighbor.id, tentative + heuristic);
          if (!inOpenSet.has(neighbor.id)) {
            openSet.push(neighbor.id);
            inOpenSet.add(neighbor.id);
          }
          const { line, label } = getEdgeElements(neighbor.edgeId);
          if (line) {
            line.classList.add("visited");
          }
          if (label) {
            label.classList.add("visited");
          }
        }
      });
    }

    graph.pathResult.found = false;
    updateOutputs();
  },
};
