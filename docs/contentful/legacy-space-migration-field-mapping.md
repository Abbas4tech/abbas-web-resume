# Legacy Space → Composable Space: Field-by-Field Migration Mapping

Companion doc to [ADR-0019](../adr/0019-legacy-space-cross-schema-content-migration.md). This is the
authoritative mapping used by the migration scripts — every legacy field is accounted for as either
**mapped**, **transformed**, or **dropped (with reason)**.

Source: legacy space (`CONTENTFUL_SPACE_ID` in the commented-out block of `.env.local`), GraphQL
Content Delivery API, schema in `src/queries/*.ts` + `src/types/entries.ts` (master branch).
Target: new space `llac041ddp2o`, `development` environment, schema in
`src/contentful/scripts/setup-content-model.ts` (this branch).

Legend: ✅ direct/clean mapping · 🔁 transformed · ⚠️ needs your decision · ❌ recommended drop

**2026-09-06 update:** the bar for this migration isn't just schema fit — it's that the migrated site
should show the same information the legacy production site does. That required checking not only the
*target* adapters but the *legacy* production components (`git show master:src/app/(app)/**`,
`ExperienceCard.tsx`, `ProfileBanner.tsx`) to see what's actually rendered today, not just what the
GraphQL queries fetch. That surfaced several corrections to earlier passes of this document:

- `contentList.ui` for Skills is `PanelShowcase`, not `CardGrid` (no rendering path for progress bars).
- `JobExperience.location`/`techStack` map to `contentItem.description`/`tags` specifically — precise
  fields `TimelineSection` already renders, not a vague text fold.
- `JobExperience.workedRemotely`/`currentlyWorking` **are visibly rendered on production** (a "- Remote"
  suffix; "Present" vs. a fixed end date) — an earlier pass wrongly dropped them. They're recovered via
  transform logic, not new fields. See §5.
- The Home page's `BioCard` row needs `contentList.ui: SplitContentPanel` (using the already-built
  `StatGroup` component), not `CardGrid` — `CardGrid`'s `MediaCard` has no slot for a stat's `value` or a
  standalone icon at all. `BioCard.value` maps to `contentItem.description`, not `subtitle`. See §4.
- `SkillSet.icon` **is visibly rendered** on production (next to each skill category heading) — an
  earlier pass wrongly grouped it with the genuinely-unused `skillsetIcon` and dropped both. The panel
  level in `PanelShowcase` is `SkillSet`, not `SkillGroup` — production never shows `SkillGroup.title`
  either, so an earlier "fix" that promoted it into the panel heading was solving a problem that doesn't
  exist. See §9.
- `Banner` (avatar/cover/social-links) renders in the *shared app shell* on production — every page, not
  just Home. Confirmed decision: Home-page-only in the new site (matches the header/drawer/dock chrome
  already built), not replicated as global chrome. See §2.
- `page.pageIcon` is visibly rendered next to page titles on Experience/Projects/Skills; the new `page`
  type has no icon field. Confirmed decision: add `page.icon` (additive). See §3.

---

## 1. `userInfo` (AppData) → `layout`

| Legacy field | New field | | Notes |
|---|---|---|---|
| `title` | `layout.title` | ✅ | |
| `role` | `layout.role` | ✅ | |
| `resume` (Asset) | `layout.resume` (Asset) | ✅ | Direct asset-to-asset re-upload, no wrapping. |
| `resumeIcon` (Icon) | `layout.resumeIcon` (→ `icon` entry) | 🔁 | See §7 icon transform. |
| `themeList` / `defaultTheme` | same | ✅ | Validate against the new `DAISY_THEMES` enum in `setup-content-model.ts`; anything not in that list needs to be coerced (the script already has a `sanitizeLayoutEntries` precedent for this). |
| `themeIcon` | `layout.themeIcon` | 🔁 | Icon transform. |
| `layoutSettings.drawerSide` / `drawerVariant` | `layout.drawerSide` / `drawerVariant` | ✅ | |
| `pagesCollection` (MetaPage[]) | `layout.navigationLinks` (Link[]) | 🔁 | See §6. |
| — | `layout.globalSeo` | ❌ n/a | New-only field, nothing to migrate from. |
| — | `layout.email`, `layout.footerText` | ❌ n/a | New-only fields; no legacy source. You'll need to fill these manually post-migration. |
| — | `layout.siteLogo` | ⚠️ | See §4 — candidate for `Banner.profilePicture` or a dedicated logo asset. Confirm which legacy asset is the logo vs. the banner. |

## 2. `Banner` → a single `contentItem` (resolved)

**Decision (2026-09-06):** rather than distributing `Banner`'s fields across `layout` fields and a
separate social-links structure, it collapses into **one `contentItem`** — consistent with the whole
point of the composable model: don't grow new fields/content types for something the generic shape
already holds. `contentItem` already has both an `image` field and a `links` array — that's the entire
banner.

| Legacy field | New destination | | Notes |
|---|---|---|---|
| `title` | (duplicate of `userInfo.title`) | ❌ | Redundant, already covered by `layout.title`. |
| `profilePicture` (Asset) | Home Banner `contentItem.image` | ✅ | The avatar image (`HeroBanner.adaptHeroBanner` maps this to `avatarImage`). |
| `bannerImage` (Asset) | Home Banner `contentItem.coverImage` | ✅ | `contentItem` has both `image` and `coverImage` — exactly enough slots for both legacy images without adding anything. |
| `bannerAnimation` | — | ❌ | Motion is now code-driven per [ADR-0012](../adr/0012-motion-animation-strategy.md)/[0014](../adr/0014-advanced-motion-integration.md)/[0015](../adr/0015-motion-components-in-element-layer.md), not CMS-driven. Intentional drop. |
| `socialLinksCollection` (Asset[]) | Home Banner `contentItem.links` (link[]) | ✅ | Confirmed against `src/components/ProfileBanner.tsx` (master): each item is an `Asset` where `title` = platform name (e.g. "GitHub"), `description` = the outbound profile URL (repurposed field, not really a description), and `url`/`width`/`height` = the brand logo image itself. Maps to one `link` entry per platform inside the same `contentItem.links` array: `link.text = title`, `link.url = description`. |

The `HeroBanner` `contentSection` on the home page's `topContentArea` now has exactly one `entry`: this
one `contentItem`. No separate social-links content type or list needed.

**Confirmed (2026-09-06):** on production, `ProfileBanner` renders in the *shared app shell*
(`(app)/layout.tsx`), above `{children}` — every page shows it, not just Home. This branch's new shared
chrome (`ContentfulLayout`: `AppHeader` + `SidebarNav` + `BottomDock`, driven by the `layout` content
type) has no equivalent slot. Decision: keep this Home-page-only — the new header/drawer/dock navigation
already supersedes the "banner visible everywhere" pattern as part of the broader redesign this branch
represents; adding a persistent-banner slot to `ContentfulLayout` would be new UI work, out of scope for
a content migration.

⚠️ Still open: `link.icon` expects an Entry Link to the `icon` content type (a react-icon name/library
per [ADR-0016](../adr/0016-curated-static-icon-registry.md)), not the raw brand-logo image Asset the
legacy data actually stores. Needs a small platform-name → react-icon lookup table (e.g.
`GitHub → FaGithub`, `LinkedIn → FaLinkedin`) built once the real legacy entries are pulled — mechanical,
not a design decision, since react-icons almost certainly already has each brand icon in the curated
registry.

## 3. `page` (polymorphic `pageData`) → `page` + `contentList`/`contentSection`

The legacy site had 4 distinct page shapes; the new model expresses all of them as one generic `page`
built from `topContentArea`/`bottomContentArea`. This mirrors what's already documented in
[`docs/domain/content-model-mapping.md`](../domain/content-model-mapping.md) — this table makes it
migration-executable.

| Legacy page | New `page.path` | Top/bottom content area composition |
|---|---|---|
| Home (`HomePageData`) | `/` | `contentSection` (`ui: HeroBanner`) for the banner + a `contentList` (`ui: SplitContentPanel`, `entries: Custom`, `customEntries`) for the `BioCard` row — see §4 |
| Experience (`ExperiencePageData`) | `/experience` | `contentList` (`ui: TimelineSection`, `entries: Experience`) |
| Projects (`ProjectsPageData`) | `/projects` | `contentList` (`ui: CardGrid` or `PanelShowcase`, `entries: Projects`) |
| Skills (`SkillsPageData`) | `/skills` | `contentList` (`ui: PanelShowcase`, `entries: Skills`) — see below |

`page.title`, `page.description` (RichText) map 1:1 from `HomePageData.description` — this is exactly
the field this branch just added (`0114189 feat: add rich text page description field`), so Home is the
one page with zero ambiguity.

`page.description` for Experience/Projects/Skills: those pages had **no** page-level description in
the legacy schema (only entry-level `description`), so those pages' new `description` field starts empty.

**Resolved (2026-09-06):** `pageIcon` (present on Experience/Projects/Skills `page` queries) has no field
on the new `page` type at all — the new `page` schema is `internalName, path, title, description,
topContentArea, bottomContentArea, seo`, no icon. Confirmed via `git show master:src/app/(app)/skills/
page.tsx` (and `projects/page.tsx`) that this genuinely renders — `<PageHeading><Icon {...pageIcon}/>
{title}</PageHeading>` — next to the page title, a *different* location from `MetaPage.pageIcon` (which
renders in the nav sidebar/dock, per §6). These are two separately-visible icons, not one redundant
value as an earlier pass of this doc assumed. Decision: add a `page.icon` field (Link to `icon` entry,
additive) so the page-heading icon survives migration; `MetaPage.pageIcon` → `link.icon` (§6) is
unaffected and still separately needed for nav.

**Resolved (2026-09-06), corrected same day after checking the real component code:** the Skills page has
no matching `contentList.ui` variant — `docs/research/content-model-migration.md` and
`docs/domain/content-model-mapping.md` both describe a `"Bento Skills Grid"` UI, but the *actual*
validated enum in `setup-content-model.ts` (the schema that's really deployed) is only `TimelineSection |
CardGrid | PanelShowcase | SplitContentPanel` — the docs and the deployed schema had drifted. First pass
of this decision picked `CardGrid` (no schema change, same variant as Projects); checking
`card-grid.adapter.ts` shows that was wrong — it only reads `title`/`description`/`links`/`image`, with no
path for `progress` or icon clusters at all, so Skills would render with no progress bars and no per-skill
icons. **Corrected decision: reuse `PanelShowcase` instead** — `panel-showcase.adapter.ts` reads exactly
`title` (→ `SectionHeading`), `icon`, and `subItems[].{progress, icons}` (→ one `IconProgressRow` +
`IconCluster` per row), which is `SkillGroup`'s shape verbatim. Still no schema change — `PanelShowcase`
already exists in the deployed `contentList.ui` enum. Both docs should be corrected to drop the
`BentoSkillsGrid` reference (in favor of `PanelShowcase`) when this migration is executed.

`contentAnimation` / `headingAnimation` (present on every legacy page): ❌ dropped, same reasoning as
`bannerAnimation` above.

## 4. `BioCard` → `contentItem`, rendered via `contentList` (`ui: SplitContentPanel`)

**Corrected 2026-09-06.** Production's `about/page.tsx` renders each `BioCard` as
`<Stat><StatFigure><Icon/></StatFigure><StatTitle>{title}</StatTitle><StatDescription>{value}</
StatDescription></Stat>` — icon, title, *and* value all visible. The new component with this exact
shape is `StatGroup` (`icon` + `label` + `value`), used by the `SplitContentPanel` block
(`split-content-panel.adapter.ts`: `label: item.title, value: item.description, icon: item.icon`) — not
`CardGrid`/`MediaCard`, which has no field for a standalone icon or a `value` at all and would render
Home's stat row with blanks where the numbers should be.

| Legacy | New | | Notes |
|---|---|---|---|
| `title` | `contentItem.title` | ✅ | Rendered as `StatGroup.label`. |
| `value` | `contentItem.description` (plain Text) | 🔁 | **Corrected:** not `subtitle` — `adaptSplitContentPanel` reads `item.description` for `StatGroup.value`. |
| `icon` | `contentItem.icon` | 🔁 | Icon transform, §7. Rendered as `StatGroup.icon`. |
| — | `contentItem.entryField` (required) | 🔁 | New required display field with no legacy source — generate as `` `BioCard: ${title}` `` during migration. |

`HomePageData.description` (the intro paragraph above the stats) stays mapped to `page.description`, not
`contentList.description` — confirmed by reading `src/app/(app)/[[...slug]]/page.tsx` on this branch: it
already renders `page.description` in a `bg-base-300 p-4 rounded` box, styled identically to production's
own intro-paragraph box. No change needed there; this was correct from the first pass.

## 5. `JobExperience` → `contentItem`

This is the highest-friction mapping — one legacy entity fans out across `contentItem` plus several
`statItem` (badge) entries.

| Legacy field | New destination | | Notes |
|---|---|---|---|
| `company` | `title` | ✅ | |
| `position` | `subtitle` | ✅ | Rendered by `TimelineSection` as the "Role" meta row. |
| `description` (RichText) | `body` (RichText) | ✅ | Direct RichText-to-RichText copy — use `body`, not `description` (which is plain `Text` in the new schema). Rendered as the entry's main text block. |
| `startDate` / `endDate` | `startDate` / `endDate` | ✅ | Rendered by `TimelineSection` as the "Duration" meta row. |
| `location` + `workedRemotely` (bool) | `description` (plain Text) | 🔁 | **Corrected 2026-09-06:** `timeline-section.adapter.ts` reads `item.description` for the "Place" meta row (map-pin icon) — precise, not a guess. Confirmed via `ExperienceCard.tsx` on master that `workedRemotely` renders as a `" - Remote"` suffix appended to the location text (`${location}${workedRemotely ? " - Remote" : ""}`) — real, visible content. **Recovered, not dropped:** the transform script bakes this suffix directly into the `description` string it constructs (e.g. `"Bangalore, India - Remote"`), reproducing production's exact rendered text with no new field. |
| `techStack` (SkillGroup skill names) | `tags` (string[]) | 🔁 | **Corrected 2026-09-06:** `timeline-section.adapter.ts` joins `item.tags` into one comma-separated line under a "Tech Stack" icon — it never reads `subItems`. So the skill *names* go in `tags` (e.g. `["React", "Node.js", "TypeScript"]`); this is a real UI behavior, not the docs' earlier guess. |
| `techStack.skillIconsCollection` (per-skill icons) | — | ❌ | **Corrected 2026-09-06:** since tech stack renders as a plain joined `tags` string, there is no rendering path for per-skill icons here (unlike on the Skills page, where `PanelShowcase` does show icon clusters). Dropped — same "no slot, no field" reasoning as the rest of this table. |
| `companyIcon` | `icon` | 🔁 | Chosen as the *primary* icon since `contentItem.icon` only holds one value. Rendered by `TimelineSection` as `indicatorIcon`. |
| `roleIcon` | — | ❌ | **Resolved (2026-09-06):** dropped rather than fanned out into an extra `statItem` badge. `position` (text, in `subtitle`) already carries the information; keeping `JobExperience` as one clean `contentItem` beats inflating entry count for a decorative icon. |
| `locationIcon` | — | ❌ | Dropped — same reasoning as `roleIcon`; the location *text* is kept (see above), just not its icon. |
| `durationIcon` | — | ❌ | Dropped — `startDate`/`endDate` already carry the duration as structured data. |
| `techStackIcon` | — | ❌ | This was a section-header icon for the tech-stack group as a whole, not an individual skill. No clean generic slot for "icon of a sub-list" — dropped as cosmetic. |
| `currentlyWorking` (bool) | `endDate` left `null` | 🔁 | **Corrected 2026-09-06:** confirmed via `ExperienceCard.tsx` that `currentlyWorking` controls whether the end date shows "Present" instead of a fixed date — real, visible content, not a droppable flag. **Recovered, not dropped:** `timeline-section.adapter.ts` already has `item.endDate?.toLocaleString(...) || "Present"` — the new UI *already* shows "Present" whenever `endDate` is empty. Transform rule: when `currentlyWorking` is `true`, migrate `endDate` as `null` rather than copying the legacy value. No new field needed. |
| — | `entryField` (required) | 🔁 | Generate as `` `Experience: ${company}` ``. |
| — | `subItems` | ❌ n/a | Deliberately left empty for `JobExperience` — `TimelineSection` never reads it (only `PanelShowcase`, used for Skills, does). Populating it here would be inert data with no rendering effect. |

## 6. `MetaPage` → `link` entries in `layout.navigationLinks`

| Legacy field | New field | | Notes |
|---|---|---|---|
| `title` | `link.text` | ✅ | |
| `pageUrl` | `link.page` (Entry link to `page`) preferred over `link.url` | 🔁 | Resolve `pageUrl` to the matching migrated `page` entry by `path` and link it directly — this is exactly what `link.page` is for (internal routing), rather than storing a raw string in `link.url`. |
| `pageIcon` | `link.icon` | 🔁 | Icon transform. Renders in the nav sidebar/dock — a different, separately-visible icon from the per-page `page.icon` resolved in §3 (that one renders next to the page title itself). Both are needed. |
| `isDefaultPage` | — | ❌ | Derivable from the linked page's `path === "/"` — no separate flag needed. |

## 7. `Icon` → `icon` (structural transform, not a decision point)

| Legacy | New | |
|---|---|---|
| `name` | `name` | ✅ |
| `iconCode` | `iconCode` | ✅ |
| `showTooltip` | `showTooltip` | ✅ |
| `classes` (e.g. `"fa fa-github"`) | `library` (e.g. `"fa"`) + `title`/`color` unset | 🔁 | Per [ADR-0016](../adr/0016-curated-static-icon-registry.md), the new model wants structured `library` rather than a raw CSS class string. Parse the library prefix out of `classes`/`name` mechanically — this is a deterministic string transform, no human decision needed, but the migration script must verify every parsed `library` value actually exists in the curated static registry from ADR-0016, or the icon will silently fail to render. |

**Corrected 2026-09-07:** the `name → name` row above is a direct mapping and was always correct — legacy
`Icon.name` is already the human-facing label (e.g. "Typescript", "Github"). The bug was in the *first
implementation* of this mapping (`migrate-legacy-content.ts`), which computed something else — the
react-icon component name parsed from `iconCode` — instead of using `icon.name` directly, because
[`content-model.md`](./content-model.md) itself documented the new `name` field as "the exact React-icon
name," contradicting what `icon.tsx`'s own `IconProps.name` doc comment (*"Accessible name / tooltip
text"*) actually says. `content-model.md` has been corrected. Lesson: when a doc and the component's own
code comments disagree, the code is authoritative — check it, not just the doc, before writing a
transform. See the [execution log](./legacy-space-migration-execution-log.md) §10 for the fix.

## 8. `ProjectCard` → `contentItem`

| Legacy | New | | Notes |
|---|---|---|---|
| `title` | `title` | ✅ | |
| `description` (plain string) | `description` (Text) | ✅ | Stays plain — unlike `JobExperience`, this was never RichText in the legacy schema. |
| `thumbnail` (Asset) | `image` (via `image` wrapper entry) | 🔁 | `image.alternativeText` is required in the new schema; legacy `Asset.description` is the best source, fall back to `Asset.title`. |
| `deployedLink` | `links` (array with one `link` entry, `url` = deployedLink) | 🔁 | |
| `deployedLinkIcon` | that same `link.icon` | ✅ | Fits cleanly — `link` already has an `icon` field for exactly this. |

## 9. `SkillSet` / `SkillGroup` → `contentList` (`ui: PanelShowcase`) / `contentItem` / `statItem`

**Corrected 2026-09-06, then corrected again same day** after checking production's actual
`skills/page.tsx`, not just the new adapter code. The first correction (panel-per-`SkillGroup`) reasoned
purely from `panel-showcase.tsx` — since a `statItem` row shows no label, `SkillGroup.title` had to become
the panel heading to stay visible *somewhere*. Checking production shows that reasoning solved a problem
that doesn't exist: `git show master:src/app/(app)/skills/page.tsx` confirms `SkillGroup.title` is
destructured but **never rendered** — it's only used as a React `key`. What production *does* render is
`SkillSet.icon` + `SkillSet.title` as one heading per set (`<SkillTitle><Icon .../>{title}</SkillTitle>`),
followed by one unlabeled progress-bar-and-icon-cluster row per `SkillGroup` inside it — which is exactly
`PanelShowcase`'s shape with the panel at the **`SkillSet` level**, not `SkillGroup`:

| Legacy | New | | Notes |
|---|---|---|---|
| `SkillSet.title` | one `contentItem` per `SkillSet` (as `customEntries`), `contentItem.title` | ✅ | Rendered as the panel's `SectionHeading` text — confirmed live on production today. |
| `SkillSet.icon` | that same `contentItem.icon` (`panel.headingIcon`) | ✅ | **Corrected:** an earlier pass grouped this with `skillsetIcon` and dropped both — wrong. `getSkillsPageQuery.ts` fetches `icon` (not `skillsetIcon`) and `skills/page.tsx` renders it right next to the title. This one is real and must be preserved. |
| `SkillSet.skillsetIcon` (Asset) | — | ❌ | Confirmed genuinely dead: `getSkillsPageQuery.ts` never fetches this field at all, despite it existing on the `SkillSet` TypeScript type — it cannot possibly render today. Safe to drop. |
| `SkillGroup.title` | — | ❌ n/a | Confirmed not rendered on production (only used as a React list `key`) — no loss in leaving it out; `statItem.title` isn't read by `panel-showcase.tsx` on the new side either, so there'd be nowhere for it to show up regardless. |
| `SkillGroup.skillProgress` | one `statItem` per group, in the `SkillSet` contentItem's `subItems`, `statItem.progress` | 🔁 | One row per `SkillGroup`, matching `PanelShowcaseRow` one-for-one — and matching production's one-progress-bar-per-group layout exactly. |
| `SkillGroup.skillIconsCollection` | that same `statItem.icons` | 🔁 | Rendered as the `IconCluster` next to the progress bar, same as production's `SkillList`. |

## 10. `pageSeo` → `seoMetadata`

| Legacy field | New field | | Notes |
|---|---|---|---|
| `title` | `title` | ✅ | |
| `description` | `description` | ✅ | |
| `keywords` | `keywords` | ✅ | |
| `url` | `canonicalUrl` | ✅ | |
| `imagesCollection` (Asset[]) | `ogImage` (single Entry link to `image`) | 🔁 | New schema only supports one OG image (matches current best practice) — take the first item from the legacy collection. |
| `favicon` (Asset) | `layout.favicon` (new field) | 🔁 | **Resolved (2026-09-06):** add a single `favicon` field to `layout` — site-wide, additive. `src/helper/getPageMetadata.ts` (master) fetches it per-page (`pageSeo.favicon.url` feeds `<link rel="icon">`/apple-touch-icon), but it's a site identity asset, not per-page content; confirm the "same asset on every legacy page" assumption once real entries are pulled, purely to sanity-check, not to change the plan. |
| `siteName` | new `seoMetadata.siteName` | 🔁 | **Resolved (2026-09-06):** extend `seoMetadata` with a `siteName` field. `getPageMetadata.ts` feeds this into `openGraph.siteName` in production today. |
| `publisher` / `creator` / `countryName` | new `seoMetadata` fields | 🔁 | **Resolved:** extend `seoMetadata` with all three — `creator`/`publisher` render into the `<meta name="creator">`/`<meta name="publisher">` tags and the Twitter card's `creator` field; `countryName` feeds `openGraph.countryName`. All optional `Symbol` fields, additive to the schema. |
| — | `noIndex` / `noFollow` | ❌ n/a | New-only fields, default to `false`, no legacy source. |

## 11. Content types with nothing to migrate

`config`, `video`, `article` exist in the new space's schema already but have **no legacy counterpart at
all** — they're forward-looking types for features that don't exist on the current site (a blog/article
system, a product catalog). Nothing to do here; they're out of scope for this migration, not a gap.

## 12. Assets (general)

Every legacy `Asset` (profile picture, banner image, project thumbnails, resume PDF, social icons) must
be re-uploaded into the new space — Contentful assets are space-scoped and cannot be linked across
spaces. Per your decision, this migration re-uploads them: downloads from the legacy CDN `url`, creates a
new Asset in `llac041ddp2o`/`development`, publishes it, and links the new asset ID from the transformed
entry. New asset IDs and CDN URLs will differ from the legacy ones — expected and fine, nothing in the
new frontend hardcodes legacy asset URLs.

`alternativeText` is **required** on the new `image` wrapper type but doesn't exist as a distinct field
on legacy `Asset` — the migration derives it from `Asset.description`, falling back to `Asset.title`,
falling back to a generated placeholder (flagged in the migration log for manual review, never silently
skipped).

---

## Summary of decisions

**Governing principle:** legacy entity-specific content (`Banner`, `BioCard`, `JobExperience`,
`ProjectCard`, `SkillGroup`/`SkillSet`) collapses into the existing generic
`contentItem`/`statItem`/`link`/`icon`/`image` shapes with no new content types. `userInfo` → `layout`
keeps its own dedicated type, since `layout` already *is* the generic "site-wide settings" shape for
that data. **But** the actual bar, confirmed 2026-09-06, is content parity with production — a field only
gets dropped when it's confirmed genuinely unused (dead in the legacy frontend) or purely a presentation
mechanism already superseded by this branch's own redesign (CMS-driven animation flags), never just
because the *first-guess* target mapping had no obvious slot. Several earlier "drop" calls in this
document turned out to be wrong once checked against what the legacy frontend actually renders, and were
corrected in place (see the inline "Corrected"/"Recovered" notes throughout).

1. `Banner.profilePicture`/`bannerImage`/`socialLinksCollection` → one Home Banner `contentItem`
   (`image` + `coverImage` + `links`). Confirmed **Home-page-only**, not global chrome — production's
   persistent everywhere-banner is superseded by this branch's own header/drawer/dock redesign. See §2.
2. `Banner.socialLinksCollection` icon mapping → mechanical: needs a platform-name → react-icon lookup
   table once real entries are pulled.
3. Skills page `contentList.ui` → `PanelShowcase`, not `CardGrid` (no rendering path for progress bars)
   and not `"BentoSkillsGrid"` (never deployed). See §3, §9.
4. `JobExperience` role/duration icons and the tech-stack section-header icon (`techStackIcon`) →
   dropped, no generic slot and no rendering path once tech stack is a plain `tags` string.
   `location`/`workedRemotely` → baked into `description` as one string (e.g. "Bangalore, India -
   Remote"), reproducing production's exact rendered text. `currentlyWorking` → `endDate` left `null`,
   since the new adapter already falls back to "Present" when it's empty. **Recovered, not dropped** —
   an earlier pass of this document wrongly dropped the latter two as unrenderable. See §5.
5. `pageSeo.favicon` → add `layout.favicon` (additive).
6. `pageSeo.siteName`/`publisher`/`creator`/`countryName` → extend `seoMetadata` with all four
   (additive) — confirmed live in production's Open Graph/Twitter-card output today.
7. `SkillSet.icon` → **preserved**, not dropped — confirmed rendered on production next to each skill
   category heading. Only `SkillSet.skillsetIcon` (confirmed never queried by the legacy frontend, hence
   dead) and `SkillGroup.title` (confirmed rendered nowhere, only used as a list key) are dropped. The
   `PanelShowcase` panel is one `contentItem` per `SkillSet`, not per `SkillGroup`. See §9.
8. `page.pageIcon` (Experience/Projects/Skills page headings) → add `page.icon` (additive) — confirmed
   rendered next to the page title, separately from `MetaPage.pageIcon`'s nav-icon use. See §3, §6.

Three additive schema changes are required before the write script can run end-to-end: `layout.favicon`,
`seoMetadata.{siteName,publisher,creator,countryName}`, and `page.icon` — all three go through
`setup-content-model.ts`'s `upsertContentType` the same way every other field there was added.
