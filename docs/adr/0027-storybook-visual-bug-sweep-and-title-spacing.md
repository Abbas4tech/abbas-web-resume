---
status: accepted
date: 2026-09-09
---

# 27. Storybook Visual Bug Sweep and Story Title Spacing

## Status

Accepted and implemented

## Context

The repo owner did a pass through the running Storybook and reported a batch of concrete visual defects,
plus a broader complaint that every story/component title in the sidebar reads as squished PascalCase
("BottomDock", "PanelShowcase") with no visible word spacing. Each item below was investigated against the
actual rendered Storybook (Playwright screenshots and `getBoundingClientRect()`/computed-style inspection),
not fixed from a guess, following the same discipline established in ADRs 0024–0026.

## Decision

### 1. `BottomDock`'s entrance animation broke its own fixed positioning

`Dock` renders DaisyUI's `position: fixed` `.dock` class, pinned to the viewport bottom. `BottomDock` wrapped
it in `MotionWrapper`, whose `m.div` applies an inline `transform: translateY(...)` for its slide-in effect.
Per the CSS spec, any ancestor with a `transform` becomes the containing block for `position: fixed`
descendants — so `Dock` was no longer positioned relative to the viewport, but relative to the animating
wrapper. Confirmed via `getBoundingClientRect()`: `top: -34, bottom: 30` in a 568px-tall viewport (nearly
off-screen at the top) instead of pinned to the bottom. This also explains why the dock appeared to never
render in Storybook at all — `MotionWrapper`'s `whileInView` (`margin: "-50px"`) never saw enough of the
mispositioned element to trigger. This is a live production bug, not a Storybook artifact — any real
mobile visit through `dock-on-mobile` hits the same code path.

Fixed by replacing `MotionWrapper` with a raw `m.div` that animates `opacity` only:

```tsx
<m.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.3 }}>
  <Dock className="bg-base-300" {...props}>...</Dock>
</m.div>
```

Opacity never adds an inline `transform`, so `Dock` keeps its real containing block (the viewport). Verified:
`Dock` now measures `top: 504, bottom: 568` in a 320×568 viewport — pinned correctly, all four items visible.

Separately, `BottomDock`'s story never rendered any content at all in Storybook, for an unrelated reason:
the global preview decorator hardcodes `DrawerProvider variant="default"`, and `BottomDock` only renders
when `variant === "dock-on-mobile" && isMobile`. Fixed with a per-story `DrawerProvider` override
(`variant="dock-on-mobile"`) and a `parameters.viewport.value = "mobile1"`, which required adding
`storybook/viewport` (Storybook v10's bundled viewport addon) to `.storybook/main.ts`'s `addons` array — it
was never registered. Also fixed three unregistered icon codes surfaced along the way
(`bottom-dock.mock.ts`'s `md/MdPerson` → `io5/IoPerson`; the `ManyItems` story's `md/MdArticle` →
`fa/FaFileAlt` and `md/MdPictureAsPdf` → `fa/FaFilePdf`) — the same icon-registry-drift pattern from ADR 0024.

### 2. `CardGrid` hover bled across every card

`MediaCard` used Tailwind's bare `group`/`group-hover:` classes for its own hover effects (border, shadow,
image scale, title color). `Drawer` also applies a bare `group` class to its outer wrapper
(`drawer.tsx:104`, intentionally — it drives unrelated `group-data-[...]` selectors in `AppHeader`/
`Container`). Because `group-hover:` with no name matches the *nearest* ancestor `.group`, and `CardGrid`
renders inside the page's `Drawer`, hovering any single card matched the Drawer's group state, not each
card's own. Fixed by scoping `MediaCard` to a named group (`group/card`, `group-hover/card:`), which only
responds to its own hover, not any ancestor `.group`.

### 3. `Button`'s DaisyUI variant classes did nothing

`Button` always applied `bg-base-300 text-base-content` as Tailwind utility classes. DaisyUI's own variant
classes (`.btn-primary`, etc.) only set a CSS custom property; only `.btn`'s own rule reads that property and
applies it as `background-color`. Tailwind's utility layer beats DaisyUI's component layer regardless of
class order, so `Button`'s hardcoded utilities always won — passing `className="btn-primary"` visually did
nothing. Fixed by detecting a DaisyUI variant class in the passed `className`
(`/\bbtn-(primary|secondary|...)\b/`) and skipping the hardcoded utility background when one is present.

`not-found.tsx`'s CTA button compounded this: it passed `btn-primary` without the base `btn` class at all,
so even a correctly-behaving `Button` would have rendered no DaisyUI styling. Added the missing `btn` class.

### 4. `NotFound` and `ServerError`'s icon rendered pinned to the top-left of its circle, not centered

The circular icon badge used `className="avatar placeholder"`. DaisyUI v5 renamed this modifier from
`.placeholder` to `.avatar-placeholder` (confirmed against the installed package's compiled CSS,
`daisyui/components/avatar.css`) — `.placeholder` alone matches no rule at all in v5. Without it, the
`div>div` that's supposed to get `display: flex; align-items: center; justify-content: center` stays
`display: block`, so the icon's own wrapper div (also `flex`, but block-level itself) collapses to its
content height and hugs the container's top-left corner instead of centering. Fixed both instances
(`not-found.tsx`, `server-error.tsx`) by using the correct v5 class name, `avatar avatar-placeholder`.
Verified via computed style before/after: `display: block` → `display: flex; align-items: center;
justify-content: center`, and the icon's rect moved from flush top-left to centered in the 96×96 circle.

### 5. `Progress`'s count bubble was clipped, not missing

A Phase-3 change added `overflow-hidden` directly to the fill bar to contain a new shimmer sweep animation —
which also clipped the pre-existing count `<span>`, positioned via `bottom-full` (intentionally outside the
fill bar's own bounds, floating just above it). Fixed by moving the shimmer into its own inner
`<div className="absolute inset-0 overflow-hidden rounded-2xl">`, containing only the shimmer, while the
count `<span>` stays a sibling — clipped from nothing, visible again.

### 6. `HeroBanner`'s mock data was flat gray placeholder boxes

`bannerImage`/`avatarImage` used `placehold.co` (flat color + dimension text, no photographic content) and
all three `iconLinks` used `placehold.co/24x24` gray squares for GitHub/LinkedIn/Twitter — despite `IconLink`
already supporting a registry-backed `iconCode` path (`renderIcon`'s fallback when `iconSrc` isn't a real
image) that every other social-icon usage in the codebase uses. Fixed:

- `iconLinks` now use `iconCode: "fa/FaGithub"`, `"fa/FaLinkedin"`, `"fa6/FaXTwitter"` — real brand icons,
  no `iconSrc` needed. `FaXTwitter` (from `react-icons/fa6`, already an installed/imported package) added
  to `icon-map.ts`'s registry, since no X/Twitter icon existed yet.
- `bannerImage`/`avatarImage` switched to seeded `picsum.photos` URLs (`/seed/hero-banner-workspace/...`,
  `/seed/hero-banner-avatar/...`) — deterministic per seed, real photographic content instead of a flat
  color block, rendering correctly under Storybook's Next.js `<Image>` mock the same way `placehold.co` did
  (neither host is in `next.config`'s `remotePatterns`, but that only gates the real Next.js image
  optimizer in production — Storybook's `@storybook/nextjs-vite` framework shims `next/image` without
  enforcing it, and no mock file's image URL is ever used outside Storybook/tests).

### 7. Removed the `PageWrapper` story

Per the repo owner's request. `page-wrapper.stories.tsx` deleted; `page-wrapper.mock.ts` deleted alongside
it since it had no other consumer (`page-wrapper.spec.tsx` builds its own inline props) and would otherwise
be dead code.

### 8. Story title spacing

Every `Blocks/*`, `Elements/*`, and `Patterns/*` story title's leaf segment was written as unspaced
PascalCase (`"Blocks/BottomDock"`, `"Patterns/MediaCard"`). Storybook auto-splits camelCase **story export
names** for display (`NoIconLinks` → "No Icon Links"), but does not touch the literal `title:` string — so
every multi-word component rendered squished together in the sidebar, exactly the repo owner's complaint.

The category segments (`Blocks`, `Elements/UI`, `Elements/Behavior`, `Patterns`) were kept unchanged — they
already mirror the project's real Elements ← Patterns ← Blocks layer architecture (`CONTEXT.md`), which is
itself a good composability-reflecting taxonomy. Only the leaf segment was given explicit word spacing
across all 29 affected files, e.g. `"Blocks/BottomDock"` → `"Blocks/Bottom Dock"`,
`"Patterns/MediaCard"` → `"Patterns/Media Card"`, `"Blocks/FaqAccordion"` → `"Blocks/FAQ Accordion"`
(acronym cased correctly rather than mechanically title-cased to "Faq"). Component/file names and TypeScript
identifiers were deliberately left as PascalCase — that's the correct, idiomatic convention for React
component identifiers, not the thing that was broken. Confirmed with the repo owner before applying (Storybook's own story-id slugs change when the title changes, so any bookmarked `?path=` URL to an old id
like `blocks-bottomdock--default` stops resolving — accepted as a one-time cost, same as ADR 0026's
`TechBadgeCloud` path move).

## Considered Options

- **Also rename component/file identifiers to match the spaced display titles.** Rejected: PascalCase
  identifiers and kebab-case filenames are the project's own established, correct convention (every prior
  ADR's file listing confirms it) — nothing here was actually wrong with them, only the separate
  Storybook-facing `title:` string was.
- **Reconsider block/pattern categorization while doing this sweep.** Considered and explicitly not taken —
  offered to the repo owner as an option; they chose the narrower, lower-risk spacing-only fix.

## Consequences

### Positive
- Six independently-verified, previously-reported visual/behavioral bugs fixed at their root cause rather
  than patched around: `BottomDock` positioning and visibility, `CardGrid` hover bleed, `Button`/DaisyUI
  variant styling, `NotFound`/`ServerError` icon centering, `Progress` count clipping, `HeroBanner` mock
  fidelity.
- Every Storybook sidebar entry across Blocks/Elements/Patterns now reads as properly spaced words.
- Full verification suite green after every change: typecheck clean, `ultracite check` clean across all 356
  source files, 300/300 Vitest unit tests (109/109 files), 102/102 Storybook interaction/a11y tests (53/53
  story files, zero accessibility violations).

### Negative / Trade-offs
- Any bookmarked Storybook `?path=` URL using an old unspaced story id (e.g. `blocks-bottomdock--default`)
  now 404s inside Storybook's own UI; the sidebar tree is the correct way to navigate and is unaffected.
- `NotFound`'s "magnifying glass icon stuck to top left" complaint and its "button doesn't look like a
  button" complaint turned out to share no root cause with each other (icon: stale DaisyUI v4 class name;
  button: variant-override bug plus a missing base class) — both fixed, but as two unrelated bugs that
  happened to compound visually in the same component.
