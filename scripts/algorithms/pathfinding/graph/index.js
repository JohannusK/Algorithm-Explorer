import { graphPathfindingDocs } from "../../../docs/graphPathfindingDocs.js";
import { graphAStar } from "./astar.js";
import { graphDijkstra } from "./dijkstra.js";

function mapByKey(list) {
  return list.reduce((acc, algorithm) => {
    const docs = graphPathfindingDocs[algorithm.key] || {};
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

export const graphPathfindingAlgorithms = mapByKey([graphDijkstra, graphAStar]);
