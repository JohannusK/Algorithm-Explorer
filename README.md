# Algorithm-Explorer

Algorithm-Explorer is a browser-based playground for sorting, searching, pathfinding, MDP/RL, and pattern-matching algorithms. Each domain shares the same layout: configuration controls, a live visualization, stats, a growth/complexity panel, and inline documentation tabs (pseudocode plus Python/C/Java snippets). The Pattern Matching tab demonstrates naive string search on DNA-like sequences, highlighting the current window and confirmed matches in real time.

## Project Structure
- `index.html`, `styles.css`, `script.js` – UI shell, theming, and application logic.
- `scripts/algorithms/<domain>/` – modular algorithm definitions (sorting, searching, pathfinding, etc.).
- `scripts/docs/*` – structured documentation consumed by the inline “Reference” block.
- `AGENTS.md` – contributor workflow, testing expectations, and doc-writing tips.

## Running Locally
Serve the project via any static server to avoid CORS issues:
```bash
npx http-server .
# or
python3 -m http.server 5173
```
Open the reported URL in a browser and interact with the tabs. Keep DevTools open to catch console warnings while experimenting.

## Key Features
- **Sorting & Searching**: Dataset generators, scenario presets, per-op stats, and growth estimates tied to the latest run.
- **Pattern Matching**: DNA sequence + pattern inputs, randomizer, naive matcher with animated highlights, and comparison/match counters.
- **Pathfinding & MDP**: Grid visualizers, maze/value iteration tooling, and scenario dropdowns.
- **Inline Documentation**: Default view shows pseudocode; toggle language pills to see sample implementations. Disabled pills indicate missing snippets.

## Extending
1. Drop the implementation into `scripts/algorithms/<domain>/`.
2. Add doc entries (pseudocode + snippets) to `documentationCatalog` or the respective `scripts/docs/*.js`.
3. Extend `complexityCatalog` so the growth widget stays accurate.
4. If introducing a new domain, mirror the pattern-matching setup: state slice, stats outputs, render helpers, and controls in `index.html`.

Quick sanity check before committing:
```bash
node --check script.js
```
