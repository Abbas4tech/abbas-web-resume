---
"abbas-web-resume": patch
---

Added a live Contentful schema-parity check (ADR 0031) after a real production incident: `pnpm contentful:setup` schema pushes had only ever targeted the `development` environment, so `production` silently drifted out of sync and 500'd on every page after a merge. New pure-Python CI job (`scripts/contentful/verify-contentful-schema.py`, stdlib only) exercises the app's real GraphQL queries — parsed directly from the generated SDK so it can never drift from what the app actually queries — against both `development` and `production` on every PR, regardless of target branch. Also corrected the `build` CI job's env-block comment, which incorrectly claimed `next build` statically renders pages from Contentful (the app's catch-all route is fully dynamic, so it never actually calls these queries at build time).
