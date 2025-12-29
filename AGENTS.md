# Repository Guidelines

## Project Structure & Module Organization
The Vite-powered Vue app boots from `src/main.js`, keeps global styles in `src/style.css`, and handles routing via `src/router/index.js`. Views stay in `src/views`, reusable UI components in `src/components`, and shared logic in `src/composables`. Store fixtures under `src/data`, media in `src/assets`, and lean on the `@/` alias (for example `@/components/ImpactStats.vue`) to avoid brittle relative paths. Specs live beside components (e.g., `ImpactStats.spec.js`) or inside `src/__tests__/` for broader flows. Files in `public/` publish verbatim, while `dist/` is generated output that should never be edited.

## Build, Test, and Development Commands
- `npm install` — synchronize dependencies after editing `package*.json`.
- `npm run dev` — start the Vite dev server; append `-- --host` to expose on LAN.
- `npm run build` — generate the optimized bundle and catch syntax or type regressions.
- `npm run preview` — serve the latest build artifact for stakeholder smoke tests.
- `npx vitest` / `npx vitest run --coverage` — run suites interactively or in CI with coverage reporting.

## Coding Style & Naming Conventions
Single File Components use `<script setup>`, two-space indentation, and single quotes. Components remain PascalCase (`WaterHero.vue`), composables use camelCase prefixed with `use` (`useImpactStats`), and route names mirror lowercase URLs. Keep shared or responsive CSS inside `src/style.css`; scope component-specific rules locally. Favor declarative props, avoid mutating incoming data, and lift repeated logic into helpers or composables.

## Testing Guidelines
Vitest with Vue Test Utils underpins the suites. Co-locate behavior-driven specs with their components or use `src/__tests__/` for flows spanning routes and composables. Maintain ≥80% coverage for shared utilities and lean on `src/data` fixtures to keep assertions deterministic. Run `npx vitest` during development and `npx vitest run --coverage` before opening a PR.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat: add donation CTA`, `fix: correct hero contrast`) and keep each commit scoped to related files. Pull requests must cover context, linked issues, screenshots or recordings for UI deltas, and evidence that `npm run build` plus full Vitest coverage passed. Document any new environment variables—purpose, default, and rollout plan—in the PR description.

## Security & Configuration Tips
Never commit credentials or API tokens. Store secrets inside `.env.local` (git-ignored) and read them via `import.meta.env`. If a secret leaks, rotate immediately, scrub references from history, and document the mitigation steps for release notes.
