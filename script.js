const appElement = document.querySelector(".app");
const arrayContainer = document.getElementById("array-container");
const sizeInput = document.getElementById("size-input");
const speedInput = document.getElementById("speed-input");
const sortingAlgorithmSelect = document.getElementById("sorting-algorithm-select");
const sortingScenarioSelect = document.getElementById("sorting-scenario-select");
const searchAlgorithmSelect = document.getElementById("search-algorithm-select");
const searchScenarioSelect = document.getElementById("search-scenario-select");
const sizeValue = document.getElementById("size-value");
const speedValue = document.getElementById("speed-value");
const randomizeBtn = document.getElementById("randomize-btn");
const actionBtn = document.getElementById("action-btn");
const targetInput = document.getElementById("target-input");
const targetRandomizeBtn = document.getElementById("target-randomize-btn");
const algorithmNameEl = document.getElementById("algorithm-name");
const algorithmDescriptionEl = document.getElementById("algorithm-description");

const complexityTimeBest = document.getElementById("complexity-time-best");
const complexityTimeAverage = document.getElementById("complexity-time-average");
const complexityTimeWorst = document.getElementById("complexity-time-worst");
const complexitySpace = document.getElementById("complexity-space");
const complexityNote = document.getElementById("complexity-note");

const comparisonOutput = document.getElementById("comparison-count");
const writeOutput = document.getElementById("write-count");
const operationOutput = document.getElementById("operation-count");
const passOutput = document.getElementById("pass-count");

const searchComparisonOutput = document.getElementById("search-comparison-count");
const searchStepOutput = document.getElementById("search-step-count");
const searchResultIndexOutput = document.getElementById("search-result-index");
const searchFoundStatusOutput = document.getElementById("search-found-status");

const growthNEl = document.getElementById("growth-n");
const growthBarBest = document.getElementById("growth-bar-best");
const growthBarAverage = document.getElementById("growth-bar-average");
const growthBarWorst = document.getElementById("growth-bar-worst");
const growthBarActual = document.getElementById("growth-bar-actual");

const tabs = document.querySelectorAll(".tab");
const sortingStatsSection = document.querySelector('.stats[data-mode="sorting"]');
const searchingStatsSection = document.querySelector('.stats[data-mode="searching"]');

const state = {
  mode: "sorting",
  dataset: [],
  maxValue: 1,
  running: false,
  stats: {
    comparisons: 0,
    writes: 0,
    passes: 0,
  },
  sortedIndices: new Set(),
  searchResult: {
    attempted: false,
    found: false,
    index: null,
  },
  searchTarget: 50,
  lastRun: null,
};

const sortingAlgorithms = {
  bubble: {
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the list, swapping adjacent elements that are out of order so larger values bubble to the end.",
    run: bubbleSort,
  },
  insertion: {
    name: "Insertion Sort",
    description:
      "Builds a sorted portion one element at a time by inserting each value into its correct position on the left.",
    run: insertionSort,
  },
  selection: {
    name: "Selection Sort",
    description:
      "Selects the smallest remaining element and swaps it into place, shrinking the unsorted portion each pass.",
    run: selectionSort,
  },
  quick: {
    name: "Quick Sort",
    description:
      "Partitions the array around a pivot so smaller values move left and larger move right, then recursively sorts each side.",
    run: quickSort,
  },
  merge: {
    name: "Merge Sort",
    description:
      "Splits the array into halves, sorts them, and merges the halves back together while keeping the numbers ordered.",
    run: mergeSort,
  },
  bogo: {
    name: "Bogosort",
    description:
      "Randomly shuffles the array until it happens to be sorted. Entertaining, but wildly inefficient—only use with tiny arrays.",
    run: bogoSort,
  },
  heap: {
    name: "Heap Sort",
    description:
      "Builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted portion from the end.",
    run: heapSort,
  },
  shell: {
    name: "Shell Sort",
    description:
      "Improves insertion sort by comparing elements at larger gaps, gradually reducing the gap until the array is sorted.",
    run: shellSort,
  },
  counting: {
    name: "Counting Sort",
    description:
      "Counts occurrences of each value and uses that count to place elements in sorted order. Works best for integers with limited range.",
    run: countingSort,
  },
  radix: {
    name: "Radix Sort",
    description:
      "Sorts integers digit by digit, from least significant to most significant, using a stable counting sort for each digit position.",
    run: radixSort,
  },
};

const searchingAlgorithms = {
  linear: {
    name: "Linear Search",
    description:
      "Checks each element in order until it finds the target value or reaches the end of the list.",
    run: linearSearch,
  },
  binary: {
    name: "Binary Search",
    description:
      "Repeatedly halves the sorted list, comparing the middle value to quickly home in on the target.",
    run: binarySearch,
  },
};

const complexityCatalog = {
  sorting: {
    bubble: {
      time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      note: "Stable; efficient for nearly sorted lists.",
      estimate: {
        best: (n) => Math.max(0, n - 1),
        average: (n) => 0.25 * n * (n - 1),
        worst: (n) => 0.5 * n * (n - 1),
      },
    },
    insertion: {
      time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      note: "Stable; great when the input is almost sorted.",
      estimate: {
        best: (n) => Math.max(0, n - 1),
        average: (n) => 0.25 * n * (n - 1),
        worst: (n) => 0.5 * n * (n - 1),
      },
    },
    selection: {
      time: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      note: "Always scans the full unsorted tail; writes are limited to swaps.",
      estimate: {
        best: (n) => 0.5 * n * (n - 1),
        average: (n) => 0.5 * n * (n - 1),
        worst: (n) => 0.5 * n * (n - 1),
      },
    },
    quick: {
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
      space: "O(log n)",
      note: "In-place and fast on average; worst case appears with already-sorted pivots.",
      estimate: {
        best: (n) => nLogN(n),
        average: (n) => 1.2 * nLogN(n),
        worst: (n) => 0.5 * n * (n - 1),
      },
    },
    merge: {
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      space: "O(n)",
      note: "Consistent performance thanks to the divide-and-conquer merge routine.",
      estimate: {
        best: (n) => 1.1 * nLogN(n),
        average: (n) => 1.1 * nLogN(n),
        worst: (n) => 1.1 * nLogN(n),
      },
    },
    bogo: {
      time: { best: "O(n)", average: "O(n · n!)", worst: "Unbounded" },
      space: "O(1)",
      note: "Expected work grows factorially—fun demo, terrible performance.",
      estimate: {
        best: (n) => Math.max(0, n - 1),
        average: (n) => factorialApprox(n) * n,
        worst: () => Number.POSITIVE_INFINITY,
      },
    },
    heap: {
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      space: "O(1)",
      note: "In-place sort with consistent performance; builds a heap structure.",
      estimate: {
        best: (n) => 1.5 * nLogN(n),
        average: (n) => 2 * nLogN(n),
        worst: (n) => 2 * nLogN(n),
      },
    },
    shell: {
      time: { best: "O(n log n)", average: "O(n^1.3)", worst: "O(n²)" },
      space: "O(1)",
      note: "Gap sequence determines performance; typically faster than O(n²) sorts.",
      estimate: {
        best: (n) => 1.2 * nLogN(n),
        average: (n) => Math.pow(n, 1.3),
        worst: (n) => 0.5 * n * (n - 1),
      },
    },
    counting: {
      time: { best: "O(n+k)", average: "O(n+k)", worst: "O(n+k)" },
      space: "O(k)",
      note: "Linear time for integers; k is the range of values (0-100 here).",
      estimate: {
        best: (n) => n + 100,
        average: (n) => n + 100,
        worst: (n) => n + 100,
      },
    },
    radix: {
      time: { best: "O(d·n)", average: "O(d·n)", worst: "O(d·n)" },
      space: "O(n+k)",
      note: "Linear time for integers; d is number of digits (max 3 for values 4-100).",
      estimate: {
        best: (n) => 3 * n,
        average: (n) => 3 * n,
        worst: (n) => 3 * n,
      },
    },
  },
  searching: {
    linear: {
      time: { best: "O(1)", average: "O(n)", worst: "O(n)" },
      space: "O(1)",
      note: "Works on unsorted data; cost grows linearly with input size.",
      estimate: {
        best: () => 1,
        average: (n) => Math.max(1, n / 2),
        worst: (n) => Math.max(1, n),
      },
    },
    binary: {
      time: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
      space: "O(1)",
      note: "Requires sorted data; halves the search space every step.",
      estimate: {
        best: () => 1,
        average: (n) => Math.max(1, Math.log2(Math.max(n, 1))),
        worst: (n) => Math.max(1, Math.ceil(Math.log2(Math.max(n, 1) + 1))),
      },
    },
  },
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function factorialApprox(n) {
  if (n <= 1) {
    return 1;
  }
  if (n > 12) {
    return Number.POSITIVE_INFINITY;
  }
  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}

function nLogN(n) {
  if (n <= 1) {
    return n;
  }
  return n * Math.log2(n);
}

function invalidateLastRun() {
  state.lastRun = null;
}

function getAlgorithmLibrary(mode = state.mode) {
  return mode === "searching" ? searchingAlgorithms : sortingAlgorithms;
}

function updateAlgorithmDetails(key, mode = state.mode) {
  const library = getAlgorithmLibrary(mode);
  const algorithm = library[key];
  if (!algorithm) {
    return;
  }
  algorithmNameEl.textContent = algorithm.name;
  algorithmDescriptionEl.textContent = algorithm.description;
  updateComplexityPanel(mode, key);
}

function updateComplexityPanel(
  mode = state.mode,
  key = mode === "searching" ? searchAlgorithmSelect.value : sortingAlgorithmSelect.value,
) {
  const entry = complexityCatalog[mode]?.[key];
  if (!entry) {
    return;
  }
  complexityTimeBest.textContent = entry.time.best;
  complexityTimeAverage.textContent = entry.time.average;
  complexityTimeWorst.textContent = entry.time.worst;
  complexitySpace.textContent = entry.space;
  if (entry.note) {
    complexityNote.textContent = entry.note;
    complexityNote.hidden = false;
  } else {
    complexityNote.hidden = true;
  }
  updateGrowthVisualization(mode, key);
}

function computeEstimates(mode, key, n) {
  const entry = complexityCatalog[mode]?.[key];
  if (!entry || !entry.estimate) {
    return null;
  }
  const { estimate } = entry;
  return {
    best: estimate.best ? estimate.best(n) : null,
    average: estimate.average ? estimate.average(n) : null,
    worst: estimate.worst ? estimate.worst(n) : null,
  };
}

function formatOperations(value) {
  if (!Number.isFinite(value)) {
    return "∞";
  }
  const rounded = Math.round(value);
  if (rounded < 1000) {
    return String(rounded);
  }
  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;
  let result = rounded;
  while (result >= 1000 && unitIndex < units.length - 1) {
    result /= 1000;
    unitIndex += 1;
  }
  const precision = result >= 10 ? 0 : result >= 1 ? 1 : 2;
  return `${result.toFixed(precision)}${units[Math.max(unitIndex, 0)]}`;
}

function setGrowthBar(element, value, maxValue, fallbackLabel) {
  if (!element) {
    return;
  }
  const valueEl = element.querySelector(".value");
  const hasValue = value != null;
  let display = fallbackLabel;
  let fill = 0;

  if (hasValue) {
    if (!Number.isFinite(value)) {
      display = "∞";
      fill = 1;
    } else {
      const safe = Math.max(0, value);
      const normaliser = maxValue > 0 ? safe / maxValue : 0;
      fill = Math.min(1, normaliser);
      display = formatOperations(safe);
    }
  }

  element.classList.toggle("empty", !hasValue);
  element.style.setProperty("--fill", String(fill));
  if (valueEl) {
    valueEl.textContent = display;
  }
}

function updateGrowthVisualization(
  mode = state.mode,
  key = mode === "searching" ? searchAlgorithmSelect.value : sortingAlgorithmSelect.value,
) {
  const n = state.dataset.length;
  if (growthNEl) {
    growthNEl.textContent = n;
  }

  const estimates = computeEstimates(mode, key, n) || {
    best: null,
    average: null,
    worst: null,
  };

  let actualValue = null;
  if (
    state.lastRun &&
    state.lastRun.mode === mode &&
    state.lastRun.algorithmKey === key &&
    state.lastRun.n === n
  ) {
    actualValue = state.lastRun.actual.operations;
  }

  const candidates = [];
  ["best", "average", "worst"].forEach((grade) => {
    const value = estimates[grade];
    if (Number.isFinite(value) && value > 0) {
      candidates.push(value);
    }
  });
  if (Number.isFinite(actualValue) && actualValue > 0) {
    candidates.push(actualValue);
  }
  const maxValue = candidates.length ? Math.max(...candidates) : 1;

  setGrowthBar(growthBarBest, estimates.best, maxValue, "—");
  setGrowthBar(growthBarAverage, estimates.average, maxValue, "—");
  setGrowthBar(growthBarWorst, estimates.worst, maxValue, "—");
  setGrowthBar(growthBarActual, actualValue, maxValue, "Run to see");
}

function resetStats() {
  state.stats.comparisons = 0;
  state.stats.writes = 0;
  state.stats.passes = 0;
  updateStats();
}

function resetSearchResult() {
  state.searchResult.attempted = false;
  state.searchResult.found = false;
  state.searchResult.index = null;
  updateSearchOutputs();
}

function updateStats() {
  comparisonOutput.textContent = state.stats.comparisons;
  writeOutput.textContent = state.stats.writes;
  operationOutput.textContent = state.stats.comparisons + state.stats.writes;
  passOutput.textContent = state.stats.passes;
  updateSearchOutputs();
}

function updateSearchOutputs() {
  if (!searchComparisonOutput) {
    return;
  }
  searchComparisonOutput.textContent = state.stats.comparisons;
  searchStepOutput.textContent = state.stats.passes;
  if (state.searchResult.attempted) {
    searchResultIndexOutput.textContent = state.searchResult.found
      ? state.searchResult.index
      : "-1";
    searchFoundStatusOutput.textContent = state.searchResult.found ? "Yes" : "No";
  } else {
    searchResultIndexOutput.textContent = "—";
    searchFoundStatusOutput.textContent = "No";
  }
}

function updateLabels() {
  sizeValue.textContent = sizeInput.value;
  speedValue.textContent = `${speedInput.value}ms`;
}

function sanitizeTarget(value) {
  let numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    numericValue = 0;
  }
  numericValue = Math.round(Math.max(0, Math.min(100, numericValue)));
  return numericValue;
}

function updateActionButtonState(running = state.running) {
  const isSorting = state.mode === "sorting";
  actionBtn.textContent = running
    ? isSorting
      ? "Sorting..."
      : "Searching..."
    : isSorting
    ? "Start Sorting"
    : "Start Searching";
}

function toggleControls(disabled) {
  sizeInput.disabled = disabled;
  randomizeBtn.disabled = disabled;
  actionBtn.disabled = disabled;
  sortingAlgorithmSelect.disabled = disabled;
  sortingScenarioSelect.disabled = disabled;
  searchAlgorithmSelect.disabled = disabled;
  searchScenarioSelect.disabled = disabled;
  if (targetInput) {
    targetInput.disabled = disabled;
  }
  if (targetRandomizeBtn) {
    targetRandomizeBtn.disabled = disabled;
  }
  tabs.forEach((tab) => {
    tab.disabled = disabled;
  });
  updateActionButtonState(disabled);
}

function normalizeIndices(input) {
  if (input == null) {
    return [];
  }
  const arrayForm = Array.isArray(input) ? input : [input];
  return arrayForm.filter(
    (index) =>
      Number.isInteger(index) && index >= 0 && index < state.dataset.length,
  );
}

function setActive(indices = []) {
  const highlight = new Set(normalizeIndices(indices));
  const bars = arrayContainer.children;
  for (let i = 0; i < bars.length; i += 1) {
    if (highlight.has(i)) {
      bars[i].classList.add("active");
    } else {
      bars[i].classList.remove("active");
    }
  }
}

function clearActive() {
  setActive([]);
}

function updateSortedClasses() {
  const bars = arrayContainer.children;
  for (let i = 0; i < bars.length; i += 1) {
    if (state.sortedIndices.has(i)) {
      bars[i].classList.add("sorted");
    } else {
      bars[i].classList.remove("sorted");
    }
  }
}

function addSorted(indices) {
  if (state.mode !== "sorting") {
    return;
  }
  const list = normalizeIndices(indices);
  if (list.length === 0) {
    return;
  }
  let changed = false;
  list.forEach((index) => {
    if (!state.sortedIndices.has(index)) {
      state.sortedIndices.add(index);
      changed = true;
    }
  });
  if (changed) {
    updateSortedClasses();
  }
}

function markAllSorted() {
  if (state.mode !== "sorting") {
    return;
  }
  state.sortedIndices.clear();
  for (let i = 0; i < state.dataset.length; i += 1) {
    state.sortedIndices.add(i);
  }
  updateSortedClasses();
}

function clearSorted() {
  if (state.sortedIndices.size === 0) {
    return;
  }
  state.sortedIndices.clear();
  updateSortedClasses();
}

function getDelay() {
  return Math.max(10, Number(speedInput.value));
}

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function pause(multiplier = 1) {
  const delay = getDelay() * multiplier;
  if (delay <= 0) {
    return;
  }
  await sleep(delay);
}

function updateBar(index) {
  const bar = arrayContainer.children[index];
  if (!bar) {
    return;
  }
  const value = state.dataset[index];
  bar.dataset.value = value;
  bar.style.height = `${(value / state.maxValue) * 100}%`;
}

async function swapElements(i, j) {
  if (i === j) {
    return;
  }
  const arr = state.dataset;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  recordWrite(3);
  updateBar(i);
  updateBar(j);
  await pause();
}

async function overwriteValue(index, value) {
  state.dataset[index] = value;
  state.maxValue = Math.max(state.maxValue, value);
  recordWrite();
  updateBar(index);
  await pause();
}

function recordComparison(count = 1) {
  state.stats.comparisons += count;
  updateStats();
}

function recordWrite(count = 1) {
  state.stats.writes += count;
  updateStats();
}

function setPass(value) {
  state.stats.passes = value;
  updateStats();
}

function incrementPass() {
  state.stats.passes += 1;
  updateStats();
}

function getCurrentPass() {
  return state.stats.passes;
}

function createContext() {
  return {
    data: () => state.dataset,
    highlight: (indices) => setActive(indices),
    clearActive,
    pause,
    swap: swapElements,
    overwrite: overwriteValue,
    recordComparison,
    recordWrite,
    setPass,
    incrementPass,
    getPass: getCurrentPass,
    addSorted,
    markAllSorted,
    clearSorted,
    setResult: setSearchResult,
  };
}

function renderBars() {
  arrayContainer.innerHTML = "";
  state.dataset.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${(value / state.maxValue) * 100}%`;
    bar.dataset.value = value;
    bar.setAttribute("role", "img");
    bar.setAttribute("aria-label", `Value ${value}`);
    arrayContainer.appendChild(bar);
  });
  updateSortedClasses();
}

function transformSortingDataset({ shuffleRandom = false } = {}) {
  if (state.dataset.length === 0) {
    return;
  }
  const scenario = sortingScenarioSelect.value;
  if (scenario === "sorted") {
    state.dataset.sort((a, b) => a - b);
  } else if (scenario === "reversed") {
    state.dataset.sort((a, b) => a - b);
    state.dataset.reverse();
  } else if (shuffleRandom) {
    shuffleArray(state.dataset);
  }
}

function findAbsentTarget(dataset) {
  const candidates = new Set(dataset);
  for (let candidate = 0; candidate <= 100; candidate += 1) {
    if (!candidates.has(candidate)) {
      return candidate;
    }
  }
  return 0;
}

function setSearchTargetForScenario({ preserveResults = false } = {}) {
  const scenario = searchScenarioSelect.value;
  const arr = state.dataset;
  let target = state.searchTarget;

  if (arr.length > 0) {
    switch (scenario) {
      case "first":
        target = arr[0];
        break;
      case "middle":
        target = arr[Math.floor((arr.length - 1) / 2)];
        break;
      case "last":
        target = arr[arr.length - 1];
        break;
      case "absent":
        target = findAbsentTarget(arr);
        break;
      case "random-present":
      default: {
        const index = randomInt(0, arr.length - 1);
        target = arr[index];
        break;
      }
    }
  }

  state.searchTarget = sanitizeTarget(target);
  if (targetInput) {
    targetInput.value = state.searchTarget;
  }
  if (!preserveResults) {
    resetSearchResult();
  }
}

function applySortingScenario({ shuffleRandom = true } = {}) {
  if (state.running) {
    return;
  }
  if (sortingScenarioSelect.value === "random" && shuffleRandom) {
    shuffleArray(state.dataset);
  } else {
    transformSortingDataset({ shuffleRandom: false });
  }
  state.maxValue = Math.max(...state.dataset, 1);
  renderBars();
  clearActive();
  clearSorted();
  resetStats();
  invalidateLastRun();
  updateGrowthVisualization("sorting", sortingAlgorithmSelect.value);
}

function applySearchScenario({ fromGenerate = false } = {}) {
  if (state.running) {
    return;
  }
  if (state.dataset.length > 0) {
    state.dataset.sort((a, b) => a - b);
    state.maxValue = Math.max(...state.dataset, 1);
    renderBars();
  } else {
    arrayContainer.innerHTML = "";
  }
  setSearchTargetForScenario({ preserveResults: fromGenerate });
  clearActive();
  clearSorted();
  resetStats();
  if (!fromGenerate) {
    invalidateLastRun();
  }
  updateGrowthVisualization("searching", searchAlgorithmSelect.value);
}

function generateArray(size = Number(sizeInput.value)) {
  if (state.running) {
    return;
  }
  invalidateLastRun();
  const resolvedSize = Math.max(1, size);
  state.dataset = Array.from({ length: resolvedSize }, () => randomInt(4, 100));
  if (state.mode === "sorting") {
    transformSortingDataset({ shuffleRandom: false });
  } else {
    state.dataset.sort((a, b) => a - b);
  }
  state.maxValue = Math.max(...state.dataset, 1);
  renderBars();
  clearActive();
  clearSorted();
  resetStats();
  if (state.mode === "searching") {
    setSearchTargetForScenario({ preserveResults: false });
  }
  updateGrowthVisualization();
}

function captureRunSummary(mode, algorithmKey) {
  state.lastRun = {
    mode,
    algorithmKey,
    n: state.dataset.length,
    actual: {
      comparisons: state.stats.comparisons,
      writes: state.stats.writes,
      passes: state.stats.passes,
      operations: state.stats.comparisons + state.stats.writes,
    },
    timestamp: Date.now(),
  };
  if (mode === "searching") {
    state.lastRun.target = state.searchTarget;
    state.lastRun.result = { ...state.searchResult };
  }
  updateGrowthVisualization(mode, algorithmKey);
}

function setSearchResult(found, index) {
  state.searchResult.attempted = true;
  state.searchResult.found = Boolean(found);
  state.searchResult.index = found ? index : -1;
  updateSearchOutputs();
}

async function runSort() {
  if (state.running) {
    return;
  }
  const algorithmKey = sortingAlgorithmSelect.value;
  const algorithm = sortingAlgorithms[algorithmKey];
  if (!algorithm) {
    return;
  }

  state.running = true;
  toggleControls(true);
  resetStats();
  clearActive();
  clearSorted();
  invalidateLastRun();

  const context = createContext();

  try {
    await algorithm.run(context);
    markAllSorted();
    captureRunSummary("sorting", algorithmKey);
  } finally {
    clearActive();
    state.running = false;
    toggleControls(false);
  }
}

async function runSearch() {
  if (state.running) {
    return;
  }
  const algorithmKey = searchAlgorithmSelect.value;
  const algorithm = searchingAlgorithms[algorithmKey];
  if (!algorithm) {
    return;
  }

  const targetValue = targetInput ? sanitizeTarget(targetInput.value) : state.searchTarget;
  if (targetInput) {
    targetInput.value = targetValue;
  }
  state.searchTarget = targetValue;

  state.dataset.sort((a, b) => a - b);
  state.maxValue = Math.max(...state.dataset, 1);
  renderBars();

  state.running = true;
  toggleControls(true);
  resetStats();
  resetSearchResult();
  invalidateLastRun();

  const context = createContext();

  try {
    await algorithm.run(context, targetValue);
    captureRunSummary("searching", algorithmKey);
  } finally {
    clearActive();
    state.running = false;
    toggleControls(false);
  }
}

async function bubbleSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }
  for (let pass = 0; pass < n - 1; pass += 1) {
    let swapped = false;
    ctx.setPass(pass + 1);
    for (let i = 0; i < n - pass - 1; i += 1) {
      ctx.highlight([i, i + 1]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[i] > arr[i + 1]) {
        await ctx.swap(i, i + 1);
        swapped = true;
      }
    }
    ctx.clearActive();
    ctx.addSorted(n - pass - 1);
    if (!swapped) {
      break;
    }
  }
}

async function insertionSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  for (let i = 1; i < n; i += 1) {
    ctx.setPass(i);
    let j = i - 1;
    const key = arr[i];
    ctx.highlight([i]);
    await ctx.pause();

    while (j >= 0) {
      ctx.highlight([j, j + 1]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[j] > key) {
        await ctx.overwrite(j + 1, arr[j]);
        j -= 1;
      } else {
        break;
      }
    }

    await ctx.overwrite(j + 1, key);
    ctx.clearActive();
    ctx.addSorted(Array.from({ length: i + 1 }, (_, index) => index));
  }
}

async function selectionSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  for (let i = 0; i < n - 1; i += 1) {
    let minIndex = i;
    ctx.setPass(i + 1);
    for (let j = i + 1; j < n; j += 1) {
      ctx.highlight([minIndex, j]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      await ctx.swap(i, minIndex);
    }
    ctx.clearActive();
    ctx.addSorted(i);
  }
}

async function quickSort(ctx) {
  const arr = ctx.data();
  async function sortRange(low, high) {
    if (low >= high) {
      if (low === high) {
        ctx.addSorted(low);
      }
      return;
    }
    ctx.incrementPass();
    const pivotIndex = await partition(low, high);
    ctx.addSorted(pivotIndex);
    await sortRange(low, pivotIndex - 1);
    await sortRange(pivotIndex + 1, high);
  }

  async function partition(low, high) {
    const pivotValue = arr[high];
    let storeIndex = low;
    for (let j = low; j < high; j += 1) {
      ctx.highlight([j, high]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[j] <= pivotValue) {
        await ctx.swap(storeIndex, j);
        storeIndex += 1;
      }
    }
    await ctx.swap(storeIndex, high);
    ctx.clearActive();
    return storeIndex;
  }

  await sortRange(0, arr.length - 1);
}

async function mergeSort(ctx) {
  const arr = ctx.data();

  async function sortRange(start, end) {
    if (start >= end) {
      return;
    }
    const mid = Math.floor((start + end) / 2);
    await sortRange(start, mid);
    await sortRange(mid + 1, end);
    await merge(start, mid, end);
    ctx.incrementPass();
  }

  async function merge(start, mid, end) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      ctx.highlight([start + i, mid + 1 + j, k]);
      ctx.recordComparison();
      await ctx.pause();
      if (left[i] <= right[j]) {
        await ctx.overwrite(k, left[i]);
        i += 1;
      } else {
        await ctx.overwrite(k, right[j]);
        j += 1;
      }
      k += 1;
    }

    while (i < left.length) {
      ctx.highlight([start + i, k]);
      await ctx.pause();
      await ctx.overwrite(k, left[i]);
      i += 1;
      k += 1;
    }

    while (j < right.length) {
      ctx.highlight([mid + 1 + j, k]);
      await ctx.pause();
      await ctx.overwrite(k, right[j]);
      j += 1;
      k += 1;
    }

    ctx.clearActive();
  }

  await sortRange(0, arr.length - 1);
}

async function bogoSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  const maxAttempts = 5000;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    ctx.setPass(attempt);
    let sorted = true;

    for (let i = 0; i < n - 1; i += 1) {
      ctx.highlight([i, i + 1]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[i] > arr[i + 1]) {
        sorted = false;
        break;
      }
    }

    ctx.clearActive();

    if (sorted) {
      return;
    }

    for (let i = n - 1; i > 0; i -= 1) {
      const j = randomInt(0, i);
      if (i !== j) {
        ctx.highlight([i, j]);
        await ctx.pause();
        await ctx.swap(i, j);
      }
    }

    ctx.clearActive();
  }

  console.warn("Bogosort hit attempt limit without finishing. Try a smaller array.");
}

async function heapSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  async function heapify(heapSize, rootIndex) {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    if (left < heapSize) {
      ctx.highlight([largest, left]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      ctx.highlight([largest, right]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIndex) {
      await ctx.swap(rootIndex, largest);
      await heapify(heapSize, largest);
    }
  }

  // Build max heap
  ctx.setPass(1);
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    await heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i -= 1) {
    ctx.setPass(n - i + 1);
    await ctx.swap(0, i);
    ctx.addSorted(i);
    await heapify(i, 0);
  }
  ctx.clearActive();
}

async function shellSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  // Generate gap sequence (Knuth's sequence: h = 3*h + 1)
  let gap = 1;
  while (gap < Math.floor(n / 3)) {
    gap = 3 * gap + 1;
  }

  let pass = 0;
  while (gap >= 1) {
    pass += 1;
    ctx.setPass(pass);

    for (let i = gap; i < n; i += 1) {
      const temp = arr[i];
      let j = i;

      while (j >= gap) {
        ctx.highlight([j, j - gap]);
        ctx.recordComparison();
        await ctx.pause();

        if (arr[j - gap] > temp) {
          await ctx.overwrite(j, arr[j - gap]);
          j -= gap;
        } else {
          break;
        }
      }

      if (j !== i) {
        await ctx.overwrite(j, temp);
      }
      ctx.clearActive();
    }

    gap = Math.floor(gap / 3);
  }
}

async function countingSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  // Find min and max values
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < n; i += 1) {
    ctx.highlight([i]);
    ctx.recordComparison(2);
    await ctx.pause();
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }
  ctx.clearActive();

  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(n);

  // Count occurrences
  ctx.setPass(1);
  for (let i = 0; i < n; i += 1) {
    ctx.highlight([i]);
    await ctx.pause();
    count[arr[i] - min] += 1;
    ctx.recordWrite();
  }
  ctx.clearActive();

  // Accumulate counts
  ctx.setPass(2);
  for (let i = 1; i < range; i += 1) {
    count[i] += count[i - 1];
  }

  // Build output array
  ctx.setPass(3);
  for (let i = n - 1; i >= 0; i -= 1) {
    ctx.highlight([i]);
    await ctx.pause();
    const value = arr[i];
    const position = count[value - min] - 1;
    output[position] = value;
    count[value - min] -= 1;
  }
  ctx.clearActive();

  // Copy back to original array
  ctx.setPass(4);
  for (let i = 0; i < n; i += 1) {
    ctx.highlight([i]);
    await ctx.overwrite(i, output[i]);
  }
  ctx.clearActive();
}

async function radixSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  // Find maximum value to determine number of digits
  let max = arr[0];
  for (let i = 1; i < n; i += 1) {
    ctx.highlight([i]);
    ctx.recordComparison();
    await ctx.pause();
    if (arr[i] > max) max = arr[i];
  }
  ctx.clearActive();

  let pass = 0;
  // Process each digit position
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    pass += 1;
    ctx.setPass(pass);
    await countingSortByDigit(ctx, exp);
  }
}

async function countingSortByDigit(ctx, exp) {
  const arr = ctx.data();
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  // Count occurrences of digits
  for (let i = 0; i < n; i += 1) {
    ctx.highlight([i]);
    await ctx.pause();
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit] += 1;
    ctx.recordWrite();
  }
  ctx.clearActive();

  // Accumulate counts
  for (let i = 1; i < 10; i += 1) {
    count[i] += count[i - 1];
  }

  // Build output array (process from end to maintain stability)
  for (let i = n - 1; i >= 0; i -= 1) {
    ctx.highlight([i]);
    await ctx.pause();
    const digit = Math.floor(arr[i] / exp) % 10;
    const position = count[digit] - 1;
    output[position] = arr[i];
    count[digit] -= 1;
  }
  ctx.clearActive();

  // Copy back to original array
  for (let i = 0; i < n; i += 1) {
    ctx.highlight([i]);
    await ctx.overwrite(i, output[i]);
  }
  ctx.clearActive();
}

async function linearSearch(ctx, target) {
  const arr = ctx.data();
  for (let i = 0; i < arr.length; i += 1) {
    ctx.setPass(i + 1);
    ctx.highlight([i]);
    ctx.recordComparison();
    await ctx.pause();
    if (arr[i] === target) {
      ctx.setResult(true, i);
      ctx.highlight([i]);
      await ctx.pause();
      return;
    }
    ctx.clearActive();
  }
  ctx.clearActive();
  ctx.setResult(false, -1);
}

async function binarySearch(ctx, target) {
  const arr = ctx.data();
  let low = 0;
  let high = arr.length - 1;
  let steps = 0;

  while (low <= high) {
    steps += 1;
    const mid = Math.floor((low + high) / 2);
    ctx.setPass(steps);
    const highlightIndices = [...new Set([low, mid, high])].filter(
      (index) => index >= 0 && index < arr.length,
    );
    ctx.highlight(highlightIndices);
    ctx.recordComparison();
    await ctx.pause();

    if (arr[mid] === target) {
      ctx.setResult(true, mid);
      ctx.highlight([mid]);
      await ctx.pause();
      return;
    }

    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }

    ctx.clearActive();
    await ctx.pause();
  }

  ctx.clearActive();
  ctx.setResult(false, -1);
}

function setMode(mode, { force = false } = {}) {
  if (!force && state.running) {
    return;
  }
  if (!force && mode === state.mode) {
    return;
  }
  if (mode !== "sorting" && mode !== "searching") {
    return;
  }

  state.mode = mode;
  appElement.dataset.mode = mode;
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === mode;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  sortingStatsSection.hidden = mode !== "sorting";
  searchingStatsSection.hidden = mode !== "searching";
  updateActionButtonState();

  clearActive();
  clearSorted();
  resetStats();
  resetSearchResult();
  invalidateLastRun();

  if (mode === "searching") {
    state.dataset.sort((a, b) => a - b);
    state.maxValue = state.dataset.length ? Math.max(...state.dataset, 1) : 1;
    renderBars();
    setSearchTargetForScenario({ preserveResults: false });
  } else {
    if (state.dataset.length > 0) {
      transformSortingDataset({ shuffleRandom: true });
      state.maxValue = Math.max(...state.dataset, 1);
      renderBars();
    } else {
      arrayContainer.innerHTML = "";
    }
  }

  const key = mode === "searching" ? searchAlgorithmSelect.value : sortingAlgorithmSelect.value;
  updateAlgorithmDetails(key, mode);
}

sizeInput.addEventListener("input", updateLabels);
sizeInput.addEventListener("change", () => {
  generateArray(Number(sizeInput.value));
});

speedInput.addEventListener("input", updateLabels);

sortingAlgorithmSelect.addEventListener("change", () => {
  if (state.running) {
    return;
  }
  invalidateLastRun();
  updateAlgorithmDetails(sortingAlgorithmSelect.value, "sorting");
  clearSorted();
  resetStats();
});

searchAlgorithmSelect.addEventListener("change", () => {
  if (state.running) {
    return;
  }
  invalidateLastRun();
  updateAlgorithmDetails(searchAlgorithmSelect.value, "searching");
  resetStats();
  resetSearchResult();
});

sortingScenarioSelect.addEventListener("change", () => {
  if (state.running) {
    return;
  }
  invalidateLastRun();
  applySortingScenario({ shuffleRandom: true });
});

searchScenarioSelect.addEventListener("change", () => {
  if (state.running) {
    return;
  }
  invalidateLastRun();
  applySearchScenario();
});

randomizeBtn.addEventListener("click", () => {
  generateArray(Number(sizeInput.value));
});

actionBtn.addEventListener("click", () => {
  if (state.mode === "sorting") {
    runSort();
  } else {
    runSearch();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (tab.disabled) {
      return;
    }
    setMode(tab.dataset.tab);
  });
});

if (targetInput) {
  targetInput.addEventListener("input", () => {
    const sanitized = sanitizeTarget(targetInput.value);
    if (targetInput.value !== String(sanitized)) {
      targetInput.value = sanitized;
    }
    state.searchTarget = sanitized;
    invalidateLastRun();
    resetSearchResult();
    updateGrowthVisualization("searching", searchAlgorithmSelect.value);
  });
}

if (targetRandomizeBtn) {
  targetRandomizeBtn.addEventListener("click", () => {
    if (state.running) {
      return;
    }
    if (state.dataset.length > 0) {
      state.searchTarget =
        state.dataset[randomInt(0, state.dataset.length - 1)];
    } else {
      state.searchTarget = randomInt(0, 100);
    }
    if (targetInput) {
      targetInput.value = state.searchTarget;
    }
    searchScenarioSelect.value = "random-present";
    invalidateLastRun();
    resetSearchResult();
    updateGrowthVisualization("searching", searchAlgorithmSelect.value);
  });
}

updateLabels();
state.searchTarget = targetInput ? sanitizeTarget(targetInput.value) : state.searchTarget;
if (targetInput) {
  targetInput.value = state.searchTarget;
}
updateAlgorithmDetails(sortingAlgorithmSelect.value, "sorting");
resetSearchResult();
generateArray(Number(sizeInput.value));
setMode("sorting", { force: true });
