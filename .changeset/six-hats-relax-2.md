---
"abbas-web-resume": patch
---

Added `TimelineSectionWithBadges` as a second, editor-selectable `ui` value alongside `TimelineSection` in Contentful's `contentList.ui` dropdown. Both read the same `subItems` data (no `tags`-based path exists in `timeline-section.adapter.ts` at all) but render it differently: `TimelineSection` shows the original single icon + comma-joined text line, `TimelineSectionWithBadges` renders the same subItems as a `TechBadgeCloud` with each skill's own icon. `content-list.tsx` registers each `ui` value against its own adapter function (`adaptTimelineSection` / `adaptTimelineSectionWithBadges`) accordingly.

Fixed a live data issue found while verifying this: the real "Experience — Timeline" `ContentList` entry's `ui` field was still set to `"SplitContentPanelWithBadges"` (left over from testing that value before it was reverted) — removing a value from a field's schema validation doesn't retroactively fix entries already using it. Corrected directly via the Management API; `/experience` renders correctly again.

See [ADR 0026](../docs/adr/0026-timeline-tech-badges-meta-row.md).
