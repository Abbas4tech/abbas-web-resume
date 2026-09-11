---
---

Fixed `migrate-timeline-tech-badges.ts`'s list-selection query, which matched `ui === "TimelineSection"`
exactly and silently stopped finding any qualifying content list once `ui` was switched to
`TimelineSectionWithBadges` (ADR 0026). Ran the corrected script against the live `production` Contentful
environment, which had never received this migration — production's Experience page now shows the same
tech-stack badges as development. See ADR 0026's amendment for details.
