import { describe, expect, it } from "vitest";
import { adaptNavItem } from "./nav-item.adapter";

describe("adaptNavItem", () => {
  const input = {
    pageUrl: "/portfolio",
    title: "Portfolio",
    pageIcon: { iconCode: "fa/FaBriefcase", name: "Briefcase" },
  };

  it("adapts Contentful MetaPage type to NavItemProps", () => {
    const result = adaptNavItem(input, "/home");

    expect(result.href).toBe("/portfolio");
    expect(result.label).toBe("Portfolio");
    expect(result.iconCode).toBe("fa/FaBriefcase");
    expect(result.iconName).toBe("Briefcase");
    expect(result.isActive).toBe(false);
  });

  it("sets isActive to true if current url matches page url", () => {
    const result = adaptNavItem(input, "/portfolio");
    expect(result.isActive).toBe(true);
  });
});
