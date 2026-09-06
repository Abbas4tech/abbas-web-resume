# Legacy Contentful Space → Composable Space: Cross-Schema Content Migration

**Status:** accepted
**Date:** 2026-09-06
**Executed:** see [legacy-space-migration-execution-log.md](../contentful/legacy-space-migration-execution-log.md) for what actually happened, including a bug found and fixed along the way.

## Context

`master` (production) is served from a separate Contentful **space and account** (`.env.local`,
commented-out block: `CONTENTFUL_SPACE_ID=6mdmgsjzhh4y`), using the Content Delivery GraphQL API with an
entity-specific schema (`userInfo`, `Banner`, `JobExperience`, `ProjectCard`, `BioCard`, `SkillSet`,
polymorphic `page.pageData`). See `src/queries/*.ts` and `src/types/entries.ts` on `master`.

This branch (`feat/develop-draft/*`) targets a **different space**, `llac041ddp2o`, built around the
composable content model from [ADR-0003](./0003-composable-content-model.md) —
`page`/`contentList`/`contentSection`/`contentItem`/`layout`/`seoMetadata`/`icon`/`image`/`link`/`statItem`
— which is more scalable and is the one we intend to keep using going forward
([content-model.md](../contentful/content-model.md), `src/contentful/scripts/setup-content-model.ts`).

The goal is to bring the real production content (the actual resume/portfolio data currently live on
`master`) into the new space, so the new architecture can be validated against real data before it
replaces `master`.

A prior, unrelated exploration already exists in the working tree
(`src/contentful/scripts/audit-environment-content.ts`, `migrate-missing-content.ts`,
`.contentful-audit/report.{json,md}`) but those only diff `production` vs. `development`
**environments within the new space itself** — both sides already share the composable schema. That
tooling doesn't address the cross-space, cross-schema problem this ADR is about, and is out of scope
here (see Consequences).

Because the two schemas are structurally different — not just renamed fields, but a different shape
entirely (specific entities vs. a generic composable model) — this cannot be a field-for-field copy like
`migrate-missing-content.ts` does. It requires a transform step. The full field-by-field mapping,
including every gap where the new schema has no direct equivalent, is documented separately in
[legacy-space-migration-field-mapping.md](../contentful/legacy-space-migration-field-mapping.md) so this
ADR stays focused on the decision, not the mapping detail.

**The bar is content parity, not just schema fit.** The goal isn't merely that legacy content *can* be
expressed in the composable model — it's that the migrated `development` environment shows the same
information visitors see on production today. That required checking the *legacy* production components
(`git show master:src/app/(app)/**`, `ExperienceCard.tsx`, `ProfileBanner.tsx`), not only the new target
adapters, to see what's actually rendered rather than what a query merely fetches. That check reversed
several early "drop this, no slot for it" calls once it was clear the field in question was genuinely
visible on production (see the mapping doc's inline "Corrected"/"Recovered" notes) — a field is only
dropped now when it's confirmed either dead in the legacy frontend (never queried/rendered there either)
or a presentation mechanism this branch has already, deliberately, superseded (CMS-driven animation).

## Decision

1. **Scope:** migrate content only in the direction legacy space (`6mdmgsjzhh4y`) → new space
   (`llac041ddp2o`). The new-space environment sync (`production` ↔ `development` within
   `llac041ddp2o`) is a separate, already-tooled concern and is not part of this effort.
2. **Target:** the new space's `development` environment — the one this branch already runs against.
   Nothing is written to `production` (of either space) by this migration.
3. **Extraction is read-only GraphQL against the legacy space**, reusing the existing queries in
   `src/queries/*.ts` (master) rather than requiring Management API access to the legacy space — the
   legacy `.env.local` block only ever had a Content Delivery API key, and the entire legacy content
   surface is already covered by those five queries (`getAppData`, `getHomePageQuery`,
   `getExperiencePageQuery`, `getProjectsPageQuery`, `getSkillsPageQuery`, `getMetadataQuery`).
4. **Writing uses the Content Management API** against the new space, following the same
   dependency-first, dry-run-by-default pattern already established in `migrate-missing-content.ts`
   (assets before entries, entries before the entries that link them, nothing written without
   `--apply`).
5. **Assets are re-uploaded, not linked** — Contentful assets are space-scoped. Every legacy Asset
   (profile picture, banner image, project thumbnails, resume PDF, social icons) is downloaded from its
   legacy CDN URL and re-created in the new space, producing new asset IDs/URLs. `alternativeText`
   (required on the new `image` wrapper type) is derived from the legacy `Asset.description`, falling
   back to `Asset.title`, and any asset without either is logged for manual review rather than migrated
   with an empty/placeholder alt text.
6. **Legacy entity-specific content collapses into the existing generic shapes** —
   `contentItem`/`statItem`/`link`/`icon`/`image` — with no new content types. `userInfo` → `layout` is
   the one exception, since `layout` already is the generic "site-wide settings" shape for that data. A
   field is dropped only when confirmed dead in the legacy frontend or superseded by this branch's own
   redesign — never merely because the first-guess target mapping lacked an obvious slot.
7. **Three additive, site-wide schema changes are made** for live production features with no home in
   the new schema at all: `layout` gains `favicon`; `seoMetadata` gains `siteName`, `publisher`,
   `creator`, `countryName`; `page` gains `icon`. Dropping any of these would be a visible regression (no
   browser tab icon; degraded Open Graph/Twitter-card output; page titles losing their heading icon on
   Experience/Projects/Skills) rather than architectural cleanup, so they're added via the same
   `upsertContentType` pattern `setup-content-model.ts` already uses for every other field.
8. **Skills page reuses `PanelShowcase`, panel-per-`SkillSet`.** Not `CardGrid` (no rendering path for
   progress bars) and not the never-deployed `"BentoSkillsGrid"` some docs mention. The panel level took
   two passes to get right: `SkillGroup` was tried first because a `statItem` row shows no label of its
   own, but checking `master:src/app/(app)/skills/page.tsx` shows `SkillGroup.title` is never rendered
   there either (only used as a React key) — so the panel is `SkillSet` (title + icon, both confirmed
   visible on production), and each `SkillGroup` becomes one unlabeled progress-bar-and-icon-cluster row.
9. **`JobExperience` fields map to the specific slots `TimelineSection` already renders**, not a general
   "fold into text": `location` (+ `workedRemotely`, baked in as a `" - Remote"` suffix) →
   `contentItem.description` (the "Place" row); tech-stack skill names → `contentItem.tags` (the "Tech
   Stack" line); `currentlyWorking` → `endDate` left `null`, since the adapter already falls back to
   "Present" when it's empty. All three booleans/text fields are **recovered via transform logic**, not
   dropped — an earlier pass of this decision wrongly dropped `workedRemotely`/`currentlyWorking` as
   unrenderable before their production rendering was actually checked. `contentItem.subItems` stays
   empty on `JobExperience` (only `PanelShowcase` reads it); the remaining per-field icons
   (`roleIcon`/`locationIcon`/`durationIcon`/`techStackIcon`) have no rendering path on either side and
   are dropped.
10. **The Home page's `BioCard` row uses `contentList` (`ui: SplitContentPanel`)**, not `CardGrid` —
    `CardGrid`'s `MediaCard` has no field for a standalone icon or a stat's value at all, and would
    render Home's stat row with the numbers missing. `SplitContentPanel`'s `StatGroup` component
    (icon + label + value) is the exact match; `BioCard.value` maps to `contentItem.description`
    (confirmed via `split-content-panel.adapter.ts`), not `subtitle` as an earlier pass assumed.
11. **The Home banner stays page-local, not global chrome.** Production renders `ProfileBanner` in the
    shared app shell (every page); this branch's shared chrome (`ContentfulLayout`) has no equivalent
    slot. Confirmed: keep it Home-page-only — the header/drawer/dock navigation already built on this
    branch supersedes the "banner everywhere" pattern as part of the broader redesign; adding a
    persistent-banner slot to `ContentfulLayout` would be new UI work, out of scope here.
12. **No new Contentful space is created.** The scalable space already exists and is the one this branch
    builds against; migration flows into it, not into a fresh third space.

All schema-gap and content-parity items raised during review are resolved by decisions 6–11 above; none
remain open.

## Considered Options

- **Field-for-field copy (reuse `migrate-missing-content.ts` as-is):** rejected — it assumes source and
  target share content-type IDs and field shapes, which is false across these two schemas.
- **Manual re-entry through the Contentful web UI:** rejected for the bulk of the content (resume/project
  data spans dozens of entries with cross-references) but may still be the right call for the handful of
  one-off fields called out above once they're this small in number.
- **Migrate straight into `production` (new space):** rejected for now — `development` lets the new
  architecture be validated against real data first, matching how this branch already works.

## Consequences

- The intra-space `production`↔`development` audit/migration scripts already in the working tree remain
  unused by this effort. They aren't wrong, just answering a different question — worth either
  repurposing them later for promoting migrated content from `development` to `production` within
  `llac041ddp2o`, or deleting them if they turn out to be a false start. Not resolved by this ADR.
- Some legacy content will not survive the migration byte-for-byte — CMS-driven animation flags
  (`bannerAnimation`/`contentAnimation`/`headingAnimation`) are dropped intentionally (motion is now
  code-driven per [ADR-0012](./0012-motion-animation-strategy.md)), and a handful of per-entry decorative
  icons with no rendering path on either side (`roleIcon`, `locationIcon`, `durationIcon`,
  `techStackIcon`, `SkillSet.skillsetIcon`, `SkillGroup.title`) are dropped as confirmed-dead. Everything
  else that's actually visible on production today — including `workedRemotely`/`currentlyWorking` and
  `SkillSet.icon`, both wrongly dropped in earlier passes of this decision — is preserved.
- The profile banner (avatar, cover image, social links) will only appear on the new site's Home page,
  not on every page as it does on production — an accepted, deliberate difference from the legacy site's
  navigation pattern, not a migration gap (see decision 11).
- New asset IDs and CDN URLs mean nothing in the new frontend can assume legacy asset URLs — already true
  today since the new frontend never referenced the legacy space.
- The `docs/domain/content-model-mapping.md` / `docs/research/content-model-migration.md` docs describe a
  `"Bento Skills Grid"` UI variant that doesn't exist in the deployed `contentList.ui` schema; both should
  be corrected to say `PanelShowcase` as part of executing this migration.

## Next Steps (decision made; implementation not yet started)

1. Apply the three additive schema changes via `setup-content-model.ts`'s `upsertContentType` pattern:
   `layout.favicon`, `seoMetadata.{siteName,publisher,creator,countryName}`, and `page.icon`.
2. Write a read-only extraction script against the legacy space's GraphQL API, producing a JSON dump —
   mirrors `audit-environment-content.ts`'s "never mutates" posture, just against the other space.
3. Write the transform layer implementing the mapping doc's rules (including the platform-name →
   react-icon lookup table for social links, built from the real extracted data).
4. Extend `migrate-missing-content.ts`'s dependency-first, dry-run-by-default write pattern to consume
   the transformed output and write into `llac041ddp2o`/`development`.
5. Correct the stale `"Bento Skills Grid"` references in `content-model-mapping.md` /
   `content-model-migration.md` to `PanelShowcase`.
6. Spot-check the migrated pages render correctly before considering promotion to `production`.
