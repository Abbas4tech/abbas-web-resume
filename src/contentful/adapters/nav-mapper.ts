import type { AdaptedLayout } from "@/contentful/adapters/layout";

export function extractNavPages(layout: AdaptedLayout) {
  return (layout.navigation?.customEntries || []).map((item) => ({
    pageUrl:
      item.links?.[0]?.href ||
      `/${item.entryField?.toLowerCase() || ""}` ||
      "/",
    title: item.title || "",
    pageIcon: item.icon
      ? {
          iconCode: item.icon.iconCode,
          name: item.icon.name,
          showTooltip: item.icon.showTooltip,
        }
      : { iconCode: "" },
  }));
}
