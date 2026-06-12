import React from "react";
import { describe, expect, it, vi } from "vitest";
import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { adaptPageWrapper } from "./page-wrapper.adapter";

vi.mock("@/contentful/adapters/nav-mapper", () => ({
  extractNavPages: vi.fn(() => [{ title: "Mock Page" }]),
}));

describe("adaptPageWrapper", () => {
  it("adapts layout and children into PageWrapperProps", () => {
    const layout = {} as AdaptedLayout;
    const children = React.createElement("div", null, "Test Child");

    const result = adaptPageWrapper(layout, children);

    expect(result.pages).toEqual([{ title: "Mock Page" }]);
    expect(result.children).toBe(children);
  });
});
