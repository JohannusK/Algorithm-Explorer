import { gridPathfindingDocs } from "../../../docs/gridPathfindingDocs.js";
import { astar } from "./astar.js";
import { bfs } from "./bfs.js";
import { dfs } from "./dfs.js";
import { dijkstra } from "./dijkstra.js";
import { greedy } from "./greedy.js";

function mapByKey(list) {
  return list.reduce((acc, algorithm) => {
    const docs = gridPathfindingDocs[algorithm.key] || {};
    acc[algorithm.key] = {
      name: algorithm.name,
      description: algorithm.description,
      run: algorithm.run,
      pseudocode: docs.pseudocode || "",
      implementations: docs.implementations || {},
    };
    return acc;
  }, {});
}

export const gridPathfindingAlgorithms = mapByKey([bfs, dfs, dijkstra, astar, greedy]);
