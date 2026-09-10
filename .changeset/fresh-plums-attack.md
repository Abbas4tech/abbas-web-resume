---
"abbas-web-resume": patch
---

Fixed the real root cause behind the E2E fixture-poisoning bug found in the previous release: `src/contentful/lib/client.ts` now passes `cache: "no-store"` to `GraphQLClient`, so Contentful responses are never written to Next.js's on-disk fetch Data Cache at all — in dev *or* production. Previously, nothing revalidated a cached Contentful response, so (a) a content edit in Contentful could go live without ever appearing on the deployed site without a redeploy, and (b) a stale cached response (real or mocked) could silently leak across dev-server restarts regardless of the current `NEXT_PUBLIC_API_MOCKING` setting — reproduced directly by booting a plain unmocked `next dev` right after a mocked E2E run and watching it serve the mocked fixture's stale cached response anyway.

Also hardens the E2E suite per feedback that it still felt fragile:
- Added `tests/e2e/global-setup.ts`, which fails the whole run immediately with one specific, actionable message if the server under test isn't actually serving the mocked fixture (most commonly because `reuseExistingServer` reused an unmocked server) — instead of a scattered handful of confusing failures.
- Removed the redundant `tests/e2e/example.spec.ts` placeholder (folded its one distinctive assertion into `smoke.spec.ts`).
- Added `pnpm test:e2e:install` and documented it as a required one-time local setup step — CI already installs browsers itself, but nothing told a local contributor to.
