import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { SplitContentPanelProps } from "./split-content-panel";

/**
 * Maps generic AdaptedContentSection to the SplitContentPanel block props.
 */
export function adaptSplitContentPanel(
  data: AdaptedContentList
): SplitContentPanelProps {
  return {
    description: data.description,
    infoRows: (data.customEntries || []).map((item) => ({
      label: item.title,
      value: item.description || "",
      icon: item.icon,
    })),
  };
}
