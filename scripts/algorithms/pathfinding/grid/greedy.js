export const greedy = {
  key: "greedy",
  name: "Greedy Best-First Search",
  description:
    "Always expands the node that appears closest to the goal based on heuristic. Fast but doesn't guarantee the shortest path.",
  async run({ grid, helpers }) {
    const {
      resetVisualization,
      resetResult,
      visualizeCell,
      visualizePath,
      reconstructPath,
      getNeighbors,
      updateOutputs,
      manhattanDistance,
    } = helpers;

    resetVisualization();
    resetResult();

    const start = grid.cells[grid.start.row][grid.start.col];
    const end = grid.cells[grid.end.row][grid.end.col];

    start.heuristic = manhattanDistance(start.row, start.col, end.row, end.col);

    const openSet = [start];
    const visited = new Set([`${start.row},${start.col}`]);

    let steps = 0;
    let nodesVisited = 0;

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.heuristic - b.heuristic);
      const current = openSet.shift();

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
        const key = `${neighbor.row},${neighbor.col}`;
        if (!visited.has(key)) {
          visited.add(key);
          neighbor.parent = current;
          neighbor.heuristic = manhattanDistance(
            neighbor.row,
            neighbor.col,
            end.row,
            end.col,
          );
          openSet.push(neighbor);
        }
      }
    }

    grid.pathResult.found = false;
    updateOutputs();
  },
};
