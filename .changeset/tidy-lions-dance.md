---
"abbas-web-resume": minor
---

Added three more CMS-toggleable Blocks/variants from the DaisyUI catalog gap analysis, Phase 2 (see ADR 0029): a `SkillsMatrix` table-layout variant of `PanelShowcase` (new `Table` Element), a `TestimonialWall` Block (new `ChatBubble` Element and `ChatMessageRow` Pattern), and a `MockupGallery` Block that frames project screenshots in a browser or phone mockup (new `MockupBrowser`/`MockupCode`/`MockupPhone` Elements and `MockupShowcaseFrame` Pattern). Registered `SkillsMatrix`, `TestimonialWall`, `MockupGalleryBrowser`, and `MockupGalleryPhone` in the local `contentList.ui` schema definition (live Contentful push deferred pending explicit go-ahead).
