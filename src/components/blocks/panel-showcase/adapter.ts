import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { PanelShowcaseProps } from "./types";

/**
 * Maps generic AdaptedContentList to the PanelShowcase block props.
 */
export function adaptPanelShowcase(
  data: AdaptedContentList
): PanelShowcaseProps {
  return {
    animation: undefined,
    panels: data.customEntries.map((panel) => ({
      title: panel.title,
      headingIcon: panel.icon || { iconCode: "" },
      rows: (panel.subItems || []).map((row) => ({
        progress: row.progress || 0,
        // Since badge currently only supports one icon, we pass it as an array of one
        icons: row.icon ? [row.icon] : [],
      })),
    })),
  };
}
