import { describe, expect, it, vi } from "vitest";
import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { adaptSidebarNav } from "./sidebar-nav.adapter";

vi.mock("@/contentful/adapters/nav-mapper", () => ({
  extractNavPages: vi.fn(() => [{ title: "Mock Sidebar Page" }]),
}));

describe("adaptSidebarNav", () => {
  it("uses extractNavPages for items", () => {
    const layout = {} as AdaptedLayout;
    expect(adaptSidebarNav(layout)).toEqual({
      pages: [{ title: "Mock Sidebar Page" }],
    });
  });
});
