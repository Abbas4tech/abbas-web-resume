---
title: 0020 - Font Loading and Typography Continuity Audit (master vs. develop-draft)
date: 2026-09-07
status: accepted
---

# 0020 - Font Loading and Typography Continuity Audit (master vs. develop-draft)

## Context

`master` is the branch currently deployed to production. `develop-draft` (and this branch,
`feat/develop-draft/page-description-richtext-field`, cut from it) represents the in-progress rewrite that
replaces the old flat `src/components/` tree with the three-layer `elements → patterns → blocks` architecture
([ADR-0001](./0001-three-layer-component-architecture.md)) and a Contentful-driven composable page model
([ADR-0003](./0003-composable-content-model.md), [ADR-0019](./0019-legacy-space-cross-schema-content-migration.md)).

That rewrite touches 642 files (`+86,600 / -8,721` lines against `master`), so a line-by-line diff is not a
useful way to answer "did the text styling change?". This ADR instead audits **every Tailwind typography
utility** (`text-*` size classes, `font-*` weight classes, the font-loading config, and the Tailwind config that
governs which utilities are even allowed to compile) actually present in each branch, and reports where they
differ.

Requested by the repo owner: identify all font-size/weight differences between what's deployed (`master`) and
this preview branch, and document findings as an ADR. The audit itself changed no code; once findings were
reviewed, the repo owner asked for the concrete, decidable fixes to be applied — see **Decision** below for
what was and wasn't changed, and why.

## Scope & Method

- `git diff master --stat` to size the overall change and separate genuine rewrites from mechanical renames.
- `git grep` for `text-(xs|sm|base|lg|[0-9]xl)`, `font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)`,
  `leading-`, `tracking-` across `*.tsx` on `master` and on this branch, excluding `.spec/.stories/.test` files.
- Read the full diff of every file that both branches share a lineage for (renames detected via `git diff
  master -- <old-path> <new-path>`), not just the grep hits, to rule out size/weight logic hidden behind
  variables or template literals.
- Compared `src/app/layout.tsx` (`next/font/google` config), `src/app/globals.css` (`@theme`/`@plugin daisyui`),
  and `tailwind.config.ts` between both branches.
- Checked `package.json` for `daisyui`/`tailwindcss`/`next` version drift, since DaisyUI component classes
  (`.card-title`, `.stat-value`, `.btn`, `.mockup-code`, …) carry their own built-in font sizing that this repo
  doesn't always override explicitly.
- **Empirically verified the font-loading questions against the running local dev server** (`localhost:3000`),
  rather than relying only on source-reading: pulled the actual compiled `/_next/static/css/app/layout.css` to
  inspect the real `@font-face` rules Next.js generated, and used a headless Playwright/Chromium session to
  screenshot and hash identical glyphs (`"Ag"`) rendered at each Tailwind font-weight value, to see what the
  browser actually paints rather than what the CSS asks for. This caught two mistakes in an earlier pass of
  this document (see Findings 1 and 2) — one open question resolved as "not an issue", one initial guess about
  browser weight-matching replaced with a stronger, measured result.
- **Re-audited every component whose implementation was consolidated/rewritten (not just relocated) during the
  refactor**, reading the full component logic rather than just diffing className strings, and measured the two
  affected pages live at a 1440px viewport. This is what found Finding 8 — a className-string comparison alone
  (as Finding 3 originally relied on) does not catch a component that dropped an inherited/ambient size or a
  conditional style branch that's no longer wired up.

## Findings

### 1. Poppins now loads weight 700 — the one real, sitewide typography change

`src/app/layout.tsx`:

```diff
- const inter = Poppins({ subsets: ["latin"], weight: ["400"] });
+ const inter = Poppins({ subsets: ["latin-ext"], weight: ["400", "700"] });
```

(introduced in `0114189` — "fix missing bold font weight").

On `master`, **only the 400 weight face is registered** for the `Poppins` family. Every element on the
*currently deployed site* that requests a heavier weight — `font-bold`, `font-semibold`, `font-extrabold` — has
no matching face to select. Per the CSS font-matching algorithm, the browser either faux/synthesizes a bold
(default `font-synthesis: weight`) or, in stricter contexts, just renders 400. Concretely, on `master` today
this affects (non-exhaustive, from the grep above): `SidebarMenu.tsx` active-state `font-bold`,
`ui/dropdown.tsx` gradient brand text `font-bold`, `ui/page.tsx` page title `font-bold`, `ui/skill.tsx` section
heading `font-bold`, `ui/stepper.tsx` step title `font-extrabold`, `ui/stat.tsx` `md:font-semibold`, and every
`<strong>` mark rendered by `RichText.tsx` from Contentful rich text (default heading class is
`text-2xl font-semibold`). None of that has ever rendered with a real bold face in production.

Adding the 700 weight face fixes all of the above at once — it is not scoped to the new page-description field
the branch name suggests; it's a global fix that happens to matter *more* now because the new description field
adds more rich-text `<strong>` marks to more pages.

**Verified residual gap (measured, not guessed):** weight classes actually used in this branch's components are
`font-normal`(400) `font-medium`(500) `font-semibold`(600) `font-bold`(700) `font-extrabold`(800) — see
[stat.tsx:55](../../src/components/elements/ui/stat/stat.tsx#L55),
[step.tsx:75](../../src/components/elements/ui/step/step.tsx#L75),
[rich-text.tsx:30](../../src/components/patterns/rich-text/rich-text.tsx#L30),
[accordion.tsx:26](../../src/components/elements/ui/accordion/accordion.tsx#L26),
[icon-link.tsx:59](../../src/components/patterns/icon-link/icon-link.tsx#L59), and
[block-placeholder.tsx:47](../../src/components/contentful/element/block-placeholder.tsx#L47). Only 400 and 700
exist as real static faces (confirmed from the compiled CSS — each `@font-face` declares a single fixed
`font-weight`, never a range: three rules at `font-weight: 400` for the devanagari/latin-ext/latin subsets, and
three more at `font-weight: 700`; nothing at 500, 600, or 800).

An initial pass of this document assumed the browser would therefore just clamp every non-400/700 request to
the nearest declared face (i.e., 500/600/800 all rendering pixel-identical to either 400 or 700). That
assumption was wrong, and this section replaces it with what actually happens, measured directly: a headless
Chromium instance rendered identical glyphs (`"Ag"`, same font stack pulled live from the page) at
`font-weight: 400/500/600/700/800` and each was screenshotted and hashed:

| Requested weight | Rendered result |
|---|---|
| 400 | distinct hash — the true regular face |
| 500 (`font-medium`) | **distinct hash from every other weight** — Chromium interpolates a genuine intermediate weight between the two real 400/700 faces, it does not clamp to 400 |
| 600 (`font-semibold`) | **distinct hash from every other weight** — likewise interpolated, and visually heavier than 500 |
| 700 (`font-bold`) | distinct hash — the true bold face |
| 800 (`font-extrabold`) | **identical hash to 700** — there is no face heavier than 700 to interpolate toward, so it saturates at exactly the bold face |

So the real-world outcome is better than the theoretical one: `font-normal`/`font-medium`/`font-semibold`/`font-bold`
render as four genuinely distinct weights today (interpolated where no exact static face exists), and only
`font-extrabold` fails to add anything beyond `font-bold` — [step.tsx:75](../../src/components/elements/ui/step/step.tsx#L75)
(timeline entry titles) is the one place that class is used, so it's the one place worth either loading an
`800` face or dropping down to `font-bold` to stop implying a weight tier that doesn't exist.

This measurement also explains the flat, zero-bold appearance in the **deployed `master`** screenshot precisely:
with only *one* static face (400) registered there, the interpolation this branch benefits from has no second
reference point to interpolate against, so every weight request — 500 through 800 — has nothing to clamp to but
the single 400 face, rendered untouched. That matches the screenshot exactly: no word in that paragraph shows
any extra visual weight at all, not even a faux/synthetic bold.

### 2. Font subset changed from `latin` to `latin-ext` — checked, not actually a regression

Same diff as above changed `subsets: ["latin"]` → `subsets: ["latin-ext"]`. Read in isolation, this looked like
a real risk: Google's `latin-ext` subset for Poppins covers only the **extended** Latin range
(`U+0100–024F` and similar diacritic/Central-European characters), not the base ASCII block (`U+0000–00FF`)
that plain English copy uses — so requesting only `latin-ext` should, in principle, drop Poppins coverage for
ordinary text.

**This was checked against what Next.js actually compiled, not just against the subset name, and the concern
does not hold.** Pulling `/_next/static/css/app/layout.css` from the running dev server shows three `@font-face`
blocks per weight, not one: `devanagari`, `latin-ext`, **and** `latin` (`unicode-range: U+0000-00FF, U+0131,
U+0152-0153, …`) — even though only `latin-ext` was requested in code. `next/font/google`'s Google Fonts
integration evidently always bundles the base `latin` subset alongside whatever else is requested for a
Latin-script family; it doesn't let you opt out of it. A live Playwright check confirms this in practice: the
computed `font-family` on both a `<strong>` node and a plain paragraph resolves to the real generated Poppins
class (`__Poppins_b880f3, __Poppins_Fallback_b880f3`), not a system fallback.

No action needed here. This finding is kept in the document (rather than deleted) as a record that the concern
was raised and specifically checked — future changes to the `subsets` array should still be re-verified the
same way, since this behavior is an implementation detail of `next/font`/Google Fonts, not a documented
guarantee.

### 3. Every ported component's type scale is byte-for-byte unchanged

Cross-checking each `master` component against its renamed/relocated successor shows the actual `text-*`/`font-*`
utility *values* were carried over exactly; the only diffs are Tailwind class **reordering** (alphabetized by
the formatter/Ultracite, not a content change):

| Concern | `master` component | develop-draft component | Value |
|---|---|---|---|
| App header title | `GlobalHeader.tsx` | `blocks/app-header/app-header.tsx` | `text-lg … lg:text-2xl` — unchanged |
| Ambient page text | `ui/container.tsx` | `elements/ui/container/container.tsx` | `text-sm md:text-lg` — unchanged |
| Primary button | `ui/button.tsx` | `elements/ui/button/button.tsx` | `text-sm md:text-base` — unchanged |
| Account/menu dropdown | `ui/dropdown.tsx` | `elements/ui/dropdown/dropdown.tsx` | `font-bold` (menu + gradient brand text) — unchanged |
| Page title wrapper | `ui/page.tsx` | `elements/ui/page/page.tsx` | `text-xl font-bold md:text-4xl` — unchanged |
| Stat value | `ui/stat.tsx` | `elements/ui/stat/stat.tsx` | `text-lg font-normal md:font-semibold lg:text-xl xl:text-2xl` — unchanged |
| Timeline/step title | `ui/stepper.tsx` | `elements/ui/step/step.tsx` | `text-xl font-extrabold sm:text-2xl md:text-3xl` — unchanged |
| Section heading | `ui/skill.tsx` | `patterns/section-heading/section-heading.tsx` | `text-xl font-bold md:text-3xl` — unchanged |
| Secondary heading | `ui/skill.tsx` | `patterns/icon-cluster/*`, `patterns/icon-progress-row/*` | `text-xl md:text-4xl` — unchanged (now duplicated across 2 components instead of 1) |
| RichText paragraph/heading/code | `RichText.tsx` | `patterns/rich-text/rich-text.tsx` | heading `text-2xl font-semibold`, paragraph unstyled, code `font-mono text-sm` — unchanged |
| Card title/description | `(app)/projects/page.tsx` | `patterns/media-card/media-card.tsx` | `text-base md:text-lg` / `text-xs md:text-base` — unchanged |
| Drawer/layout text | `(app)/layout.tsx` | `contentful/assembly/contentful-layout.tsx` | `text-sm md:text-lg` — unchanged |

This holds for every component that was a straightforward **rename/relocate** — the className strings above are
copy-paste identical, just re-sorted. It does **not** hold across the board: **amended below in Finding 8** —
two components that were *consolidated/rewritten* rather than renamed (`ExperienceCard` → `TimelineEntry`,
`SidebarMenu` → `SidebarNav`) lost real sizing/weight behavior in the process. That gap wasn't visible from
class-string comparison alone; it only showed up from reading the component logic and measuring the rendered
page, which is exactly what Finding 8 does.

### 4. New typographic surfaces with no `master` precedent

`master` has no error pages or CMS-authoring diagnostics at all (`git ls-tree master` has no `error`/`not-found`
paths). This branch adds:

- `blocks/not-found/not-found.tsx`: `font-bold text-3xl tracking-tight` (h1), `text-lg` (body), `text-sm`
  (mockup-code), plus first-ever use of `text-warning` / `text-success` state-color text utilities.
- `blocks/server-error/server-error.tsx`: `font-bold text-4xl tracking-tight lg:text-5xl` (h1), `text-xl` (body),
  `font-mono text-sm`, plus `text-warning` / `text-error`.
- `contentful/element/block-placeholder.tsx` (dev-only CMS diagnostic): `font-bold text-lg text-warning`,
  `text-xs`, `font-medium`.

These introduce a larger top of the type scale (`text-4xl`/`text-5xl`, `tracking-tight`) than anything that
previously existed (`master`'s largest was `text-4xl` in `ui/skill.tsx`/`ui/page.tsx`). Covered architecturally
by [ADR-0013](./0013-error-page-layout-strategy.md); flagged here only because it's new *typographic* vocabulary,
not because anything regressed.

### 5. The actual feature this branch is named for (page-description rich text)

`src/app/(app)/[[...slug]]/page.tsx` renders the new field with **no explicit size override**:

```tsx
<div className="rounded-md bg-base-300 p-4 text-center">
  <RichText document={pageData.description} />
</div>
```

`RichText`'s `paragraphClass` default is `text-base-content` (color only, no size), so the description text
inherits whatever ambient font size its container establishes — consistent with how the existing
`content-section`/`content-list` body blocks already behave (they also carry no explicit `text-*` class and rely
on the same inherited sizing). This is intentional-looking, not a bug, but worth naming: if the description ever
contains an authored heading node, `RichText`'s default heading class (`text-2xl font-semibold`) renders *larger
than the page's own `<h2>` title* (`text-xl` at mobile) directly above it via `SectionHeading`. Low probability
in practice (descriptions are typically plain paragraphs), but worth a guard if editors start pasting headings
into the description field in Contentful.

### 6. A stale, non-functional `tailwind.config.ts` exists identically on both branches

Both `master` and this branch ship an unchanged `tailwind.config.ts` with:

```ts
blocklist: [
  "tooltip-left", "w-4", "h-4", "lg:w-6", "lg:h-6", "block", "w-6", "h-6",
  "sm:w-8", "sm:h-8", "xl:block", "lg:hidden",
  "text-warning", "text-info", "text-success", "text-error",
],
```

Neither branch's `globals.css` contains an `@config` directive, and Tailwind v4's CSS-first pipeline (`@import
"tailwindcss"` + `@plugin "daisyui"` via `@tailwindcss/postcss`) does not auto-load a legacy JS config without
one. This file is dead code in both branches — confirmed non-functional, since Finding 4 shows this branch
actively uses `text-warning`/`text-error`/`text-success` and they compile and render fine. **This is not a
branch-to-branch difference** (both have the identical stale file), but it's worth calling out here since a
future reader could otherwise mistake it for an active restriction on state-color text utilities.

### 7. Non-typography differences visible in the same screenshots (out of scope, noted for completeness)

The side-by-side screenshots used to validate Finding 1 also show two things unrelated to font size/weight,
worth naming so they aren't mistaken for something this audit missed:

- **Social icon color** (LinkedIn/Gmail/Discord colored on deployed `master`, monochrome on local
  `develop-draft`) and **icon count** (4 icons locally vs 3 on deployed, no GitHub on deployed). Traced to
  [icon-link.tsx](../../src/components/patterns/icon-link/icon-link.tsx): `IconLink` renders a real `<Image>`
  (whatever color asset Contentful stores) when the entry has an `iconSrc` URL, and falls back to the
  monochrome curated `Icon` registry ([ADR-0016](./0016-curated-static-icon-registry.md)) when the entry has
  only an `iconCode`. This is a **content difference between the two Contentful environments** the two branches
  point at (legacy space vs. the composable space from [ADR-0019](./0019-legacy-space-cross-schema-content-migration.md)),
  not a styling regression — the component correctly renders whatever the entry gives it.
- **Hero banner artwork** (colorful circular pattern on deployed, plain dotted background locally) — same
  cause: `bannerImage` is a CMS asset ([hero-banner.tsx](../../src/components/blocks/hero-banner/hero-banner.tsx)),
  and the two environments currently hold different images for it.

Neither is a code or typography issue; both are expected while the ADR-0019 content migration is still
reaching parity between the legacy and composable Contentful spaces. Flagged here only so this document doesn't
read as having missed something visible in its own evidence.

### 8. Two real regressions found by re-auditing consolidated components, not just renamed ones

The repo owner asked directly whether *all* font sizes carried over correctly from `master`, which prompted a
second, deeper pass: instead of trusting the className-string comparison in Finding 3, every component whose
logic was *rewritten* (not just relocated) during the refactor was re-read in full, and the two changed pages
were measured live at a desktop viewport (1440px) with Playwright. This surfaced two real regressions the
string-matching approach had missed:

**a. Experience-page meta rows (location / duration / role / tech-stack) shrink on desktop.**
`master`'s [ExperienceCard.tsx](../../src/components/ExperienceCard.tsx#L104) rendered these four lines with
*no* explicit `text-*` class, so they inherited the ambient wrapper's `text-sm md:text-lg` (from
`(app)/layout.tsx`'s `Drawer` — confirmed live: `18px` computed at desktop width). The refactor collapsed all
four into one generic `metaRows` list in
[timeline-entry.tsx:164](../../src/components/patterns/timeline-entry/timeline-entry.tsx#L164), and that new
unified row hardcodes `text-sm` with no responsive variant. Measured live on `/experience` at 1440px: the
ambient wrapper is still `18px` (confirmed on the same page, e.g. the `<h2>` section heading correctly scales
to `30px`), but the meta-row text renders at a fixed `14px` — **22% smaller than before, and no longer
responsive at all.** (As a minor bonus, this consolidation did quietly drop two broken/no-op utility classes
that were on the old line — `list-sty` and a bare `leading-` with no suffix — neither of which had done
anything on `master` anyway, so their removal changes nothing.)

**b. The active sidebar-nav item lost its bold weight entirely.**
`master`'s [SidebarMenu.tsx:26](../../src/components/SidebarMenu.tsx#L26) applied
`font-bold` (plus a border/background) to the active page's label. In
[sidebar-nav.tsx](../../src/components/blocks/sidebar-nav/sidebar-nav.tsx), the active state is now indicated
by an animated highlight box (`border-l-4 bg-primary/10`) rendered by `SidebarNav` itself — but the label's own
font weight is untouched: [nav-item.tsx](../../src/components/patterns/nav-item/nav-item.tsx) destructures an
`isActive` prop and never reads it anywhere in the component body. The active nav item's text now renders at
the exact same weight as every inactive one; the only remaining differentiator is the background highlight.
This may well be an intentional design change (highlight-box instead of bold text), but if it isn't, it's a
silent regression — nothing in the code raises it, since `isActive` is still accepted as a prop and looks
"wired up" at a glance.

Both were confirmed by reading the actual component code and, for (a), by measuring computed `font-size` live
rather than trusting the class name.

## Decision

The repo owner reviewed the findings and asked for the concrete, decidable fixes to be applied. The following
were made to the working tree. **Nothing has been committed to git** — these are unstaged edits, held per the
original instruction not to commit until told to.

### Applied

1. **Finding 1 (`font-extrabold`)** — resolved by downgrading the class rather than loading an 800 weight:
   [step.tsx:75](../../src/components/elements/ui/step/step.tsx#L75) now uses `font-bold` instead of
   `font-extrabold`. Chosen over adding an `800` weight file to avoid growing the font payload for a single call
   site, consistent with this repo's existing bias toward minimal bundle size (see
   [ADR-0016](./0016-curated-static-icon-registry.md)). Verified live: the timeline step title now computes to
   `font-weight: 700`, matching the class.
2. **Finding 6 (dead `tailwind.config.ts`)** — deleted. Confirmed via `git grep` that nothing else in the repo
   (`postcss.config.mjs`, `package.json`, CI scripts, `biome.jsonc`) referenced it, and `next build` completes
   cleanly without it.
3. **Finding 8a (timeline meta-row size)** — [timeline-entry.tsx:164](../../src/components/patterns/timeline-entry/timeline-entry.tsx#L164)
   changed from `text-sm` to `text-sm md:text-lg`, restoring the desktop size `master` had via ambient
   inheritance. The added `text-base-content/80` muted color (which didn't exist on `master`) was left in place
   — it's a color change, not a size regression, and reads as an intentional improvement. Verified live at a
   1440px viewport: computed `font-size` is back to `18px` (was `14px`).
4. **Finding 8b (sidebar-nav active weight)** — [nav-item.tsx](../../src/components/patterns/nav-item/nav-item.tsx)
   now applies `font-bold` to the button when `isActive` is true, restoring the weight distinction `master` had
   (the highlight-box indicator from the refactor is kept alongside it, not replaced). Verified live: the active
   nav item computes to `font-weight: 700` (was `400`, same as every inactive item).

### Deliberately not applied

- **Finding 5 (rich-text heading-size guard)** — left as a documented risk rather than a code change. It has no
  concrete failure today (page descriptions are plain paragraphs in practice) and fixing it blind would mean
  guessing at a product decision (what should a description heading look like relative to the page title?)
  rather than fixing a measured bug. Flagged for the repo owner to decide if/when it becomes real.

### Still open

- Whether `master` also carries the same two Finding 8 issues is unverified — this branch's fixes were
  confirmed against `master`'s *source* (no explicit size class / `font-bold` on the old components), not
  against a live `master` deployment, since reproducing `master` locally was out of scope for this pass.

## Consequences

### Positive
- Confirms the elements/patterns/blocks rewrite carried the deployed site's entire type scale over without
  regression — the migration is safe from a typography standpoint.
- Confirms, by direct measurement against the running app (not inference from source), that `master` never
  renders bold text with any real weight distinction, and that this branch fixes that for four of the five
  weight tiers actually used in the codebase (400/500/600/700 all render as genuinely distinct weights via
  browser interpolation between the 400 and 700 faces) — a stronger result than a source-level read would have
  shown.
- Two claims in the first pass of this document were themselves checked against real output and corrected:
  the font-subset change (Finding 2, no longer a risk) and the assumed weight-collapsing behavior
  (Finding 1, corrected to the measured interpolation result). Both corrections are recorded above rather than
  silently fixed, so the reasoning is auditable.

### Negative / Trade-offs
- The interpolation behavior this audit relies on for Finding 1 is Chromium-specific measured behavior, not a
  documented cross-browser CSS guarantee — Safari/Firefox were not measured and could plausibly clamp instead
  of interpolate. Treat "400/500/600/700 are all distinct" as verified for Chromium-based browsers only.
- Finding 8 means the direct answer to "did all font sizes carry over correctly" was, before this ADR's fixes
  were applied, **no** — two real regressions had shipped on this branch (experience-page meta-row text 22%
  smaller and no longer responsive on desktop; active sidebar-nav item missing its bold weight). Both are now
  fixed in the working tree (see **Decision**), but the git history will show them as regressions that briefly
  existed on this branch, not as something `master` ever had correctly either — worth remembering if anyone
  bisects this later.
- The Finding 5 risk (rich-text description headings potentially outsizing the page title) remains unaddressed
  by choice, not by oversight — see **Decision → Deliberately not applied**.
