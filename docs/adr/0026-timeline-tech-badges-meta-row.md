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

## Amendment — Explicit `ui` toggle, tags dropped entirely, and a live data bug

A follow-up request asked for the same kind of editor-facing `ui` toggle — built, then fully reverted (code
and live schema) after the repo owner clarified they'd meant `TimelineSection`, not `SplitContentPanel` — this
time for `TimelineSection` itself. The first pass registered both `ui` values under one shared render
function, on the (incorrect) assumption that badges already showing automatically wherever `subItems` existed
meant the two values should be functionally identical. Corrected after the repo owner clarified the actual
intent, twice — first that flat `tags` were never meant to be a data source at all (an autocorrect artifact in
how that was phrased, not a real ask to reintroduce them), then that the two `ui` values must render the
**same `subItems` data differently**, not identically:

- `ui: "TimelineSection"` — the tech-stack row renders as the original single icon + comma-joined text, built
  from `subItems.map(s => s.title).join(", ")`.
- `ui: "TimelineSectionWithBadges"` — the same `subItems` render as a `TechBadgeCloud` instead, each with its
  own icon.

There is no `tags`-based path anywhere in `timeline-section.adapter.ts` — `subItems` is the only data source
for either variant, split into two functions (`adaptTimelineSection`, `adaptTimelineSectionWithBadges`) that
share a `buildBaseMetaRows` helper for the date/place/role rows and differ only in how they render the
tech-stack row:

```ts
// ui: "TimelineSection"
metaRows.push({
  icon: { iconCode: "fa/FaStackOverflow", name: "Tech Stack", size: "18" },
  text: item.subItems.map((subItem) => subItem.title).join(", "),
});

// ui: "TimelineSectionWithBadges"
metaRows.push({
  type: "badges",
  items: item.subItems.map((subItem) => ({ label: subItem.title, icon: subItem.icons?.[0] })),
});
```

`content-list.tsx` registers each `ui` key against its own adapter function accordingly. Pushed the
`contentList.ui` schema addition live via `pnpm contentful:setup` and confirmed through the Management API.
Verified against the real live site with the real "Experience — Timeline" data (which already has `subItems`
from the ADR-0026 migration): with `ui: "TimelineSection"` selected, `/experience` renders the original
comma-joined text line, not badges — toggling the entry to `TimelineSectionWithBadges` in Contentful is what
switches it to the badge cloud.

**A live bug surfaced while verifying this against the real site, unrelated to the code change itself:**
`/experience` was rendering `BlockPlaceholder` instead of the timeline. The real "Experience — Timeline"
`ContentList` entry's `ui` field was still literally set to `"SplitContentPanelWithBadges"` — a leftover from
testing that value before its ADR-0027 revert. Removing a value from a Symbol field's `in` validation (what
the revert did) does not retroactively fix entries whose stored value no longer matches the list; it only
blocks *new* writes of that value going forward. Fixed by updating that one entry's `ui` field back to
`"TimelineSection"` directly via the Management API and re-verified the live page. Worth remembering for any
future `ui` enum revert: check whether a real entry was ever switched to the value being removed, the same way
a dangling foreign key needs cleanup after a schema rollback.

## Amendment — Production never received the migration, and a dormant query bug

The "Amendment — Live content migration" section above ran `migrate-timeline-tech-badges.ts --apply` only
against `development` — `production` was never brought in line, and nothing at the time flagged that as a
gap. Surfaced by the repo owner noticing the Experience page's tech-stack badges were missing entirely in
production while working correctly in development/preview.

Investigating found two things, not one:

1. **Production genuinely never got the migration.** A direct comparison of the two environments'
   "Experience — Timeline" `contentList` entries (same `internalName`, same three experience titles, same
   `tags` arrays — but entirely different `sys.id`s, confirming these environments hold independent entry
   copies, not a shared/aliased dataset) showed development's three `contentItem` entries with 7/10/7
   `subItems` respectively, and production's with **zero** on all three. `tags` were fully intact in
   production, meaning the migration's source data was never the problem — the script just hadn't been run
   there.
2. **The script's own list-selection query would have found nothing even if re-run as-is.** The query
   filtered for `"fields.ui": "TimelineSection"` (exact match) — correct at the time this script was
   written, but the very next amendment above (`Explicit ui toggle...`) switched both environments' real
   list entries to `ui: "TimelineSectionWithBadges"`. An exact-match filter on the old value silently stops
   matching the moment that switch happens, turning every future run of this script — in either
   environment — into a silent no-op that reports finding zero qualifying lists rather than erroring.

## Decision (amendment)

Fixed the query to match both `ui` values in one request (`"fields.ui[in]":
"TimelineSection,TimelineSectionWithBadges"`), then ran the now-working script against `production` with the
repo owner's explicit go-ahead:

1. Dry run first — confirmed it found the same three entries, reused 15 of 18 already-existing production
   `icon`/`statItem` entries by name/title match (created only the three genuinely missing icons — `Vitest`,
   `Azure Devops`, `Jest` — mirroring exactly the three gaps the original development migration also had to
   fill), and produced an identical `subItems` link plan to what development already has.
2. Ran with `--apply`. Re-verified with a direct read (Management API) that production's three entries now
   show `subItems: 7/10/7`, matching development exactly — same tags, same order.
3. Verified against the **real Content Delivery API** (not just the Management API used to make the change),
   querying production's `contentListCollection` the same way the live app does — confirmed each entry's
   `subItemsCollection` now returns the correct tech-stack titles.

No other content type's drift (a much larger, pre-existing gap between the two environments across nearly
every content type — `page`, `contentItem`, `statItem`, `icon`, `link`, `image`, and more, most with
matched-count `missingInTarget`/`targetOnly` pairs suggesting independently-authored parallel content rather
than one environment being simply "behind" the other) was touched by this fix. That broader drift is a
separate, much larger investigation — see [`docs/contentful/environment-migration.md`](../contentful/environment-migration.md)
for the audit tooling that surfaced it — and was deliberately left alone here rather than blanket-migrated,
since `migrate-missing-content.ts` creates entries by ID and would have produced duplicate content rather
than reconciling it, for content that already exists independently (under different IDs) in both
environments.

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
