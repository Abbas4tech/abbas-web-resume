import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { SplitContentPanelProps } from "./split-content-panel";

/**
 * Maps generic AdaptedContentSection to the SplitContentPanel block props.
 */
export function adaptSplitContentPanel(
  data: AdaptedContentSection
): SplitContentPanelProps {
  return {
    animation: undefined,
    description: data.entry?.body,
    infoRows: (data.entry?.subItems || []).map((badge) => ({
      label: badge.internalName,
      value: badge.title || "",
      icon: badge.icons?.[0] || { iconCode: "" },
    })),
  };
}
