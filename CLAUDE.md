# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**web-pf-ts** — "Proyecto Final Teoría de Sistemas" (UAM, Systems Theory final project). Vue 3 + TypeScript SPA scaffolded with Vite. Currently an early-stage scaffold: a single `/` route renders `HomeView.vue` (a placeholder using a shadcn-vue Button and Accordion). Pinia and Vue Router are wired up but no domain logic for the systems-theory project is implemented yet.

## Commands

Package manager is **pnpm**, pinned to `11.0.9` via the `packageManager` field. Node `>=22` required.

| Task | Command | Notes |
|------|---------|-------|
| Dev server | `pnpm dev` | Vite HMR |
| Build | `pnpm build` | Runs `type-check` and `build-only` **in parallel** via `npm-run-all2` (`run-p`) |
| Build only (skip type-check) | `pnpm build-only` | `vite build` |
| Type-check | `pnpm type-check` | `vue-tsc --build` — incremental, cache in `node_modules/.tmp/` |
| Preview prod build | `pnpm preview` | |
| Lint | `pnpm lint` | Sequential: `lint:oxlint` then `lint:eslint` (`run-s lint:*`) |
| Lint — fast pass | `pnpm lint:oxlint` | oxlint, autofix |
| Lint — full | `pnpm lint:eslint` | ESLint flat config, autofix, with `--cache` |
| Format | `pnpm format` | Prettier 3.8 over `src/` (uses `--experimental-cli`) |

**No test runner is configured.** There is no vitest/playwright/jest. If you add tests, also add the command here.

## Architecture

### Stack
- **Vue 3.5** with `<script setup lang="ts">` and Composition API only.
- **Vite 7** with `@vitejs/plugin-vue`, `vite-plugin-vue-devtools`, `@tailwindcss/vite`, and `unplugin-auto-import`.
- **Pinia 3** for state, **Vue Router 5** (note: v5 — Vue Router's next major, not 4.x).
- **Tailwind CSS v4** via the Vite plugin (no `postcss.config.*`, no `tailwind.config.*` — CSS-first config).
- **shadcn-vue 2.7** with the `new-york` style, `zinc` base color, JetBrains Mono font, and Lucide icons. Config is `components.json`.
- **TypeScript 6.0** with `noUncheckedIndexedAccess: true`. Root `tsconfig.json` sets `ignoreDeprecations: "6.0"` to silence TS 6.0 deprecation warnings — leave that flag in place when touching configs.

### Auto-imports
`unplugin-auto-import` (in `vite.config.ts`) auto-injects:
- Vue core APIs (`ref`, `computed`, `watch`, …)
- Vue Router composables (`useRoute`, `useRouter`, …)
- Everything in `src/composables/` (folder is auto-scanned; create it when needed)

Generated types live in `src/types/auto-imports.d.ts` (committed; Vite regenerates it). Don't add explicit imports for these — they're available globally in any SFC.

### Path aliases
- `@/*` → `src/*` — set in `tsconfig.json` (`compilerOptions.paths`) **and** `vite.config.ts` (`resolve.alias`). Keep them in sync.
- shadcn-vue aliases (in `components.json`): `@/components`, `@/components/ui`, `@/lib/utils`, `@/lib`, `@/composables`.

### TypeScript layout (project references)
- `tsconfig.json` — root, references the two below; sets path alias and `ignoreDeprecations`.
- `tsconfig.app.json` — app code (`src/**`), extends `@vue/tsconfig/tsconfig.dom.json`.
- `tsconfig.node.json` — Vite/tooling configs, extends `@tsconfig/node24`.

### Styling system
- Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.*`).
- Theme tokens and dark-mode palette in `src/style.css` using the `@theme inline` pattern with OKLch colors.
- Dark mode toggled by `.dark` class on the root.
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it for conditional class composition.

### Source layout
```
src/
├── main.ts            # createApp + Pinia + Router
├── App.vue            # <RouterView /> shell — no global layout
├── style.css          # Tailwind + theme tokens (@theme inline, OKLch, dark mode)
├── router/index.ts    # routes (currently just `/` → HomeView); uses BASE_URL
├── views/             # route-level pages (HomeView.vue)
├── components/ui/     # shadcn-vue components (accordion, button so far)
├── components/        # app-level components (when added)
├── stores/            # Pinia stores (counter.ts is the example)
├── composables/       # auto-imported composables (create folder when needed)
├── lib/utils.ts       # cn() helper
└── types/             # type defs incl. auto-imports.d.ts (auto-generated)
```

### Adding shadcn-vue components
Use the shadcn-vue CLI (or the `shadcn-vue` MCP server when available) — components are added to `src/components/ui/<name>/`. Don't hand-write them; the CLI also patches `components.json` / registries correctly.

## Deployment

- Multi-stage `Dockerfile`: `node:22-slim` build stage runs `corepack`-pinned `pnpm@11.0.9` with `pnpm install --frozen-lockfile && pnpm run build`, then `nginx:stable-alpine` serves `/dist` using `.docker/nginx.conf`.
- Hosted via **Dokploy** — recent commits (`fix(dokploy): …`) tune the Dockerfile for Dokploy compatibility, including the `ignoreDeprecations` flag and removed `baseUrl`. Verify before changing those settings.
- `VITE_APP_NAME` is read in `src/views/HomeView.vue`; set it via `.env` locally and the hosting env in prod.
- `import.meta.env.BASE_URL` is passed to `createWebHistory` — if the app is ever served from a subpath, set Vite's `base` config accordingly.

## Conventions

- SFCs use `<script setup lang="ts">` exclusively.
- Pinia stores use the setup/composition syntax (see `src/stores/counter.ts`).
- Don't manually import Vue or Vue Router composables — auto-import handles them.
- Run `pnpm lint` before committing (oxlint is the fast gate; ESLint follows).
- TypeScript is strict with `noUncheckedIndexedAccess` — handle `undefined` from array/record access.
- Keep `@/*` aliases in `tsconfig.json` and `vite.config.ts` in sync when adding new alias roots.
