const appElement = document.querySelector(".app");
const arrayContainer = document.getElementById("array-container");
const gridContainer = document.getElementById("grid-container");
const patternContainer = document.getElementById("pattern-container");
const sizeInput = document.getElementById("size-input");
const sizeLabel = document.getElementById("size-label");
const speedInput = document.getElementById("speed-input");
const sortingAlgorithmSelect = document.getElementById("sorting-algorithm-select");
const sortingScenarioSelect = document.getElementById("sorting-scenario-select");
const searchAlgorithmSelect = document.getElementById("search-algorithm-select");
const searchScenarioSelect = document.getElementById("search-scenario-select");
const pathfindingAlgorithmSelect = document.getElementById("pathfinding-algorithm-select");
const patternAlgorithmSelect = document.getElementById("pattern-algorithm-select");
const gridSizeInput = document.getElementById("grid-size-input");
const gridSizeValue = document.getElementById("grid-size-value");
const wallDensityInput = document.getElementById("wall-density-input");
const wallDensityValue = document.getElementById("wall-density-value");
const clearWallsBtn = document.getElementById("clear-walls-btn");
const generateMazeBtn = document.getElementById("generate-maze-btn");
const patternTextInput = document.getElementById("pattern-text-input");
const patternPatternInput = document.getElementById("pattern-pattern-input");
const sizeValue = document.getElementById("size-value");
const speedValue = document.getElementById("speed-value");
const randomizeBtn = document.getElementById("randomize-btn");
const actionBtn = document.getElementById("action-btn");
const targetInput = document.getElementById("target-input");
const targetRandomizeBtn = document.getElementById("target-randomize-btn");
const algorithmNameEl = document.getElementById("algorithm-name");
const algorithmDescriptionEl = document.getElementById("algorithm-description");
const algorithmDocOutput = document.getElementById("algorithm-doc-output");
const docTabButtons = document.querySelectorAll("[data-doc-type]");

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
const patternComparisonsOutput = document.getElementById("pattern-comparisons");
const patternMatchCountOutput = document.getElementById("pattern-match-count");

const sortingStatsSection = document.querySelector('.stats[data-mode="sorting"]');
const searchingStatsSection = document.querySelector('.stats[data-mode="searching"]');
const pathfindingStatsSection = document.querySelector('.stats[data-mode="pathfinding"]');
const mdpStatsSection = document.querySelector('.stats[data-mode="mdp"]');
const patternStatsSection = document.querySelector('.stats[data-mode="pattern"]');

const mdpAlgorithmSelect = document.getElementById("mdp-algorithm-select");
const mdpScenarioSelect = document.getElementById("mdp-scenario-select");
const discountInput = document.getElementById("discount-input");
const discountValue = document.getElementById("discount-value");
const thresholdInput = document.getElementById("threshold-input");
const thresholdValue = document.getElementById("threshold-value");
const maxIterationsInput = document.getElementById("max-iterations-input");
const maxIterationsValue = document.getElementById("max-iterations-value");
const clearRewardsBtn = document.getElementById("clear-rewards-btn");
const simulateEpisodeBtn = document.getElementById("simulate-episode-btn");

const mdpIterationsOutput = document.getElementById("mdp-iterations");
const mdpMaxDeltaOutput = document.getElementById("mdp-max-delta");
const mdpConvergedOutput = document.getElementById("mdp-converged");
const mdpAvgRewardOutput = document.getElementById("mdp-avg-reward");

const growthNEl = document.getElementById("growth-n");
const growthBarBest = document.getElementById("growth-bar-best");
const growthBarAverage = document.getElementById("growth-bar-average");
const growthBarWorst = document.getElementById("growth-bar-worst");
const growthBarActual = document.getElementById("growth-bar-actual");

const tabs = document.querySelectorAll(".tab");
const DOC_LANGUAGES = ["python", "c", "java"];
const docTabButtonMap = {};
const DEFAULT_PATTERN_SEQUENCE = "ACGGAATAACTGGAACG";
const DEFAULT_PATTERN_NEEDLE = "AAC";

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
  mdp: {
    discount: 0.9,
    threshold: 0.01,
    maxIterations: 100,
    gridValues: [],        // 2D array of state values
    gridPolicy: [],        // 2D array of optimal actions
    gridRewards: [],       // 2D array of rewards
    terminalStates: new Set(),
    result: {
      converged: false,
      iterations: 0,
      maxDelta: Infinity,
      avgReward: 0,
      episodePath: [],
    },
  },
  docs: {
    view: "pseudocode",
    language: "python",
  },
  pattern: {
    text: [],
    pattern: [],
    matches: [],
    activeRange: null,
    alphabet: ["A", "C", "G", "T"],
    result: {
      comparisons: 0,
      matches: 0,
    },
  },
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
  bucket: {
    name: "Bucket Sort",
    description:
      "Distributes elements into buckets based on their value range, sorts each bucket individually, then concatenates them.",
    run: bucketSort,
  },
  tim: {
    name: "Tim Sort",
    description:
      "Hybrid sorting algorithm combining merge sort and insertion sort, optimized for real-world data. Used by Python and Java.",
    run: timSort,
  },
  comb: {
    name: "Comb Sort",
    description:
      "Improves bubble sort by comparing elements at decreasing gaps, eliminating small values at the end (turtles) more efficiently.",
    run: combSort,
  },
  cocktail: {
    name: "Cocktail Shaker Sort",
    description:
      "Bidirectional bubble sort that alternates between sweeping left-to-right and right-to-left, reducing the turtle problem.",
    run: cocktailShakerSort,
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
  jump: {
    name: "Jump Search",
    description:
      "Jumps ahead by fixed blocks to find a range containing the target, then performs linear search within that block.",
    run: jumpSearch,
  },
  exponential: {
    name: "Exponential Search",
    description:
      "Finds a range by exponentially increasing the search bound, then performs binary search within that range.",
    run: exponentialSearch,
  },
  interpolation: {
    name: "Interpolation Search",
    description:
      "Estimates the target position based on value distribution, similar to how humans search a phone book.",
    run: interpolationSearch,
  },
  fibonacci: {
    name: "Fibonacci Search",
    description:
      "Uses Fibonacci numbers to divide the array into unequal parts, similar to binary search but with additions instead of divisions.",
    run: fibonacciSearch,
  },
};

const patternMatchingAlgorithms = {
  naive: {
    name: "Naive Pattern Match",
    description:
      "Slides the pattern across the sequence checking each window character by character.",
    run: naivePatternMatch,
  },
};

const pathfindingAlgorithms = {
  bfs: {
    name: "Breadth-First Search (BFS)",
    description:
      "Explores all neighbors at the current depth before moving to nodes at the next depth level. Guarantees the shortest path in unweighted grids.",
    run: bfsPathfinding,
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    description:
      "Explores as far as possible along each branch before backtracking. Does not guarantee the shortest path but uses less memory.",
    run: dfsPathfinding,
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description:
      "Finds the shortest path by always expanding the node with the smallest known distance. Guarantees the shortest path.",
    run: dijkstraPathfinding,
  },
  astar: {
    name: "A* (A-Star)",
    description:
      "Combines Dijkstra's approach with heuristics to guide the search toward the goal. Very efficient and guarantees the shortest path.",
    run: astarPathfinding,
  },
  greedy: {
    name: "Greedy Best-First Search",
    description:
      "Always expands the node that appears closest to the goal based on heuristic. Fast but doesn't guarantee the shortest path.",
    run: greedyPathfinding,
  },
};

const mdpDocs = {
  valueIteration: {
    pseudocode: `procedure valueIteration(S, A, P, R, gamma, threshold):
  initialize V[s] ← 0 for every state s in S
  repeat
    delta ← 0
    for each state s in S do
      old ← V[s]
      V[s] ← max over action a in A(s) of Σ_{s'} P(s' | s, a) · (R(s, a, s') + gamma · V[s'])
      delta ← max(delta, |old - V[s]|)
    end for
  until delta < threshold
  for each state s in S do
    π[s] ← argmax over action a in A(s) of Σ_{s'} P(s' | s, a) · (R(s, a, s') + gamma · V[s'])
  return V, π`,
    implementations: {
      python: `def value_iteration(states, actions, transitions, rewards, gamma, threshold):
    values = {s: 0.0 for s in states}
    while True:
        delta = 0.0
        for s in states:
            old = values[s]
            values[s] = max(
                sum(prob * (rewards[s, a, s2] + gamma * values[s2])
                    for s2, prob in transitions[s, a])
                for a in actions[s]
            )
            delta = max(delta, abs(old - values[s]))
        if delta < threshold:
            break
    policy = {}
    for s in states:
        policy[s] = max(
            actions[s],
            key=lambda a: sum(prob * (rewards[s, a, s2] + gamma * values[s2])
                              for s2, prob in transitions[s, a]),
        )
    return values, policy`,
      c: `void value_iteration(int state_count, int action_count, const double transitions[state_count][action_count][state_count], const double rewards[state_count][action_count][state_count], double gamma, double threshold, double values[state_count], int policy[state_count]) {
    for (int s = 0; s < state_count; ++s) {
        values[s] = 0.0;
    }
    while (1) {
        double delta = 0.0;
        for (int s = 0; s < state_count; ++s) {
            double best = -1e18;
            for (int a = 0; a < action_count; ++a) {
                double total = 0.0;
                for (int s2 = 0; s2 < state_count; ++s2) {
                    double prob = transitions[s][a][s2];
                    total += prob * (rewards[s][a][s2] + gamma * values[s2]);
                }
                if (total > best) best = total;
            }
            delta = fmax(delta, fabs(best - values[s]));
            values[s] = best;
        }
        if (delta < threshold) break;
    }
    for (int s = 0; s < state_count; ++s) {
        double best = -1e18;
        int best_action = 0;
        for (int a = 0; a < action_count; ++a) {
            double total = 0.0;
            for (int s2 = 0; s2 < state_count; ++s2) {
                total += transitions[s][a][s2] * (rewards[s][a][s2] + gamma * values[s2]);
            }
            if (total > best) {
                best = total;
                best_action = a;
            }
        }
        policy[s] = best_action;
    }
}`,
      java: `public static ValueIterationResult valueIteration(List<State> states, List<Action> actions, TransitionModel transitions, RewardModel rewards, double gamma, double threshold) {
    Map<State, Double> values = new HashMap<>();
    states.forEach(s -> values.put(s, 0.0));
    while (true) {
        double delta = 0.0;
        for (State s : states) {
            double best = Double.NEGATIVE_INFINITY;
            for (Action a : actions) {
                double total = 0.0;
                for (Transition t : transitions.of(s, a)) {
                    total += t.probability() * (rewards.of(s, a, t.next()) + gamma * values.get(t.next()));
                }
                best = Math.max(best, total);
            }
            delta = Math.max(delta, Math.abs(best - values.get(s)));
            values.put(s, best);
        }
        if (delta < threshold) {
            break;
        }
    }
    Map<State, Action> policy = new HashMap<>();
    for (State s : states) {
        policy.put(s, actions.stream().max(Comparator.comparingDouble(a -> transitions.of(s, a).stream()
            .mapToDouble(t -> t.probability() * (rewards.of(s, a, t.next()) + gamma * values.get(t.next())))
            .sum())).orElse(actions.get(0)));
    }
    return new ValueIterationResult(values, policy);
}`,
    },
  },
  policyIteration: {
    pseudocode: `procedure policyIteration(S, A, P, R, gamma):
  initialize π arbitrarily
  repeat
    // Policy evaluation
    solve V for V[s] = Σ_{s'} P(s' | s, π[s]) · (R(s, π[s], s') + gamma · V[s'])
    stable ← true
    // Policy improvement
    for each state s in S do
      old ← π[s]
      π[s] ← argmax over action a in A(s) of Σ_{s'} P(s' | s, a) · (R(s, a, s') + gamma · V[s'])
      if old ≠ π[s] then stable ← false
    end for
  until stable
  return V, π`,
    implementations: {
      python: `def policy_iteration(states, actions, transitions, rewards, gamma, threshold=1e-6):
    policy = {s: actions[s][0] for s in states}
    values = {s: 0.0 for s in states}
    while True:
        # Policy evaluation
        while True:
            delta = 0.0
            for s in states:
                old = values[s]
                a = policy[s]
                values[s] = sum(
                    prob * (rewards[s, a, s2] + gamma * values[s2])
                    for s2, prob in transitions[s, a]
                )
                delta = max(delta, abs(old - values[s]))
            if delta < threshold:
                break
        stable = True
        # Policy improvement
        for s in states:
            old = policy[s]
            policy[s] = max(
                actions[s],
                key=lambda a: sum(prob * (rewards[s, a, s2] + gamma * values[s2])
                                  for s2, prob in transitions[s, a]),
            )
            if policy[s] != old:
                stable = False
        if stable:
            return values, policy`,
      c: `void policy_iteration(int state_count, int action_count, const double transitions[state_count][action_count][state_count], const double rewards[state_count][action_count][state_count], double gamma, double threshold, double values[state_count], int policy[state_count]) {
    for (int s = 0; s < state_count; ++s) {
        policy[s] = 0;
        values[s] = 0.0;
    }
    while (1) {
        // Policy evaluation
        while (1) {
            double delta = 0.0;
            for (int s = 0; s < state_count; ++s) {
                double old = values[s];
                int a = policy[s];
                double total = 0.0;
                for (int s2 = 0; s2 < state_count; ++s2) {
                    total += transitions[s][a][s2] * (rewards[s][a][s2] + gamma * values[s2]);
                }
                values[s] = total;
                delta = fmax(delta, fabs(old - total));
            }
            if (delta < threshold) break;
        }
        int stable = 1;
        // Policy improvement
        for (int s = 0; s < state_count; ++s) {
            int old = policy[s];
            double best = -1e18;
            int best_action = old;
            for (int a = 0; a < action_count; ++a) {
                double total = 0.0;
                for (int s2 = 0; s2 < state_count; ++s2) {
                    total += transitions[s][a][s2] * (rewards[s][a][s2] + gamma * values[s2]);
                }
                if (total > best) {
                    best = total;
                    best_action = a;
                }
            }
            policy[s] = best_action;
            if (policy[s] != old) stable = 0;
        }
        if (stable) break;
    }
}`,
      java: `public static PolicyIterationResult policyIteration(List<State> states, List<Action> actions, TransitionModel transitions, RewardModel rewards, double gamma, double threshold) {
    Map<State, Action> policy = new HashMap<>();
    Map<State, Double> values = new HashMap<>();
    states.forEach(s -> {
        policy.put(s, actions.get(0));
        values.put(s, 0.0);
    });
    while (true) {
        // Policy evaluation
        while (true) {
            double delta = 0.0;
            for (State s : states) {
                double old = values.get(s);
                Action a = policy.get(s);
                double total = 0.0;
                for (Transition t : transitions.of(s, a)) {
                    total += t.probability() * (rewards.of(s, a, t.next()) + gamma * values.get(t.next()));
                }
                values.put(s, total);
                delta = Math.max(delta, Math.abs(old - total));
            }
            if (delta < threshold) {
                break;
            }
        }
        boolean stable = true;
        // Policy improvement
        for (State s : states) {
            Action old = policy.get(s);
            Action best = actions.stream().max(Comparator.comparingDouble(a -> transitions.of(s, a).stream()
                .mapToDouble(t -> t.probability() * (rewards.of(s, a, t.next()) + gamma * values.get(t.next())))
                .sum())).orElse(old);
            policy.put(s, best);
            if (best != old) {
                stable = false;
            }
        }
        if (stable) {
            return new PolicyIterationResult(values, policy);
        }
    }
}`,
    },
  },
};

const mdpAlgorithms = {
  valueIteration: {
    name: "Value Iteration",
    description:
      "Dynamic programming algorithm that iteratively computes optimal state values using the Bellman equation, converging to the optimal policy.",
    run: valueIteration,
  },
  policyIteration: {
    name: "Policy Iteration",
    description:
      "Alternates between policy evaluation (computing values for current policy) and policy improvement (making policy greedy) until policy stabilizes.",
    run: policyIteration,
  },
};

const documentationCatalog = {
  sorting: {
    bubble: {
      pseudocode: `procedure bubbleSort(A):
  n ← length(A)
  repeat
    swapped ← false
    for i from 0 to n - 2 do
      if A[i] > A[i + 1] then
        swap A[i], A[i + 1]
        swapped ← true
    n ← n - 1
  until not swapped`,
      implementations: {
        python: `def bubble_sort(arr):
    n = len(arr)
    while True:
        swapped = False
        for i in range(1, n):
            if arr[i - 1] > arr[i]:
                arr[i - 1], arr[i] = arr[i], arr[i - 1]
                swapped = True
        n -= 1
        if not swapped or n <= 1:
            break`,
        c: `void bubble_sort(int arr[], int n) {
    int swapped = 1;
    while (swapped) {
        swapped = 0;
        for (int i = 1; i < n; ++i) {
            if (arr[i - 1] > arr[i]) {
                int tmp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = tmp;
                swapped = 1;
            }
        }
        --n;
    }
}`,
        java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped = true;
    while (swapped) {
        swapped = false;
        for (int i = 1; i < n; i++) {
            if (arr[i - 1] > arr[i]) {
                int tmp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = tmp;
                swapped = true;
            }
        }
        n--;
    }
}`,
      },
    },
    insertion: {
      pseudocode: `procedure insertionSort(A):
  for i from 1 to length(A) - 1 do
    key ← A[i]
    j ← i - 1
    while j ≥ 0 and A[j] > key do
      A[j + 1] ← A[j]
      j ← j - 1
    A[j + 1] ← key`,
      implementations: {
        python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
        c: `void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}`,
        java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      },
    },
    selection: {
      pseudocode: `procedure selectionSort(A):
  n ← length(A)
  for i from 0 to n - 2 do
    minIndex ← i
    for j from i + 1 to n - 1 do
      if A[j] < A[minIndex] then
        minIndex ← j
    swap A[i], A[minIndex]`,
      implementations: {
        python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]`,
        c: `void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        int min_index = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_index]) {
                min_index = j;
            }
        }
        int tmp = arr[i];
        arr[i] = arr[min_index];
        arr[min_index] = tmp;
    }
}`,
        java: `public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        int tmp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = tmp;
    }
}`,
      },
    },
    quick: {
      pseudocode: `procedure quickSort(A, low, high):
  if low ≥ high then return
  pivotIndex ← partition(A, low, high)
  quickSort(A, low, pivotIndex - 1)
  quickSort(A, pivotIndex + 1, high)

procedure partition(A, low, high):
  pivot ← A[high]
  i ← low
  for j from low to high - 1 do
    if A[j] ≤ pivot then
      swap A[i], A[j]
      i ← i + 1
  swap A[i], A[high]
  return i`,
      implementations: {
        python: `def quick_sort(arr):
    def _sort(lo, hi):
        if lo >= hi:
            return
        pivot = partition(lo, hi)
        _sort(lo, pivot - 1)
        _sort(pivot + 1, hi)

    def partition(lo, hi):
        pivot = arr[hi]
        i = lo
        for j in range(lo, hi):
            if arr[j] <= pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1
        arr[i], arr[hi] = arr[hi], arr[i]
        return i

    _sort(0, len(arr) - 1)`,
        c: `static int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            ++i;
        }
    }
    int tmp = arr[i];
    arr[i] = arr[high];
    arr[high] = tmp;
    return i;
}

void quick_sort(int arr[], int low, int high) {
    if (low >= high) return;
    int pivot = partition(arr, low, high);
    quick_sort(arr, low, pivot - 1);
    quick_sort(arr, pivot + 1, high);
}`,
        java: `public static void quickSort(int[] arr, int low, int high) {
    if (low >= high) {
        return;
    }
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
        }
    }
    int tmp = arr[i];
    arr[i] = arr[high];
    arr[high] = tmp;
    return i;
}`,
      },
    },
    heap: {
      pseudocode: `procedure heapSort(A):
  buildMaxHeap(A)
  for end from length(A) - 1 downto 1 do
    swap A[0], A[end]
    siftDown(A, 0, end)

procedure buildMaxHeap(A):
  for i from ⌊length(A)/2⌋ - 1 downto 0 do
    siftDown(A, i, length(A))

procedure siftDown(A, root, size):
  largest ← root
  left ← 2·root + 1
  right ← 2·root + 2
  if left < size and A[left] > A[largest] then largest ← left
  if right < size and A[right] > A[largest] then largest ← right
  if largest ≠ root then
    swap A[root], A[largest]
    siftDown(A, largest, size)`,
      implementations: {
        python: `def heap_sort(arr):
    def sift_down(start, end):
        root = start
        while True:
            child = 2 * root + 1
            if child >= end:
                break
            if child + 1 < end and arr[child] < arr[child + 1]:
                child += 1
            if arr[root] >= arr[child]:
                break
            arr[root], arr[child] = arr[child], arr[root]
            root = child

    n = len(arr)
    for start in range(n // 2 - 1, -1, -1):
        sift_down(start, n)
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        sift_down(0, end)`,
        c: `static void sift_down(int arr[], int start, int end) {
    int root = start;
    while (2 * root + 1 < end) {
        int child = 2 * root + 1;
        if (child + 1 < end && arr[child] < arr[child + 1]) child++;
        if (arr[root] >= arr[child]) break;
        int tmp = arr[root];
        arr[root] = arr[child];
        arr[child] = tmp;
        root = child;
    }
}

void heap_sort(int arr[], int n) {
    for (int start = n / 2 - 1; start >= 0; --start)
        sift_down(arr, start, n);
    for (int end = n - 1; end > 0; --end) {
        int tmp = arr[0];
        arr[0] = arr[end];
        arr[end] = tmp;
        sift_down(arr, 0, end);
    }
}`,
        java: `public static void heapSort(int[] arr) {
    for (int start = arr.length / 2 - 1; start >= 0; start--) {
        siftDown(arr, start, arr.length);
    }
    for (int end = arr.length - 1; end > 0; end--) {
        int tmp = arr[0];
        arr[0] = arr[end];
        arr[end] = tmp;
        siftDown(arr, 0, end);
    }
}

private static void siftDown(int[] arr, int root, int end) {
    while (true) {
        int child = 2 * root + 1;
        if (child >= end) break;
        if (child + 1 < end && arr[child] < arr[child + 1]) child++;
        if (arr[root] >= arr[child]) break;
        int tmp = arr[root];
        arr[root] = arr[child];
        arr[child] = tmp;
        root = child;
    }
}`,
      },
    },
    bogo: {
      pseudocode: `procedure bogoSort(A):
  while not isSorted(A) do
    shuffle(A)`,
      implementations: {
        python: `import random

def is_sorted(arr):
    return all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))

def bogo_sort(arr):
    while not is_sorted(arr):
        random.shuffle(arr)`,
        c: `int is_sorted(int arr[], int n) {
    for (int i = 1; i < n; ++i)
        if (arr[i - 1] > arr[i]) return 0;
    return 1;
}

void bogo_sort(int arr[], int n) {
    while (!is_sorted(arr, n)) {
        for (int i = n - 1; i > 0; --i) {
            int j = rand() % (i + 1);
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
}`,
        java: `private static boolean isSorted(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}

public static void bogoSort(int[] arr) {
    Random rand = new Random();
    while (!isSorted(arr)) {
        for (int i = arr.length - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
}`,
      },
    },
  },
  searching: {
    linear: {
      pseudocode: `procedure linearSearch(A, target):
  for i from 0 to length(A) - 1 do
    if A[i] = target then
      return i
  return -1`,
      implementations: {
        python: `def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1`,
        c: `int linear_search(const int arr[], int n, int target) {
    for (int i = 0; i < n; ++i) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
        java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      },
    },
    binary: {
      pseudocode: `procedure binarySearch(A, target):
  low ← 0
  high ← length(A) - 1
  while low ≤ high do
    mid ← ⌊(low + high) / 2⌋
    if A[mid] = target then
      return mid
    else if A[mid] < target then
      low ← mid + 1
    else
      high ← mid - 1
  return -1`,
      implementations: {
        python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
        c: `int binary_search(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
        java: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
      },
    },
  },
  pattern: {
    naive: {
      pseudocode: `procedure naiveMatch(T, P):
  n ← length(T)
  m ← length(P)
  if m = 0 then return {0}
  for i from 0 to n - m do
    match ← true
    for j from 0 to m - 1 do
      if T[i + j] ≠ P[j] then
        match ← false
        break
    if match then
      report i`,
      implementations: {
        python: `def naive_match(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0:
        return [0]
    matches = []
    for i in range(n - m + 1):
        match = True
        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break
        if match:
            matches.append(i)
    return matches`,
        c: `void naive_match(const char *text, const char *pattern, int *out, int *count) {
    int n = strlen(text);
    int m = strlen(pattern);
    *count = 0;
    if (m == 0) {
        out[(*count)++] = 0;
        return;
    }
    for (int i = 0; i <= n - m; ++i) {
        int match = 1;
        for (int j = 0; j < m; ++j) {
            if (text[i + j] != pattern[j]) {
                match = 0;
                break;
            }
        }
        if (match) {
            out[(*count)++] = i;
        }
    }
}`,
        java: `public static List<Integer> naiveMatch(String text, String pattern) {
    List<Integer> matches = new ArrayList<>();
    int n = text.length();
    int m = pattern.length();
    if (m == 0) {
        matches.add(0);
        return matches;
    }
    for (int i = 0; i <= n - m; i++) {
        boolean match = true;
        for (int j = 0; j < m; j++) {
            if (text.charAt(i + j) != pattern.charAt(j)) {
                match = false;
                break;
            }
        }
        if (match) {
            matches.add(i);
        }
    }
    return matches;
}`,
      },
    },
  },
  pathfinding: {},
  "graph-pathfinding": {},
  mdp: mdpDocs,
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
  pattern: {
    naive: {
      time: { best: "O(n - m + 1)", average: "O((n-m+1)·m)", worst: "O((n-m+1)·m)" },
      space: "O(1)",
      note: "Slides the pattern across the sequence and compares characters directly.",
      estimate: {
        best: () =>
          Math.max(
            0,
            state.pattern.text.length - Math.max(state.pattern.pattern.length, 1) + 1,
          ),
        average: () =>
          state.pattern.text.length * Math.max(state.pattern.pattern.length, 1),
        worst: () =>
          state.pattern.text.length * Math.max(state.pattern.pattern.length, 1),
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
  if (mode === "pathfinding") return pathfindingAlgorithms;
  if (mode === "searching") return searchingAlgorithms;
  if (mode === "pattern") return patternMatchingAlgorithms;
  if (mode === "mdp") return mdpAlgorithms;
  return sortingAlgorithms;
}

function getActiveAlgorithmKey(mode = state.mode) {
  if (mode === "pathfinding") {
    return pathfindingAlgorithmSelect?.value || "bfs";
  }
  if (mode === "searching") {
    return searchAlgorithmSelect?.value || "linear";
  }
  if (mode === "pattern") {
    return patternAlgorithmSelect?.value || "naive";
  }
  if (mode === "mdp") {
    return mdpAlgorithmSelect?.value || "valueIteration";
  }
  return sortingAlgorithmSelect?.value || "bubble";
}

function selectImplementations(implementations = {}) {
  return DOC_LANGUAGES.reduce((acc, lang) => {
    const snippet = implementations?.[lang];
    if (typeof snippet === "string") {
      const trimmed = snippet.trim();
      if (trimmed.length > 0) {
        acc[lang] = trimmed;
      }
    }
    return acc;
  }, {});
}

function renderAlgorithmDocumentation(key, mode = state.mode) {
  if (!algorithmDocOutput) {
    return;
  }

  const docsForMode = documentationCatalog[mode] || {};
  const docs = key ? docsForMode[key] : null;
  const sanitizedImplementations = docs ? selectImplementations(docs.implementations) : {};
  const availableLanguages = DOC_LANGUAGES.filter((lang) => sanitizedImplementations[lang]);

  if (state.docs.view !== "pseudocode" && !availableLanguages.includes(state.docs.view)) {
    if (availableLanguages.length > 0) {
      state.docs.view = availableLanguages[0];
      state.docs.language = availableLanguages[0];
    } else {
      state.docs.view = "pseudocode";
    }
  }

  DOC_LANGUAGES.forEach((lang) => {
    const button = docTabButtonMap[lang];
    if (!button) {
      return;
    }
    const available = availableLanguages.includes(lang);
    button.disabled = !available;
    const isActive = state.docs.view === lang;
    button.classList.toggle("active", available && isActive);
    button.setAttribute("aria-selected", available && isActive ? "true" : "false");
  });

  const pseudocodeButton = docTabButtonMap.pseudocode;
  if (pseudocodeButton) {
    const isActive = state.docs.view === "pseudocode";
    pseudocodeButton.classList.toggle("active", isActive);
    pseudocodeButton.setAttribute("aria-selected", String(isActive));
    pseudocodeButton.disabled = false;
  }

  if (!key || !docs) {
    const message = "Documentation coming soon.";
    algorithmDocOutput.textContent = key ? message : "Select an algorithm to view documentation.";
    return;
  }

  const pseudocode = typeof docs.pseudocode === "string" ? docs.pseudocode.trim() : "";

  if (state.docs.view === "pseudocode") {
    algorithmDocOutput.textContent = pseudocode.length > 0 ? pseudocode : "Pseudocode coming soon.";
    return;
  }

  const snippet = sanitizedImplementations[state.docs.view];
  algorithmDocOutput.textContent =
    typeof snippet === "string" && snippet.length > 0 ? snippet : "Implementation coming soon.";
}

function initializeDocTabs() {
  docTabButtons.forEach((button) => {
    const type = button.dataset.docType;
    if (!type) {
      return;
    }
    docTabButtonMap[type] = button;
    button.addEventListener("click", () => {
      if (button.disabled) {
        return;
      }
      if (type === "pseudocode") {
        state.docs.view = "pseudocode";
      } else {
        state.docs.view = type;
        state.docs.language = type;
      }
      const key = getActiveAlgorithmKey(state.mode);
      renderAlgorithmDocumentation(key, state.mode);
    });
  });
  renderAlgorithmDocumentation(null, state.mode);
}

function updateAlgorithmDetails(key, mode = state.mode) {
  const library = getAlgorithmLibrary(mode);
  const algorithm = library[key];
  if (!algorithm) {
    return;
  }
  algorithmNameEl.textContent = algorithm.name;
  algorithmDescriptionEl.textContent = algorithm.description;
  state.docs.view = "pseudocode";
  renderAlgorithmDocumentation(key, mode);
  updateComplexityPanel(mode, key);
}

function updateComplexityPanel(mode = state.mode, key) {
  let algorithmKey = key;
  if (!algorithmKey) {
    algorithmKey = getActiveAlgorithmKey(mode);
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

function updateGrowthVisualization(mode = state.mode, key) {
  const algorithmKey = key || getActiveAlgorithmKey(mode);
  const n = mode === "pattern" ? state.pattern.text.length : state.dataset.length;
  if (growthNEl) {
    growthNEl.textContent = n;
  }

  const estimates = computeEstimates(mode, algorithmKey, n) || {
    best: null,
    average: null,
    worst: null,
  };

  let actualValue = null;
  if (
    state.lastRun &&
    state.lastRun.mode === mode &&
    state.lastRun.algorithmKey === algorithmKey &&
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

function normalizeSequence(value = "") {
  const raw = value == null ? "" : String(value);
  return raw.toUpperCase().replace(/[^ACGT]/g, "");
}

function setPatternText(sequence) {
  const normalized = normalizeSequence(sequence) || DEFAULT_PATTERN_SEQUENCE;
  state.pattern.text = normalized.split("");
  if (patternTextInput && patternTextInput.value !== normalized) {
    patternTextInput.value = normalized;
  }
  invalidateLastRun();
  resetPatternResults();
}

function setPatternNeedle(sequence) {
  const normalized = normalizeSequence(sequence) || DEFAULT_PATTERN_NEEDLE;
  state.pattern.pattern = normalized.split("");
  if (patternPatternInput && patternPatternInput.value !== normalized) {
    patternPatternInput.value = normalized;
  }
  invalidateLastRun();
  resetPatternResults();
}

function updatePatternStats() {
  if (patternComparisonsOutput) {
    patternComparisonsOutput.textContent = state.pattern.result.comparisons;
  }
  if (patternMatchCountOutput) {
    patternMatchCountOutput.textContent = state.pattern.result.matches;
  }
}

function renderPatternView() {
  if (!patternContainer) {
    return;
  }
  patternContainer.innerHTML = "";
  const { text, matches, pattern, activeRange } = state.pattern;
  const patternLength = pattern.length;

  const sequenceRow = document.createElement("div");
  sequenceRow.className = "pattern-row sequence";
  const needleRow = document.createElement("div");
  needleRow.className = "pattern-row needle";

  text.forEach((char, index) => {
    const matchStart = matches.find(
      (start) => index >= start && index < start + patternLength,
    );
    const seqCell = document.createElement("span");
    seqCell.textContent = char || "—";
    if (matchStart !== undefined) {
      seqCell.classList.add("match");
    }
    if (
      activeRange &&
      index >= activeRange.start &&
      index < activeRange.start + activeRange.length
    ) {
      seqCell.classList.add("active");
    }
    sequenceRow.appendChild(seqCell);

    const needleCell = document.createElement("span");
    if (
      activeRange &&
      index >= activeRange.start &&
      index < activeRange.start + patternLength
    ) {
      const patternIndex = index - activeRange.start;
      needleCell.textContent = pattern[patternIndex] || "";
      needleCell.classList.add("active");
    } else {
      needleCell.textContent = " ";
    }

    if (matchStart !== undefined) {
      needleCell.classList.add("match");
      const patternIndex = index - matchStart;
      needleCell.textContent = pattern[patternIndex] || "";
    }
    needleRow.appendChild(needleCell);
  });

  patternContainer.appendChild(sequenceRow);
  patternContainer.appendChild(needleRow);
  const isPatternMode = state.mode === "pattern";
  patternContainer.classList.toggle("active", isPatternMode);
  patternContainer.hidden = !isPatternMode;
}

function resetPatternResults() {
  state.pattern.result.comparisons = 0;
  state.pattern.result.matches = 0;
  state.pattern.matches = [];
  state.pattern.activeRange = null;
  updatePatternStats();
  renderPatternView();
  if (state.mode === "pattern") {
    updateGrowthVisualization("pattern", patternAlgorithmSelect ? patternAlgorithmSelect.value : null);
  }
}

function randomizePatternSequence(length = state.pattern.text.length || 16) {
  const targetLength = Math.max(8, Math.min(length, 60));
  const sequence = Array.from({ length: targetLength }, () => {
    const idx = randomInt(0, state.pattern.alphabet.length - 1);
    return state.pattern.alphabet[idx];
  }).join("");
  setPatternText(sequence);
}

function createPatternContext() {
  const delay = Math.max(10, Number(speedInput.value));
  return {
    text: state.pattern.text,
    pattern: state.pattern.pattern,
    pause: () =>
      new Promise((resolve) => {
        setTimeout(resolve, delay);
      }),
    highlightRange(start, length) {
      state.pattern.activeRange = { start, length };
      renderPatternView();
    },
    clearHighlight() {
      state.pattern.activeRange = null;
      renderPatternView();
    },
    recordComparison() {
      state.pattern.result.comparisons += 1;
      updatePatternStats();
    },
    recordMatch(start) {
      state.pattern.matches.push(start);
      state.pattern.result.matches += 1;
      renderPatternView();
      updatePatternStats();
    },
  };
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
    if (state.mode === "pathfinding") text = "Finding Path...";
    else if (state.mode === "searching") text = "Searching...";
    else if (state.mode === "pattern") text = "Matching...";
    else if (state.mode === "mdp") text = "Computing...";
    else text = "Sorting...";
  } else {
    if (state.mode === "pathfinding") text = "Start Pathfinding";
    else if (state.mode === "searching") text = "Start Searching";
    else if (state.mode === "pattern") text = "Start Matching";
    else if (state.mode === "mdp") {
      const algorithmKey = mdpAlgorithmSelect.value;
      const algorithm = mdpAlgorithms[algorithmKey];
      text = algorithm ? `Run ${algorithm.name}` : "Run Algorithm";
    }
    else text = "Start Sorting";
  }
  actionBtn.textContent = text;
}

function updateRandomizeButtonState() {
  if (state.mode === "pathfinding") {
    randomizeBtn.textContent = "Regenerate Maze";
  } else if (state.mode === "mdp") {
    randomizeBtn.textContent = "Randomize Rewards";
  } else if (state.mode === "pattern") {
    randomizeBtn.textContent = "Randomize Sequence";
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
  if (targetInput) {
    targetInput.disabled = disabled;
  }
  if (targetRandomizeBtn) {
    targetRandomizeBtn.disabled = disabled;
  }
  if (patternAlgorithmSelect) {
    patternAlgorithmSelect.disabled = disabled;
  }
  if (patternTextInput) {
    patternTextInput.disabled = disabled;
  }
  if (patternPatternInput) {
    patternPatternInput.disabled = disabled;
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

async function runPatternMatching() {
  if (state.running) {
    return;
  }
  const algorithmKey = patternAlgorithmSelect?.value || "naive";
  const algorithm = patternMatchingAlgorithms[algorithmKey];
  if (!algorithm || state.pattern.text.length === 0) {
    return;
  }

  state.running = true;
  toggleControls(true);
  resetPatternResults();
  invalidateLastRun();

  const context = createPatternContext();

  try {
    await algorithm.run(context);
    state.lastRun = {
      mode: "pattern",
      algorithmKey,
      n: state.pattern.text.length,
      actual: {
        comparisons: state.pattern.result.comparisons,
        writes: 0,
        passes: 0,
        operations: state.pattern.result.comparisons,
      },
      matches: [...state.pattern.matches],
      timestamp: Date.now(),
    };
    updateGrowthVisualization("pattern", algorithmKey);
  } finally {
    context.clearHighlight();
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

async function bucketSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  // Find min and max for normalization
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

  const bucketCount = Math.max(5, Math.floor(Math.sqrt(n)));
  const buckets = Array.from({ length: bucketCount }, () => []);
  const range = max - min + 1;

  // Distribute elements into buckets
  ctx.setPass(1);
  for (let i = 0; i < n; i += 1) {
    ctx.highlight([i]);
    await ctx.pause();
    const bucketIndex = Math.min(
      bucketCount - 1,
      Math.floor(((arr[i] - min) / range) * bucketCount)
    );
    buckets[bucketIndex].push(arr[i]);
    ctx.recordWrite();
  }
  ctx.clearActive();

  // Sort individual buckets using insertion sort
  ctx.setPass(2);
  for (let i = 0; i < bucketCount; i += 1) {
    const bucket = buckets[i];
    // Simple insertion sort for each bucket
    for (let j = 1; j < bucket.length; j += 1) {
      const key = bucket[j];
      let k = j - 1;
      ctx.recordComparison();
      while (k >= 0 && bucket[k] > key) {
        bucket[k + 1] = bucket[k];
        k -= 1;
        ctx.recordComparison();
        ctx.recordWrite();
      }
      bucket[k + 1] = key;
    }
  }

  // Concatenate buckets back into array
  ctx.setPass(3);
  let index = 0;
  for (let i = 0; i < bucketCount; i += 1) {
    for (let j = 0; j < buckets[i].length; j += 1) {
      ctx.highlight([index]);
      await ctx.overwrite(index, buckets[i][j]);
      index += 1;
    }
  }
  ctx.clearActive();
}

async function timSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  const MIN_MERGE = 32;

  // Insertion sort for small runs
  async function insertionSortRange(left, right) {
    for (let i = left + 1; i <= right; i += 1) {
      const key = arr[i];
      let j = i - 1;
      ctx.highlight([i]);
      await ctx.pause();

      while (j >= left) {
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

      if (j + 1 !== i) {
        await ctx.overwrite(j + 1, key);
      }
      ctx.clearActive();
    }
  }

  // Merge function for TimSort
  async function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      ctx.highlight([left + i, mid + 1 + j, k]);
      ctx.recordComparison();
      await ctx.pause();

      if (leftArr[i] <= rightArr[j]) {
        await ctx.overwrite(k, leftArr[i]);
        i += 1;
      } else {
        await ctx.overwrite(k, rightArr[j]);
        j += 1;
      }
      k += 1;
    }

    while (i < leftArr.length) {
      ctx.highlight([k]);
      await ctx.pause();
      await ctx.overwrite(k, leftArr[i]);
      i += 1;
      k += 1;
    }

    while (j < rightArr.length) {
      ctx.highlight([k]);
      await ctx.pause();
      await ctx.overwrite(k, rightArr[j]);
      j += 1;
      k += 1;
    }

    ctx.clearActive();
  }

  // Sort individual runs of size MIN_MERGE
  ctx.setPass(1);
  for (let start = 0; start < n; start += MIN_MERGE) {
    const end = Math.min(start + MIN_MERGE - 1, n - 1);
    await insertionSortRange(start, end);
  }

  // Merge runs
  let size = MIN_MERGE;
  let pass = 2;
  while (size < n) {
    ctx.setPass(pass);
    pass += 1;

    for (let start = 0; start < n; start += 2 * size) {
      const mid = start + size - 1;
      const end = Math.min(start + 2 * size - 1, n - 1);

      if (mid < end) {
        await merge(start, mid, end);
      }
    }

    size *= 2;
  }
  ctx.clearActive();
}

async function combSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  let gap = n;
  const shrinkFactor = 1.3;
  let sorted = false;
  let pass = 0;

  while (!sorted) {
    pass += 1;
    ctx.setPass(pass);

    // Update gap
    gap = Math.floor(gap / shrinkFactor);
    if (gap <= 1) {
      gap = 1;
      sorted = true; // If gap is 1, this is the last pass
    }

    let swapped = false;

    // Compare elements with current gap
    for (let i = 0; i + gap < n; i += 1) {
      ctx.highlight([i, i + gap]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[i] > arr[i + gap]) {
        await ctx.swap(i, i + gap);
        swapped = true;
      }
    }

    // If no swaps and gap is 1, array is sorted
    if (gap === 1 && !swapped) {
      sorted = true;
    } else if (swapped) {
      sorted = false;
    }

    ctx.clearActive();
  }
}

async function cocktailShakerSort(ctx) {
  const arr = ctx.data();
  const n = arr.length;
  if (n <= 1) {
    return;
  }

  let start = 0;
  let end = n - 1;
  let swapped = true;
  let pass = 0;

  while (swapped) {
    swapped = false;
    pass += 1;
    ctx.setPass(pass);

    // Forward pass (left to right)
    for (let i = start; i < end; i += 1) {
      ctx.highlight([i, i + 1]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[i] > arr[i + 1]) {
        await ctx.swap(i, i + 1);
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }

    // Mark the last element as sorted
    ctx.addSorted(end);
    end -= 1;

    swapped = false;
    pass += 1;
    ctx.setPass(pass);

    // Backward pass (right to left)
    for (let i = end; i > start; i -= 1) {
      ctx.highlight([i - 1, i]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[i - 1] > arr[i]) {
        await ctx.swap(i - 1, i);
        swapped = true;
      }
    }

    // Mark the first element as sorted
    ctx.addSorted(start);
    start += 1;

    ctx.clearActive();
  }
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

async function jumpSearch(ctx, target) {
  const arr = ctx.data();
  const n = arr.length;
  if (n === 0) {
    ctx.setResult(false, -1);
    return;
  }

  const jumpSize = Math.floor(Math.sqrt(n));
  let prev = 0;
  let step = 0;

  // Find the block where target might be
  while (prev < n && arr[Math.min(prev, n - 1)] < target) {
    step += 1;
    ctx.setPass(step);
    const jumpIndex = Math.min(prev + jumpSize, n - 1);
    ctx.highlight([prev, jumpIndex]);
    ctx.recordComparison();
    await ctx.pause();

    if (arr[jumpIndex] === target) {
      ctx.setResult(true, jumpIndex);
      ctx.highlight([jumpIndex]);
      await ctx.pause();
      return;
    }

    prev += jumpSize;
    ctx.clearActive();
  }

  // Linear search within the block
  const start = Math.max(0, prev - jumpSize);
  const end = Math.min(prev, n);

  for (let i = start; i < end; i += 1) {
    step += 1;
    ctx.setPass(step);
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

async function exponentialSearch(ctx, target) {
  const arr = ctx.data();
  const n = arr.length;
  if (n === 0) {
    ctx.setResult(false, -1);
    return;
  }

  // Check if target is at first position
  ctx.setPass(1);
  ctx.highlight([0]);
  ctx.recordComparison();
  await ctx.pause();

  if (arr[0] === target) {
    ctx.setResult(true, 0);
    ctx.highlight([0]);
    await ctx.pause();
    return;
  }

  ctx.clearActive();

  // Find range for binary search by doubling the bound
  let bound = 1;
  let step = 1;
  while (bound < n && arr[bound] < target) {
    step += 1;
    ctx.setPass(step);
    ctx.highlight([bound]);
    ctx.recordComparison();
    await ctx.pause();

    if (arr[bound] === target) {
      ctx.setResult(true, bound);
      ctx.highlight([bound]);
      await ctx.pause();
      return;
    }

    ctx.clearActive();
    bound *= 2;
  }

  // Binary search within the found range
  let low = Math.floor(bound / 2);
  let high = Math.min(bound, n - 1);

  while (low <= high) {
    step += 1;
    const mid = Math.floor((low + high) / 2);
    ctx.setPass(step);
    ctx.highlight([low, mid, high]);
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
  }

  ctx.clearActive();
  ctx.setResult(false, -1);
}

async function interpolationSearch(ctx, target) {
  const arr = ctx.data();
  const n = arr.length;
  if (n === 0) {
    ctx.setResult(false, -1);
    return;
  }

  let low = 0;
  let high = n - 1;
  let step = 0;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    step += 1;
    ctx.setPass(step);

    // Handle case where all elements in range are the same
    if (arr[low] === arr[high]) {
      ctx.highlight([low]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[low] === target) {
        ctx.setResult(true, low);
        ctx.highlight([low]);
        await ctx.pause();
        return;
      }
      break;
    }

    // Interpolation formula
    const pos = low + Math.floor(
      ((target - arr[low]) / (arr[high] - arr[low])) * (high - low)
    );

    ctx.highlight([low, pos, high]);
    ctx.recordComparison();
    await ctx.pause();

    if (arr[pos] === target) {
      ctx.setResult(true, pos);
      ctx.highlight([pos]);
      await ctx.pause();
      return;
    }

    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }

    ctx.clearActive();
  }

  ctx.clearActive();
  ctx.setResult(false, -1);
}

async function naivePatternMatch(ctx) {
  const text = ctx.text;
  const pattern = ctx.pattern;
  const n = text.length;
  const m = pattern.length;

  if (m === 0) {
    ctx.recordMatch(0);
    return;
  }

  for (let i = 0; i <= n - m; i += 1) {
    let matched = true;
    for (let j = 0; j < m; j += 1) {
      ctx.highlightRange(i, j + 1);
      ctx.recordComparison();
      await ctx.pause();
      if (text[i + j] !== pattern[j]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      ctx.recordMatch(i);
      await ctx.pause();
    }
  }
}

async function fibonacciSearch(ctx, target) {
  const arr = ctx.data();
  const n = arr.length;
  if (n === 0) {
    ctx.setResult(false, -1);
    return;
  }

  // Generate Fibonacci numbers
  let fibM2 = 0; // (m-2)'th Fibonacci number
  let fibM1 = 1; // (m-1)'th Fibonacci number
  let fibM = fibM2 + fibM1; // m'th Fibonacci number

  // Find smallest Fibonacci number >= n
  while (fibM < n) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM2 + fibM1;
  }

  let offset = -1;
  let step = 0;

  while (fibM > 1) {
    step += 1;
    ctx.setPass(step);

    // Check if fibM2 is a valid index
    const i = Math.min(offset + fibM2, n - 1);

    ctx.highlight([i]);
    ctx.recordComparison();
    await ctx.pause();

    if (arr[i] === target) {
      ctx.setResult(true, i);
      ctx.highlight([i]);
      await ctx.pause();
      return;
    }

    if (arr[i] < target) {
      // Move to the right section
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      offset = i;
    } else {
      // Move to the left section
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;
    }

    ctx.clearActive();
  }

  // Check the last element
  if (fibM1 === 1 && offset + 1 < n) {
    step += 1;
    ctx.setPass(step);
    ctx.highlight([offset + 1]);
    ctx.recordComparison();
    await ctx.pause();

    if (arr[offset + 1] === target) {
      ctx.setResult(true, offset + 1);
      ctx.highlight([offset + 1]);
      await ctx.pause();
      return;
    }
  }

  ctx.clearActive();
  ctx.setResult(false, -1);
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
        // MDP properties
        reward: -1,        // Default step cost
        value: 0,          // State value
        policy: null,      // Optimal action: 'up', 'down', 'left', 'right'
        isTerminal: false, // Terminal/absorbing state
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
      const cellData = state.grid.cells[row][col];
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (state.mode === "mdp") {
        // MDP mode: show rewards, values, and policy
        if (cellData.isWall) {
          cell.classList.add("wall");
        } else if (cellData.isTerminal && cellData.reward > 0) {
          cell.classList.add("goal");
        } else if (cellData.reward < -1) {
          cell.classList.add("penalty");
        }

        // Show value and policy
        const valueSpan = document.createElement("span");
        valueSpan.className = "cell-value";
        valueSpan.textContent = cellData.value.toFixed(1);
        cell.appendChild(valueSpan);

        if (cellData.policy && !cellData.isTerminal) {
          const policyArrow = document.createElement("span");
          policyArrow.className = `policy-arrow policy-${cellData.policy}`;
          policyArrow.textContent = {
            up: "↑",
            down: "↓",
            left: "←",
            right: "→"
          }[cellData.policy] || "";
          cell.appendChild(policyArrow);
        }

        cell.addEventListener("click", () => toggleMDPCell(row, col));
      } else {
        // Pathfinding mode: show start/end/walls
        if (state.grid.start && state.grid.start.row === row && state.grid.start.col === col) {
          cell.classList.add("start");
        } else if (state.grid.end && state.grid.end.row === row && state.grid.end.col === col) {
          cell.classList.add("end");
        } else if (cellData.isWall) {
          cell.classList.add("wall");
        }

        cell.addEventListener("click", () => toggleWall(row, col));
      }

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

function toggleMDPCell(row, col) {
  if (state.running) return;

  const cell = state.grid.cells[row][col];

  // Cycle through states: normal → goal → penalty → wall → normal
  if (cell.isWall) {
    // Wall → Normal
    cell.isWall = false;
    cell.reward = -1;
    cell.isTerminal = false;
  } else if (cell.isTerminal && cell.reward > 0) {
    // Goal → Penalty
    cell.reward = -50;
    cell.isTerminal = false;
  } else if (cell.reward < -1) {
    // Penalty → Wall
    cell.reward = -1;
    cell.isWall = true;
    cell.isTerminal = false;
  } else {
    // Normal → Goal
    cell.reward = 100;
    cell.isTerminal = true;
  }

  // Reset value and policy when cell type changes
  cell.value = 0;
  cell.policy = null;
  resetMDPStats();
  renderGrid();
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

// Pathfinding Algorithms
async function bfsPathfinding() {
  resetGridVisualization();
  resetPathResult();

  const start = state.grid.cells[state.grid.start.row][state.grid.start.col];
  const end = state.grid.cells[state.grid.end.row][state.grid.end.col];

  const queue = [start];
  const visited = new Set();
  visited.add(`${start.row},${start.col}`);

  let steps = 0;
  let nodesVisited = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    steps += 1;
    nodesVisited += 1;

    state.grid.pathResult.steps = steps;
    state.grid.pathResult.nodesVisited = nodesVisited;
    updatePathOutputs();

    await visualizeCell(current.row, current.col, "visiting");

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(current);
      state.grid.pathResult.found = true;
      state.grid.pathResult.path = path;
      updatePathOutputs();
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
        queue.push(neighbor);
      }
    }
  }

  state.grid.pathResult.found = false;
  updatePathOutputs();
}

async function dfsPathfinding() {
  resetGridVisualization();
  resetPathResult();

  const start = state.grid.cells[state.grid.start.row][state.grid.start.col];
  const end = state.grid.cells[state.grid.end.row][state.grid.end.col];

  const stack = [start];
  const visited = new Set();
  visited.add(`${start.row},${start.col}`);

  let steps = 0;
  let nodesVisited = 0;

  while (stack.length > 0) {
    const current = stack.pop();
    steps += 1;
    nodesVisited += 1;

    state.grid.pathResult.steps = steps;
    state.grid.pathResult.nodesVisited = nodesVisited;
    updatePathOutputs();

    await visualizeCell(current.row, current.col, "visiting");

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(current);
      state.grid.pathResult.found = true;
      state.grid.pathResult.path = path;
      updatePathOutputs();
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

  state.grid.pathResult.found = false;
  updatePathOutputs();
}

async function dijkstraPathfinding() {
  resetGridVisualization();
  resetPathResult();

  const start = state.grid.cells[state.grid.start.row][state.grid.start.col];
  const end = state.grid.cells[state.grid.end.row][state.grid.end.col];

  start.distance = 0;
  const unvisited = [];

  for (let row = 0; row < state.grid.size; row += 1) {
    for (let col = 0; col < state.grid.size; col += 1) {
      unvisited.push(state.grid.cells[row][col]);
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

    state.grid.pathResult.steps = steps;
    state.grid.pathResult.nodesVisited = nodesVisited;
    updatePathOutputs();

    await visualizeCell(current.row, current.col, "visiting");

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(current);
      state.grid.pathResult.found = true;
      state.grid.pathResult.path = path;
      updatePathOutputs();
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

  state.grid.pathResult.found = false;
  updatePathOutputs();
}

async function astarPathfinding() {
  resetGridVisualization();
  resetPathResult();

  const start = state.grid.cells[state.grid.start.row][state.grid.start.col];
  const end = state.grid.cells[state.grid.end.row][state.grid.end.col];

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

    state.grid.pathResult.steps = steps;
    state.grid.pathResult.nodesVisited = nodesVisited;
    updatePathOutputs();

    await visualizeCell(current.row, current.col, "visiting");

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(current);
      state.grid.pathResult.found = true;
      state.grid.pathResult.path = path;
      updatePathOutputs();
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

  state.grid.pathResult.found = false;
  updatePathOutputs();
}

async function greedyPathfinding() {
  resetGridVisualization();
  resetPathResult();

  const start = state.grid.cells[state.grid.start.row][state.grid.start.col];
  const end = state.grid.cells[state.grid.end.row][state.grid.end.col];

  start.heuristic = manhattanDistance(start.row, start.col, end.row, end.col);

  const openSet = [start];
  const visited = new Set();
  visited.add(`${start.row},${start.col}`);

  let steps = 0;
  let nodesVisited = 0;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.heuristic - b.heuristic);
    const current = openSet.shift();

    steps += 1;
    nodesVisited += 1;

    state.grid.pathResult.steps = steps;
    state.grid.pathResult.nodesVisited = nodesVisited;
    updatePathOutputs();

    await visualizeCell(current.row, current.col, "visiting");

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(current);
      state.grid.pathResult.found = true;
      state.grid.pathResult.path = path;
      updatePathOutputs();
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
        neighbor.heuristic = manhattanDistance(neighbor.row, neighbor.col, end.row, end.col);
        openSet.push(neighbor);
      }
    }
  }

  state.grid.pathResult.found = false;
  updatePathOutputs();
}

// MDP Algorithms
async function valueIteration() {
  resetMDPStats();

  const size = state.grid.size;
  const gamma = state.mdp.discount;
  const theta = state.mdp.threshold;
  const maxIter = state.mdp.maxIterations;

  // Initialize values
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      state.grid.cells[row][col].value = 0;
      state.grid.cells[row][col].policy = null;
    }
  }

  let iterations = 0;
  let delta = Infinity;

  // Value Iteration loop
  while (delta >= theta && iterations < maxIter) {
    delta = 0;
    iterations++;

    // Update each cell
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = state.grid.cells[row][col];

        // Skip walls and terminal states
        if (cell.isWall || cell.isTerminal) continue;

        const oldValue = cell.value;

        // Get neighbors (possible next states)
        const actions = [
          { dir: "up", row: row - 1, col: col },
          { dir: "down", row: row + 1, col: col },
          { dir: "left", row: row, col: col - 1 },
          { dir: "right", row: row, col: col + 1 },
        ];

        let maxValue = -Infinity;

        // Bellman update: V(s) = R(s) + γ * max_a(V(s'))
        for (const action of actions) {
          const nextRow = action.row;
          const nextCol = action.col;

          // Check bounds
          if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) {
            // Out of bounds - stay in place with step cost
            const value = cell.reward + gamma * oldValue;
            maxValue = Math.max(maxValue, value);
            continue;
          }

          const nextCell = state.grid.cells[nextRow][nextCol];

          // Check if next cell is a wall
          if (nextCell.isWall) {
            // Hit wall - stay in place with step cost
            const value = cell.reward + gamma * oldValue;
            maxValue = Math.max(maxValue, value);
          } else {
            // Valid move
            const value = cell.reward + gamma * nextCell.value;
            maxValue = Math.max(maxValue, value);
          }
        }

        cell.value = maxValue;
        delta = Math.max(delta, Math.abs(oldValue - maxValue));
      }
    }

    // Update stats and visualize
    state.mdp.result.iterations = iterations;
    state.mdp.result.maxDelta = delta;
    mdpIterationsOutput.textContent = iterations;
    mdpMaxDeltaOutput.textContent = delta.toFixed(4);

    renderGrid();
    await pause();
  }

  // Extract policy
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = state.grid.cells[row][col];

      // Skip walls and terminal states
      if (cell.isWall || cell.isTerminal) continue;

      const actions = [
        { dir: "up", row: row - 1, col: col },
        { dir: "down", row: row + 1, col: col },
        { dir: "left", row: row, col: col - 1 },
        { dir: "right", row: row, col: col + 1 },
      ];

      let bestAction = null;
      let bestValue = -Infinity;

      for (const action of actions) {
        const nextRow = action.row;
        const nextCol = action.col;

        // Check bounds
        if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) {
          const value = cell.reward + gamma * cell.value;
          if (value > bestValue) {
            bestValue = value;
            bestAction = action.dir;
          }
          continue;
        }

        const nextCell = state.grid.cells[nextRow][nextCol];

        if (nextCell.isWall) {
          const value = cell.reward + gamma * cell.value;
          if (value > bestValue) {
            bestValue = value;
            bestAction = action.dir;
          }
        } else {
          const value = cell.reward + gamma * nextCell.value;
          if (value > bestValue) {
            bestValue = value;
            bestAction = action.dir;
          }
        }
      }

      cell.policy = bestAction;
    }
  }

  // Mark as converged
  const converged = delta < theta;
  state.mdp.result.converged = converged;
  mdpConvergedOutput.textContent = converged ? "Yes" : "No";

  renderGrid();
}

async function policyIteration() {
  resetMDPStats();

  const size = state.grid.size;
  const gamma = state.mdp.discount;
  const theta = state.mdp.threshold;
  const maxIter = state.mdp.maxIterations;

  // Initialize random policy and values
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = state.grid.cells[row][col];
      cell.value = 0;

      // Initialize with random policy for non-terminal, non-wall cells
      if (!cell.isWall && !cell.isTerminal) {
        const actions = ["up", "down", "left", "right"];
        cell.policy = actions[Math.floor(Math.random() * actions.length)];
      } else {
        cell.policy = null;
      }
    }
  }

  let policyStable = false;
  let iterations = 0;

  // Policy Iteration loop
  while (!policyStable && iterations < maxIter) {
    iterations++;

    // === Policy Evaluation ===
    // Evaluate current policy until values converge
    let evalIterations = 0;
    const maxEvalIter = 100;

    while (evalIterations < maxEvalIter) {
      let evalDelta = 0;
      evalIterations++;

      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          const cell = state.grid.cells[row][col];

          // Skip walls and terminal states
          if (cell.isWall || cell.isTerminal) continue;

          const oldValue = cell.value;
          const policy = cell.policy;

          // Compute value following current policy
          let nextRow = row;
          let nextCol = col;

          if (policy === "up") nextRow = row - 1;
          else if (policy === "down") nextRow = row + 1;
          else if (policy === "left") nextCol = col - 1;
          else if (policy === "right") nextCol = col + 1;

          // Check bounds and walls
          if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) {
            // Out of bounds - stay in place
            cell.value = cell.reward + gamma * oldValue;
          } else {
            const nextCell = state.grid.cells[nextRow][nextCol];
            if (nextCell.isWall) {
              // Hit wall - stay in place
              cell.value = cell.reward + gamma * oldValue;
            } else {
              // Valid move
              cell.value = cell.reward + gamma * nextCell.value;
            }
          }

          evalDelta = Math.max(evalDelta, Math.abs(oldValue - cell.value));
        }
      }

      // Check if policy evaluation converged
      if (evalDelta < theta) break;
    }

    // Update stats
    state.mdp.result.iterations = iterations;
    state.mdp.result.maxDelta = evalIterations;
    mdpIterationsOutput.textContent = iterations;
    mdpMaxDeltaOutput.textContent = `${evalIterations} eval`;

    renderGrid();
    await pause();

    // === Policy Improvement ===
    policyStable = true;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = state.grid.cells[row][col];

        // Skip walls and terminal states
        if (cell.isWall || cell.isTerminal) continue;

        const oldPolicy = cell.policy;

        const actions = [
          { dir: "up", row: row - 1, col: col },
          { dir: "down", row: row + 1, col: col },
          { dir: "left", row: row, col: col - 1 },
          { dir: "right", row: row, col: col + 1 },
        ];

        let bestAction = null;
        let bestValue = -Infinity;

        // Find best action
        for (const action of actions) {
          const nextRow = action.row;
          const nextCol = action.col;

          let actionValue;

          // Check bounds
          if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) {
            actionValue = cell.reward + gamma * cell.value;
          } else {
            const nextCell = state.grid.cells[nextRow][nextCol];
            if (nextCell.isWall) {
              actionValue = cell.reward + gamma * cell.value;
            } else {
              actionValue = cell.reward + gamma * nextCell.value;
            }
          }

          if (actionValue > bestValue) {
            bestValue = actionValue;
            bestAction = action.dir;
          }
        }

        cell.policy = bestAction;

        // Check if policy changed
        if (oldPolicy !== bestAction) {
          policyStable = false;
        }
      }
    }

    renderGrid();
    await pause();
  }

  // Mark as converged
  state.mdp.result.converged = policyStable;
  mdpConvergedOutput.textContent = policyStable ? "Yes" : "No";

  renderGrid();
}

async function runPathfinding() {
  if (state.running) return;

  const algorithmKey = pathfindingAlgorithmSelect.value;
  const algorithm = pathfindingAlgorithms[algorithmKey];
  if (!algorithm) return;

  state.running = true;
  toggleControls(true);

  try {
    await algorithm.run();
  } finally {
    state.running = false;
    toggleControls(false);
  }
}

// MDP Functions
function resetMDPStats() {
  state.mdp.result = {
    converged: false,
    iterations: 0,
    maxDelta: Infinity,
    avgReward: 0,
    episodePath: []
  };
  mdpIterationsOutput.textContent = "0";
  mdpMaxDeltaOutput.textContent = "—";
  mdpConvergedOutput.textContent = "No";
  mdpAvgRewardOutput.textContent = "—";
}

function clearMDPRewards() {
  if (state.running) return;

  for (let row = 0; row < state.grid.size; row++) {
    for (let col = 0; col < state.grid.size; col++) {
      const cell = state.grid.cells[row][col];
      cell.reward = -1;
      cell.value = 0;
      cell.policy = null;
      cell.isTerminal = false;
      cell.isWall = false;
    }
  }

  resetMDPStats();
  renderGrid();
}

function randomizeMDPRewards() {
  if (state.running) return;

  clearMDPRewards();

  // Add some random goal states (high rewards)
  const numGoals = randomInt(1, 3);
  for (let i = 0; i < numGoals; i++) {
    const row = randomInt(0, state.grid.size - 1);
    const col = randomInt(0, state.grid.size - 1);
    const cell = state.grid.cells[row][col];
    cell.reward = randomInt(50, 100);
    cell.isTerminal = true;
  }

  // Add some random penalty states (negative rewards)
  const numPenalties = randomInt(2, 5);
  for (let i = 0; i < numPenalties; i++) {
    const row = randomInt(0, state.grid.size - 1);
    const col = randomInt(0, state.grid.size - 1);
    const cell = state.grid.cells[row][col];
    if (!cell.isTerminal) {
      cell.reward = randomInt(-50, -10);
    }
  }

  renderGrid();
}

function loadMDPScenario(scenarioKey) {
  if (state.running) return;

  clearMDPRewards();
  const size = state.grid.size;

  if (scenarioKey === "default") {
    // Simple grid with goal at bottom-right
    const goalCell = state.grid.cells[size - 1][size - 1];
    goalCell.reward = 100;
    goalCell.isTerminal = true;
  } else if (scenarioKey === "cliff") {
    // Cliff world: bottom row is penalty except start and goal
    const goalCell = state.grid.cells[size - 1][size - 1];
    goalCell.reward = 100;
    goalCell.isTerminal = true;

    for (let col = 1; col < size - 1; col++) {
      const cell = state.grid.cells[size - 1][col];
      cell.reward = -50;
      cell.isTerminal = true;
    }
  } else if (scenarioKey === "fourrooms") {
    // Create four rooms with walls and doorways
    const mid = Math.floor(size / 2);
    const doorOffset = Math.floor(size / 4); // Position doorways at quarter points

    // Vertical wall with two doorways (top and bottom halves)
    for (let row = 0; row < size; row++) {
      // Skip doorways at quarter and three-quarter points
      if (row !== doorOffset && row !== mid + doorOffset) {
        state.grid.cells[row][mid].isWall = true;
      }
    }

    // Horizontal wall with two doorways (left and right halves)
    for (let col = 0; col < size; col++) {
      // Skip doorways at quarter and three-quarter points
      if (col !== doorOffset && col !== mid + doorOffset) {
        state.grid.cells[mid][col].isWall = true;
      }
    }

    // Goal in one corner
    const goalCell = state.grid.cells[size - 1][size - 1];
    goalCell.reward = 100;
    goalCell.isTerminal = true;
    goalCell.isWall = false;
  } else if (scenarioKey === "custom") {
    // Leave empty for user to customize
  }

  renderGrid();
}

async function runMDP() {
  if (state.running) return;

  const algorithmKey = mdpAlgorithmSelect.value;
  const algorithm = mdpAlgorithms[algorithmKey];
  if (!algorithm) return;

  state.running = true;
  toggleControls(true);
  updateActionButtonState(true);

  try {
    await algorithm.run();
  } finally {
    state.running = false;
    toggleControls(false);
    updateActionButtonState(false);
  }
}

async function simulateEpisode() {
  if (state.running) return;
  if (!state.mdp.result.converged) {
    alert("Please run Value Iteration first to compute the policy!");
    return;
  }

  state.running = true;

  // Find a non-terminal, non-wall start position
  let startRow = 0;
  let startCol = 0;
  for (let row = 0; row < state.grid.size; row++) {
    for (let col = 0; col < state.grid.size; col++) {
      const cell = state.grid.cells[row][col];
      if (!cell.isWall && !cell.isTerminal) {
        startRow = row;
        startCol = col;
        break;
      }
    }
  }

  const path = [];
  let currentRow = startRow;
  let currentCol = startCol;
  const maxSteps = state.grid.size * state.grid.size; // Prevent infinite loops
  let steps = 0;

  while (steps < maxSteps) {
    const cell = state.grid.cells[currentRow][currentCol];
    path.push({ row: currentRow, col: currentCol });

    // Visualize current position
    renderGrid();
    const gridCells = gridContainer.querySelectorAll(".grid-cell");
    const index = currentRow * state.grid.size + currentCol;
    gridCells[index]?.classList.add("visiting");

    await pause();

    if (cell.isTerminal) {
      break;
    }

    const policy = cell.policy;
    if (!policy) break;

    // Move according to policy
    if (policy === "up" && currentRow > 0) currentRow--;
    else if (policy === "down" && currentRow < state.grid.size - 1) currentRow++;
    else if (policy === "left" && currentCol > 0) currentCol--;
    else if (policy === "right" && currentCol < state.grid.size - 1) currentCol++;
    else break; // No valid move

    // Check if next cell is wall
    if (state.grid.cells[currentRow][currentCol].isWall) {
      break;
    }

    steps++;
  }

  state.mdp.result.episodePath = path;
  state.running = false;

  // Highlight the path
  renderGrid();
  const gridCells = gridContainer.querySelectorAll(".grid-cell");
  path.forEach(({ row, col }) => {
    const index = row * state.grid.size + col;
    gridCells[index]?.classList.add("path");
  });
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
    mode !== "mdp" &&
    mode !== "pattern"
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
  mdpStatsSection.hidden = mode !== "mdp";
  if (patternStatsSection) {
    patternStatsSection.hidden = mode !== "pattern";
  }
  updateActionButtonState();
  updateRandomizeButtonState();

  // Update size slider for pathfinding and MDP modes
  if (mode === "pathfinding" || mode === "mdp") {
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
  invalidateLastRun();

  if (mode === "pathfinding" || mode === "mdp") {
    arrayContainer.hidden = true;
    gridContainer.hidden = false;
    if (patternContainer) {
      patternContainer.hidden = true;
      patternContainer.classList.remove("active");
    }
    if (state.grid.cells.length === 0) {
      generateGrid(state.grid.size);
    }
    // Load default scenario for MDP mode
    if (mode === "mdp") {
      loadMDPScenario(mdpScenarioSelect.value);
    }
  } else if (mode === "pattern") {
    arrayContainer.hidden = true;
    gridContainer.hidden = true;
    if (patternContainer) {
      patternContainer.hidden = false;
      patternContainer.classList.add("active");
    }
    renderPatternView();
    updatePatternStats();
  } else {
    arrayContainer.hidden = false;
    gridContainer.hidden = true;
    if (patternContainer) {
      patternContainer.hidden = true;
      patternContainer.classList.remove("active");
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
  } else if (mode === "searching") {
    key = searchAlgorithmSelect.value;
  } else if (mode === "pattern") {
    key = patternAlgorithmSelect.value;
  } else if (mode === "mdp") {
    key = mdpAlgorithmSelect.value;
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

if (patternAlgorithmSelect) {
  patternAlgorithmSelect.addEventListener("change", () => {
    if (state.running) {
      return;
    }
    invalidateLastRun();
    updateAlgorithmDetails(patternAlgorithmSelect.value, "pattern");
    resetPatternResults();
  });
}

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
  } else if (state.mode === "mdp") {
    randomizeMDPRewards();
  } else if (state.mode === "pattern") {
    randomizePatternSequence();
  } else {
    generateArray(Number(sizeInput.value));
  }
});

actionBtn.addEventListener("click", () => {
  if (state.mode === "sorting") {
    runSort();
  } else if (state.mode === "searching") {
    runSearch();
  } else if (state.mode === "pattern") {
    runPatternMatching();
  } else if (state.mode === "mdp") {
    runMDP();
  } else if (state.mode === "pathfinding") {
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

if (patternTextInput) {
  patternTextInput.addEventListener("input", () => {
    if (state.running) {
      return;
    }
    setPatternText(patternTextInput.value);
  });
}

if (patternPatternInput) {
  patternPatternInput.addEventListener("input", () => {
    if (state.running) {
      return;
    }
    setPatternNeedle(patternPatternInput.value);
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

// MDP Control Listeners
if (discountInput) {
  discountInput.addEventListener("input", () => {
    discountValue.textContent = Number(discountInput.value).toFixed(2);
    state.mdp.discount = Number(discountInput.value);
  });
}

if (thresholdInput) {
  thresholdInput.addEventListener("input", () => {
    thresholdValue.textContent = Number(thresholdInput.value).toFixed(3);
    state.mdp.threshold = Number(thresholdInput.value);
  });
}

if (maxIterationsInput) {
  maxIterationsInput.addEventListener("input", () => {
    maxIterationsValue.textContent = maxIterationsInput.value;
    state.mdp.maxIterations = Number(maxIterationsInput.value);
  });
}

if (mdpAlgorithmSelect) {
  mdpAlgorithmSelect.addEventListener("change", () => {
    if (state.running) return;
    invalidateLastRun();
    updateAlgorithmDetails(mdpAlgorithmSelect.value, "mdp");
    updateActionButtonState();
  });
}

if (mdpScenarioSelect) {
  mdpScenarioSelect.addEventListener("change", () => {
    if (state.running) return;
    loadMDPScenario(mdpScenarioSelect.value);
  });
}

if (clearRewardsBtn) {
  clearRewardsBtn.addEventListener("click", () => {
    clearMDPRewards();
  });
}

if (simulateEpisodeBtn) {
  simulateEpisodeBtn.addEventListener("click", () => {
    if (state.running) return;
    simulateEpisode();
  });
}

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
setPatternText(patternTextInput ? patternTextInput.value : DEFAULT_PATTERN_SEQUENCE);
setPatternNeedle(patternPatternInput ? patternPatternInput.value : DEFAULT_PATTERN_NEEDLE);
initializeDocTabs();
updateAlgorithmDetails(sortingAlgorithmSelect.value, "sorting");
resetSearchResult();
generateArray(Number(sizeInput.value));
setMode("sorting", { force: true });
