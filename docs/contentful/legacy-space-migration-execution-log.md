# Legacy Content Migration — Execution Log

Companion to [ADR-0019](../adr/0019-legacy-space-cross-schema-content-migration.md) (the decision) and
[legacy-space-migration-field-mapping.md](./legacy-space-migration-field-mapping.md) (the field-by-field
plan). This document records what was actually *done* — the execution, not the design.

**Date:** 2026-09-06
**Result:** legacy content is live in the target space (`llac041ddp2o`) `development` environment,
verified rendering correctly on all four pages.

---

## 1. Schema changes applied

The three additive fields identified in ADR-0019 were added to the target space via
`src/contentful/scripts/setup-content-model.ts`'s existing `upsertContentType` pattern, then run for
real against `llac041ddp2o`/`development`:

- `page.icon` (Link to `icon`) — preserves the page-heading icon visible on Experience/Projects/Skills.
- `seoMetadata.siteName` / `.publisher` / `.creator` / `.countryName` — preserves fields live in
  production's Open Graph and Twitter-card output today.
- `layout.favicon` (Link to Asset) — site-wide favicon, previously modeled per-page on `pageSeo`.

## 2. Two scripts written

- **`src/contentful/scripts/extract-legacy-content.ts`** — read-only. Hits the legacy space's GraphQL
  Content Delivery API directly (reusing the exact query shapes from `master`'s `src/queries/*.ts`) and
  writes a full dump to `.contentful-audit/legacy-extract.json` (gitignored — contains personal data:
  phone number, email, resume URL). Requires `LEGACY_CONTENTFUL_*`-prefixed vars in `.env.local`, added
  alongside (not replacing) the existing commented-out legacy block, specifically namespaced so they
  never collide with the active new-space `CONTENTFUL_*` vars.
- **`src/contentful/scripts/migrate-legacy-content.ts`** — transforms the extract per the mapping doc's
  rules and writes it into the target space via the Content Management API. Dry-run by default; writes
  only with `--apply`. Not idempotent across runs (the target space starts empty for this content) — see
  §4 for what that meant in practice.

## 3. Extraction — confirmed real, not test data

Running the extraction against the legacy space (`6mdmgsjzhh4y`/`development`) returned genuine
production content: real employers (Xcentium, iSchoolConnect Technologies), real project names and
descriptions, real dates, and a working resume asset URL. One curiosity: `userInfo.title` extracts as
`"Dev CV tesrt"` — a typo, but confirmed (via `GlobalHeader.tsx` on `master`) to be exactly what renders
in production's header today. Migrated as-is per your explicit call — this migration's job is content
parity, not content correction.

## 4. Pre-existing seed content — discovered, then removed

The dry run was clean, but applying it for real hit a path-uniqueness conflict on `/experience`: the
target `development` environment already held 4 placeholder `page` entries (labeled
`"Abbas Shaikh Development - {Page} Page"`, dated March–June 2026) plus 111 more entries/assets they
referenced (icons, content items, lists, sections, a `layout` entry, etc.) — all confirmed, by sampling,
to be lorem-ipsum-style sample content built while developing the composable UI components, not real
data. `video`/`article` entries (a separate, out-of-scope forward-looking feature per mapping doc §11)
were deliberately left untouched throughout.

With explicit confirmation, all 115 seed items were deleted (a one-off `cleanup-partial-migration.ts`
script, removed after use — see git history if it's needed again) before re-running the migration
cleanly. This also surfaced a routing convention fix: the seed pages used `/about` for the home page
(matching the legacy site's own routing), not `/` as first assumed — `migrate-legacy-content.ts` was
corrected to match.

## 5. Migration applied

`migrate-legacy-content.ts --apply` completed with **76 operations, 0 errors**, creating (in dependency
order): 5 assets, 5 image wrappers, 23 icons, 6 links, 11 content items, 4 statItems, 1 contentSection, 4
contentLists, 4 seoMetadata entries, 4 pages (`/about`, `/experience`, `/projects`, `/skills`), 4
navigation links, and 1 `layout` entry.

## 6. Verified rendering — and a stale-cache trap

A local dev server confirmed all four routes return `200` and render the real migrated content —
including the two fields recovered via transform logic rather than new schema fields:
`currentlyWorking` → "Present" (endDate left `null`, the existing `TimelineSection` adapter already had
this fallback) and `workedRemotely` → the "- Remote" suffix baked into `description`.

First pass showed `/projects` and `/skills` rendering **content from already-deleted entries** — Next.js's
fetch-response cache had persisted a stale GraphQL response from before the cleanup in §4. Clearing
`.next` and restarting resolved it. Worth remembering for any future re-verification after a Contentful
write: **clear `.next` first**, or the dev server can silently serve pre-migration content.

## 7. Bug found and fixed: `HeroBanner` parallax image

Once real content populated the home page banner, it was visibly broken — a large blank gap between the
banner image and the avatar. Root cause, in `motion-parallax.tsx` and `hero-banner.tsx` (pre-existing
code, unrelated to the migration itself — it just took real content to expose it):

1. The parallax wrapper (`m.div` in `MotionParallaxInner`) had no explicit height. The banner image's
   `h-[130%]` (intentionally oversized, to allow a scroll-parallax shift without revealing edges) is a
   percentage height, which CSS only resolves against a parent with an *explicit* height — with none set,
   it silently fell back to the image's natural intrinsic height instead of 130% of the banner box.
2. Even after giving the wrapper `h-full`, the image used `mt-[-15%]` — a margin, which CSS always
   resolves against the containing block's **width**, not height — as a proxy to vertically center the
   oversized image. That coupling only balances out for specific width/height ratios, and overshot badly
   under this layout's sidebar-narrowed content width, leaving the image shifted up and short of the
   container's bottom edge.

**Fix:** `motion-parallax.tsx`'s wrapper now gets `relative h-full` (both the live and the pre-hydration
placeholder branch); `hero-banner.tsx`'s image now centers with `absolute top-1/2 -translate-y-1/2` — a
self-referential transform that centers correctly regardless of the container's aspect ratio, replacing
the fragile width-based margin. Verified with a Playwright screenshot: the image now overflows the
visible window by an equal amount on both top and bottom (±47.25px in the verified case), filling it
edge-to-edge with zero gap — and incidentally reveals text on the banner graphic ("ABBAS SHAIKH /
Frontend Developer") that the bug had been cropping out entirely.

`MotionParallax` has exactly one consumer (`HeroBanner`), so this fix carries no other blast radius.

## 8. Housekeeping

- `.contentful-audit/` (extraction dumps, personal data) added to `.gitignore` — it wasn't ignored before.
- `FaLinkedin` and `FaDiscord` added to the curated icon registry (`icon-map.ts`, per
  [ADR-0016](../adr/0016-curated-static-icon-registry.md)) — 2 of the 4 social-link icons referenced by
  the migrated content weren't previously in the curated set and would have rendered as the broken-icon
  fallback otherwise.
- Stale `"Bento Skills Grid"` references corrected to `PanelShowcase` in
  `content-model-mapping.md`/`content-model-migration.md`, including the underlying diagram structure
  (panel level is `SkillSet`, not `SkillGroup` — see mapping doc §9 for why).

## Not done / follow-ups

- **Not committed to git as of this log** — see the commit(s) alongside it for what actually landed.
- **`production` environment untouched**, in either space — this migration only ever wrote to the new
  space's `development` environment, per ADR-0019's scope.
- **The intra-space `production`↔`development` audit/migration scripts** already in the repo
  (`audit-environment-content.ts`, `migrate-missing-content.ts`) remain a separate, unresolved concern —
  not part of this migration, not touched by it.
- **Manual review still worthwhile:** the `layout.title` typo ("Dev CV tesrt") and the `favicon`
  source-of-truth inconsistency noted in the mapping doc (§10) were migrated as-is; fixing either is a
  content edit in Contentful, not a script change.
