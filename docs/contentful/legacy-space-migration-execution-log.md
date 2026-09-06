# Legacy Content Migration — Execution Log

Companion to [ADR-0019](../adr/0019-legacy-space-cross-schema-content-migration.md) (the decision) and
[legacy-space-migration-field-mapping.md](./legacy-space-migration-field-mapping.md) (the field-by-field
plan). This document records what was actually *done* — the execution, not the design.

**Date:** 2026-09-06 (development), 2026-09-07 (production)
**Result:** legacy content is live in both the target space's (`llac041ddp2o`) `development` and
`production` environments, verified rendering correctly on all four pages in each.

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

## 3. Extraction — confirmed real, but initially from the wrong environment

Running the extraction against the legacy space (`6mdmgsjzhh4y`/`development`) returned genuine content —
real employers (Xcentium, iSchoolConnect Technologies), real project names and descriptions, real dates,
a working resume asset URL — which was taken as sufficient confirmation it was safe to migrate. **That
was an incomplete check.** It confirmed the data wasn't placeholder junk, but never confirmed it was the
data actually serving `abbas-web-resume.vercel.app` — and it wasn't.

**Corrected 2026-09-07**, after the user compared screenshots of the real production site against the
migrated result and found the bio text, header title, and profile photo all different. Root cause: the
legacy `.env.local` block this migration's credentials were copied from was originally captured via
`vercel env pull` with no `--environment` flag, which **defaults to pulling Development-scoped
variables** — not Production. `CONTENTFUL_ENVIRONMENT_ID=development` and its API key were real, working
credentials, just for the wrong Contentful environment: a developer's own working copy (title `"Dev CV
tesrt"`, an older bio paragraph), not what Vercel's production deployment actually uses.

The real production credentials were retrieved via `vercel env pull .env.production.local
--environment=production`, which confirmed `CONTENTFUL_ENVIRONMENT_ID=production` (space ID and the
page/app-data entry keys are identical between the two scopes — only the environment and its API key
differ). `.env.local`'s `LEGACY_CONTENTFUL_*` block was corrected to match, and both `development` and
`production` in the target space were wiped and re-migrated from a fresh extraction against the correct
source. Verified against a local dev server that the result now matches the live production site exactly
(title "Abbas CV", the real bio paragraph, the real resume file).

**Lesson for next time:** "the data looks real" is necessary but not sufficient evidence a migration
source is correct — it rules out placeholder/test data, but not a stale or wrong-environment *real*
snapshot. The only check that actually catches the latter is diffing against the live, currently-serving
site itself, which is what should have been done before the first migration run rather than after.

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

## 9. Extended to the target space's `production` environment (2026-09-07)

The same migration was repeated against `llac041ddp2o`'s `production` environment — the intra-space
scope boundary from ADR-0019 (§1: "environment sync... is a separate, already-tooled concern") turned
out to be unavoidable in practice, because `production`'s schema and content had never been kept in sync
with `development` at all. Concretely, before this could run, `production` was missing:

- The **`statItem` content type entirely** (didn't exist).
- Most fields on `contentItem`, `icon`, `page`, `layout`, `link`, and `seoMetadata` — `layout` in
  particular had only `internalName` and `globalSeo`, none of the ~13 other fields the migration needs.
- The same placeholder/seed content as `development` had (confirmed by **identical entry IDs** —
  `1mmE4HdI3z9NcmpU6FxBoz` "Abbas Shaikh Banner" and others — proving `production` and `development` were
  branched from the same scaffold and `production` was simply never updated since March/May 2026).

Sequence actually run: schema sync (`setup-content-model.ts` pointed at `production`) → seed content
cleanup (13 entries/assets, same rationale as §4) → schema sync retried → migration (`--apply`, pointed
at `production`) → verified via a local dev server with `CONTENTFUL_ENVIRONMENT=production`.

**A schema-sync side effect required a real fix, not a workaround.** The first schema-sync attempt failed
on `contentList` — Contentful rejects changing a field's *type* on an already-published field
unconditionally (this is a platform restriction, not an entry-validation check). The path of least
resistance — leave `contentList.description` as the pre-existing `Text` type instead of the canonical
`RichText`, since the migration itself never writes to that field — got the schema sync unblocked, but
broke every single page query at runtime: the shared GraphQL query includes a `ContentList` fragment
selecting `description { json }` (RichText shape) on nearly every page, and Contentful returns a hard
error (`Field "description" must not have a selection since type "String" has no subfields`) the moment
that shape doesn't match, regardless of whether any entry actually has a value there.

**Fix:** Contentful's only supported path to change a field's type is omit → publish → delete → publish →
re-add with the new type → publish. Confirmed zero `contentList` entries held any value in `description`
first (safe — nothing to lose), then ran that three-step sequence. Verified via direct GraphQL
introspection (`__type(name: "ContentList")`) that `description` now reports as the `RichText` object
shape, and via the local dev server that all four routes render correctly.

**Lesson for next time:** don't route around a Contentful "can't change this" error by leaving a type
mismatched — if the canonical schema says `RichText`, either match it (via omit/delete/recreate, safe
when the field is unused) or change the canonical schema to genuinely accept the divergence. A "doesn't
matter, we don't write to it" field-type shortcut still has to satisfy the *read* side (the GraphQL query
shape), which isn't scoped per-field the way writes are.

## Not done / follow-ups

- **`production` environment now holds the same real content as `development`** (§9) — both are current
  as of this log.
- **The intra-space `production`↔`development` audit/migration scripts** already in the repo
  (`audit-environment-content.ts`, `migrate-missing-content.ts`) remain available for future use but
  weren't what closed the schema/content gap described in §9 — that was done directly via the same
  scripts as the cross-space migration itself, pointed at a different environment.
- **Both concerns raised in earlier passes of this doc turned out to be artifacts of the wrong-environment
  data, not real issues**: `layout.title` is correctly "Abbas CV" in the real production data (no typo —
  "Dev CV tesrt" was the developer's own dev-environment value); the `favicon` is identical across all
  four pages in the real data (the earlier "Skills page points at a different favicon" inconsistency was
  specific to the dev-scoped snapshot). Nothing left to manually review on either front.
