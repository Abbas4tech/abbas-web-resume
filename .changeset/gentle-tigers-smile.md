---
"abbas-web-resume": minor
---

Added the final tier of the DaisyUI catalog gap analysis (see ADR 0030): an `AvailabilityBanner` Block (new `Status`/`Countdown` Elements and `StatusIndicator`/`CountdownUnit` Patterns, reusing the already-fetched `startDate` field for a render-time availability countdown), a `ProcessStepsWithTimeline` variant using a new native `Timeline` Element, and `Breadcrumbs`/`BreadcrumbTrail` primitives (built and tested, not yet wired into a live page since the site's routes are still flat). Registered `AvailabilityBanner` and `ProcessStepsWithTimeline` in the local schema definitions (live Contentful push deferred pending explicit go-ahead).
