# Chapter 02 — Getting Started

This chapter walks you through cloning the repository, configuring environment variables, and running the application locally.

---

## Prerequisites

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| **Node.js** | 18+ | LTS recommended |
| **pnpm** | 10+ | `npm install -g pnpm` |
| **Git** | Any | |
| **Contentful account** | — | Required for CMS data |

> **Tip:** Use a Node version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to switch Node versions easily.

---

## 1. Clone the Repository

```bash
git clone https://github.com/Abbas4tech/abbas-web-resume.git
cd abbas-web-resume
```

---

## 2. Install Dependencies

```bash
pnpm install
```

pnpm reads `pnpm-workspace.yaml` and resolves dependencies from `pnpm-lock.yaml`. No additional configuration is needed.

---

## 3. Configure Environment Variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Fill in all required values in `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `CONTENTFUL_SPACE_ID` | ✅ | Your Contentful Space ID |
| `CONTENTFUL_CDA_TOKEN` | ✅ | Contentful Content Delivery API (read-only) token |
| `CONTENTFUL_API_BASE_URL` | ✅ | GraphQL endpoint (e.g. `https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}`) |
| `CONTENTFUL_ENVIRONMENT` | ✅ | `development` or `production` — which Contentful environment to query |
| `CONTENTFUL_MANAGEMENT_TOKEN` | ✅ (for schema scripts only) | Write-capable Management API token, used only by `pnpm contentful:setup` and the other scripts under `src/contentful/scripts/` — the running app never reads it, and it is deliberately **not** set in the deployed Vercel runtime (see [ADR 0032](./adr/0032-vercel-environment-variable-cleanup.md)) |
| `VERCEL_OIDC_TOKEN` | ⬜ | Auto-managed by Vercel; not something you set by hand |

This is the current, reduced variable set (see [ADR 0032](./adr/0032-vercel-environment-variable-cleanup.md)) —
if you have an older checkout with `CONTENTFUL_API_KEY`, `CONTENTFUL_BASE_URL`, `CONTENTFUL_ENVIRONMENT_ID`,
`CONTENTFUL_APPLICATION_DATA_ID`, `CONTENTFUL_*_PAGE_KEY`, `CONTENTFUL_PAGES_KEY`, or `STARTING_URL` in your
`.env.local`, they're dead — the app no longer reads them.

> **Never commit `.env.local`** — it is listed in `.gitignore`.

---

## 4. Set Up the Contentful Schema

If you are starting from a fresh Contentful space, bootstrap the content model by running:

```bash
pnpm contentful:setup
```

This executes `src/contentful/scripts/setup-content-model.ts` and creates all required Content Types, fields, and validations programmatically via the Contentful Management API.

> **Important:** All schema changes must go through this script. Manual edits in the Contentful Web App are prohibited to keep the schema in version control.

---

## 5. Generate GraphQL Types

After configuring your space, generate the TypeScript types from the live Contentful schema:

```bash
pnpm generate
```

This runs `graphql-codegen` and outputs types into `src/contentful/generated/`. Commit the generated files — they are part of the repository.

---

## 6. Start the Development Server

```bash
pnpm dev
```

The app will be available at **http://localhost:3000**.

---

## 7. Start Storybook (Optional)

```bash
pnpm storybook
```

Storybook will start at **http://localhost:6006** and shows all components isolated from the CMS.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Next.js dev server with Hot Module Replacement |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build locally |
| `pnpm fix` | Auto-fix all linting and formatting issues (Biome) |
| `pnpm check` | Dry-run check — linting and formatting (no writes) |
| `pnpm generate` | Regenerate TypeScript types from GraphQL schema |
| `pnpm contentful:setup` | Bootstrap Contentful content model |
| `pnpm storybook` | Start Storybook dev server (port 6006) |
| `pnpm build-storybook` | Build static Storybook |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Vitest single run |
| `pnpm test:coverage` | Vitest with V8 coverage report |
| `pnpm test:e2e` | Playwright headless E2E tests |
| `pnpm test:e2e:ui` | Playwright with interactive UI |
| `pnpm test:e2e:debug` | Playwright with debug inspector |
| `pnpm test:e2e:codegen` | Playwright codegen to record new tests |
| `pnpm test:e2e:install` | Install Playwright browser binaries (`playwright install --with-deps`) |
| `pnpm test-storybook:ci` | Build + serve Storybook, then run axe accessibility checks against every story |

---

## IDE Setup

The repository includes `.vscode/` settings. Recommended extensions:

- **Biome** (`biomejs.biome`) — formatting and linting on save
- **Tailwind CSS IntelliSense** — class autocomplete
- **TypeScript** — type checking in editor

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `pnpm: command not found` | Run `npm install -g pnpm` |
| Contentful fetch errors | Verify all `CONTENTFUL_*` env vars are set correctly |
| TypeScript errors in generated files | Run `pnpm generate` to refresh types |
| Storybook crashes on startup | Clear `.next/` and `node_modules/.cache/` then restart |
| E2E tests fail connecting to server | Ensure `pnpm dev` is not already running on port 3000 (Playwright starts its own) |
