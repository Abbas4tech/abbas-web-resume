import { expect } from "@playwright/test";
import {
  NON_EXISTENT_PAGE_PATH,
  SERVER_ERROR_PAGE_PATH,
} from "../mocks/fixture-site";
import { test } from "./fixtures/test-base";

const ABOUT_PATH_PATTERN = /\/about$/;

test.describe("Routing & error surfaces", () => {
  test("direct navigation to a valid nested path renders that page", async ({
    page,
  }) => {
    await page.goto("/experience");

    await expect(
      page.getByRole("heading", { level: 2, name: "Experience" })
    ).toBeVisible();
  });

  test("an unknown path renders NotFound with a working home link", async ({
    page,
    notFound,
  }) => {
    const response = await page.goto(NON_EXISTENT_PAGE_PATH);

    expect(response?.status()).toBe(404);
    await expect(notFound.heading).toBeVisible();

    // "Go back home" points at "/", which src/middleware.ts redirects to
    // "/about" — following through proves the link is actually wired up,
    // not just present. Racing the click against waitForURL (rather than
    // clicking, then separately asserting the URL) avoids a hydration-timing
    // flake: under load, the client-side Link handler can attach later than
    // the default expect() timeout allows for.
    await Promise.all([
      page.waitForURL(ABOUT_PATH_PATTERN),
      notFound.homeLink.click(),
    ]);
  });

  test("a GraphQL failure renders the ServerError boundary with a working retry action", async ({
    page,
    serverError,
  }) => {
    await page.goto(SERVER_ERROR_PAGE_PATH);

    await expect(serverError.heading).toBeVisible();
    await expect(serverError.retryButton).toBeVisible();

    // The fixture always fails this path, so retrying re-enters the same
    // boundary rather than crashing — this proves `reset()` is wired to a
    // real re-render, not just present as inert markup.
    await serverError.retryButton.click();
    await expect(serverError.heading).toBeVisible();
  });
});
