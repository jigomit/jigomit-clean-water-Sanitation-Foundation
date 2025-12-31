# Repository Guidelines

## Project Structure & Module Organization
The Vite-powered Vue app boots from `src/main.js`, global CSS sits in `src/style.css`, and routing is handled in `src/router/index.js`. Feature views belong in `src/views`, reusable UI in `src/components`, and shared logic in `src/composables`. Reference deterministic fixtures in `src/data`, and keep static media inside `src/assets`. Prefer the `@/` alias (for example `@/components/ImpactStats.vue`) so refactors do not break imports. Specs stay beside their component or inside `src/__tests__/`, and everything under `public/` ships verbatim—avoid manual edits to `dist/` because Vite regenerates it.

## Build, Test, and Development Commands
- `npm install` keeps dependencies synced whenever `package*.json` changes.
- `npm run dev` starts the Vite dev server; pass `-- --host` for LAN demos.
- `npm run build` produces the optimized bundle and surfaces syntax or type regressions.
- `npm run preview` serves the last build artifact for stakeholder smoke tests.
- `npx vitest` runs the tests interactively, while `npx vitest run --coverage` powers CI coverage checks.

## Coding Style & Naming Conventions
Single File Components use `<script setup>`, two-space indentation, and single quotes. Components stay PascalCase (`WaterHero.vue`), composables use camelCase prefixed with `use` (`useImpactStats`), and route names mirror the lowercase URL slug. Favor declarative props, avoid mutating incoming data, and hoist repeated logic into composables. Keep shared or responsive CSS in `src/style.css` and scope component-specific rules locally.

## Testing Guidelines
Vitest plus Vue Test Utils power the suite. Co-locate focused specs beside their component (for example `ImpactStats.spec.js`) and reserve `src/__tests__/` for broader router or flow specs. Target ≥80% coverage on shared utilities, lean on fixtures from `src/data`, stub remote calls, and run `npx vitest` during development. Before merging a release branch, capture `npx vitest run --coverage` output in the PR.

## Commit & Pull Request Guidelines
Follow Conventional Commits such as `feat: add donation CTA` or `fix: correct hero contrast`, and keep each commit scoped to related files. Pull requests should summarize context, link issues, include UI screenshots or recordings when visuals change, and note that `npm run build` plus the full Vitest suite passed. Document any new env vars with purpose, defaults, and rollout guidance.

## Security & Configuration Tips
Never commit credentials or API tokens. Store secrets inside `.env.local` (already git-ignored) and access them through `import.meta.env`. If a secret leaks, rotate it immediately, scrub references from history, and describe the mitigation steps in the release notes. Keep dependencies updated via Dependabot or manual audits to limit supply-chain risk.
