import { describe, expect, it } from "vitest";
import { adaptPageNavButton } from "./page-nav-button.adapter";

describe("adaptPageNavButton", () => {
  it("adapts pages array into PageNavButtonProps", () => {
    const pages = [
      { title: "Test", slug: "test", pageUrl: "/test", sys: { id: "1" } },
    ];

    expect(adaptPageNavButton(pages)).toEqual({ pages });
  });
});
