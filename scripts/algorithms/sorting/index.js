import { sortingDocs } from "../../docs/sortingDocs.js";
import { bogoSort } from "./bogoSort.js";
import { bubbleSort } from "./bubbleSort.js";
import { bucketSort } from "./bucketSort.js";
import { cocktailShakerSort } from "./cocktailShakerSort.js";
import { combSort } from "./combSort.js";
import { countingSort } from "./countingSort.js";
import { heapSort } from "./heapSort.js";
import { insertionSort } from "./insertionSort.js";
import { mergeSort } from "./mergeSort.js";
import { quickSort } from "./quickSort.js";
import { radixSort } from "./radixSort.js";
import { selectionSort } from "./selectionSort.js";
import { shellSort } from "./shellSort.js";
import { timSort } from "./timSort.js";

function mapByKey(list) {
  return list.reduce((acc, algorithm) => {
    const docs = sortingDocs[algorithm.key] || {};
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

export const sortingAlgorithms = mapByKey([
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort,
  heapSort,
  shellSort,
  countingSort,
  radixSort,
  bucketSort,
  timSort,
  combSort,
  cocktailShakerSort,
  bogoSort,
]);
