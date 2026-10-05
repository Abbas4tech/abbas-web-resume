---
status: accepted
date: 2026-10-02
---

# 39. Generated Field Unions from Contentful Validations

## Context

[`setup-content-model.ts`](../../src/contentful/scripts/setup-content-model.ts) constrains several `Symbol`
fields to a fixed list of values with Contentful's `in` validation — `contentList.ui`,
`contentList.entries`, `contentSection.ui`, `layout.defaultTheme`, `layout.drawerVariant`,
`layout.drawerSide`, and the items of `layout.themeList`. Editors see these as dropdowns.

The generated TypeScript did not reflect that. `graphql-codegen` introspects Contentful's **GraphQL**
schema, and Contentful maps every `Symbol` field to a plain `String` (and `Array<Symbol>` to `[String]`) —
validations are enforced when an editor saves an entry, but are not part of the GraphQL schema at all.
So every one of those fields was typed `Maybe<string>` in `schema-types.generated.ts` and in the adapters'
output, and nothing in the type system connected a `ui` value to the Block registries that consume it.
`enumsAsTypes: true` in `codegen.ts` could not help: it only affects real GraphQL enums, and these are not.

A second finding while fixing this: the **Delivery API (CDA)** `/content_types` endpoint also strips `in`
validations from `Symbol` fields (it keeps them only on `Array` items). Only the Management API (CMA)
returns them reliably, so a generator built on the CDA silently produced one union instead of seven.

## Decision

Added `src/contentful/scripts/generate-field-unions.ts`, which reads the live content types from the
Management API and, for every field (or array-item) with an `in` validation, emits:

- `src/contentful/generated/field-unions.generated.ts` — `export type <ContentType><Field> = "a" | "b"`
  plus a matching `<ContentType><Field>Values` `as const` array.
- `docs/contentful/constrained-fields.md` — a table of every constrained field, its TypeScript type, and
  its allowed values. Generated in the same run so the documentation cannot lag the types.

It discovers fields by scanning the whole content model rather than from a hand-kept list, so adding an
`in` validation to any field in `setup-content-model.ts` produces a new union on the next run with no
code change to the generator.

Wiring:

- `pnpm generate` runs `graphql-codegen` and then `pnpm generate:unions`.
- `pnpm contentful:setup` runs `generate:unions` after pushing the schema, so the types and docs are
  refreshed from the schema that was just applied.
- `src/contentful/lib/narrow-union.ts` provides `narrowUnion(allowed, value, fallback)`, used by the
  `layout`, `contentList`, and `contentSection` adapters to narrow the GraphQL `string` to the generated
  union at the one place that already knows about Contentful (the adapter), keeping Blocks
  Contentful-agnostic per [ADR 0001b](./0001-block-renderers-and-element-adapters.md).
- CI gate `scripts/ci/check-contentful-sync.py` fails a PR that changes `setup-content-model.ts` without
  updating `docs/contentful/content-model.md`, or changes a `.graphql` source without regenerating the SDK.

The whole process, including the checklist to follow on every content-model change, is in
[`docs/contentful/schema-change-workflow.md`](../contentful/schema-change-workflow.md).

## Considered Options

- **Hand-maintained `as const` constants shared by the setup script and the adapters.** Rejected — every
  allowed-value change would need a manual code edit in addition to the Contentful change, and the two
  could drift. The goal was for Contentful's own definition to be the single source.
- **`codegen.ts` scalar/plugin overrides mapping specific fields to unions.** Rejected — per-field,
  hand-listed configuration, so it reintroduces the same manual step and moves the knowledge out of the
  content model.
- **`cf-content-types-generator` (CMA-based type generator).** Rejected — it emits CDA/REST-style entry
  types, not GraphQL operation types, so it doesn't fit the existing `graphql-request` SDK flow. It would
  only be adding a second, parallel type system.
- **Read `in` validations from the CDA, reusing the existing `CONTENTFUL_CDA_TOKEN`.** Built first and
  rejected: the CDA drops them from `Symbol` fields (see Context).

## Consequences

### Positive
- The adapter outputs for `ui`, `category`, `defaultTheme`, `themeList`, `drawerVariant`, and `drawerSide`
  are real unions, so a typo'd or removed value is a compile error where it is used.
- Types and the constrained-field reference doc come from the same run and the same source (the live
  content model), so neither can lag the other or the CMS.
- New constrained fields are picked up automatically.
- The tooling is idempotent: `contentful:setup` skips content types whose published definition already
  matches the script (no publish, no extra Contentful version), and `generate:unions` rewrites its outputs
  only when their content changes. Re-running either on an unchanged model does no work.

### Negative / Trade-offs
- Generation needs `CONTENTFUL_MANAGEMENT_TOKEN` — a write-capable secret. It is only used locally and is
  not available to CI, which is acceptable because the generated files are committed (as `pnpm generate`
  output already is) and CI does not regenerate.
- The unions reflect whichever environment `CONTENTFUL_ENVIRONMENT` points at (default `development`).
  If `production`'s schema is behind, a union may include values `production` does not yet allow — a
  further reason to push the schema to both environments (see
  [ADR 0031](./0031-contentful-schema-parity-verification.md)).
- `narrowUnion` falls back to a default for a value outside the list, where the adapters used to pass any
  non-empty string through. Contentful's validation prevents saving such a value, so this only affects
  stale or legacy data. Live entries in `development` and `production` were checked when this shipped and
  all used allowed values.
- The CI gate only verifies that the documentation and generated files were *touched*, not that they are
  correct; it cannot regenerate the unions itself (no management token in CI).
- Components that declare their own `string`-typed `ui` props (the block registries) are not yet narrowed
  to the generated unions.
