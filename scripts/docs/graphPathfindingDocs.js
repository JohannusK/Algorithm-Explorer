export const graphPathfindingDocs = {
  dijkstra: {
    pseudocode: `procedure dijkstra(start, goal):
  for each vertex v do
    dist[v] ← ∞
    parent[v] ← null
  dist[start] ← 0
  priorityQueue ← {(0, start)}
  while priorityQueue not empty do
    (cost, u) ← extract minimum
    if u = goal then break
    if cost > dist[u] then continue
    for each (v, weight) in neighbors(u) do
      alt ← dist[u] + weight
      if alt < dist[v] then
        dist[v] ← alt
        parent[v] ← u
        insert (alt, v) into priorityQueue
  return reconstruct_path(goal) if reachable`,
    implementations: {
      python: `import heapq

def dijkstra(graph, start, goal):
    dist = {start: 0.0}
    parent = {start: None}
    heap = [(0.0, start)]
    while heap:
        cost, node = heapq.heappop(heap)
        if node == goal:
            return reconstruct(parent, goal), cost
        if cost > dist.get(node, float("inf")):
            continue
        for neighbor, weight in graph[node]:
            alt = cost + weight
            if alt < dist.get(neighbor, float("inf")):
                dist[neighbor] = alt
                parent[neighbor] = node
                heapq.heappush(heap, (alt, neighbor))
    return None, float("inf")`,
      c: `typedef struct { int id; double cost; } PQEntry;

double dijkstra(int node_count, int start, int goal, const double adj[node_count][node_count], int parent[]) {
    double dist[node_count];
    int visited[node_count];
    for (int i = 0; i < node_count; ++i) {
        dist[i] = DBL_MAX;
        visited[i] = 0;
        parent[i] = -1;
    }
    dist[start] = 0.0;
    PQEntry heap[node_count];
    int size = 0;
    heap[size++] = (PQEntry){start, 0.0};
    while (size > 0) {
        int best = 0;
        for (int i = 1; i < size; ++i)
            if (heap[i].cost < heap[best].cost) best = i;
        PQEntry cur = heap[best];
        heap[best] = heap[--size];
        if (visited[cur.id]) continue;
        visited[cur.id] = 1;
        if (cur.id == goal) return dist[goal];
        for (int v = 0; v < node_count; ++v) {
            if (adj[cur.id][v] > 0) {
                double alt = dist[cur.id] + adj[cur.id][v];
                if (alt < dist[v]) {
                    dist[v] = alt;
                    parent[v] = cur.id;
                    heap[size++] = (PQEntry){v, alt};
                }
            }
        }
    }
    return DBL_MAX;
}`,
      rust: `use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Eq)]
struct State {
    cost: f64,
    node: usize,
}

impl Ord for State {
    fn cmp(&self, other: &Self) -> Ordering {
        other.cost.partial_cmp(&self.cost).unwrap_or(Ordering::Equal)
    }
}

impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for State {
    fn eq(&self, other: &Self) -> bool {
        self.node == other.node && (self.cost - other.cost).abs() < f64::EPSILON
    }
}

pub fn dijkstra(graph: &[Vec<(usize, f64)>], start: usize, goal: usize) -> Option<(Vec<usize>, f64)> {
    let mut dist = vec![f64::INFINITY; graph.len()];
    let mut parent = vec![None; graph.len()];
    let mut heap = BinaryHeap::new();
    dist[start] = 0.0;
    heap.push(State { cost: 0.0, node: start });
    while let Some(State { cost, node }) = heap.pop() {
        if node == goal {
            return Some((reconstruct_path(parent, goal), cost));
        }
        if cost > dist[node] {
            continue;
        }
        for &(neighbor, weight) in &graph[node] {
            let alt = cost + weight;
            if alt < dist[neighbor] {
                dist[neighbor] = alt;
                parent[neighbor] = Some(node);
                heap.push(State { cost: alt, node: neighbor });
            }
        }
    }
    None
}`,
      java: `public static PathResult dijkstra(Map<Integer, List<Edge>> graph, int start, int goal) {
    double[] dist = new double[graph.size()];
    Arrays.fill(dist, Double.POSITIVE_INFINITY);
    int[] parent = new int[graph.size()];
    Arrays.fill(parent, -1);
    PriorityQueue<State> pq = new PriorityQueue<>(Comparator.comparingDouble(s -> s.cost));
    dist[start] = 0.0;
    pq.add(new State(start, 0.0));
    while (!pq.isEmpty()) {
        State cur = pq.poll();
        if (cur.cost > dist[cur.node]) continue;
        if (cur.node == goal) {
            return new PathResult(reconstruct(parent, goal), dist[goal]);
        }
        for (Edge edge : graph.getOrDefault(cur.node, List.of())) {
            double alt = cur.cost + edge.weight;
            if (alt < dist[edge.to]) {
                dist[edge.to] = alt;
                parent[edge.to] = cur.node;
                pq.add(new State(edge.to, alt));
            }
        }
    }
    return PathResult.unreachable();
}`,
    },
  },
  astar: {
    pseudocode: `procedure A*(start, goal):
  for each vertex v do
    g[v] ← ∞
    parent[v] ← null
  g[start] ← 0
  open ← min-priority queue ordered by f = g + h
  open.add(start, h(start))
  while open not empty do
    u ← extract node with smallest f
    if u = goal then
      return reconstruct_path(goal)
    for each (v, weight) in neighbors(u) do
      tentative ← g[u] + weight
      if tentative < g[v] then
        g[v] ← tentative
        f[v] ← tentative + h(v)
        parent[v] ← u
        add/update v in open with priority f[v]
  return failure`,
    implementations: {
      python: `import heapq

def astar(graph, start, goal, heuristic):
    g_score = {start: 0.0}
    parent = {start: None}
    heap = [(heuristic(start), 0.0, start)]
    while heap:
        f_cost, g_cost, node = heapq.heappop(heap)
        if node == goal:
            return reconstruct(parent, goal), g_cost
        if g_cost > g_score.get(node, float("inf")):
            continue
        for neighbor, weight in graph[node]:
            tentative = g_cost + weight
            if tentative < g_score.get(neighbor, float("inf")):
                g_score[neighbor] = tentative
                parent[neighbor] = node
                heapq.heappush(heap, (tentative + heuristic(neighbor), tentative, neighbor))
    return None, float("inf")`,
      c: `typedef struct { int id; double g, f; } AStarNode;

double astar(int node_count, int start, int goal, const double adj[node_count][node_count], double (*heuristic)(int, int), int parent[]) {
    double g[node_count];
    for (int i = 0; i < node_count; ++i) {
        g[i] = DBL_MAX;
        parent[i] = -1;
    }
    AStarNode heap[node_count];
    int size = 0;
    g[start] = 0.0;
    heap[size++] = (AStarNode){start, 0.0, heuristic(start, goal)};
    while (size > 0) {
        int best = 0;
        for (int i = 1; i < size; ++i)
            if (heap[i].f < heap[best].f) best = i;
        AStarNode cur = heap[best];
        heap[best] = heap[--size];
        if (cur.id == goal) return g[goal];
        if (cur.g > g[cur.id]) continue;
        for (int v = 0; v < node_count; ++v) {
            if (adj[cur.id][v] > 0) {
                double tentative = cur.g + adj[cur.id][v];
                if (tentative < g[v]) {
                    g[v] = tentative;
                    parent[v] = cur.id;
                    double f = tentative + heuristic(v, goal);
                    heap[size++] = (AStarNode){v, tentative, f};
                }
            }
        }
    }
    return DBL_MAX;
}`,
      rust: `use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Eq)]
struct AStarState {
    f: f64,
    g: f64,
    node: usize,
}

impl Ord for AStarState {
    fn cmp(&self, other: &Self) -> Ordering {
        other.f.partial_cmp(&self.f).unwrap_or(Ordering::Equal)
    }
}

impl PartialOrd for AStarState {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for AStarState {
    fn eq(&self, other: &Self) -> bool {
        self.node == other.node && (self.f - other.f).abs() < f64::EPSILON
    }
}

pub fn astar(graph: &[Vec<(usize, f64)>], start: usize, goal: usize, heuristic: impl Fn(usize) -> f64) -> Option<(Vec<usize>, f64)> {
    let mut g = vec![f64::INFINITY; graph.len()];
    let mut parent = vec![None; graph.len()];
    let mut heap = BinaryHeap::new();
    g[start] = 0.0;
    heap.push(AStarState { f: heuristic(start), g: 0.0, node: start });
    while let Some(AStarState { f: _, g: cost, node }) = heap.pop() {
        if node == goal {
            return Some((reconstruct_path(parent, goal), cost));
        }
        if cost > g[node] {
            continue;
        }
        for &(neighbor, weight) in &graph[node] {
            let tentative = cost + weight;
            if tentative < g[neighbor] {
                g[neighbor] = tentative;
                parent[neighbor] = Some(node);
                heap.push(AStarState { f: tentative + heuristic(neighbor), g: tentative, node: neighbor });
            }
        }
    }
    None
}`,
      java: `public static PathResult aStar(Map<Integer, List<Edge>> graph, int start, int goal, ToDoubleFunction<Integer> heuristic) {
    double[] g = new double[graph.size()];
    Arrays.fill(g, Double.POSITIVE_INFINITY);
    int[] parent = new int[graph.size()];
    Arrays.fill(parent, -1);
    PriorityQueue<State> pq = new PriorityQueue<>(Comparator.comparingDouble(s -> s.cost));
    g[start] = 0.0;
    pq.add(new State(start, heuristic.applyAsDouble(start), 0.0));
    while (!pq.isEmpty()) {
        State cur = pq.poll();
        if (cur.node == goal) {
            return new PathResult(reconstruct(parent, goal), cur.g);
        }
        if (cur.g > g[cur.node]) continue;
        for (Edge edge : graph.getOrDefault(cur.node, List.of())) {
            double tentative = cur.g + edge.weight;
            if (tentative < g[edge.to]) {
                g[edge.to] = tentative;
                parent[edge.to] = cur.node;
                double f = tentative + heuristic.applyAsDouble(edge.to);
                pq.add(new State(edge.to, f, tentative));
            }
        }
    }
    return PathResult.unreachable();
}`,
    },
  },
};
