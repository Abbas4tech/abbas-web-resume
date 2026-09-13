# CI Verification Rule

When finishing a task or before committing changes, ALWAYS verify that the local codebase passes the same checks that run in CI.

## Verification Command

Run the following command to verify the codebase:
```bash
pnpm ci:local
```

This runs linting (`pnpm check`), typechecking (`pnpm typecheck`), unit tests (`pnpm test:run`), and a production build (`pnpm build`).

If the user specifically asks you to verify end-to-end functionality, or if you modify critical user journeys, also run the Playwright tests:
```bash
pnpm test:e2e
```

**Never** mark a task as complete if `pnpm ci:local` is failing, unless the user explicitly tells you to ignore the failures.
