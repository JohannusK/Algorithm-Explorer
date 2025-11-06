# Repository Guidelines

## Project Structure & Module Organization
Algorithm-Explorer is a static web app served from `index.html` with shared styling in `styles.css`. UI state management lives in `script.js`, while richer logic is in `scripts/`. `scripts/main.js` wires UI controls to domain modules. Algorithms are grouped under `scripts/algorithms/<domain>/<algorithm>.js` (e.g., `scripts/algorithms/searching/binarySearch.js`), with shared docs in `scripts/docs/*.js`. Add assets, mock data, or diagrams beside the feature that uses them to keep lookups predictable.

## Build, Test, and Development Commands
The project runs without a bundler; browsers load ES modules directly. Use a static server to avoid CORS issues: `npx http-server .` or `python3 -m http.server 5173` from the repo root. When hacking frequently, watch for console warnings and keep DevTools open; they are our de facto build validation.

## Coding Style & Naming Conventions
JavaScript files use ES module syntax with two-space indentation and trailing commas only where necessary. Keep algorithm exports named `somethingSort`/`Search`/`Path` to align with lookup keys in `index.js`. Prefer `const` and pure functions; mutate shared `state` via helper functions already defined in `script.js` or `scripts/main.js`. File names stay camelCase, docs follow `<domain>Docs.js`.

## Testing Guidelines
Automated tests are not yet wired up. Smoke-test changes by running the static server, switching between Sorting, Searching, Grid Pathfinding, Graph Pathfinding, and MDP tabs, and confirming counters update. For new algorithms, add a lightweight scenario in the appropriate docs file and verify complexity metrics render. If you add a test runner, document the command here and aim for meaningful scenario coverage rather than raw percentage.

## Commit & Pull Request Guidelines
Recent commits use concise, imperative summaries (e.g., "Add Policy Iteration algorithm"). Follow that format and group related changes together. For PRs, include: 1) a short problem statement, 2) screenshots or GIFs for UI tweaks, 3) steps to reproduce and validate locally, and 4) linked issues or TODO references. Note any follow-up work so reviewers can triage quickly.

## Agent Workflow Tips
When introducing a new algorithm, update the relevant entry in `scripts/docs` with `pseudocode` and sample implementations so the UI tooltips stay accurate. Keep data-generation utilities near their consumers; for example, pathfinding grid helpers live under `scripts/algorithms/pathfinding/grid`. Use TODO comments sparingly and prefix with owner initials if the work must be tracked.
