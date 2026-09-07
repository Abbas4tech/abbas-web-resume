---
"abbas-web-resume": patch
---

Added E2E coverage for every registered Block against the ADR 0022 fixture site: `hero-banner.spec.ts`, `split-content-panel.spec.ts`, `timeline-section.spec.ts` (including the multi-node-type rich-text body — heading, list, bold mark, inline link), `card-grid.spec.ts`, and `panel-showcase.spec.ts`, each with its own new Block Object Model (`HeroBannerModel`, `SplitContentPanelModel`, `TimelineSectionModel`, `CardGridModel`, `PanelShowcaseModel`).

Found two content-model fields that are silently dropped by the components rendering them (`CardGrid`'s link `text`, `PanelShowcase`'s row `title`) — worked around in the fixture rather than the components, since fixing either felt like a bigger call than this PR's scope. Documented both in ADR 0022.
