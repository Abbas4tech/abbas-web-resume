---
status: accepted
date: 2026-09-09
---

# 29. DaisyUI Component Library Expansion — Phase 2: Skills Matrix, Testimonials, Mockup Gallery

## Context

Continuation of ADR 0028's DaisyUI catalog gap analysis, moving into the proposal's "Next" roadmap
tier: `Table`/`ChatBubble`/mockup Elements and the Blocks they unblock (`SkillsMatrix`,
`TestimonialWall`, a mockup-framed project gallery).

## Decision

### 1. `Table` Element + `SkillsMatrix` — variant of `PanelShowcase`, no new Block directory

Same shape as `PanelShowcaseWithRadialProgress` in ADR 0028, extended one level further: instead of
a per-row variant, `PanelShowcaseProps` gained a whole-component `layout?: "panels" | "table"` prop
(default `"panels"`, every existing caller unaffected). When `"table"`, `PanelShowcase` renders a
single flat `Table` (Category / Skill / Proficiency) across every panel's rows instead of the
MockupWindow grid — same `subItems` data, a third render style. `adaptSkillsMatrix` sets
`layout: "table"` and reuses the same `buildRows` helper as the other two `PanelShowcase` adapters.

New `Table`/`TableHead`/`TableBody`/`TableRow`/`TableHeaderCell`/`TableCell` Elements
(`elements/ui/table/`), compound-component style matching `Card`'s. The proficiency cell uses a raw
native `<progress class="progress progress-warning">` rather than the existing `Progress` Element —
deliberate: `Progress`'s shimmer-sweep motion is sized for a full-width row, not a dense table cell,
and a native `<progress>` already carries correct implicit ARIA semantics with no extra markup.

### 2. `ChatBubble` Element + `ChatMessageRow` Pattern + `TestimonialWall` Block

`ChatBubble`/`ChatBubbleImage`/`ChatBubbleHeader`/`ChatBubbleMessage`/`ChatBubbleFooter`
(`elements/ui/chat-bubble/`) wrap DaisyUI's `chat`/`chat-image`/`chat-header`/`chat-bubble`/
`chat-footer` classes. `ChatMessageRow` (`patterns/chat-message-row/`) composes one testimonial row:
optional `Avatar`+`AvatarImage` (reusing the existing Avatar Element, not a new one), author, message,
optional meta line.

`TestimonialWall` (`blocks/testimonial-wall/`) maps generic `ContentItem` fields the same way
`TimelineSection` already reuses `ContentItem` for job entries: `title` → author, `subtitle` → meta
(role/company), **`description` → quote** (not `body`). `description` is already a plain string on
`AdaptedContentItem`; `body` is a rich-text `Document`. Rendering a quote through `RichText` would
have meant `ChatMessageRow`'s `message` prop taking a `Document` instead of a `string`, pulling
rich-text-rendering concerns into a Pattern that's supposed to stay a simple, swappable structure.
Testimonials are short prose with no real need for headings/lists/marks, so `description` was the
correct field, not a compromise.

### 3. `MockupBrowser`/`MockupCode`/`MockupPhone` Elements + `MockupShowcaseFrame` Pattern + `MockupGallery` Block

Three new Elements (`elements/ui/mockup-browser/`, `mockup-code/`, `mockup-phone/`), each mirroring
`mockup-window.tsx`'s exact shape. `MockupShowcaseFrame` (`patterns/mockup-showcase-frame/`) picks
the right one via a `variant: "browser" | "code" | "phone" | "window"` prop — `"window"` reuses the
already-existing `MockupWindow` Element rather than adding a fourth near-duplicate.

**Deviation from the reviewed proposal**: the original sketch had `ProjectShowcase` needing "one new
field per entry" (a mockup-variant enum) so a single Block could mix browser/phone/code entries in
one list. Implementing that would have required a second live Contentful schema push cycle — not
just a `ui` enum value (the mechanism every other change in this phase and ADR 0028 used) but a
genuinely new field on the shared `contentItem` content type, which needed its own GraphQL codegen
regen before any adapter could read it. That's a materially bigger, riskier live-schema change than
anything else in this pass, and — critically — `Code` mockups need actual code text, not an image
URL, which no existing `ContentItem` field represents; forcing it into the same field as
browser/phone screenshots would have been the wrong shape regardless of schema cost.

Split it instead into `MockupGallery` (`blocks/mockup-gallery/`), a **block-level** `frame` choice
rather than per-item: `ui: "MockupGalleryBrowser"` and `ui: "MockupGalleryPhone"` are two `ContentList`
registrations, both reusing `customEntries.image` — the exact same field `CardGrid` already reads —
through `adaptMockupGalleryBrowser`/`adaptMockupGalleryPhone`, which share a `buildItems` helper.
Zero new fields; an editor picks the frame by choosing which `ui` value to set, the same mechanism
used everywhere else in this phase. `MockupCode` ships as a real, tested Element and
`MockupShowcaseFrame` already supports `variant="code"` — ready the moment a content type doing code
snippets justifies the schema work, but not force-fit into this pass.

## Considered Options

- **Add the `mockupVariant` field to `contentItem` as originally sketched, to support one gallery
  mixing all frame types.** Rejected for this pass: real value, but a strictly bigger, separately
  risky live-schema change (new field + codegen regen, not just an enum value) that deserves its own
  explicit go-ahead and its own verification pass, not bundled into a phase that otherwise needed
  none. Revisit if per-item frame mixing becomes an actual editorial need.
- **Render testimonial quotes through `RichText` (reading `body` instead of `description`).**
  Rejected — pulls rich-text concerns into a Pattern for a use case (short prose quotes) that doesn't
  need them, and `description` was already sitting there unused for exactly this shape of data.
- **Reuse the existing `Progress` Element inside `SkillsMatrix`'s table cells.** Rejected — its
  shimmer animation and `%` label chip are sized/positioned for a full-width row, not a dense table
  cell; a native `<progress>` is simpler and already accessible without extra ARIA wiring.

## Consequences

### Positive
- Three genuinely new visual capabilities (dense skills table, testimonial wall, device-framed
  project gallery) shipped with zero *new* live Contentful fields — only `ui` enum additions, the
  same low-risk mechanism as every prior variant in this series.
- `MockupCode`, `MockupBrowser`, and the `variant="code"` path on `MockupShowcaseFrame` all exist and
  are tested now, ahead of the content-model work a real code-snippet Block would need — that future
  work only has to add the schema and adapter, not any UI.
- Full rigor maintained: typecheck clean, 343/343 unit tests, 66/66 Storybook files (133 checks) zero
  a11y violations, zero real E2E failures across the 6-project matrix.

### Negative / Trade-offs
- `MockupGallery`'s `frame` choice is block-level, not per-item — a gallery can't mix a browser
  screenshot and a phone screenshot in the same list today. Acceptable for a first pass; the
  per-item variant is the natural follow-up once/if the `mockupVariant` field work above gets its own
  go-ahead.
- `contentList.ui`'s `in` validation now needs a second live push (`pnpm contentful:setup`) to accept
  `SkillsMatrix`, `TestimonialWall`, `MockupGalleryBrowser`, and `MockupGalleryPhone` — deferred
  pending explicit go-ahead, same as ADR 0028's Phase 1 push.
