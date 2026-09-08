---
status: accepted
date: 2026-09-08
---

# 26. TimelineEntry Tech-Badges Meta Row & TechBadgeCloud Layer Correction

## Status

Accepted and implemented

## Context

The repo owner asked for a `TimelineSection` variant that supports one more meta row rendered as a
`TechBadgeCloud` (the icon-badge component from [ADR 0024](./0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md)),
instead of `TimelineEntry`'s existing meta rows, which are always a single icon + a line of text.

The direct implementation — importing `TechBadgeCloud` from `@/components/blocks/tech-badge-cloud/...` into
`TimelineEntry` (a Pattern) — would have violated the project's own documented layer rule (`CONTEXT.md`:
"Elements ← Patterns ← Blocks. A lower layer never imports from a higher layer."), since `TimelineEntry` sits
in the Patterns layer and `TechBadgeCloud` was built as a Block. Caught before implementing it, not after.

Separately, `timeline-section.adapter.ts` was already building a comma-joined tech-stack text row from
`item.tags` (flat strings, no per-tag icons) while silently ignoring `item.subItems` entirely — despite the
content model's own documentation for `subItems` reading *"For nested items like TechStack in an
Experience"* (`docs/contentful/content-model.md`). `subItems` (badge entries) carry a `title` and `icons[]`
per entry — exactly the `{ label, icon }` shape `TechBadgeCloud` needs — so the intended data path already
existed in the schema, just unused.

## Decision

### 1. Move `TechBadgeCloud`'s implementation to the Patterns layer

`src/components/patterns/tech-badge-cloud/tech-badge-cloud.tsx` is now the real component (unchanged
internals — Badge/Icon elements, `MotionStagger`/`MotionHover` behavior). The Block-layer directory
(`src/components/blocks/tech-badge-cloud/`) keeps only `tech-badge-cloud.adapter.ts` and its spec — the
Contentful-mapping concern that is genuinely Block-specific — and no longer has its own `.tsx`/`.mock.ts`/
`.stories.tsx`/`.spec.tsx`, since those would have been exact duplicates of the Pattern's. `content-list.tsx`'s
`LIST_BLOCK_REGISTRY` now imports the component from the Patterns path and the adapter from the Blocks path.

Rejected alternative: a thin re-export shim at the old Block path (`export { TechBadgeCloud } from
".../patterns/..."`). Tried first, but Ultracite's own lint rule flags exactly this as a barrel file
("slows down performance, causes large module graphs with modules that go unused") — the project already
avoids this pattern elsewhere (see `tests/utils.tsx`'s explicit `biome-ignore lint/performance/noBarrelFile`
for the one place it's unavoidable). Deleting the duplicate files instead of re-exporting them keeps the
Block layer honest about what it actually is here: an adapter, not a second copy of the UI.

### 2. `TimelineEntryMetaRow` becomes a discriminated union

```ts
export interface TimelineEntryTextMetaRow {
  icon: IconProps;
  text: string;
  type?: "text";
}

export interface TimelineEntryBadgesMetaRow {
  icon?: IconProps;
  items: TechBadgeCloudItem[];
  label?: string;
  type: "badges";
}

export type TimelineEntryMetaRow = TimelineEntryBadgesMetaRow | TimelineEntryTextMetaRow;
```

`type` is optional on the text variant and required (`"badges"`) on the new one, so every existing caller
(`timeline-entry.mock.ts`, `timeline-entry.adapter.ts`, and the dead-but-still-tested `adaptTimelineEntry`
stub) keeps compiling unchanged — TypeScript narrows `row.type === "badges"` correctly either way.
`TimelineEntry` renders a badges row as an optional icon+label heading above a `TechBadgeCloud`, inside the
same `metaRowVariants` spring entrance every other meta row already uses — badges cascade in via
`TechBadgeCloud`'s own stagger a beat after the row itself settles, the same two-stage reveal
[ADR 0025](./0025-motion-coverage-audit-and-error-page-redesign.md) established for `ProcessSteps`.

### 3. `timeline-section.adapter.ts` prefers `subItems`, falls back to `tags`

```ts
if (item.subItems?.length) {
  metaRows.push({ type: "badges", label: "Tech Stack", icon: {...}, items: item.subItems.map(...) });
} else if (item.tags?.length) {
  metaRows.push({ icon: {...}, text: item.tags.join(", ") }); // unchanged fallback
}
```

Content authored with real `subItems` (icons included) gets the richer badge cloud; content that only ever
had flat string `tags` keeps rendering exactly as it did before — no existing Contentful entry's rendering
changes because it lacks data the new path needs.

## Amendment — Dropped the redundant heading

The first version of the badges row rendered an optional icon + `"Tech Stack"` label above the
`TechBadgeCloud`, mirroring the other meta rows' icon+text shape. Reviewed against a screenshot of the actual
`WithTechStack` story: a "Tech Stack" caption with its own icon, sitting directly above a row of badges that
already each carry their own icon and label, reads as double-labeling the same information — the badges alone
already say "this is a tech stack" as clearly as a caption would. Removed `icon`/`label` from
`TimelineEntryBadgesMetaRow` entirely — the type is now just `{ items: TechBadgeCloudItem[]; type: "badges" }`
— and the row renders as a bare `TechBadgeCloud`, consistent with how `MetricsStrip`/`SplitContentPanel` don't
caption their `StatGroup` rows either. `timeline-section.adapter.ts`'s `subItems` mapping, both mocks, and
both specs updated to match.

## Amendment — Live content migration

The code path was correct, but the real Contentful space's only `TimelineSection` content ("Experience —
Timeline", entries Scott Sports / Xcentium / iSchoolConnect Technologies) only ever had flat `tags`, so it
was still rendering through the text fallback. Verified read-only against the live space first (GraphQL
introspection + content queries) that the schema was already fully live — `contentItem.subItemsCollection`,
`statItem`, and 45 of the ~48 needed `icon` entries already existed; only `Vitest`, `Azure Devops`, and `Jest`
icon entries were missing.

Added `src/contentful/scripts/migrate-timeline-tech-badges.ts` (dry-run by default, `--apply` to write,
matching the convention in `migrate-missing-content.ts`): for every `TimelineSection` content list, for every
tag on every entry without existing `subItems`, it finds-or-creates the matching `icon` entry, finds-or-creates
a `statItem` badge entry (deduplicated by tag across entries — "React" is one shared entry, not one per
experience), and links them as `subItems`, leaving `tags` untouched. Ran it dry-run, reviewed the plan, then
ran it with `--apply` against the live `development` environment with the repo owner's explicit go-ahead.

Verified against the live, running app afterward (`pnpm dev` + Playwright, not just Storybook): `/experience`
now renders all three entries' tech stacks as `TechBadgeCloud` rows with correct icons, zero console errors,
zero `Icon not found in registry` fallbacks.

## Considered Options

- **Duplicate the badge-rendering JSX inline in `TimelineEntry` instead of sharing a component.** Rejected:
  the exact same badge+icon+hover+stagger visual language already existed in `TechBadgeCloud`; copying it
  would drift from the original the first time either one changed, for no benefit over moving it to a layer
  both call sites can reach.
- **Keep `TechBadgeCloud` at the Block layer and give `TimelineEntry` its own, differently-named Pattern with
  identical markup.** Rejected for the same reason — two components rendering the same thing invites drift,
  and the project's own naming ADR (0008) already argues against exactly this kind of near-duplicate.

## Consequences

### Positive
- The Elements ← Patterns ← Blocks dependency rule holds with no exceptions after this change — the one
  place it was about to be violated was caught and fixed by moving the component, not by carving out an
  exception to the rule.
- `subItems` — documented in the content model since before this change, never actually read by any
  adapter — is now wired up, closing a real gap between the schema's stated intent and the code.
- Both new Storybook variants (`Patterns/TimelineEntry → WithTechBadges`, `Blocks/TimelineSection →
  WithTechStack`) and all three new/updated adapter tests pass, alongside the full existing suite: verified
  with the same rigor as ADRs 0024–0025 (typecheck, lint, all 298 unit tests, all 54 Storybook files / 104
  accessibility checks, zero regressions).

### Negative / Trade-offs
- `TechBadgeCloud`'s Storybook entry moved from `Blocks/TechBadgeCloud` to `Patterns/TechBadgeCloud` — a
  bookmarked link to the old path in Storybook's sidebar no longer resolves. Accepted as the correct one-time
  cost of fixing a genuine layering mistake rather than leaving it in the wrong place for compatibility.
