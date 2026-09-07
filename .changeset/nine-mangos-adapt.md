---
"abbas-web-resume": patch
---

Added unit tests for the Contentful adapter layer (`content-item`, `content-list`, `content-section`, `icon`, `image`, `layout`, `link`, `page`, `stat-item`), which had almost no coverage despite backing every page render on the site. Adapters directory coverage goes from ~25% to ~97% statements. Part of the ADR 0021 test coverage remediation plan.
