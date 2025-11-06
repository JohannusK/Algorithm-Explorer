export const dijkstra = {
  key: "dijkstra",
  name: "Dijkstra's Algorithm",
  description:
    "Finds the shortest path by always expanding the node with the smallest known distance. Guarantees the shortest path.",
  async run({ grid, helpers }) {
    const {
      resetVisualization,
      resetResult,
      visualizeCell,
      visualizePath,
      reconstructPath,
      getNeighbors,
      updateOutputs,
    } = helpers;

    resetVisualization();
    resetResult();

    const start = grid.cells[grid.start.row][grid.start.col];
    const end = grid.cells[grid.end.row][grid.end.col];

    start.distance = 0;
    const unvisited = [];

    for (let row = 0; row < grid.size; row += 1) {
      for (let col = 0; col < grid.size; col += 1) {
        unvisited.push(grid.cells[row][col]);
      }
    }

    let steps = 0;
    let nodesVisited = 0;

    while (unvisited.length > 0) {
      unvisited.sort((a, b) => a.distance - b.distance);
      const current = unvisited.shift();

      if (current.distance === Infinity) break;

      steps += 1;
      nodesVisited += 1;

      grid.pathResult.steps = steps;
      grid.pathResult.nodesVisited = nodesVisited;
      updateOutputs();

      await visualizeCell(current.row, current.col, "visiting");

      if (current.row === end.row && current.col === end.col) {
        const path = reconstructPath(current);
        grid.pathResult.found = true;
        grid.pathResult.path = path;
        updateOutputs();
        await visualizePath(path);
        return;
      }

      await visualizeCell(current.row, current.col, "visited");

      const neighbors = getNeighbors(current.row, current.col);
      for (const neighbor of neighbors) {
        const altDistance = current.distance + 1;
        if (altDistance < neighbor.distance) {
          neighbor.distance = altDistance;
          neighbor.parent = current;
        }
      }
    }

    grid.pathResult.found = false;
    updateOutputs();
  },
};
