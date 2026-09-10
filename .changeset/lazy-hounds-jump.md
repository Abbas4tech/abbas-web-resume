---
"abbas-web-resume": patch
---

Fixed a CI regression from ADR 0023's job split: the `e2e-test` job shipped with no `CONTENTFUL_*` values at all, on the assumption MSW's mocking made them unnecessary. It missed that `src/contentful/lib/client.ts` builds the GraphQL endpoint via string interpolation, which becomes the literal string `"undefined/undefined/environments/undefined"` with all three unset — an invalid URL that throws before MSW ever gets a chance to intercept the request. Every page render failed, and the dev server never came up within Playwright's `webServer` timeout, failing the whole job. Confirmed via a real CI log and local reproduction (unsetting the same variables reproduces the exact `TypeError: Invalid URL`), then fixed with harmless placeholder values (not real secrets — MSW never inspects them, they just need to form a syntactically valid URL) and re-verified locally.
