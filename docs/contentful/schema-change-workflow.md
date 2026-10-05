# Contentful Schema Change Workflow

How a content-model change flows through this repo, which artifacts are derived from it, and the checklist
to follow so none of them go stale. Background and rationale:
[ADR 0039](../adr/0039-generated-field-unions-from-contentful-validations.md) and
[ADR 0031](../adr/0031-contentful-schema-parity-verification.md).

## Source of truth and derived artifacts

```
src/contentful/scripts/setup-content-model.ts      ← the only place the schema is edited
        │  pnpm contentful:setup   (pushes to $CONTENTFUL_ENVIRONMENT, then runs generate:unions)
        ▼
Contentful environment (development / production)
        │
        ├── pnpm generate  ── graphql-codegen ──▶ src/contentful/generated/
        │                                          ├── schema.generated.gql
        │                                          ├── schema-types.generated.ts
        │                                          └── contentful-sdk.generated.ts
        │
        └── pnpm generate:unions  (Management API, reads `in` validations)
                                   ├──▶ src/contentful/generated/field-unions.generated.ts
                                   └──▶ docs/contentful/constrained-fields.md

Hand-maintained mirrors that must be updated by hand:
  docs/contentful/content-model.md      (field-by-field reference)
  src/contentful/models/**/*.graphql    (fragments)  →  re-run `pnpm generate`
  src/contentful/adapters/*.ts          (adapters, narrow with `narrowUnion`)
```

| Artifact | How it is kept current | Enforced by |
|---|---|---|
| `generated/schema*.ts`, `contentful-sdk.generated.ts` | `pnpm generate` | CI: `check-contentful-sync` (when a `.graphql` source changes); `verify-contentful-schema` (live queries) |
| `generated/field-unions.generated.ts` | `pnpm generate:unions` (also run by `generate` and `contentful:setup`) | Review; regenerated automatically on schema push |
| `docs/contentful/constrained-fields.md` | `pnpm generate:unions` (generated — never edit) | Same run as the unions |
| `docs/contentful/content-model.md` | By hand | CI: `check-contentful-sync` (when `setup-content-model.ts` changes) |
| Both environments' schema | `pnpm contentful:setup` once per environment | CI: `verify-contentful-schema` (both environments) |

## Checklist: changing the content model

1. **Edit** `src/contentful/scripts/setup-content-model.ts`. Never change the schema in the Contentful web app.
2. **Push** with `pnpm contentful:setup`. It also regenerates the field unions and
   `constrained-fields.md`. Repeat for the other environment by changing `CONTENTFUL_ENVIRONMENT`
   (`development` and `production` must not drift).
3. **Update the GraphQL fragments** in `src/contentful/models/**/*.graphql` if the app should query a new or
   renamed field, then run `pnpm generate`.
4. **Update the adapter** in `src/contentful/adapters/`. For a constrained (`in`) field, narrow it with
   `narrowUnion(<Type>Values, value, fallback)` using the generated `...Values` constant.
5. **Update the spec fixtures** so they use values the model actually allows — `narrowUnion` falls back for
   anything else.
6. **Update `docs/contentful/content-model.md`** by hand for the changed type or field.
7. If a `ui` value was added or removed, update the matching block registry
   (`LIST_BLOCK_REGISTRY` / `SECTION_BLOCK_REGISTRY`) and
   [`docs/07-component-architecture.md`](../07-component-architecture.md#cms-block-registries).
8. **Record the decision.** A change to the model's shape or conventions (not just adding a value to an
   existing list) gets an ADR in `docs/adr/` and a row in `docs/adr/README.md`.
9. **Add a changeset** (`pnpm changeset`) — every PR needs one.
10. Run `pnpm check`, `pnpm typecheck`, and `pnpm test:run`.

### Quick cases

| Change | Do |
|---|---|
| Add an allowed value to an existing `in` list (e.g. a new `ui` option) | Steps 1, 2, 4 (only if a new Block), 6, 7, 9 — the union and `constrained-fields.md` update themselves in step 2 |
| Add a new dropdown field | Steps 1–6, 9 — it is discovered automatically; no generator change |
| Rename or remove an allowed value | Check entries in both environments first — existing entries using the removed value become invalid and `narrowUnion` will fall back to the default for them |
| Add a new content type | Steps 1–6, 8, 9 |

## Idempotent by design

Re-running the commands when nothing changed is safe and does no work, so there is no need to guess whether a
step is required:

- `pnpm contentful:setup` compares each content type's published definition (name, description, display
  field, and every field's type, link type, required/localized flags, validations and array items) with
  `setup-content-model.ts`. Unchanged types are skipped — logged as `⏭  Unchanged content type` — so no
  update, no publish, and no extra Contentful version. It ends with a one-line summary
  (`N created, N updated, N unchanged, N failed`) and exits non-zero if any type failed.
- `pnpm generate:unions` rewrites `field-unions.generated.ts` and `constrained-fields.md` only if their
  content would change, and otherwise logs `⏭  Field unions unchanged`.
- CI's `check-contentful-sync` only fails when a source file changed without its paired docs/generated file.

Read the log: `⏭` means nothing needed doing, `✅` means something changed and should be in your diff.

## Requirements

- `CONTENTFUL_MANAGEMENT_TOKEN` in `.env.local` — needed by both `contentful:setup` and `generate:unions`.
  The Delivery API cannot be used for unions: it omits `in` validations from `Symbol` fields.
- `generate:unions` reflects the environment named by `CONTENTFUL_ENVIRONMENT` (default `development`). Run it
  against the environment you consider canonical before committing.

## What CI checks

`scripts/ci/check-contentful-sync.py` (job `check-contentful-sync`, pull requests only) fails when:

- `src/contentful/scripts/setup-content-model.ts` changed and `docs/contentful/content-model.md` did not.
- A `src/contentful/**/*.graphql` file changed and `contentful-sdk.generated.ts` did not.

It checks that the files were *touched*, not that they are correct — correctness of the generated files
comes from running the commands above, and of the live schema from `verify-contentful-schema`.

## Change log

Record notable content-model changes here, newest first, linking the ADR or PR.

| Date | Change | Reference |
|---|---|---|
| 2026-10-02 | Introduced generated field unions and `constrained-fields.md`; `contentList`/`contentSection`/`layout` adapters narrow dropdown fields | [ADR 0039](../adr/0039-generated-field-unions-from-contentful-validations.md) |
