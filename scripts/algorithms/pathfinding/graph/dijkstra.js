export const graphDijkstra = {
  key: "dijkstra",
  name: "Dijkstra's Algorithm",
  description:
    "Expands nodes in order of the smallest known distance from the start. Works with any non-negative edge weights and guarantees the minimum-cost path.",
  async run({ graph, helpers }) {
    const {
      resetVisualization,
      resetResult,
      updateOutputs,
      animateNodeVisit,
      reconstructPath,
      visualizePath,
      getEdgeElements,
    } = helpers;

    resetVisualization();
    resetResult();

    if (!graph.nodes.length) {
      return;
    }

    const startId = graph.start;
    const endId = graph.end;
    const distances = new Map();
    const parents = new Map();
    const visited = new Set();
    const frontier = [];

    graph.nodes.forEach((node) => {
      distances.set(node.id, Infinity);
    });
    distances.set(startId, 0);
    frontier.push(startId);

    let steps = 0;
    let nodesVisited = 0;

    while (frontier.length > 0) {
      frontier.sort((a, b) => distances.get(a) - distances.get(b));
      const currentId = frontier.shift();
      if (visited.has(currentId)) {
        continue;
      }
      visited.add(currentId);

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
        graph.pathResult.cost = distances.get(endId);
        updateOutputs();
        await visualizePath(path, parents);
        return;
      }

      const currentNode = graph.nodes[currentId];
      currentNode.neighbors.forEach((neighbor) => {
        const tentative = distances.get(currentId) + neighbor.weight;
        if (tentative < distances.get(neighbor.id)) {
          distances.set(neighbor.id, tentative);
          parents.set(neighbor.id, { nodeId: currentId, edgeId: neighbor.edgeId });
          frontier.push(neighbor.id);
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
