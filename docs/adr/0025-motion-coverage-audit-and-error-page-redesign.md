---
status: accepted
date: 2026-09-07
---

# 25. Motion Coverage Audit & Error Page Redesign

## Status

Accepted and implemented

## Context

Following the CMS Block registry expansion in [ADR 0024](./0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md), the repo owner asked for two more things:

1. **Every Block — the six just added, and the existing ones — should carry a motion animation matched to
   its own use case**, using the existing `motion/react` element library (`MotionWrapper`, `MotionStagger`,
   `MotionHover`, `MotionDraggable`, `MotionParallax`, `MotionTextWriter`) rather than one-size-fits-all.
2. **`NotFoundBlock` and `ServerErrorBlock` "have UI issues with icon placement and does not look as per the
   taste of other components."**

Auditing (2) first explained why: both pages imported `react-icons/md` icons directly (`MdSearchOff`,
`MdHome`, `MdErrorOutline`, `MdRefresh`) and used raw `<button>`/`<Link className="btn">` markup — the only
two Blocks in the entire tree that bypass the app's own `Icon` element (the curated registry from ADR 0016)
and `Button` element (which already bakes in the `inline-flex gap-2` spacing every other icon+text control in
the app relies on, e.g. `NavItem`, `PageNavButton`, `IconLink`). That's the concrete "taste" mismatch: not a
CSS tweak, but two pages built outside the app's own component system entirely. `MdErrorOutline` also isn't in
the curated `ICON_REGISTRY` at all.

Auditing (1) found a real, uneven split. Already well-animated: `HeroBanner` (`MotionParallax` +
`MotionWrapper`), `CardGrid` (`MotionStagger`), `TimelineSection`/`TimelineEntry` (bespoke `m.div` variants,
already the most elaborate animation in the codebase), `SidebarNav` (a `layoutId` shared-element active
indicator — a different, correct-for-its-job kind of motion, not a scroll reveal), `PanelShowcase`
(`MotionWrapper` per panel), `SplitContentPanel` (had `MotionWrapper`, but as one blanket wrap around the
whole info-row grid rather than per-card). Entirely static: `AppHeader`, `BottomDock`, `NotFoundBlock`,
`ServerErrorBlock`, and — inevitably, since they were written in the same session before this ask — all six
new Blocks from ADR 0024. `PageWrapper` was also static, but for a load-bearing reason (see Decision).

Two of the existing motion elements turned out to be too narrowly typed for this pass: `MotionWrapper`'s `as`
prop had no `"header"` option (needed for `AppHeader`), and `MotionStaggerItem`'s `as` prop had no heading
tags (`NotFoundBlock`'s title needs to stay an `<h1>`, not degrade to a `<div>` for the sake of being
animatable).

## Decision

### 1. Extend two motion element APIs rather than work around their gaps

- `MotionWrapperProps.as` gained `"header" | "nav" | "footer" | "article"`.
- `MotionStaggerItemProps.as` gained `"h1" | "h2" | "h3" | "p"`.

Both are additive, backward-compatible union extensions — every existing caller is unaffected. Rejected
alternative: wrapping a non-animatable semantic element in an extra `<div>` just to satisfy the old union,
which would have silently downgraded `NotFoundBlock`'s `<h1>` to a `<div>` (a real regression, not a
formatting nit) had it gone unnoticed.

### 2. Redesign `NotFoundBlock` and `ServerErrorBlock` onto the app's own component system

Both now use `Icon` (curated `iconCode`s: `md/MdSearchOff`, `md/MdHome`, `md/MdError` — repointed from the
unregistered `MdErrorOutline` to the already-curated `MdError`, the same icon `Icon`'s own fallback path
already uses, so no registry growth needed) and `Button` (`asLink` for navigation, native for the retry
action) in place of raw `react-icons`/`<button>`/`<Link className="btn">`. Each page's own personality is
kept — `NotFoundBlock`'s centered card with its `mockup-code` "terminal" flourish, `ServerErrorBlock`'s
full-bleed two-column hero with a `MotionDraggable` error-log window — since they render in genuinely
different contexts: `NotFoundBlock` mounts inside the persistent `(app)` layout (header/sidebar still
present, hence the smaller centered treatment), `ServerErrorBlock` is the root `error.tsx` boundary with no
layout around it at all (hence `min-h-screen`). Both are now driven by `MotionStaggerContainer`/
`MotionStaggerItem` instead of one blanket `MotionWrapper`, so the icon, heading, message, detail block, and
action reveal as a sequence rather than all at once — consistent with how `TimelineEntry` and `HeroBanner`
already stage multiple pieces rather than fading in as one unit.

One accessible-name consequence, caught by the existing test suite rather than missed: giving the retry
button's `Icon` a `name="Retry"` (needed for `svg-img-alt`) means the button's computed accessible name
becomes "Retry Try again", not "Try again" — the same effect `PageNavButton`'s icon+label combination already
has. `server-error.spec.tsx`'s exact-string `getByRole` matches were updated to the same regex-substring
pattern `PageNavButtonModel`'s spec already uses, rather than stripping the icon's name to preserve an exact
match that was never a real UI requirement.

### 3. Give every Block a motion treatment matched to its shape, not a uniform default

| Block | Treatment | Why |
|---|---|---|
| `AppHeader` | `MotionWrapper` (`fade-up`) on the header; `MotionHover` on the menu toggle and resume link | Sticky global chrome gets a one-time settle-in, not a scroll reveal (it's always "in view"); its two icon actions get the same tactile hover `IconLink` already established |
| `BottomDock` | `MotionWrapper` (`fade-up`) on the dock; `MotionHover` per item | A dock rising into place on mobile, plus press feedback per icon |
| `FaqAccordion` | `MotionStaggerContainer`/`Item` per question | List of independent, equally-weighted items — same shape as `CardGrid` |
| `MetricsStrip` | `MotionStaggerContainer`/`Item` per stat | Directly analogous to `CardGrid`'s existing pattern |
| `ProcessSteps` | `MotionStaggerContainer`/`Item` per step | Sequence of steps revealing as the reader scrolls down them |
| `ContentTabs` | `AnimatePresence` + `m.div` cross-fade, keyed on the active tab | Interaction-driven (a click), not scroll-driven — `whileInView`-based elements are the wrong tool here, so this uses `motion/react` directly, matching `template.tsx`'s own page-transition idiom |
| `TechBadgeCloud` | `MotionStaggerContainer`/`Item` per badge | Same reasoning as `FaqAccordion`/`MetricsStrip` |
| `AnnouncementBanner` | `MotionWrapper` (`slide-right`) | A single element, not a list — a banner sliding in reads better than a stagger with one item |
| `SplitContentPanel` | Converted from one blanket `MotionWrapper` around the whole info-row grid to `MotionStaggerContainer`/`Item` per row | Brings it in line with `MetricsStrip`, which is structurally the same "row of `StatGroup` cards" shape |
| `MediaCard` (Pattern) | `MotionHover` (`scale`) on the whole card | It's a clickable card; hover feedback is complementary to, not a replacement for, `CardGrid`'s existing entrance stagger on each `MotionStaggerItem` |
| `NavItem` (Pattern) | `MotionHover` (`rotate` + `scale`) on its icon | Matches `IconLink`'s established icon-hover treatment |

### 4. Leave three things deliberately unanimated, and say why

- **`PageWrapper`** — page-level enter/exit is already owned by `src/app/(app)/template.tsx`
  (`AnimatePresence` + `FrozenRouter`, keyed on `pathname`). Wrapping `PageWrapper` in its own motion would
  animate against that transition rather than as part of it.
- **`SidebarNav`** — its `layoutId="activeSidebarNav"` shared-element highlight is already the correct motion
  for "indicate which nav item is active," a fundamentally different job than a scroll-reveal entrance; adding
  one would be motion for its own sake, not for the component's actual use case.
- **`StatGroup`, presentational leaf Patterns** — animated by whichever Block stages them
  (`MetricsStrip`/`SplitContentPanel`'s `MotionStaggerItem`), the same relationship `MediaCard` has with
  `CardGrid` — except `MediaCard` also picked up its own `MotionHover` because, unlike a stat card, it's
  independently clickable and benefits from direct interaction feedback.

## Considered Options

- **Wrap every new Block in a single blanket `MotionWrapper`, uniformly.** Rejected: it was the fast option,
  but "as per its use case and taste" was the explicit ask — a list of six FAQ items and a single announcement
  banner don't read the same way, and forcing them through one animation primitive would have produced exactly
  the generic, undifferentiated motion the request was pushing back against.
- **Give `ContentTabs` a `whileInView` stagger on its panel, matching the list-shaped Blocks.** Rejected: the
  panel changes on click, not on scroll — a `whileInView`-based element wouldn't re-fire on tab switch the way
  an `AnimatePresence`-keyed cross-fade does, since the element is already in the viewport when its content
  changes.
- **Fully unify `NotFoundBlock` and `ServerErrorBlock`'s layouts (same hero-vs-card treatment for both).**
  Rejected after confirming they mount in genuinely different contexts (`(app)` layout vs. the root error
  boundary with no layout at all) — matching their icon/button *system* was the real "taste" fix; forcing
  identical page chrome onto two structurally different mount points would have been a change for its own
  sake.

## Consequences

### Positive
- Every Block in `src/components/blocks/` now either has a motion treatment fitted to its shape, or has a
  documented reason it doesn't — no more "some things move, some things don't, for no stated reason."
- `NotFoundBlock` and `ServerErrorBlock` are now built on the same `Icon`/`Button` primitives as the rest of
  the app, closing the exact gap that made them look inconsistent.
- `MotionWrapper` and `MotionStaggerItem`'s widened `as` unions are immediately reusable by future Blocks that
  need to animate a `<header>`/`<nav>`/`<footer>` or a heading, without another one-off workaround.
- Verified with the same rigor as ADR 0024: full typecheck, lint, all 295 unit tests, and all 54 Storybook
  story files / 102 accessibility checks passing with zero regressions after every change, not just at the end.

## Amendment — Per-element micro-interaction pass

The initial pass above animated each Block as a whole (entrance, stagger, hover-on-the-card). A follow-up
request asked for animation at the level of each part of a component — titles, text, backgrounds, borders,
buttons — not just the container. Extended, rather than replaced, the same per-use-case philosophy:

- **`Button` (the shared element, at each of its five call sites that lacked it)** — wrapped in `MotionHover`
  individually per call site (`AppHeader`'s brand link, `NotFoundBlock`'s CTA, `ServerErrorBlock`'s retry
  action) rather than baking the wrapper into `Button` itself. `Button` is used inside `card-actions`, `join`,
  and other layout-sensitive DaisyUI containers across the app that were never audited for how an added wrapper
  `<div>` would interact with their flex/width assumptions (`w-full` buttons in particular) — wrapping at each
  already-reviewed call site got the same interaction without that unaudited, app-wide layout risk.
- **`ServerErrorBlock`'s retry icon** gained its own nested `MotionHover` (`rotate={180}`) independent of the
  button's own hover scale — hovering the icon specifically spins it, a small detail that reads as "retry" and
  demonstrates a parent and child both carrying their own distinct motion without conflict.
- **`ContentTabs`** replaced DaisyUI's static `tab-active` border styling with a `layoutId`-shared sliding
  underline (`m.span`, spring transition) between tabs — the same shared-element technique `SidebarNav`'s
  active-page indicator already established, applied to a second, unrelated active-state UI.
- **`MediaCard`** gained a coordinated `group`-driven hover state: border color, shadow color, thumbnail
  `scale-105`, and title color all transition together via Tailwind's `group-hover:` (color/shadow — CSS
  already animates these smoothly) layered under the existing `MotionHover` spring scale on the card itself
  (transform — where Motion's physics add real value over a CSS transition). Each footer link icon also picked
  up its own `MotionHover`, independent of the card's.
- **`TechBadgeCloud`** — each badge gained a border/background color hover transition plus its own
  `MotionHover` pop, nested inside the existing per-badge `MotionStaggerItem` entrance.
- **`ProcessSteps`** — `StepIndicator` gained a tinted background/ring treatment and a nested one-shot
  `whileInView` pop-and-rotate on its number/icon, staggered slightly *after* the parent item's own entrance
  (`delay: index * 0.12 + 0.15`) — a two-stage reveal (item slides in, then its indicator pops) rather than
  everything arriving in one motion.
- **`AnnouncementBanner`'s icon** gained a slow, continuous scale pulse (`repeat: Infinity`) to draw the eye to
  an attention-worthy notice — the one genuinely looping animation added in this pass, and the one place that
  matters most: gated behind `useReducedMotion()` so it never renders for a user who has asked the OS to
  reduce motion. `AnnouncementBanner` became a Client Component (`"use client"`) as a result, since calling
  that hook requires it.
- **`Progress`** gained a translating shimmer highlight sweeping across the filled portion, also gated behind
  `useReducedMotion()` for the same reason — the one-shot spring fill animation it already had was untouched.

**Why only two looping animations, not more, despite "everything should be animated":** a one-shot reveal
(stagger, hover, a spring pop) reads as motion serving the content — it draws attention once, at the moment
it's earned, then gets out of the way. A *looping* animation is a different, higher-cost claim: it keeps
asking for attention indefinitely, which is exactly the class of motion `prefers-reduced-motion` exists to let
people opt out of, and exactly why only the two elements that are genuinely meant to keep drawing the eye (an
announcement banner, a bar that's still filling) got one — everything else earns its motion once and settles,
which is what "crisp" describes as an animation *quality*, not a request for perpetual movement.

### Negative / Trade-offs
- `MediaCard` now renders inside both its own `MotionHover` and `CardGrid`'s `MotionStaggerItem` — two nested
  motion wrappers per card. Functionally distinct (entrance vs. hover) and verified not to conflict, but it is
  one more layer in the render tree than a single combined component would need.
- `ContentTabs`' `AnimatePresence` cross-fade is bespoke to that one component rather than a shared element —
  reasonable given it's the only interaction-driven (as opposed to scroll-driven) animation need among the six
  new Blocks, but if a second one appears, it likely deserves extracting into its own `Motion*` element rather
  than copy-pasted a second time.
