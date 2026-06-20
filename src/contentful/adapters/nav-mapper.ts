import type { AdaptedLayout } from "@/contentful/adapters/layout";

export function extractNavPages(layout: AdaptedLayout) {
  const links = layout.navigationLinks;

  return links.map((link) => ({
    pageUrl: link.href || "/",
    title: link.text || "",
    pageIcon: link.icon
      ? {
          iconCode: link.icon.iconCode || "",
          name: link.icon.name || "",
          showTooltip: link.icon.showTooltip,
        }
      : { iconCode: "" },
  }));
}
