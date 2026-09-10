import { describe, expect, it } from "vitest";
import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { adaptAppHeader } from "./app-header.adapter";

describe("adaptAppHeader", () => {
  it("adapts full AdaptedLayout to AppHeaderProps", () => {
    const layout = {
      title: "My Header",
      resume: { url: "https://example.com/resume.pdf" },
      resumeIcon: {
        iconCode: "fa/FaFilePdf",
        name: "Resume",
        showTooltip: true,
      },
      themeList: ["light", "dark"],
      themeIcon: {
        iconCode: "fa/FaPaintBrush",
        name: "Theme",
        showTooltip: false,
      },
      defaultTheme: "light",
    } as AdaptedLayout;

    const result = adaptAppHeader(layout, "/");

    expect(result).toEqual({
      title: "My Header",
      resumeUrl: "https://example.com/resume.pdf",
      resumeIcon: {
        iconCode: "fa/FaFilePdf",
        name: "Resume",
        showTooltip: true,
      },
      themes: ["light", "dark"],
      themeIcon: {
        iconCode: "fa/FaPaintBrush",
        name: "Theme",
        showTooltip: false,
      },
      defaultTheme: "light",
      defaultRoute: "/",
    });
  });

  it("handles missing optional fields", () => {
    const layout = {
      title: "Minimal Header",
    } as AdaptedLayout;

    const result = adaptAppHeader(layout, "/about");

    expect(result).toEqual({
      title: "Minimal Header",
      resumeUrl: "",
      resumeIcon: {},
      themes: [],
      themeIcon: undefined,
      defaultTheme: "light",
      defaultRoute: "/about",
    });
  });
});
