import type { AppHeaderProps } from "./app-header";

/**
 * Future: replace input type with Contentful SDK auto-generated AppData type.
 */
export function adaptAppHeader(input: {
  title: string;
  resume: { url: string };
  resumeIcon: {
    iconCode?: string;
    classes?: string[];
    name?: string;
    showTooltip?: boolean;
  };
  themeList: string[];
  themeIcon?: {
    iconCode?: string;
    classes?: string[];
    name?: string;
    showTooltip?: boolean;
  };
  defaultTheme: string;
  defaultRoute: string;
}): AppHeaderProps {
  return {
    title: input.title,
    resumeUrl: input.resume.url,
    resumeIcon: input.resumeIcon,
    themes: input.themeList,
    themeIcon: input.themeIcon,
    defaultTheme: input.defaultTheme,
    defaultRoute: input.defaultRoute,
  };
}
