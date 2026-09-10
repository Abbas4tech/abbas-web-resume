import { describe, expect, it, vi } from "vitest";
import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { adaptFooter } from "./footer.adapter";

vi.mock("@/contentful/adapters/nav-mapper", () => ({
  extractNavPages: vi.fn(() => [{ title: "Mock Page", pageUrl: "/mock" }]),
}));

describe("adaptFooter", () => {
  it("maps footerText, email, and extractNavPages links", () => {
    const layout = {
      footerText: "© 2026 Fixture",
      email: "fixture@example.com",
    } as AdaptedLayout;

    expect(adaptFooter(layout)).toEqual({
      footerText: "© 2026 Fixture",
      email: "fixture@example.com",
      links: [{ title: "Mock Page", pageUrl: "/mock" }],
    });
  });

  it("omits email when the layout has none", () => {
    const layout = { footerText: "© 2026 Fixture", email: "" } as AdaptedLayout;

    expect(adaptFooter(layout).email).toBeUndefined();
  });
});
