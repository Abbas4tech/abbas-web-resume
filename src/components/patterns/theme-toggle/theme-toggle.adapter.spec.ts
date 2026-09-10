import { describe, expect, it } from "vitest";
import { adaptThemeToggle } from "./theme-toggle.adapter";

describe("adaptThemeToggle", () => {
  it("maps input correctly to ThemeToggleProps", () => {
    const input = {
      themeList: ["light", "dark", "synthwave"],
      defaultTheme: "dark",
      themeIcon: {
        iconCode: "io5/IoColorPalette",
        name: "Palette",
      },
    };

    const expected = {
      themes: ["light", "dark", "synthwave"],
      defaultTheme: "dark",
      themeIcon: {
        iconCode: "io5/IoColorPalette",
        name: "Palette",
      },
    };

    expect(adaptThemeToggle(input)).toEqual(expected);
  });

  it("handles optional themeIcon correctly", () => {
    const input = {
      themeList: ["light", "dark"],
      defaultTheme: "light",
    };

    const expected = {
      themes: ["light", "dark"],
      defaultTheme: "light",
      themeIcon: undefined,
    };

    expect(adaptThemeToggle(input)).toEqual(expected);
  });
});
