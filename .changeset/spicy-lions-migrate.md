---
"abbas-web-resume": patch
---

Migrated real resume/portfolio content from the legacy Contentful space into the new composable content model (ADR-0019), extending the schema with `page.icon`, `seoMetadata` social/attribution fields, and `layout.favicon`. Fixed a `HeroBanner` parallax bug (`MotionParallax`/`hero-banner.tsx`) where the banner image left a visible gap above the avatar instead of filling its container.
