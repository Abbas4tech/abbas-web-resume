# Abbas Resume E2E Tests

End-to-end testing suite for Abbas Web Resume using Playwright.

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# Show test report
npm run test:e2e:report
```

## Test Coverage

- Home page functionality
- Navigation between pages
- Responsive design (mobile, tablet, desktop)
- Theme switching
- Page performance

## Configuration

Tests are configured to run against `http://localhost:3000` by default. You can override this by setting the `BASE_URL` environment variable:

```bash
BASE_URL=https://your-domain.com npm run test:e2e
```
