export const dfs = {
  key: "dfs",
  name: "Depth-First Search (DFS)",
  description:
    "Explores as far as possible along each branch before backtracking. Does not guarantee the shortest path but uses less memory.",
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

    const stack = [start];
    const visited = new Set([`${start.row},${start.col}`]);

    let steps = 0;
    let nodesVisited = 0;

    while (stack.length > 0) {
      const current = stack.pop();
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
          stack.push(neighbor);
        }
      }
    }

    grid.pathResult.found = false;
    updateOutputs();
  },
};
