import { describe, expect, it, vi } from "vitest";
import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { adaptBottomDock } from "./bottom-dock.adapter";

vi.mock("@/contentful/adapters/nav-mapper", () => ({
  extractNavPages: vi.fn(() => [{ title: "Mock Page" }]),
}));

describe("adaptBottomDock", () => {
  it("uses extractNavPages to get items", () => {
    const layout = {} as AdaptedLayout;
    expect(adaptBottomDock(layout)).toEqual({
      items: [{ title: "Mock Page" }],
    });
  });
});
