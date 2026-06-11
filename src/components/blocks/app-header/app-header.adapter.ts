import type { AdaptedLayout } from "@/contentful/adapters/layout";
import type { AppHeaderProps } from "./app-header";

export function adaptAppHeader(
  layout: AdaptedLayout,
  defaultRoute: string
): AppHeaderProps {
  return {
    title: layout.title,
    resumeUrl: layout.resume?.url || "",
    resumeIcon: layout.resumeIcon
      ? {
          iconCode: layout.resumeIcon.iconCode,
          name: layout.resumeIcon.name,
          showTooltip: layout.resumeIcon.showTooltip,
        }
      : {},
    themes: layout.themeList || [],
    themeIcon: layout.themeIcon
      ? {
          iconCode: layout.themeIcon.iconCode,
          name: layout.themeIcon.name,
          showTooltip: layout.themeIcon.showTooltip,
        }
      : undefined,
    defaultTheme: layout.defaultTheme || "light",
    defaultRoute,
  };
}
