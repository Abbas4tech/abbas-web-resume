---
"abbas-web-resume": minor
---

Added two new CMS-toggleable Blocks/variants from a DaisyUI catalog gap analysis (see ADR 0028): a `PanelShowcaseWithRadialProgress` variant (new `RadialProgress` Element and `IconRadialProgressRow` Pattern, same `subItems` data as the existing `PanelShowcase`), and a new `Carousel` `ContentList` Block sourcing slides from each entry's `coverImage`. Registered both in the local `contentList.ui` schema definition and pushed live to Contentful.
