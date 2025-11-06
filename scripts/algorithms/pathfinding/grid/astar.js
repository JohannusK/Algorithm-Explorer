export const astar = {
  key: "astar",
  name: "A* (A-Star)",
  description:
    "Combines Dijkstra's approach with heuristics to guide the search toward the goal. Very efficient and guarantees the shortest path.",
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

    start.distance = 0;
    start.heuristic = manhattanDistance(start.row, start.col, end.row, end.col);
    start.fScore = start.heuristic;

    const openSet = [start];
    const closedSet = new Set();

    let steps = 0;
    let nodesVisited = 0;

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.fScore - b.fScore);
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
      closedSet.add(`${current.row},${current.col}`);

      const neighbors = getNeighbors(current.row, current.col);
      for (const neighbor of neighbors) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (closedSet.has(key)) continue;

        const tentativeG = current.distance + 1;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeG >= neighbor.distance) {
          continue;
        }

        neighbor.parent = current;
        neighbor.distance = tentativeG;
        neighbor.heuristic = manhattanDistance(neighbor.row, neighbor.col, end.row, end.col);
        neighbor.fScore = neighbor.distance + neighbor.heuristic;
      }
    }

    grid.pathResult.found = false;
    updateOutputs();
  },
};
