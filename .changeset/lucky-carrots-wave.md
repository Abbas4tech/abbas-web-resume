---
"abbas-web-resume": minor
---

Added three new CMS-toggleable Blocks/variants from a DaisyUI catalog gap analysis (see ADR 0028): a `Footer` Block rendering the previously-unused `layout.footerText`, a `PanelShowcaseWithRadialProgress` variant (new `RadialProgress` Element and `IconRadialProgressRow` Pattern, same `subItems` data as the existing `PanelShowcase`), and a new `Carousel` `ContentList` Block sourcing slides from each entry's `coverImage`. Registered `PanelShowcaseWithRadialProgress` and `Carousel` in the local `contentList.ui` schema definition (live Contentful push deferred pending explicit go-ahead).
