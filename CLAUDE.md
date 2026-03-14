# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build step required. Open `index.html` directly in a browser, or serve it with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

This is a zero-dependency, single-page static app that visualizes Merkle trees in the browser.

**Data flow:**
1. User enters text + chunk size in `index.html`
2. `merkle-tree.js` → `getChunksFromData()` splits text into N chunks using Underscore's `_.chunk`
3. `tree-construct.js` → `convertToNodeList()` SHA-1 hashes each chunk into leaf `Node` objects
4. `tree-construct.js` → `constructTree()` recursively pairs nodes bottom-up, computing parent hashes as `sha1(leftHash + rightHash)` until a single root remains
5. Each `Node.toString()` serializes to the Treant.js config format (nested `{text, HTMLclass, children}` objects)
6. `merkle-tree.js` → `initConstructTree()` passes the config to `new Treant(chart_config)` for SVG rendering via Raphael.js

**Key files:**
- [index.html](index.html) — UI shell; loads all scripts and CDN dependencies
- [merkle-tree.js](merkle-tree.js) — entry point wired to the button; handles chunking and Treant initialization
- [tree-construct.js](tree-construct.js) — pure tree logic: `Node` class, `constructTree`, `convertToNodeList`, `getParentNodeHash`
- [tree-viz/](tree-viz/) — vendored Treant.js library (tree rendering) + Raphael.js (SVG)

**External CDN dependencies** (loaded in `index.html`):
- `js-sha1` — hashing
- `underscore.js` — `_.chunk` utility
- `jquery` — DOM access
- Treant.js — tree visualization (vendored in `tree-viz/`)

## Odd Behavior to Know

`getChunksFromData` uses `Math.floor(data.length / chunkSize) + 1` as the chunk size (not `chunkSize` itself) — so the "chunk size" input is actually the *number of chunks*, not their size.

When a node has only one child (odd number at a level), `constructTree` duplicates its hash upward without hashing a pair.
