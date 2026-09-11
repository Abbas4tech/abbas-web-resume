# Environment Content Migration

This document describes the workflow and policy for reconciling content differences between the two live
Contentful environments in this project's space — `production` and `development` (see
[ADR 0031](../adr/0031-contentful-schema-parity-verification.md) for why these two can drift, and why that
drift matters). It is referenced directly from the header comment of
[`migrate-missing-content.ts`](../../src/contentful/scripts/migrate-missing-content.ts).

This is distinct from [`legacy-space-migration-field-mapping.md`](./legacy-space-migration-field-mapping.md),
which covers the one-time cross-*schema* migration out of the old legacy Contentful space (ADR 0019). This
document covers ongoing, same-schema content drift between the two current environments of the composable
space.

## Why this exists

`development` and `production` are two environments in the same Contentful space, sharing one schema (pushed
by `pnpm contentful:setup` — see [`content-model.md`](./content-model.md)). Schema is kept in sync by that
script and verified in CI (ADR 0031's `verify-contentful-schema` job). **Content is not** — an entry or asset
created in one environment does not automatically exist in the other. Two incidents surfaced this the hard
way:

- Production was missing entries/fields that existed in Development, invisible to both the `build` job
  (which doesn't diff environments) and MSW-mocked E2E tests (which never hit real Contentful at all).
- A live Asset (the favicon) existed in Development but not Production — see ADR 0031's amendment.

## The tools

Two scripts, used together, in this order:

### 1. `audit-environment-content.ts` — read-only diff

```bash
npx tsx src/contentful/scripts/audit-environment-content.ts [--source=production] [--target=development]
```

Diffs every entry by `sys.id` between the two named environments (defaults shown above) and classifies each
into one of:

- **`missingInTarget`** — exists in source, not in target.
- **`diverged`** — exists in both, but field values differ.
- **`inSync`** — exists in both, identical.
- **`targetOnly`** — exists in target, not in source.

Also records `sourceOnlyFields`/`targetOnlyFields` per content type (schema-level field presence, not just
entry data). **Never mutates anything** — safe to run at any time, as often as needed, against any
environment pair. Writes its findings to `.contentful-audit/report.json` (machine-readable, consumed by the
migration script below) and `.contentful-audit/report.md` (human-readable summary to read before deciding
whether to act).

### 2. `migrate-missing-content.ts` — targeted, policy-constrained write

```bash
npx tsx src/contentful/scripts/migrate-missing-content.ts --source=production --target=development           # dry run
npx tsx src/contentful/scripts/migrate-missing-content.ts --source=production --target=development --apply   # writes
```

Consumes the audit report and creates entries in the target environment. **Policy:**

- Only entries flagged `missingInTarget` are ever created.
- `diverged`, `inSync`, and `targetOnly` entries are **never touched** — the target environment is always
  treated as authoritative for anything it already has. This tool fills gaps; it does not reconcile
  conflicts or overwrite existing data.
- Only fields present on the content type in **both** environments are copied. A source-only field is
  dropped (and logged) rather than silently failing; a target-only field is simply left empty on the new
  entry.
- Linked entries and assets are migrated **recursively**, so references on a newly-created entry resolve
  correctly — even if a dependency wasn't itself flagged missing at the top level (e.g. an asset referenced
  by a missing entry that the audit didn't need to walk into directly).
- **Dry-run by default.** Nothing is written without `--apply`.
- **Idempotent.** Re-running (with or without `--apply`) skips anything that already exists in the target —
  safe to re-run after a partial run or to periodically re-check for new drift.

### Related, single-purpose migration scripts

These exist alongside the general audit/migrate pair for specific, already-resolved situations — kept for
reference and as a pattern to follow for a similar future one-off:

- **`migrate-favicon-to-seo.ts`** — moves `layout.favicon` onto each page's `seoMetadata.favicon`, then
  removes the `layout.favicon` field via Contentful's required omit-then-delete sequence for a field with
  existing data. Dry-run by default, `--apply` to write. See the field-removal note in
  [`content-model.md`](./content-model.md#️-layout-layout).
- **`migrate-timeline-tech-badges.ts`** — one-time conversion of flat `tags` string arrays into real
  `subItems` (`statItem`) links for `TimelineSection` entries, so the tech-stack meta row renders as a
  `TechBadgeCloud` instead of a plain-text fallback. See [ADR 0026](../adr/0026-timeline-tech-badges-meta-row.md).
- **`extract-legacy-content.ts`** / **`migrate-legacy-content.ts`** — the one-time legacy-space migration
  pair (ADR 0019), unrelated to the two live environments this document covers.

## Typical workflow

1. Run the audit against the pair you care about (usually `production` → `development`, or the reverse when
   checking what local/CI development work hasn't yet been promoted).
2. Read `.contentful-audit/report.md`. Decide whether `missingInTarget` entries should actually be migrated,
   or whether they're intentionally environment-specific (e.g. test-only content in `development`).
3. Run `migrate-missing-content.ts` without `--apply` first and review its planned actions.
4. Re-run with `--apply` once satisfied.
5. Re-run the audit to confirm the `missingInTarget` set has shrunk to what's expected (any remaining
   `diverged`/`targetOnly` entries are left as-is by design — resolve those manually in the Contentful web
   app if needed, since this tooling deliberately never auto-resolves conflicts).

## What this does not cover

- **Schema drift** (a field or content type existing in one environment's schema but not the other) is
  handled separately by `pnpm contentful:setup` (the single source of schema truth,
  [`setup-content-model.ts`](../../src/contentful/scripts/setup-content-model.ts)) and verified in CI by
  `verify-contentful-schema.py` (ADR 0031). This document is about *entry/asset content*, not schema.
- **Conflict resolution** for `diverged` entries — there is no automated "which value wins" tool. This is a
  deliberate scope boundary: silently picking a winner between two environments' edited content is judged
  higher-risk than leaving it for a human to resolve in the Contentful web app.
