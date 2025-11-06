export const gridPathfindingDocs = {
  bfs: {
    pseudocode: `procedure BFS(start, goal):
  create queue Q and enqueue start
  mark start as visited
  while Q not empty do
    current ← dequeue Q
    if current = goal then
      return reconstruct_path(current)
    for each neighbor of current do
      if neighbor not visited and not blocked then
        mark neighbor visited
        neighbor.parent ← current
        enqueue neighbor
  return failure`,
    implementations: {
      python: `from collections import deque

def bfs(grid, start, goal):
    queue = deque([start])
    visited = {start}
    parent = {start: None}
    while queue:
        row, col = queue.popleft()
        if (row, col) == goal:
            return reconstruct(parent, goal)
        for nr, nc in neighbors(grid, row, col):
            if (nr, nc) not in visited:
                visited.add((nr, nc))
                parent[(nr, nc)] = (row, col)
                queue.append((nr, nc))
    return None`,
      c: `typedef struct { int r, c; } Node;

int bfs(int rows, int cols, int start_r, int start_c, int goal_r, int goal_c, int grid[rows][cols], Node parent[rows][cols]) {
    Node queue[rows * cols];
    int front = 0, back = 0;
    int visited[rows][cols];
    memset(visited, 0, sizeof(visited));
    queue[back++] = (Node){start_r, start_c};
    visited[start_r][start_c] = 1;
    parent[start_r][start_c] = (Node){-1, -1};
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    while (front < back) {
        Node cur = queue[front++];
        if (cur.r == goal_r && cur.c == goal_c) {
            return 1;
        }
        for (int d = 0; d < 4; ++d) {
            int nr = cur.r + dirs[d][0];
            int nc = cur.c + dirs[d][1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc] && !visited[nr][nc]) {
                visited[nr][nc] = 1;
                parent[nr][nc] = cur;
                queue[back++] = (Node){nr, nc};
            }
        }
    }
    return 0;
}`,
      rust: `use std::collections::VecDeque;

pub fn bfs(grid: &[Vec<bool>], start: (usize, usize), goal: (usize, usize)) -> Option<Vec<(usize, usize)>> {
    let rows = grid.len();
    let cols = grid[0].len();
    let mut queue = VecDeque::new();
    let mut visited = vec![vec![false; cols]; rows];
    let mut parent = vec![vec![None; cols]; rows];
    queue.push_back(start);
    visited[start.0][start.1] = true;
    let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    while let Some((r, c)) = queue.pop_front() {
        if (r, c) == goal {
            return Some(reconstruct_path(parent, goal));
        }
        for (dr, dc) in dirs {
            let nr = r as isize + dr;
            let nc = c as isize + dc;
            if nr >= 0 && nr < rows as isize && nc >= 0 && nc < cols as isize {
                let (ur, uc) = (nr as usize, nc as usize);
                if !grid[ur][uc] && !visited[ur][uc] {
                    visited[ur][uc] = true;
                    parent[ur][uc] = Some((r, c));
                    queue.push_back((ur, uc));
                }
            }
        }
    }
    None
}`,
      java: `public static List<Point> bfs(boolean[][] walls, Point start, Point goal) {
    int rows = walls.length;
    int cols = walls[0].length;
    boolean[][] visited = new boolean[rows][cols];
    Point[][] parent = new Point[rows][cols];
    ArrayDeque<Point> queue = new ArrayDeque<>();
    queue.add(start);
    visited[start.row][start.col] = true;
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!queue.isEmpty()) {
        Point cur = queue.removeFirst();
        if (cur.equals(goal)) {
            return reconstruct(parent, goal);
        }
        for (int[] d : dirs) {
            int nr = cur.row + d[0];
            int nc = cur.col + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls[nr][nc] && !visited[nr][nc]) {
                visited[nr][nc] = true;
                parent[nr][nc] = cur;
                queue.addLast(new Point(nr, nc));
            }
        }
    }
    return Collections.emptyList();
}`,
    },
  },
  dfs: {
    pseudocode: `procedure DFS(start, goal):
  push start onto stack
  mark start as visited
  while stack not empty do
    current ← pop stack
    if current = goal then
      return reconstruct_path(current)
    for each neighbor of current do
      if neighbor not visited and not blocked then
        mark neighbor visited
        neighbor.parent ← current
        push neighbor onto stack
  return failure`,
    implementations: {
      python: `def dfs(grid, start, goal):
    stack = [start]
    visited = {start}
    parent = {start: None}
    while stack:
        row, col = stack.pop()
        if (row, col) == goal:
            return reconstruct(parent, goal)
        for nr, nc in neighbors(grid, row, col):
            if (nr, nc) not in visited:
                visited.add((nr, nc))
                parent[(nr, nc)] = (row, col)
                stack.append((nr, nc))
    return None`,
      c: `int dfs(int rows, int cols, int start_r, int start_c, int goal_r, int goal_c, int grid[rows][cols], Node parent[rows][cols]) {
    Node stack[rows * cols];
    int top = 0;
    int visited[rows][cols];
    memset(visited, 0, sizeof(visited));
    stack[top++] = (Node){start_r, start_c};
    visited[start_r][start_c] = 1;
    parent[start_r][start_c] = (Node){-1, -1};
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    while (top) {
        Node cur = stack[--top];
        if (cur.r == goal_r && cur.c == goal_c) return 1;
        for (int d = 0; d < 4; ++d) {
            int nr = cur.r + dirs[d][0];
            int nc = cur.c + dirs[d][1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc] && !visited[nr][nc]) {
                visited[nr][nc] = 1;
                parent[nr][nc] = cur;
                stack[top++] = (Node){nr, nc};
            }
        }
    }
    return 0;
}`,
      rust: `pub fn dfs(grid: &[Vec<bool>], start: (usize, usize), goal: (usize, usize)) -> Option<Vec<(usize, usize)>> {
    let rows = grid.len();
    let cols = grid[0].len();
    let mut stack = Vec::new();
    let mut visited = vec![vec![false; cols]; rows];
    let mut parent = vec![vec![None; cols]; rows];
    stack.push(start);
    visited[start.0][start.1] = true;
    let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    while let Some((r, c)) = stack.pop() {
        if (r, c) == goal {
            return Some(reconstruct_path(parent, goal));
        }
        for (dr, dc) in dirs {
            let nr = r as isize + dr;
            let nc = c as isize + dc;
            if nr >= 0 && nr < rows as isize && nc >= 0 && nc < cols as isize {
                let (ur, uc) = (nr as usize, nc as usize);
                if !grid[ur][uc] && !visited[ur][uc] {
                    visited[ur][uc] = true;
                    parent[ur][uc] = Some((r, c));
                    stack.push((ur, uc));
                }
            }
        }
    }
    None
}`,
      java: `public static List<Point> dfs(boolean[][] walls, Point start, Point goal) {
    int rows = walls.length, cols = walls[0].length;
    boolean[][] visited = new boolean[rows][cols];
    Point[][] parent = new Point[rows][cols];
    ArrayDeque<Point> stack = new ArrayDeque<>();
    stack.push(start);
    visited[start.row][start.col] = true;
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!stack.isEmpty()) {
        Point cur = stack.pop();
        if (cur.equals(goal)) {
            return reconstruct(parent, goal);
        }
        for (int[] d : dirs) {
            int nr = cur.row + d[0];
            int nc = cur.col + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls[nr][nc] && !visited[nr][nc]) {
                visited[nr][nc] = true;
                parent[nr][nc] = cur;
                stack.push(new Point(nr, nc));
            }
        }
    }
    return Collections.emptyList();
}`,
    },
  },
  dijkstra: {
    pseudocode: `procedure dijkstra(start, goal):
  for each node v do
    dist[v] ← ∞
    parent[v] ← null
  dist[start] ← 0
  Q ← all nodes
  while Q not empty do
    u ← node in Q with minimal dist[u]
    remove u from Q
    if u = goal then break
    for each neighbor v of u do
      alt ← dist[u] + cost(u, v)
      if alt < dist[v] then
        dist[v] ← alt
        parent[v] ← u
  return reconstruct_path(goal) if goal reached`,
    implementations: {
      python: `import heapq

def dijkstra(grid, start, goal):
    rows, cols = len(grid), len(grid[0])
    dist = {start: 0}
    parent = {start: None}
    heap = [(0, start)]
    while heap:
        cost, node = heapq.heappop(heap)
        if node == goal:
            return reconstruct(parent, goal)
        if cost > dist.get(node, float("inf")):
            continue
        for neighbor in neighbors(grid, *node):
            alt = cost + 1
            if alt < dist.get(neighbor, float("inf")):
                dist[neighbor] = alt
                parent[neighbor] = node
                heapq.heappush(heap, (alt, neighbor))
    return None`,
      c: `typedef struct { int r, c, dist; } Entry;

int dijkstra(int rows, int cols, int start_r, int start_c, int goal_r, int goal_c, int grid[rows][cols], Node parent[rows][cols]) {
    int dist[rows][cols];
    for (int r = 0; r < rows; ++r)
        for (int c = 0; c < cols; ++c)
            dist[r][c] = INT_MAX;
    dist[start_r][start_c] = 0;
    parent[start_r][start_c] = (Node){-1, -1};
    Entry heap[rows * cols];
    int size = 0;
    heap[size++] = (Entry){start_r, start_c, 0};
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    while (size > 0) {
        int min_idx = 0;
        for (int i = 1; i < size; ++i)
            if (heap[i].dist < heap[min_idx].dist) min_idx = i;
        Entry cur = heap[min_idx];
        heap[min_idx] = heap[--size];
        if (cur.r == goal_r && cur.c == goal_c) return 1;
        if (cur.dist > dist[cur.r][cur.c]) continue;
        for (int d = 0; d < 4; ++d) {
            int nr = cur.r + dirs[d][0];
            int nc = cur.c + dirs[d][1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc]) {
                int alt = cur.dist + 1;
                if (alt < dist[nr][nc]) {
                    dist[nr][nc] = alt;
                    parent[nr][nc] = (Node){cur.r, cur.c};
                    heap[size++] = (Entry){nr, nc, alt};
                }
            }
        }
    }
    return 0;
}`,
      rust: `use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Eq)]
struct State {
    cost: usize,
    position: (usize, usize),
}

impl Ord for State {
    fn cmp(&self, other: &Self) -> Ordering {
        other.cost.cmp(&self.cost)
    }
}

impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for State {
    fn eq(&self, other: &Self) -> bool {
        self.cost == other.cost && self.position == other.position
    }
}

pub fn dijkstra(grid: &[Vec<bool>], start: (usize, usize), goal: (usize, usize)) -> Option<Vec<(usize, usize)>> {
    let rows = grid.len();
    let cols = grid[0].len();
    let mut dist = vec![vec![usize::MAX; cols]; rows];
    let mut parent = vec![vec![None; cols]; rows];
    let mut heap = BinaryHeap::new();
    dist[start.0][start.1] = 0;
    heap.push(State { cost: 0, position: start });
    let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    while let Some(State { cost, position }) = heap.pop() {
        if position == goal {
            return Some(reconstruct_path(parent, goal));
        }
        if cost > dist[position.0][position.1] {
            continue;
        }
        for (dr, dc) in dirs {
            let nr = position.0 as isize + dr;
            let nc = position.1 as isize + dc;
            if nr >= 0 && nr < rows as isize && nc >= 0 && nc < cols as isize {
                let (ur, uc) = (nr as usize, nc as usize);
                if grid[ur][uc] {
                    continue;
                }
                let next_cost = cost + 1;
                if next_cost < dist[ur][uc] {
                    dist[ur][uc] = next_cost;
                    parent[ur][uc] = Some(position);
                    heap.push(State { cost: next_cost, position: (ur, uc) });
                }
            }
        }
    }
    None
}`,
      java: `public static List<Point> dijkstra(boolean[][] walls, Point start, Point goal) {
    int rows = walls.length, cols = walls[0].length;
    int[][] dist = new int[rows][cols];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    Point[][] parent = new Point[rows][cols];
    PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.cost));
    dist[start.row][start.col] = 0;
    pq.add(new Node(start, 0));
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!pq.isEmpty()) {
        Node cur = pq.poll();
        if (cur.point.equals(goal)) {
            return reconstruct(parent, goal);
        }
        if (cur.cost > dist[cur.point.row][cur.point.col]) continue;
        for (int[] d : dirs) {
            int nr = cur.point.row + d[0];
            int nc = cur.point.col + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls[nr][nc]) {
                int next = cur.cost + 1;
                if (next < dist[nr][nc]) {
                    dist[nr][nc] = next;
                    parent[nr][nc] = cur.point;
                    pq.add(new Node(new Point(nr, nc), next));
                }
            }
        }
    }
    return Collections.emptyList();
}`,
    },
  },
  astar: {
    pseudocode: `procedure A*(start, goal):
  open ← min-priority queue ordered by f = g + h
  g[start] ← 0
  h[start] ← heuristic(start, goal)
  open.add(start)
  while open not empty do
    current ← pop node with smallest f
    if current = goal then
      return reconstruct_path(current)
    for each neighbor of current do
      tentativeG ← g[current] + cost(current, neighbor)
      if tentativeG < g[neighbor] then
        parent[neighbor] ← current
        g[neighbor] ← tentativeG
        f[neighbor] ← tentativeG + heuristic(neighbor, goal)
        if neighbor not in open then add neighbor
  return failure`,
    implementations: {
      python: `import heapq

def astar(grid, start, goal):
    def h(a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])

    open_set = [(h(start, goal), 0, start)]
    g_score = {start: 0}
    parent = {start: None}
    while open_set:
        _, cost, node = heapq.heappop(open_set)
        if node == goal:
            return reconstruct(parent, goal)
        if cost > g_score.get(node, float("inf")):
            continue
        for neighbor in neighbors(grid, *node):
            tentative = g_score[node] + 1
            if tentative < g_score.get(neighbor, float("inf")):
                g_score[neighbor] = tentative
                parent[neighbor] = node
                heapq.heappush(open_set, (tentative + h(neighbor, goal), tentative, neighbor))
    return None`,
      c: `typedef struct { int r, c; } Node;
typedef struct { int f, g; Node pos; } AstEntry;

int astar(int rows, int cols, int start_r, int start_c, int goal_r, int goal_c, int grid[rows][cols], Node parent[rows][cols]) {
    int g[rows][cols];
    for (int r = 0; r < rows; ++r)
        for (int c = 0; c < cols; ++c)
            g[r][c] = INT_MAX;
    AstEntry heap[rows * cols];
    int size = 0;
    g[start_r][start_c] = 0;
    parent[start_r][start_c] = (Node){-1, -1};
    int h_start = abs(start_r - goal_r) + abs(start_c - goal_c);
    heap[size++] = (AstEntry){h_start, 0, (Node){start_r, start_c}};
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    while (size > 0) {
        int best = 0;
        for (int i = 1; i < size; ++i)
            if (heap[i].f < heap[best].f) best = i;
        AstEntry cur = heap[best];
        heap[best] = heap[--size];
        if (cur.pos.r == goal_r && cur.pos.c == goal_c) return 1;
        if (cur.g > g[cur.pos.r][cur.pos.c]) continue;
        for (int d = 0; d < 4; ++d) {
            int nr = cur.pos.r + dirs[d][0];
            int nc = cur.pos.c + dirs[d][1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc]) {
                int tentative = cur.g + 1;
                if (tentative < g[nr][nc]) {
                    g[nr][nc] = tentative;
                    parent[nr][nc] = cur.pos;
                    int f = tentative + abs(nr - goal_r) + abs(nc - goal_c);
                    heap[size++] = (AstEntry){f, tentative, (Node){nr, nc}};
                }
            }
        }
    }
    return 0;
}`,
      rust: `use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Eq)]
struct AStarState {
    f: usize,
    g: usize,
    node: (usize, usize),
}

impl Ord for AStarState {
    fn cmp(&self, other: &Self) -> Ordering {
        other.f.cmp(&self.f).then_with(|| other.g.cmp(&self.g))
    }
}

impl PartialOrd for AStarState {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for AStarState {
    fn eq(&self, other: &Self) -> bool {
        self.f == other.f && self.node == other.node
    }
}

pub fn astar(grid: &[Vec<bool>], start: (usize, usize), goal: (usize, usize)) -> Option<Vec<(usize, usize)>> {
    let rows = grid.len();
    let cols = grid[0].len();
    let mut g_score = vec![vec![usize::MAX; cols]; rows];
    let mut parent = vec![vec![None; cols]; rows];
    let mut heap = BinaryHeap::new();
    g_score[start.0][start.1] = 0;
    heap.push(AStarState { f: manhattan(start, goal), g: 0, node: start });
    let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    while let Some(AStarState { f: _, g, node }) = heap.pop() {
        if node == goal {
            return Some(reconstruct_path(parent, goal));
        }
        if g > g_score[node.0][node.1] {
            continue;
        }
        for (dr, dc) in dirs {
            let nr = node.0 as isize + dr;
            let nc = node.1 as isize + dc;
            if nr >= 0 && nr < rows as isize && nc >= 0 && nc < cols as isize {
                let (ur, uc) = (nr as usize, nc as usize);
                if grid[ur][uc] {
                    continue;
                }
                let tentative = g + 1;
                if tentative < g_score[ur][uc] {
                    g_score[ur][uc] = tentative;
                    parent[ur][uc] = Some(node);
                    let f = tentative + manhattan((ur, uc), goal);
                    heap.push(AStarState { f, g: tentative, node: (ur, uc) });
                }
            }
        }
    }
    None
}

fn manhattan(a: (usize, usize), b: (usize, usize)) -> usize {
    (a.0 as isize - b.0 as isize).abs() as usize + (a.1 as isize - b.1 as isize).abs() as usize
}`,
      java: `public static List<Point> aStar(boolean[][] walls, Point start, Point goal) {
    int rows = walls.length, cols = walls[0].length;
    int[][] g = new int[rows][cols];
    for (int[] row : g) Arrays.fill(row, Integer.MAX_VALUE);
    Point[][] parent = new Point[rows][cols];
    PriorityQueue<Node> open = new PriorityQueue<>(Comparator.comparingInt(n -> n.cost));
    g[start.row][start.col] = 0;
    open.add(new Node(start, heuristic(start, goal), 0));
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!open.isEmpty()) {
        Node cur = open.poll();
        if (cur.point.equals(goal)) {
            return reconstruct(parent, goal);
        }
        if (cur.g > g[cur.point.row][cur.point.col]) continue;
        for (int[] d : dirs) {
            int nr = cur.point.row + d[0];
            int nc = cur.point.col + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls[nr][nc]) {
                int tentative = cur.g + 1;
                if (tentative < g[nr][nc]) {
                    g[nr][nc] = tentative;
                    parent[nr][nc] = cur.point;
                    int f = tentative + heuristic(new Point(nr, nc), goal);
                    open.add(new Node(new Point(nr, nc), f, tentative));
                }
            }
        }
    }
    return Collections.emptyList();
}`,
    },
  },
  greedy: {
    pseudocode: `procedure greedyBestFirst(start, goal):
  open ← min-priority queue ordered by h
  open.add(start)
  mark start visited
  while open not empty do
    current ← pop node with smallest heuristic to goal
    if current = goal then
      return reconstruct_path(current)
    for each neighbor of current do
      if neighbor not visited and not blocked then
        mark neighbor visited
        neighbor.parent ← current
        open.add(neighbor)
  return failure`,
    implementations: {
      python: `import heapq

def greedy_best_first(grid, start, goal):
    def h(a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])

    open_set = [(h(start, goal), start)]
    visited = {start}
    parent = {start: None}
    while open_set:
        _, node = heapq.heappop(open_set)
        if node == goal:
            return reconstruct(parent, goal)
        for neighbor in neighbors(grid, *node):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = node
                heapq.heappush(open_set, (h(neighbor, goal), neighbor))
    return None`,
      c: `typedef struct { int r, c, heuristic; } GreedyNode;

int greedy_best_first(int rows, int cols, int start_r, int start_c, int goal_r, int goal_c, int grid[rows][cols], Node parent[rows][cols]) {
    int visited[rows][cols];
    memset(visited, 0, sizeof(visited));
    GreedyNode heap[rows * cols];
    int size = 0;
    parent[start_r][start_c] = (Node){-1, -1};
    heap[size++] = (GreedyNode){start_r, start_c, abs(start_r - goal_r) + abs(start_c - goal_c)};
    visited[start_r][start_c] = 1;
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    while (size > 0) {
        int best = 0;
        for (int i = 1; i < size; ++i)
            if (heap[i].heuristic < heap[best].heuristic) best = i;
        GreedyNode cur = heap[best];
        heap[best] = heap[--size];
        if (cur.r == goal_r && cur.c == goal_c) return 1;
        for (int d = 0; d < 4; ++d) {
            int nr = cur.r + dirs[d][0];
            int nc = cur.c + dirs[d][1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc] && !visited[nr][nc]) {
                visited[nr][nc] = 1;
                parent[nr][nc] = (Node){cur.r, cur.c};
                int h = abs(nr - goal_r) + abs(nc - goal_c);
                heap[size++] = (GreedyNode){nr, nc, h};
            }
        }
    }
    return 0;
}`,
      rust: `use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Eq)]
struct GreedyState {
    heuristic: usize,
    node: (usize, usize),
}

impl Ord for GreedyState {
    fn cmp(&self, other: &Self) -> Ordering {
        other.heuristic.cmp(&self.heuristic)
    }
}

impl PartialOrd for GreedyState {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for GreedyState {
    fn eq(&self, other: &Self) -> bool {
        self.node == other.node
    }
}

pub fn greedy_best_first(grid: &[Vec<bool>], start: (usize, usize), goal: (usize, usize)) -> Option<Vec<(usize, usize)>> {
    let rows = grid.len();
    let cols = grid[0].len();
    let mut visited = vec![vec![false; cols]; rows];
    let mut parent = vec![vec![None; cols]; rows];
    let mut heap = BinaryHeap::new();
    heap.push(GreedyState { heuristic: manhattan(start, goal), node: start });
    visited[start.0][start.1] = true;
    let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    while let Some(GreedyState { node, .. }) = heap.pop() {
        if node == goal {
            return Some(reconstruct_path(parent, goal));
        }
        for (dr, dc) in dirs {
            let nr = node.0 as isize + dr;
            let nc = node.1 as isize + dc;
            if nr >= 0 && nr < rows as isize && nc >= 0 && nc < cols as isize {
                let (ur, uc) = (nr as usize, nc as usize);
                if !grid[ur][uc] && !visited[ur][uc] {
                    visited[ur][uc] = true;
                    parent[ur][uc] = Some(node);
                    heap.push(GreedyState { heuristic: manhattan((ur, uc), goal), node: (ur, uc) });
                }
            }
        }
    }
    None
}

fn manhattan(a: (usize, usize), b: (usize, usize)) -> usize {
    (a.0 as isize - b.0 as isize).abs() as usize + (a.1 as isize - b.1 as isize).abs() as usize
}`,
      java: `public static List<Point> greedyBestFirst(boolean[][] walls, Point start, Point goal) {
    int rows = walls.length, cols = walls[0].length;
    boolean[][] visited = new boolean[rows][cols];
    Point[][] parent = new Point[rows][cols];
    PriorityQueue<Node> open = new PriorityQueue<>(Comparator.comparingInt(n -> n.cost));
    open.add(new Node(start, heuristic(start, goal), 0));
    visited[start.row][start.col] = true;
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    while (!open.isEmpty()) {
        Node cur = open.poll();
        if (cur.point.equals(goal)) {
            return reconstruct(parent, goal);
        }
        for (int[] d : dirs) {
            int nr = cur.point.row + d[0];
            int nc = cur.point.col + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls[nr][nc] && !visited[nr][nc]) {
                visited[nr][nc] = true;
                parent[nr][nc] = cur.point;
                open.add(new Node(new Point(nr, nc), heuristic(new Point(nr, nc), goal), 0));
            }
        }
    }
    return Collections.emptyList();
}`,
    },
  },
};
