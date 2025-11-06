import { searchingDocs } from "../../docs/searchingDocs.js";
import { binarySearch } from "./binarySearch.js";
import { exponentialSearch } from "./exponentialSearch.js";
import { fibonacciSearch } from "./fibonacciSearch.js";
import { interpolationSearch } from "./interpolationSearch.js";
import { jumpSearch } from "./jumpSearch.js";
import { linearSearch } from "./linearSearch.js";

function mapByKey(list) {
  return list.reduce((acc, algorithm) => {
    const docs = searchingDocs[algorithm.key] || {};
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

export const searchingAlgorithms = mapByKey([
  linearSearch,
  binarySearch,
  jumpSearch,
  exponentialSearch,
  interpolationSearch,
  fibonacciSearch,
]);
