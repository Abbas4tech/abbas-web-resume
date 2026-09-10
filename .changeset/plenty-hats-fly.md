---
"abbas-web-resume": patch
---

Added E2E coverage for routing and error surfaces (`tests/e2e/routing.spec.ts`): direct navigation to a nested path, the real `notFound()` branch rendering `NotFoundBlock` with a working home link, and the `src/app/error.tsx` boundary — the latter exercised by a sentinel fixture path (`SERVER_ERROR_PAGE_PATH`) that `tests/mocks/handlers.ts` answers with a GraphQL error response, since no realistic fixture data could make a component throw on its own. New Block Object Models: `NotFoundModel`, `ServerErrorModel`.

Fixed a hydration-timing flake this surfaced: clicking the NotFound page's home link and separately asserting the URL changed passed in isolation but failed under the full suite's parallel load, since the client-side `Link` handler can attach later than `expect()`'s default timeout allows for. Fixed by racing the click against `page.waitForURL(...)` instead.
