---
"abbas-web-resume": patch
---

Added `src/contentful/scripts/migrate-timeline-tech-badges.ts`, a one-time (idempotent, dry-run by default) migration that converts a `TimelineSection` entry's flat `tags` into real `subItems` badge links, so `TimelineEntry` renders its tech-stack row as a `TechBadgeCloud` instead of comma-joined text. Already run against the live Contentful space's real "Experience — Timeline" content — verified live on `/experience` with zero console errors and zero icon-registry fallbacks.

See [ADR 0026](../docs/adr/0026-timeline-tech-badges-meta-row.md).
