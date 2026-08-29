# Chapter 09 — Code Quality

This project enforces strict code quality standards through an automated toolchain based on **Ultracite** (a zero-config Biome preset), **TypeScript**, and **Husky** git hooks.

---

## Toolchain Overview

| Tool | Role |
|------|------|
| **Ultracite** | Zero-config preset wrapping Biome |
| **Biome** | Formatting + linting engine (replaces ESLint + Prettier) |
| **TypeScript** | Static type checking |
| **Husky** | Git hooks runner |
| **Changesets** | Versioning gate enforced by CI |

---

## Ultracite / Biome

### Quick Reference

```bash
pnpm fix    # Auto-fix all formatting and lint issues
pnpm check  # Dry-run — reports issues without writing
```

Biome provides fast, opinionated formatting and comprehensive linting in a single binary. Ultracite is a zero-config preset that applies a curated Biome configuration appropriate for TypeScript/React projects.

### Configuration (`biome.jsonc`)

The project's Biome configuration is minimal — Ultracite handles all defaults:

```jsonc
// biome.jsonc
{
  "extends": ["ultracite"]
}
```

### What Biome Enforces

#### Formatting
- Consistent indentation (2 spaces)
- Trailing commas in multi-line structures
- Single quotes for strings in TypeScript
- Semicolons at end of statements
- Max line length enforcement

#### Linting
- **No `any`** — use `unknown` with type guards
- **No `console.log`** in production code
- **No unused variables or imports**
- **Arrow functions** for callbacks
- **`const` by default**, `let` only when reassignment is needed, never `var`
- **Optional chaining** (`?.`) and **nullish coalescing** (`??`) for safe property access
- **Template literals** over string concatenation
- **`for...of`** loops instead of `.forEach()` or indexed loops
- **No barrel files** (`index.ts` re-exporting everything)
- **`rel="noopener"`** on all `target="_blank"` links
- **No `eval()`**, no direct `document.cookie` assignment
- **React hooks** called at top level only
- **Unique `key` props** in iterables (prefer IDs over array indices)
- **Semantic HTML** and ARIA attributes

#### React-Specific
- Function components over class components
- Nest children between tags, not as props
- No component definitions inside other components
- Correct hook dependency arrays

#### Next.js-Specific
- Use `<Image>` component, not `<img>` tags
- Use metadata API, not `<head>` manipulation

### When Biome Cannot Help

Focus manual review on:
1. **Business logic correctness** — algorithms and edge cases
2. **Meaningful naming** — descriptive variables, functions, types
3. **Architecture decisions** — layer boundaries, import direction
4. **User experience** — accessibility, responsiveness, performance
5. **Documentation** — complex logic comments (prefer self-documenting code)

---

## TypeScript

TypeScript is configured in `tsconfig.json` with strict mode enabled.

### Key Principles

```ts
// ✅ Explicit return types when clarity matters
function adaptContentItem(raw: RawItem): AdaptedContentItem { ... }

// ✅ `unknown` over `any`
function isAdaptedContentItem(item: unknown): item is AdaptedContentItem { ... }

// ✅ `as const` for literal types
const ANIMATION_VARIANTS = { fadeUp: "fade-up", zoomIn: "zoom-in" } as const;

// ✅ Type narrowing over type assertions
if (isAdaptedContentItem(item)) {
  // item is AdaptedContentItem here
}
```

### TypeScript CI Check

```bash
pnpm tsc --noEmit  # Full type check without emitting files
```

This runs as a separate CI step after linting.

---

## Husky Git Hooks

Husky is installed automatically by `pnpm prepare` (runs after `pnpm install`).

### Pre-commit Hook

Before every commit, Biome auto-fixes all staged files:

```bash
# .husky/pre-commit
pnpm fix
```

If Biome encounters unfixable issues, the commit is **blocked**. Resolve them manually, then recommit.

---

## Changeset Gate (CI)

The CI pipeline enforces that every PR includes a changeset file. This runs as the very first job:

```bash
python scripts/ci/check-changeset.py
```

If no `.changeset/*.md` file is present in the PR diff, the pipeline **fails immediately** without wasting CI compute on lint, tests, or build.

---

## Naming Conventions Summary

| Category | Convention | Examples |
|----------|-----------|---------|
| Files | `kebab-case` | `button.tsx`, `content-item.ts` |
| Components | `PascalCase` | `HeroBanner`, `IconProgressRow` |
| Functions | `camelCase` | `adaptContentItem`, `useDrawer` |
| Constants | `SCREAMING_SNAKE_CASE` | `ICON_REGISTRY`, `ANIMATION_VARIANTS` |
| CSS classes | DaisyUI utility classes only | `.btn`, `.card`, `.badge` |
| Types | `PascalCase` with `Adapted` prefix for CMS shapes | `AdaptedContentItem`, `HeroBannerProps` |

---

## File Organization Rules

1. **No barrel files** — Never create `index.ts` that re-exports everything
2. **Co-location** — Tests, stories, and mocks live alongside the component they test
3. **No `index.tsx`** — Component files must own their namespace (e.g., `button.tsx` not `index.tsx`)
4. **Types in component file** — Props types live in the component's `.tsx` file, not a separate `types.ts`
5. **Adapters are `.ts` not `.tsx`** — Pure functions, no JSX

---

## Import Restrictions

- `@/contentful/` and `@/types/entries` imports are **forbidden** in `elements/`, `patterns/`, and `blocks/` component files (only allowed in `adapter.ts` files and page-level server components)
- Lower layers never import from higher layers (Elements cannot import Patterns)

These restrictions should eventually be enforced by Biome's `noRestrictedImports` rule.

---

## Running the Full Quality Suite

To replicate what CI runs locally:

```bash
pnpm check        # Lint + format dry run
pnpm tsc --noEmit # TypeScript
pnpm test:run     # Unit + component tests
pnpm test:e2e     # E2E tests (starts dev server automatically)
pnpm build        # Next.js production build
```
