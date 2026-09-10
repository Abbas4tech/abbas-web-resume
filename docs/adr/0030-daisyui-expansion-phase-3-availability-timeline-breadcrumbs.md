---
status: accepted
date: 2026-09-10
---

# 30. DaisyUI Component Library Expansion — Phase 3: Availability Banner, Timeline, Breadcrumbs

## Context

Final pass through the proposal's "Later" roadmap tier from ADR 0028: `AvailabilityBanner`
(Status + Countdown), a native-Timeline variant of `ProcessSteps`, and `Breadcrumbs`. Decorative-only
items from the same tier (`Text Rotate` on `HeroBanner`, `Aura`) are intentionally not part of this
pass — see Consequences.

## Decision

### 1. `Status`/`Countdown` Elements + `StatusIndicator`/`CountdownUnit` Patterns + `AvailabilityBanner` Block

Both new Elements hit the same class of a11y issue during implementation: DaisyUI's own docs suggest
`aria-label`/`aria-live` directly on the bare `<span>` these components render, but a plain `<span>`
carries ARIA's implicit `role=generic`, which does not support `aria-label` — axe (and this repo's own
biome a11y lint) correctly rejects it.

- `Countdown`: switched the labelled inner element from `<span>` to `<output>`, which has an implicit
  `role="status"` and legitimately supports `aria-label` — no extra ARIA wiring needed.
- `Status`: the dot has no equivalent semantic element, so it gets an explicit `role="img"`, always
  present. When given an `aria-label`, it's announced as a named image; when not, it defaults to
  `aria-hidden="true"` automatically rather than rendering as an unlabeled image (a real, distinct axe
  violation). `StatusIndicator` still passes `aria-hidden="true"` explicitly for clarity, but the
  default now makes that redundant rather than load-bearing — a bare `<Status color="success" />` with
  no label is safe by default.

`AvailabilityBanner` (`blocks/availability-banner/`, `ContentSection` registry) reuses
`AnnouncementBanner`'s exact adapter input shape and its tag-based color-selection convention (first
matching tag wins), extended from `AlertVariant` to `StatusColor` values. The optional countdown reuses
`AdaptedContentItem.startDate` — already fetched, unused for this purpose until now — computing days
remaining at render time; **no live client-side ticking**. A self-updating countdown needs a
`"use client"` boundary with a sustained `setInterval`, timezone handling, and hydration-mismatch
guarding — real scope beyond what an availability banner needs (it's read once per page load, not
watched second-by-second).

### 2. `Timeline` Element + `ProcessStepsWithTimeline` variant

Exact same shape as `PanelShowcaseWithRadialProgress`/`SkillsMatrix` (ADR 0028/0029): `ProcessStepsProps`
gained a `layout?: "steps" | "timeline"` prop (default `"steps"`, existing callers unaffected),
`adaptProcessStepsWithTimeline` shares a new `buildSteps` helper with the original `adaptProcessSteps`,
one new `content-list.tsx` registry entry, one new schema enum value. `Timeline`/`TimelineItem`/
`TimelineStart`/`TimelineMiddle`/`TimelineEnd` (`elements/ui/timeline/`) wrap DaisyUI's native
`timeline`/`timeline-start`/`timeline-middle`/`timeline-end` classes directly — this is a genuinely
different rendering (native browser-drawn timeline spine) from the existing `TimelineSection`/
`TimelineEntry` (Step-primitive-based), confirming this isn't a duplicate.

### 3. `Breadcrumbs` Element + `BreadcrumbTrail` Pattern — no live Block

Built and tested as real, reusable primitives (`elements/ui/breadcrumbs/`,
`patterns/breadcrumb-trail/`), but **not** wired into a `BreadcrumbNav` Block or any live page. The
site's routes are still flat (`/about`, `/experience`, `/projects`, `/skills`, `/experiments` — no
nested paths), so there is nowhere a breadcrumb trail would show more than one meaningful level; a
"Home > About" breadcrumb glued onto every page would be pure decoration with no navigational value.
Building it as a shelved-but-ready primitive, not forcing a live integration, matches this pass's own
established discipline: `MockupCode` was left the same way in ADR 0029 for an analogous reason (real
component, no content-model justification yet).

`BreadcrumbTrail` deviates from the original proposal's sketch (`Breadcrumbs` + `IconLink`): `IconLink`
is built for icon-only, `target="_blank"` external social links (own tooltip/hover-motion wrapper,
external-navigation semantics) — wrong shape entirely for in-app breadcrumb navigation, which needs
plain `next/link` and a non-clickable current-page crumb. `BreadcrumbTrail` composes `Breadcrumbs`
directly with `next/link` and the bare `Icon` Element instead.

## Considered Options

- **Build a live, self-updating countdown (client-interval, real-time ticking) for
  `AvailabilityBanner`.** Rejected — real complexity (client boundary, timezone correctness, hydration
  guards) for a banner that's read once per visit, not watched live. A static snapshot computed at
  render time delivers the same information the PDF proposal actually needed ("Available from X").
- **Force a `BreadcrumbNav` Block onto the fixture site's flat routes just to have e2e coverage.**
  Rejected — would be exercising a UI pattern against data that doesn't justify it, the opposite of
  every other addition in this three-phase series, which added only Blocks with a genuine data/content
  reason to exist right now.
- **Use `IconLink` in `BreadcrumbTrail` as the proposal originally sketched.** Rejected once its actual
  shape (external-link semantics, own tooltip) was checked against what a breadcrumb trail needs
  (in-app links, a non-link current item) — wrong component for the job.

## Consequences

### Positive
- `AvailabilityBanner` closes another real gap the same way `Footer` did in ADR 0028: it reuses data
  (`startDate`) that was already being fetched and adapted but had no consumer.
- Full rigor maintained: typecheck clean, 361/361 unit tests, 74/74 Storybook files (151 checks) zero
  a11y violations — including two real accessibility bugs caught and fixed during this pass itself
  (`Status`'s invalid `aria-label` placement, a `BreadcrumbTrail` mock icon missing its accessible
  name), not just avoided.
- This closes out every item in the original proposal's roadmap except the decorative ones explicitly
  deferred below — three phases, zero live schema changes beyond `ui`/`contentSection.ui` enum
  additions, and one library-wide a11y baseline (zero violations) held throughout.

### Negative / Trade-offs
- `AvailabilityBanner`'s countdown is a page-load snapshot, not a live-ticking timer — acceptable for
  its use case, but a genuinely different capability from what "Countdown" might suggest at first read.
- `Breadcrumbs`/`BreadcrumbTrail` exist with zero live usage — pure shelf-ware until the site's routes
  stop being flat. Deliberate, not an oversight, but worth remembering it's untested against real
  routing behavior (e2e coverage is component-level only, via Storybook/Vitest, not a live page).
- **Explicitly out of scope for this pass**: `Text Rotate` decorative polish on `HeroBanner`'s subtitle,
  and `Aura` (not available in the installed `daisyui@5.5.23` at all — see ADR 0028's version note).
  Both are cosmetic, not structural, and touching `HeroBanner` — a Block that's been live and unchanged
  through every prior ADR in this series — deserves its own deliberate pass rather than being bundled
  into a "Later" cleanup tier.
- `contentSection.ui` and `contentList.ui`'s `in` validations now need a third live push
  (`pnpm contentful:setup`) to accept `AvailabilityBanner` and `ProcessStepsWithTimeline` — deferred
  pending explicit go-ahead, same as every prior schema change in this series.
