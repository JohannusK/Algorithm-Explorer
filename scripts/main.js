import { sortingAlgorithms } from "./algorithms/sorting/index.js";
import { searchingAlgorithms } from "./algorithms/searching/index.js";
import { gridPathfindingAlgorithms } from "./algorithms/pathfinding/grid/index.js";
import { graphPathfindingAlgorithms } from "./algorithms/pathfinding/graph/index.js";

const appElement = document.querySelector(".app");
const arrayContainer = document.getElementById("array-container");
const gridContainer = document.getElementById("grid-container");
const graphContainer = document.getElementById("graph-container");
const sizeInput = document.getElementById("size-input");
const sizeLabel = document.getElementById("size-label");
const speedInput = document.getElementById("speed-input");
const sortingAlgorithmSelect = document.getElementById("sorting-algorithm-select");
const sortingScenarioSelect = document.getElementById("sorting-scenario-select");
const searchAlgorithmSelect = document.getElementById("search-algorithm-select");
const searchScenarioSelect = document.getElementById("search-scenario-select");
const pathfindingAlgorithmSelect = document.getElementById("pathfinding-algorithm-select");
const graphPathfindingAlgorithmSelect = document.getElementById("graph-pathfinding-algorithm-select");
const gridSizeInput = document.getElementById("grid-size-input");
const gridSizeValue = document.getElementById("grid-size-value");
const wallDensityInput = document.getElementById("wall-density-input");
const wallDensityValue = document.getElementById("wall-density-value");
const clearWallsBtn = document.getElementById("clear-walls-btn");
const generateMazeBtn = document.getElementById("generate-maze-btn");
const graphNodeCountInput = document.getElementById("graph-node-count-input");
const graphNodeCountValue = document.getElementById("graph-node-count-value");
const graphDensityInput = document.getElementById("graph-density-input");
const graphDensityValue = document.getElementById("graph-density-value");
const sizeValue = document.getElementById("size-value");
const speedValue = document.getElementById("speed-value");
const randomizeBtn = document.getElementById("randomize-btn");
const actionBtn = document.getElementById("action-btn");
const targetInput = document.getElementById("target-input");
const targetRandomizeBtn = document.getElementById("target-randomize-btn");
const algorithmNameEl = document.getElementById("algorithm-name");
const algorithmDescriptionEl = document.getElementById("algorithm-description");
const graphShuffleWeightsBtn = document.getElementById("graph-shuffle-weights-btn");
const graphResetBtn = document.getElementById("graph-reset-btn");
const algorithmPseudocodeEl = document.getElementById("algorithm-pseudocode");
const algorithmCodeEl = document.getElementById("algorithm-code");
const codeLanguageButtons = document.querySelectorAll("[data-code-language]");

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

const pathNodesVisitedOutput = document.getElementById("path-nodes-visited");
const pathLengthOutput = document.getElementById("path-length");
const pathFoundStatusOutput = document.getElementById("path-found-status");
const pathStepCountOutput = document.getElementById("path-step-count");
const graphPathNodesVisitedOutput = document.getElementById("graph-path-nodes-visited");
const graphPathCostOutput = document.getElementById("graph-path-cost");
const graphPathFoundStatusOutput = document.getElementById("graph-path-found-status");
const graphPathStepCountOutput = document.getElementById("graph-path-step-count");

const sortingStatsSection = document.querySelector('.stats[data-mode="sorting"]');
const searchingStatsSection = document.querySelector('.stats[data-mode="searching"]');
const pathfindingStatsSection = document.querySelector('.stats[data-mode="pathfinding"]');
const graphPathfindingStatsSection = document.querySelector('.stats[data-mode="graph-pathfinding"]');

const growthNEl = document.getElementById("growth-n");
const growthBarBest = document.getElementById("growth-bar-best");
const growthBarAverage = document.getElementById("growth-bar-average");
const growthBarWorst = document.getElementById("growth-bar-worst");
const growthBarActual = document.getElementById("growth-bar-actual");

const tabs = document.querySelectorAll(".tab");
const SUPPORTED_CODE_LANGUAGES = ["python", "c", "rust", "java"];
const languageButtonMap = {};

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
  grid: {
   size: 20,
   cells: [],
   start: null,
   end: null,
   minDistance: 20, // Will be adjusted based on grid size
   pathResult: {
     found: false,
     path: [],
     nodesVisited: 0,
     steps: 0,
   },
 },
  graph: {
    nodeCount: 8,
    density: 0.45,
    nodes: [],
    edges: [],
    start: null,
    end: null,
    pathResult: {
      found: false,
      path: [],
      cost: 0,
      nodesVisited: 0,
      steps: 0,
    },
  },
  docs: {
    language: "python",
    algorithmKey: null,
    mode: "sorting",
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
    bucket: {
      time: { best: "O(n+k)", average: "O(n+k)", worst: "O(n²)" },
      space: "O(n+k)",
      note: "Efficient for uniformly distributed data; worst case when all elements land in one bucket.",
      estimate: {
        best: (n) => n + 10,
        average: (n) => 2 * n,
        worst: (n) => 0.5 * n * (n - 1),
      },
    },
    tim: {
      time: { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
      space: "O(n)",
      note: "Adapts to patterns in data; excels with partially sorted inputs.",
      estimate: {
        best: (n) => n,
        average: (n) => 1.3 * nLogN(n),
        worst: (n) => 1.5 * nLogN(n),
      },
    },
    comb: {
      time: { best: "O(n log n)", average: "O(n²/2^p)", worst: "O(n²)" },
      space: "O(1)",
      note: "Typically faster than bubble sort; gap shrinks by factor of 1.3 each pass.",
      estimate: {
        best: (n) => 1.1 * nLogN(n),
        average: (n) => 0.35 * n * (n - 1),
        worst: (n) => 0.5 * n * (n - 1),
      },
    },
    cocktail: {
      time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      note: "Bidirectional bubble sort; slightly better than bubble sort on average.",
      estimate: {
        best: (n) => Math.max(0, n - 1),
        average: (n) => 0.4 * n * (n - 1),
        worst: (n) => 0.5 * n * (n - 1),
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
    jump: {
      time: { best: "O(1)", average: "O(√n)", worst: "O(√n)" },
      space: "O(1)",
      note: "Optimal jump size is √n; better than linear for large sorted arrays.",
      estimate: {
        best: () => 1,
        average: (n) => Math.max(1, Math.sqrt(n)),
        worst: (n) => Math.max(1, Math.sqrt(n) + Math.sqrt(n)),
      },
    },
    exponential: {
      time: { best: "O(1)", average: "O(log i)", worst: "O(log n)" },
      space: "O(1)",
      note: "Efficient for unbounded arrays; i is the position of target element.",
      estimate: {
        best: () => 1,
        average: (n) => Math.max(1, Math.log2(Math.max(n, 1)) * 0.7),
        worst: (n) => Math.max(1, Math.log2(Math.max(n, 1)) + 2),
      },
    },
    interpolation: {
      time: { best: "O(1)", average: "O(log log n)", worst: "O(n)" },
      space: "O(1)",
      note: "Very fast for uniformly distributed data; degrades to O(n) for non-uniform data.",
      estimate: {
        best: () => 1,
        average: (n) => Math.max(1, Math.log2(Math.log2(Math.max(n, 2))) + 2),
        worst: (n) => Math.max(1, n / 2),
      },
    },
    fibonacci: {
      time: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
      space: "O(1)",
      note: "Similar to binary search but uses Fibonacci numbers; good for sequential access.",
      estimate: {
        best: () => 1,
        average: (n) => Math.max(1, Math.log2(Math.max(n, 1)) * 1.44),
        worst: (n) => Math.max(1, Math.log2(Math.max(n, 1)) * 1.44 + 1),
      },
    },
  },
  pathfinding: {
    bfs: {
      time: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
      space: "O(V)",
      note: "V = vertices (cells), E = edges. Guarantees shortest path in unweighted grids.",
      estimate: {
        best: (n) => n,
        average: (n) => n * n * 0.4,
        worst: (n) => n * n,
      },
    },
    dfs: {
      time: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
      space: "O(V)",
      note: "Explores depth-first; does not guarantee shortest path but uses less memory.",
      estimate: {
        best: (n) => n,
        average: (n) => n * n * 0.3,
        worst: (n) => n * n,
      },
    },
    dijkstra: {
      time: { best: "O(V log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)" },
      space: "O(V)",
      note: "Guarantees shortest path; explores uniformly in all directions.",
      estimate: {
        best: (n) => n * Math.log2(n),
        average: (n) => n * n * 0.5,
        worst: (n) => n * n,
      },
    },
    astar: {
      time: { best: "O(E)", average: "O(E)", worst: "O(V²)" },
      space: "O(V)",
      note: "Uses heuristics to find shortest path efficiently; optimal with admissible heuristic.",
      estimate: {
        best: (n) => n,
        average: (n) => n * n * 0.25,
        worst: (n) => n * n,
      },
    },
    greedy: {
      time: { best: "O(E)", average: "O(E)", worst: "O(V²)" },
      space: "O(V)",
      note: "Fast but doesn't guarantee shortest path; uses heuristic to guide search.",
      estimate: {
        best: (n) => n,
        average: (n) => n * n * 0.2,
        worst: (n) => n * n,
      },
    },
  },
  "graph-pathfinding": {
    dijkstra: {
      time: { best: "O(E log V)", average: "O(E log V)", worst: "O(E log V)" },
      space: "O(V)",
      note: "Priority queue implementation keeps the frontier ordered by cheapest discovered distance.",
      estimate: {
        best: (n) => n * Math.log2(Math.max(n, 2)),
        average: (n) => 1.5 * n * Math.log2(Math.max(n, 2)),
        worst: (n) => 2 * n * Math.log2(Math.max(n, 2)),
      },
    },
    astar: {
      time: { best: "O(E)", average: "O(E log V)", worst: "O(E log V)" },
      space: "O(V)",
      note: "Heuristic keeps the frontier focused toward the goal; worst case matches Dijkstra.",
      estimate: {
        best: (n) => 0.8 * n * Math.log2(Math.max(n, 2)),
        average: (n) => 1.2 * n * Math.log2(Math.max(n, 2)),
        worst: (n) => 2 * n * Math.log2(Math.max(n, 2)),
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
  if (mode === "pathfinding") return gridPathfindingAlgorithms;
  if (mode === "graph-pathfinding") return graphPathfindingAlgorithms;
  if (mode === "searching") return searchingAlgorithms;
  return sortingAlgorithms;
}

function getDocumentationAlgorithm() {
  if (!state.docs.algorithmKey) {
    return null;
  }
  const library = getAlgorithmLibrary(state.docs.mode);
  return library?.[state.docs.algorithmKey] || null;
}

function renderAlgorithmDocumentation(algorithm) {
  if (!algorithmPseudocodeEl || !algorithmCodeEl) {
    return;
  }
  if (!algorithm) {
    SUPPORTED_CODE_LANGUAGES.forEach((lang) => {
      const button = languageButtonMap[lang];
      if (!button) return;
      button.disabled = true;
      button.classList.remove("active");
    });
    algorithmPseudocodeEl.textContent = "Select an algorithm to view pseudocode.";
    algorithmCodeEl.textContent = "Select a language to view sample code.";
    return;
  }
  const pseudocode = algorithm?.pseudocode;
  algorithmPseudocodeEl.textContent =
    pseudocode && pseudocode.trim().length > 0 ? pseudocode : "Pseudocode coming soon.";

  const implementations = algorithm?.implementations || {};
  const availableLanguages = SUPPORTED_CODE_LANGUAGES.filter((lang) => {
    const snippet = implementations[lang];
    return typeof snippet === "string" && snippet.trim().length > 0;
  });

  let language = state.docs.language;
  if (!availableLanguages.includes(language)) {
    language = availableLanguages[0] || null;
  }
  state.docs.language = language || SUPPORTED_CODE_LANGUAGES[0];

  SUPPORTED_CODE_LANGUAGES.forEach((lang) => {
    const button = languageButtonMap[lang];
    if (!button) return;
    const available = availableLanguages.includes(lang);
    button.disabled = !available;
    button.classList.toggle("active", available && lang === language);
  });

  if (language) {
    algorithmCodeEl.textContent = implementations[language];
  } else {
    algorithmCodeEl.textContent = "Implementation coming soon.";
  }
}

function initializeCodeTabs() {
  codeLanguageButtons.forEach((button) => {
    const lang = button.dataset.codeLanguage;
    if (!lang) {
      return;
    }
    languageButtonMap[lang] = button;
    button.addEventListener("click", () => {
      if (button.disabled) {
        return;
      }
      state.docs.language = lang;
      const algorithm = getDocumentationAlgorithm();
      renderAlgorithmDocumentation(algorithm);
    });
  });
  renderAlgorithmDocumentation(null);
}

function updateAlgorithmDetails(key, mode = state.mode) {
  const library = getAlgorithmLibrary(mode);
  const algorithm = library[key];
  if (!algorithm) {
    renderAlgorithmDocumentation(null);
    return;
  }
  algorithmNameEl.textContent = algorithm.name;
  algorithmDescriptionEl.textContent = algorithm.description;
  state.docs.algorithmKey = key;
  state.docs.mode = mode;
  renderAlgorithmDocumentation(algorithm);
  updateComplexityPanel(mode, key);
}

function updateComplexityPanel(mode = state.mode, key) {
  let algorithmKey = key;
  if (!algorithmKey) {
    if (mode === "searching") {
      algorithmKey = searchAlgorithmSelect?.value;
    } else if (mode === "pathfinding") {
      algorithmKey = pathfindingAlgorithmSelect?.value;
    } else if (mode === "graph-pathfinding") {
      algorithmKey = graphPathfindingAlgorithmSelect?.value;
    } else {
      algorithmKey = sortingAlgorithmSelect?.value;
    }
  }

  const entry = complexityCatalog[mode]?.[algorithmKey];
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
  if (mode !== "sorting" && mode !== "searching") {
    if (growthNEl) {
      growthNEl.textContent = "—";
    }
    setGrowthBar(growthBarBest, null, 1, "—");
    setGrowthBar(growthBarAverage, null, 1, "—");
    setGrowthBar(growthBarWorst, null, 1, "—");
    setGrowthBar(growthBarActual, null, 1, "—");
    return;
  }

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
  if (state.mode === "pathfinding") {
    sizeLabel.textContent = "Min Distance";
    sizeValue.textContent = sizeInput.value;
  } else {
    sizeLabel.textContent = "Items";
    sizeValue.textContent = sizeInput.value;
  }
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
  let text;
  if (running) {
    if (state.mode === "graph-pathfinding") text = "Finding Path...";
    else if (state.mode === "pathfinding") text = "Finding Path...";
    else if (state.mode === "searching") text = "Searching...";
    else text = "Sorting...";
  } else {
    if (state.mode === "graph-pathfinding") text = "Start Graph Pathfinding";
    else if (state.mode === "pathfinding") text = "Start 2D Pathfinding";
    else if (state.mode === "searching") text = "Start Searching";
    else text = "Start Sorting";
  }
  actionBtn.textContent = text;
}

function updateRandomizeButtonState() {
  if (state.mode === "graph-pathfinding") {
    randomizeBtn.textContent = "Regenerate Graph";
  } else if (state.mode === "pathfinding") {
    randomizeBtn.textContent = "Regenerate Maze";
  } else {
    randomizeBtn.textContent = "Shuffle";
  }
}

function toggleControls(disabled) {
  sizeInput.disabled = disabled;
  randomizeBtn.disabled = disabled;
  actionBtn.disabled = disabled;
  sortingAlgorithmSelect.disabled = disabled;
  sortingScenarioSelect.disabled = disabled;
  searchAlgorithmSelect.disabled = disabled;
  searchScenarioSelect.disabled = disabled;
  if (pathfindingAlgorithmSelect) {
    pathfindingAlgorithmSelect.disabled = disabled;
  }
  if (gridSizeInput) {
    gridSizeInput.disabled = disabled;
  }
  if (wallDensityInput) {
    wallDensityInput.disabled = disabled;
  }
  if (clearWallsBtn) {
    clearWallsBtn.disabled = disabled;
  }
  if (generateMazeBtn) {
    generateMazeBtn.disabled = disabled;
  }
  if (graphPathfindingAlgorithmSelect) {
    graphPathfindingAlgorithmSelect.disabled = disabled;
  }
  if (graphNodeCountInput) {
    graphNodeCountInput.disabled = disabled;
  }
  if (graphDensityInput) {
    graphDensityInput.disabled = disabled;
  }
  if (graphShuffleWeightsBtn) {
    graphShuffleWeightsBtn.disabled = disabled;
  }
  if (graphResetBtn) {
    graphResetBtn.disabled = disabled;
  }
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
    randomInt,
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

// Grid and Pathfinding Functions
function generateGrid(size = state.grid.size) {
  state.grid.size = size;
  state.grid.cells = [];

  for (let row = 0; row < size; row += 1) {
    state.grid.cells[row] = [];
    for (let col = 0; col < size; col += 1) {
      state.grid.cells[row][col] = {
        row,
        col,
        isWall: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        heuristic: 0,
        fScore: Infinity,
        parent: null,
      };
    }
  }

  // Set default start and end positions with minimum distance
  generateStartEndPositions(size, state.grid.minDistance);

  resetPathResult();
  renderGrid();
}

function generateStartEndPositions(size = state.grid.size, minDistance = state.grid.minDistance) {
  // Try to place start and end with at least minDistance apart
  let attempts = 0;
  let maxAttempts = 100;

  do {
    const startRow = randomInt(0, size - 1);
    const startCol = randomInt(0, size - 1);
    const endRow = randomInt(0, size - 1);
    const endCol = randomInt(0, size - 1);

    const distance = manhattanDistance(startRow, startCol, endRow, endCol);

    if (distance >= minDistance) {
      state.grid.start = { row: startRow, col: startCol };
      state.grid.end = { row: endRow, col: endCol };

      // Clear walls at start and end positions if they exist
      if (state.grid.cells.length > 0) {
        state.grid.cells[startRow][startCol].isWall = false;
        state.grid.cells[endRow][endCol].isWall = false;
      }

      return;
    }

    attempts += 1;
  } while (attempts < maxAttempts);

  // Fallback: place at opposite corners
  state.grid.start = { row: 0, col: 0 };
  state.grid.end = { row: size - 1, col: size - 1 };

  if (state.grid.cells.length > 0) {
    state.grid.cells[0][0].isWall = false;
    state.grid.cells[size - 1][size - 1].isWall = false;
  }
}

function renderGrid() {
  const size = state.grid.size;
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (state.grid.start && state.grid.start.row === row && state.grid.start.col === col) {
        cell.classList.add("start");
      } else if (state.grid.end && state.grid.end.row === row && state.grid.end.col === col) {
        cell.classList.add("end");
      } else if (state.grid.cells[row][col].isWall) {
        cell.classList.add("wall");
      }

      cell.addEventListener("click", () => toggleWall(row, col));
      gridContainer.appendChild(cell);
    }
  }
}

function toggleWall(row, col) {
  if (state.running) return;
  if (state.grid.start && state.grid.start.row === row && state.grid.start.col === col) return;
  if (state.grid.end && state.grid.end.row === row && state.grid.end.col === col) return;

  state.grid.cells[row][col].isWall = !state.grid.cells[row][col].isWall;
  const cellEl = gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  cellEl.classList.toggle("wall");
}

function clearWalls() {
  if (state.running) return;
  for (let row = 0; row < state.grid.size; row += 1) {
    for (let col = 0; col < state.grid.size; col += 1) {
      state.grid.cells[row][col].isWall = false;
    }
  }
  renderGrid();
}

function generateRandomWalls(density = 20) {
  if (state.running) return;
  clearWalls();

  const size = state.grid.size;
  const totalCells = size * size;
  const wallCount = Math.floor((totalCells * density) / 100);

  let placed = 0;
  while (placed < wallCount) {
    const row = randomInt(0, size - 1);
    const col = randomInt(0, size - 1);

    // Don't place walls on start or end
    if (state.grid.start && state.grid.start.row === row && state.grid.start.col === col) continue;
    if (state.grid.end && state.grid.end.row === row && state.grid.end.col === col) continue;
    if (state.grid.cells[row][col].isWall) continue;

    state.grid.cells[row][col].isWall = true;
    placed += 1;
  }

  renderGrid();
}

function resetPathResult() {
  state.grid.pathResult = {
    found: false,
    path: [],
    nodesVisited: 0,
    steps: 0,
  };
  updatePathOutputs();
}

function updatePathOutputs() {
  if (!pathNodesVisitedOutput) return;

  pathNodesVisitedOutput.textContent = state.grid.pathResult.nodesVisited;
  pathStepCountOutput.textContent = state.grid.pathResult.steps;
  pathFoundStatusOutput.textContent = state.grid.pathResult.found ? "Yes" : "No";
  pathLengthOutput.textContent = state.grid.pathResult.found
    ? state.grid.pathResult.path.length
    : "—";
}

function resetGridVisualization() {
  for (let row = 0; row < state.grid.size; row += 1) {
    for (let col = 0; col < state.grid.size; col += 1) {
      const cell = state.grid.cells[row][col];
      cell.isVisited = false;
      cell.isPath = false;
      cell.distance = Infinity;
      cell.heuristic = 0;
      cell.fScore = Infinity;
      cell.parent = null;

      const cellEl = gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (cellEl) {
        cellEl.classList.remove("visited", "visiting", "path");
      }
    }
  }
}

function getNeighbors(row, col) {
  const neighbors = [];
  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 && newRow < state.grid.size &&
      newCol >= 0 && newCol < state.grid.size &&
      !state.grid.cells[newRow][newCol].isWall
    ) {
      neighbors.push(state.grid.cells[newRow][newCol]);
    }
  }

  return neighbors;
}

function manhattanDistance(row1, col1, row2, col2) {
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
}

async function visualizeCell(row, col, type = "visiting") {
  const cellEl = gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  if (cellEl && !cellEl.classList.contains("start") && !cellEl.classList.contains("end")) {
    cellEl.classList.add(type);
  }
  await pause();
}

async function visualizePath(path) {
  for (const node of path) {
    if (node.row === state.grid.start.row && node.col === state.grid.start.col) continue;
    if (node.row === state.grid.end.row && node.col === state.grid.end.col) continue;

    const cellEl = gridContainer.querySelector(`[data-row="${node.row}"][data-col="${node.col}"]`);
    if (cellEl) {
      cellEl.classList.remove("visited", "visiting");
      cellEl.classList.add("path");
    }
    await pause(0.5);
  }
}

function reconstructPath(endNode) {
  const path = [];
  let current = endNode;

  while (current !== null) {
    path.unshift(current);
    current = current.parent;
  }

  return path;
}

function createGridPathfindingContext() {
  return {
    grid: state.grid,
    helpers: {
      resetVisualization: resetGridVisualization,
      resetResult: resetPathResult,
      visualizeCell,
      visualizePath,
      reconstructPath,
      getNeighbors: (row, col) => getNeighbors(row, col),
      updateOutputs: updatePathOutputs,
      manhattanDistance,
    },
  };
}

function createGraphPathfindingContext() {
  return {
    graph: state.graph,
    helpers: {
      resetVisualization: resetGraphVisualization,
      resetResult: resetGraphPathResult,
      updateOutputs: updateGraphOutputs,
      animateNodeVisit: animateGraphNodeVisit,
      reconstructPath: reconstructGraphPath,
      visualizePath: visualizeGraphPath,
      getEdgeElements: getGraphEdgeElements,
      euclideanDistance,
    },
  };
}

async function runPathfinding() {
  if (state.running) return;

  if (state.mode === "graph-pathfinding") {
    const algorithmKey = graphPathfindingAlgorithmSelect?.value;
    const algorithm = graphPathfindingAlgorithms[algorithmKey];
    if (!algorithm) return;

    state.running = true;
    toggleControls(true);

    try {
      await algorithm.run(createGraphPathfindingContext());
    } finally {
      state.running = false;
      toggleControls(false);
    }
    return;
  }

  const algorithmKey = pathfindingAlgorithmSelect.value;
  const algorithm = gridPathfindingAlgorithms[algorithmKey];
  if (!algorithm) return;

  state.running = true;
  toggleControls(true);

  try {
    await algorithm.run(createGridPathfindingContext());
  } finally {
    state.running = false;
    toggleControls(false);
  }
}

// Graph pathfinding helpers and algorithms
function resetGraphPathResult() {
  state.graph.pathResult = {
    found: false,
    path: [],
    cost: 0,
    nodesVisited: 0,
    steps: 0,
  };
  updateGraphOutputs();
}

function updateGraphOutputs() {
  if (!graphPathNodesVisitedOutput) {
    return;
  }
  graphPathNodesVisitedOutput.textContent = state.graph.pathResult.nodesVisited;
  graphPathStepCountOutput.textContent = state.graph.pathResult.steps;
  graphPathFoundStatusOutput.textContent = state.graph.pathResult.found ? "Yes" : "No";
  graphPathCostOutput.textContent = state.graph.pathResult.found
    ? state.graph.pathResult.cost.toFixed(1)
    : "—";
}

function resetGraphVisualization() {
  if (!graphContainer) {
    return;
  }
  graphContainer.querySelectorAll(".graph-node").forEach((nodeEl) => {
    nodeEl.classList.remove("visiting", "visited", "path");
    const nodeId = Number(nodeEl.dataset.nodeId);
    nodeEl.classList.toggle("start", nodeId === state.graph.start);
    nodeEl.classList.toggle("end", nodeId === state.graph.end);
  });
  graphContainer.querySelectorAll(".graph-edge").forEach((edgeEl) => {
    edgeEl.classList.remove("visited", "active", "path");
  });
  graphContainer.querySelectorAll(".graph-edge-label").forEach((labelEl) => {
    labelEl.classList.remove("visited", "path");
  });
}

function getGraphNodeElement(nodeId) {
  if (!graphContainer) return null;
  return graphContainer.querySelector(`.graph-node[data-node-id="${nodeId}"]`);
}

function getGraphEdgeElements(edgeId) {
  if (!graphContainer) {
    return { line: null, label: null };
  }
  return {
    line: graphContainer.querySelector(`.graph-edge[data-edge-id="${edgeId}"]`),
    label: graphContainer.querySelector(`.graph-edge-label[data-edge-id="${edgeId}"]`),
  };
}

function euclideanDistance(nodeA, nodeB) {
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  return Math.hypot(dx, dy);
}

function computeEdgeWeight(nodeA, nodeB) {
  const base = euclideanDistance(nodeA, nodeB);
  const noise = Math.random() * 0.4 + 0.8;
  return Math.max(1, Number((base * 10 * noise).toFixed(1)));
}

function connectGraphNodes(nodes, edges, aId, bId) {
  if (aId === bId) {
    return false;
  }
  const aNode = nodes[aId];
  const bNode = nodes[bId];
  if (!aNode || !bNode) {
    return false;
  }
  const alreadyConnected = aNode.neighbors.some((neighbor) => neighbor.id === bId);
  if (alreadyConnected) {
    return false;
  }
  const edgeId = `edge-${Math.min(aId, bId)}-${Math.max(aId, bId)}`;
  const weight = computeEdgeWeight(aNode, bNode);
  const edge = {
    id: edgeId,
    source: aId,
    target: bId,
    weight,
  };
  edges.push(edge);
  aNode.neighbors.push({ id: bId, weight, edgeId });
  bNode.neighbors.push({ id: aId, weight, edgeId });
  return true;
}

function generateGraph(nodeCount = state.graph.nodeCount, density = state.graph.density) {
  const count = Math.max(3, Math.min(14, Math.round(nodeCount)));
  const densityFraction = Math.max(0.2, Math.min(0.9, Number(density)));

  state.graph.nodeCount = count;
  state.graph.density = densityFraction;

  const nodes = [];
  for (let i = 0; i < count; i += 1) {
    nodes.push({
      id: i,
      label: String(i + 1),
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70,
      neighbors: [],
    });
  }

  const edges = [];

  const order = [...Array(count).keys()];
  shuffleArray(order);
  for (let i = 1; i < order.length; i += 1) {
    const current = order[i];
    const previous = order[randomInt(0, i - 1)];
    connectGraphNodes(nodes, edges, current, previous);
  }

  const maxEdges = (count * (count - 1)) / 2;
  const targetEdges = Math.max(count - 1, Math.round(densityFraction * maxEdges));
  let attempts = 0;
  while (edges.length < targetEdges && attempts < maxEdges * 2) {
    const a = randomInt(0, count - 1);
    let b = randomInt(0, count - 1);
    if (a === b) {
      attempts += 1;
      continue;
    }
    connectGraphNodes(nodes, edges, a, b);
    attempts += 1;
  }

  state.graph.nodes = nodes;
  state.graph.edges = edges;

  if (nodes.length > 0) {
    state.graph.start = randomInt(0, nodes.length - 1);
    state.graph.end = randomInt(0, nodes.length - 1);
    if (nodes.length > 1) {
      while (state.graph.end === state.graph.start) {
        state.graph.end = randomInt(0, nodes.length - 1);
      }
    }
  } else {
    state.graph.start = null;
    state.graph.end = null;
  }

  if (graphNodeCountInput) {
    graphNodeCountInput.value = String(count);
  }
  if (graphNodeCountValue) {
    graphNodeCountValue.textContent = String(count);
  }
  const densityPercent = Math.round(densityFraction * 100);
  if (graphDensityInput) {
    graphDensityInput.value = String(densityPercent);
  }
  if (graphDensityValue) {
    graphDensityValue.textContent = `${densityPercent}%`;
  }

  resetGraphPathResult();
  renderGraph();
}

function renderGraph() {
  if (!graphContainer) {
    return;
  }
  graphContainer.innerHTML = "";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.classList.add("graph-edges");
  graphContainer.appendChild(svg);

  state.graph.edges.forEach((edge) => {
    const source = state.graph.nodes[edge.source];
    const target = state.graph.nodes[edge.target];
    if (!source || !target) {
      return;
    }
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("graph-edge");
    line.dataset.edgeId = edge.id;
    line.setAttribute("x1", String(source.x));
    line.setAttribute("y1", String(source.y));
    line.setAttribute("x2", String(target.x));
    line.setAttribute("y2", String(target.y));
    svg.appendChild(line);

    const label = document.createElement("div");
    label.className = "graph-edge-label";
    label.dataset.edgeId = edge.id;
    label.textContent = edge.weight.toFixed(1);
    label.style.left = `${(source.x + target.x) / 2}%`;
    label.style.top = `${(source.y + target.y) / 2}%`;
    graphContainer.appendChild(label);
  });

  state.graph.nodes.forEach((node) => {
    const nodeEl = document.createElement("button");
    nodeEl.type = "button";
    nodeEl.className = "graph-node";
    nodeEl.dataset.nodeId = String(node.id);
    nodeEl.textContent = node.label;
    nodeEl.style.left = `${node.x}%`;
    nodeEl.style.top = `${node.y}%`;
    nodeEl.title = "Click to set start • Shift+Click to set goal";
    if (node.id === state.graph.start) {
      nodeEl.classList.add("start");
    } else if (node.id === state.graph.end) {
      nodeEl.classList.add("end");
    }
    nodeEl.addEventListener("click", (event) => {
      handleGraphNodeSelection(node.id, event);
    });
    graphContainer.appendChild(nodeEl);
  });

  updateGraphOutputs();
}

function shuffleGraphWeights() {
  if (!state.graph.nodes.length) {
    return;
  }
  state.graph.edges.forEach((edge) => {
    const source = state.graph.nodes[edge.source];
    const target = state.graph.nodes[edge.target];
    if (!source || !target) {
      return;
    }
    const newWeight = computeEdgeWeight(source, target);
    edge.weight = newWeight;
    const sourceNeighbor = source.neighbors.find((neighbor) => neighbor.id === edge.target);
    if (sourceNeighbor) {
      sourceNeighbor.weight = newWeight;
    }
    const targetNeighbor = target.neighbors.find((neighbor) => neighbor.id === edge.source);
    if (targetNeighbor) {
      targetNeighbor.weight = newWeight;
    }
  });
  resetGraphPathResult();
  renderGraph();
}

function handleGraphNodeSelection(nodeId, event) {
  if (state.running) {
    return;
  }

  if (event.shiftKey) {
    state.graph.end = nodeId;
    if (state.graph.start === state.graph.end && state.graph.nodes.length > 1) {
      state.graph.start = (state.graph.end + 1) % state.graph.nodes.length;
    }
  } else {
    state.graph.start = nodeId;
    if (state.graph.end === state.graph.start && state.graph.nodes.length > 1) {
      state.graph.end = (state.graph.start + 1) % state.graph.nodes.length;
    }
  }
  resetGraphPathResult();
  renderGraph();
}

function reconstructGraphPath(parents, endId) {
  const path = [];
  let current = endId;
  while (current != null) {
    path.unshift(current);
    const parentInfo = parents.get(current);
    if (!parentInfo) {
      break;
    }
    current = parentInfo.nodeId;
  }
  return path;
}

async function animateGraphNodeVisit(nodeId) {
  const nodeEl = getGraphNodeElement(nodeId);
  if (!nodeEl) {
    return;
  }
  const isTerminal = nodeId === state.graph.start || nodeId === state.graph.end;
  if (!isTerminal) {
    nodeEl.classList.add("visiting");
  }
  await pause();
  if (!isTerminal) {
    nodeEl.classList.remove("visiting");
    nodeEl.classList.add("visited");
  }
}

async function visualizeGraphPath(pathNodes, parents) {
  const seenEdges = new Set();
  for (let i = pathNodes.length - 1; i > 0; i -= 1) {
    const nodeId = pathNodes[i];
    const parentInfo = parents.get(nodeId);
    if (parentInfo) {
      seenEdges.add(parentInfo.edgeId);
    }
  }
  seenEdges.forEach((edgeId) => {
    const { line, label } = getGraphEdgeElements(edgeId);
    if (line) {
      line.classList.add("path");
    }
    if (label) {
      label.classList.add("path");
    }
  });
  for (const nodeId of pathNodes) {
    const nodeEl = getGraphNodeElement(nodeId);
    if (!nodeEl) continue;
    if (nodeId !== state.graph.start && nodeId !== state.graph.end) {
      nodeEl.classList.add("path");
    }
    await pause(0.4);
  }
}

function setMode(mode, { force = false } = {}) {
  if (!force && state.running) {
    return;
  }
  if (!force && mode === state.mode) {
    return;
  }
  if (
    mode !== "sorting" &&
    mode !== "searching" &&
    mode !== "pathfinding" &&
    mode !== "graph-pathfinding"
  ) {
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
  pathfindingStatsSection.hidden = mode !== "pathfinding";
  if (graphPathfindingStatsSection) {
    graphPathfindingStatsSection.hidden = mode !== "graph-pathfinding";
  }
  updateActionButtonState();
  updateRandomizeButtonState();

  // Update size slider for 2D pathfinding mode
  if (mode === "pathfinding") {
    const maxDistance = (state.grid.size - 1) * 2; // Max Manhattan distance in NxN grid
    sizeInput.min = "5";
    sizeInput.max = String(maxDistance);
    // Clamp minDistance to valid range
    state.grid.minDistance = Math.min(state.grid.minDistance, maxDistance);
    sizeInput.value = state.grid.minDistance;
  } else {
    sizeInput.min = "5";
    sizeInput.max = "40";
    sizeInput.value = state.dataset.length || 15;
  }
  updateLabels();

  clearActive();
  clearSorted();
  resetStats();
  resetSearchResult();
  resetPathResult();
  resetGraphPathResult();
  invalidateLastRun();

  if (mode === "pathfinding") {
    arrayContainer.hidden = true;
    gridContainer.hidden = false;
    if (graphContainer) {
      graphContainer.hidden = true;
    }
    if (state.grid.cells.length === 0) {
      generateGrid(state.grid.size);
    }
  } else if (mode === "graph-pathfinding") {
    arrayContainer.hidden = true;
    gridContainer.hidden = true;
    if (graphContainer) {
      graphContainer.hidden = false;
      if (state.graph.nodes.length === 0) {
        generateGraph(state.graph.nodeCount, state.graph.density);
      } else {
        renderGraph();
      }
    }
  } else {
    arrayContainer.hidden = false;
    gridContainer.hidden = true;
    if (graphContainer) {
      graphContainer.hidden = true;
    }

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
  }

  let key;
  if (mode === "pathfinding") {
    key = pathfindingAlgorithmSelect.value;
  } else if (mode === "graph-pathfinding") {
    key = graphPathfindingAlgorithmSelect?.value;
  } else if (mode === "searching") {
    key = searchAlgorithmSelect.value;
  } else {
    key = sortingAlgorithmSelect.value;
  }
  updateAlgorithmDetails(key, mode);
}

sizeInput.addEventListener("input", updateLabels);
sizeInput.addEventListener("change", () => {
  if (state.mode === "pathfinding") {
    state.grid.minDistance = Number(sizeInput.value);
    generateStartEndPositions(state.grid.size, state.grid.minDistance);
    renderGrid();
    resetPathResult();
  } else {
    generateArray(Number(sizeInput.value));
  }
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
  if (state.mode === "pathfinding") {
    const density = Number(wallDensityInput.value);
    generateRandomWalls(density);
  } else if (state.mode === "graph-pathfinding") {
    const nodeCount = graphNodeCountInput ? Number(graphNodeCountInput.value) : state.graph.nodeCount;
    const density = graphDensityInput ? Number(graphDensityInput.value) / 100 : state.graph.density;
    generateGraph(nodeCount, density);
  } else {
    generateArray(Number(sizeInput.value));
  }
});

actionBtn.addEventListener("click", () => {
  if (state.mode === "sorting") {
    runSort();
  } else if (state.mode === "searching") {
    runSearch();
  } else if (state.mode === "pathfinding" || state.mode === "graph-pathfinding") {
    runPathfinding();
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

// Pathfinding event listeners
if (pathfindingAlgorithmSelect) {
  pathfindingAlgorithmSelect.addEventListener("change", () => {
    if (state.running) return;
    invalidateLastRun();
    updateAlgorithmDetails(pathfindingAlgorithmSelect.value, "pathfinding");
  });
}

if (gridSizeInput) {
  gridSizeInput.addEventListener("input", () => {
    gridSizeValue.textContent = gridSizeInput.value;
  });

  gridSizeInput.addEventListener("change", () => {
    if (state.running) return;
    const newSize = Number(gridSizeInput.value);
    generateGrid(newSize);

    // Update min distance slider max based on new grid size
    const maxDistance = (newSize - 1) * 2;
    sizeInput.max = String(maxDistance);

    // Clamp current minDistance to new valid range
    state.grid.minDistance = Math.min(state.grid.minDistance, maxDistance);
    sizeInput.value = state.grid.minDistance;
    updateLabels();
  });
}

if (wallDensityInput) {
  wallDensityInput.addEventListener("input", () => {
    wallDensityValue.textContent = `${wallDensityInput.value}%`;
  });
}

if (clearWallsBtn) {
  clearWallsBtn.addEventListener("click", () => {
    clearWalls();
  });
}

if (generateMazeBtn) {
  generateMazeBtn.addEventListener("click", () => {
    const density = Number(wallDensityInput.value);
    generateRandomWalls(density);
  });
}

if (graphPathfindingAlgorithmSelect) {
  graphPathfindingAlgorithmSelect.addEventListener("change", () => {
    if (state.running) return;
    invalidateLastRun();
    updateAlgorithmDetails(graphPathfindingAlgorithmSelect.value, "graph-pathfinding");
  });
}

if (graphNodeCountInput) {
  graphNodeCountInput.addEventListener("input", () => {
    if (graphNodeCountValue) {
      graphNodeCountValue.textContent = graphNodeCountInput.value;
    }
  });
  graphNodeCountInput.addEventListener("change", () => {
    if (state.running) return;
    const nodeCount = Number(graphNodeCountInput.value);
    generateGraph(nodeCount, state.graph.density);
  });
}

if (graphDensityInput) {
  graphDensityInput.addEventListener("input", () => {
    if (graphDensityValue) {
      graphDensityValue.textContent = `${graphDensityInput.value}%`;
    }
  });
  graphDensityInput.addEventListener("change", () => {
    if (state.running) return;
    const density = Number(graphDensityInput.value) / 100;
    generateGraph(state.graph.nodeCount, density);
  });
}

if (graphShuffleWeightsBtn) {
  graphShuffleWeightsBtn.addEventListener("click", () => {
    if (state.running) return;
    shuffleGraphWeights();
  });
}

if (graphResetBtn) {
  graphResetBtn.addEventListener("click", () => {
    if (state.running) return;
    const nodeCount = graphNodeCountInput ? Number(graphNodeCountInput.value) : state.graph.nodeCount;
    const density = graphDensityInput ? Number(graphDensityInput.value) / 100 : state.graph.density;
    generateGraph(nodeCount, density);
  });
}

initializeCodeTabs();

updateLabels();
if (gridSizeValue) {
  gridSizeValue.textContent = gridSizeInput.value;
}
if (wallDensityValue) {
  wallDensityValue.textContent = `${wallDensityInput.value}%`;
}
state.searchTarget = targetInput ? sanitizeTarget(targetInput.value) : state.searchTarget;
if (targetInput) {
  targetInput.value = state.searchTarget;
}
updateAlgorithmDetails(sortingAlgorithmSelect.value, "sorting");
resetSearchResult();
generateArray(Number(sizeInput.value));
generateGraph(state.graph.nodeCount, state.graph.density);
setMode("sorting", { force: true });
