---
"abbas-web-resume": patch
---

Added a `TimelineSection`/`TimelineEntry` variant where a meta row renders as a `TechBadgeCloud` (an icon-badge cloud) instead of plain icon+text — see the new `WithTechBadges` (`Patterns/TimelineEntry`) and `WithTechStack` (`Blocks/TimelineSection`) Storybook stories. `timeline-section.adapter.ts` now maps `subItems` (per-skill icon data, already described in the content model docs as "for nested items like TechStack in an Experience" but never actually read by any adapter) into this new badges row, falling back to the existing comma-joined text row when only flat `tags` are present.

While wiring this up, caught and fixed a layering mistake before it shipped: `TechBadgeCloud` was originally built at the Block layer, and `TimelineEntry` (a Pattern) needed it — importing a Block from a Pattern violates this project's own Elements ← Patterns ← Blocks dependency rule. Moved `TechBadgeCloud`'s implementation to `src/components/patterns/tech-badge-cloud/`; the Block layer now keeps only its Contentful adapter, not a duplicate component. `TechBadgeCloud`'s Storybook entry has moved from `Blocks/TechBadgeCloud` to `Patterns/TechBadgeCloud` accordingly.

The badges row renders as a bare `TechBadgeCloud` with no separate icon/label heading above it — an initial "Tech Stack" caption above the badges was redundant since each badge already carries its own icon and label.

See [ADR 0026](../docs/adr/0026-timeline-tech-badges-meta-row.md).
