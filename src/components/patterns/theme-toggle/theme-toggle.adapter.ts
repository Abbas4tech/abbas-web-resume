import type { ThemeToggleProps } from "./theme-toggle";

/**
 * Future: replace input type with Contentful SDK auto-generated AppData type.
 */
export function adaptThemeToggle(input: {
  themeList: string[];
  defaultTheme: string;
  themeIcon?: {
    iconCode?: string;
    classes?: string[];
    name?: string;
    showTooltip?: boolean;
  };
}): ThemeToggleProps {
  return {
    themes: input.themeList,
    defaultTheme: input.defaultTheme,
    themeIcon: input.themeIcon,
  };
}
