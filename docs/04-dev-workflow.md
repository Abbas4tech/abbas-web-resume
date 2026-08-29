# Chapter 04 — Dev Workflow

This chapter covers the day-to-day development workflow: branching strategy, commit conventions, changelog management, and the local development loop.

---

## Local Development Loop

```bash
# 1. Install/refresh dependencies
pnpm install

# 2. Start the dev server
pnpm dev            # → http://localhost:3000

# 3. (Optional) Start Storybook alongside
pnpm storybook      # → http://localhost:6006

# 4. Make your changes...

# 5. Auto-fix lint and format before committing
pnpm fix

# 6. Run unit tests
pnpm test:run

# 7. Create a changeset entry (required for PRs)
pnpm changeset
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production source of truth. Only Version Package PRs merge here. |
| `develop-draft` | Staging integration branch. All feature PRs target this. |
| `feat/develop-draft/**` | Individual feature branches. |

### Creating a Feature Branch

```bash
git checkout develop-draft
git pull origin develop-draft
git checkout -b feat/develop-draft/my-feature
```

### Opening a PR

All PRs must target `develop-draft`. CI runs automatically on push. The CI pipeline **will fail** if no changeset file is present.

---

## Changesets (Versioning)

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

### What is a Changeset?

A changeset is a small Markdown file in `.changeset/` that documents what changed and at what semver level (`major`, `minor`, `patch`).

### Creating a Changeset

```bash
pnpm changeset
```

Follow the interactive prompts to:
1. Select the bump type (`patch` / `minor` / `major`)
2. Write a summary of the changes

The generated file in `.changeset/` must be committed alongside your code changes.

> **CI Gate:** The CI pipeline runs `scripts/ci/check-changeset.py` as its first step. If no `.changeset/*.md` file is present in the diff, the pipeline fails immediately without running lint, tests, or builds.

### Consuming Changesets (Release)

On merge to `main`, a Python release script (`scripts/ci/manage-release.py`) runs:

1. Executes `pnpm changeset version` — bumps `package.json` version and updates `CHANGELOG.md`
2. Opens a "Version Packages" PR with the version bump

---

## Code Quality Before Committing

Husky installs git hooks automatically via `pnpm prepare`. The `pre-commit` hook runs:

```bash
pnpm fix   # Biome auto-fix (formatting + lint)
```

If Biome finds unfixable issues, the commit is blocked. Resolve them manually before committing.

### Manual Quality Checks

```bash
pnpm check            # Lint + format dry run (no writes)
pnpm tsc --noEmit     # TypeScript type-check
pnpm test:run         # Vitest single run
```

---

## GraphQL Code Generation

Whenever the Contentful schema changes (new field, new content type), regenerate the TypeScript SDK:

```bash
pnpm generate
```

This runs `graphql-codegen` using the config in `codegen.ts`. The generated output lives in `src/contentful/generated/`. Commit the generated files — they are part of the build.

### Configuration (`codegen.ts`)

The codegen configuration:
- Points to the Contentful GraphQL endpoint
- Reads queries from `src/contentful/queries/` and fragments from `src/contentful/models/`
- Outputs typed SDK to `src/contentful/generated/contentful-sdk.generated.ts`

---

## Adding a New Component

Follow this checklist when adding a new Element, Pattern, or Block:

### 1. Determine the Layer

- **Element**: No domain knowledge, wraps a DaisyUI class or provides behavioral capability
- **Pattern**: Composition of Elements, visual structure only
- **Block**: Occupies a named page slot, composed of Patterns/Elements

### 2. Create the Folder

```bash
# Example: new Pattern
mkdir src/components/patterns/my-pattern
touch src/components/patterns/my-pattern/my-pattern.tsx
touch src/components/patterns/my-pattern/my-pattern.stories.tsx
touch src/components/patterns/my-pattern/my-pattern.mock.ts
touch src/components/patterns/my-pattern/my-pattern.spec.tsx
```

For Patterns and Blocks, also create:
```bash
touch src/components/patterns/my-pattern/my-pattern.adapter.ts
```

### 3. Naming Rules

| Layer | Name Style | Example |
|-------|-----------|---------|
| UI Element | Mirrors DaisyUI class | `MockupWindow` |
| Behavioral Element | Describes behavior | `MotionParallax` |
| Pattern | Describes visual structure | `IconProgressRow` |
| Block | Describes page slot | `HeroBanner` |

**Forbidden:** domain words in component names (e.g. `ProfileBanner`, `SkillRow`, `ExperienceCard`).

### 4. Write the Story and Mock

Every component needs a `.mock.ts` file with strongly-typed mock data, and a `.stories.tsx` that imports from it.

### 5. Write a Test

Colocate the test file (`[name].spec.tsx`) with the component. See [Chapter 05 — Testing](./05-testing.md).

---

## Contentful Schema Changes

All schema changes **must** go through the TypeScript migration scripts:

```bash
# Edit the script first
src/contentful/scripts/setup-content-model.ts

# Then run it
pnpm contentful:setup
```

**Never** edit the schema directly in the Contentful Web App. The migration scripts are the single source of truth, versioned in Git.

---

## VSCode Tasks

The `.vscode/` directory includes task configurations. Key tasks:

| Task | Command |
|------|---------|
| Dev Server | `pnpm dev` |
| Storybook | `pnpm storybook` |
| Fix All | `pnpm fix` |
| Test Watch | `pnpm test` |
