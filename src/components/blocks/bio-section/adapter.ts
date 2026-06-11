import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { BioSectionProps } from "./types";

/**
 * Maps generic AdaptedContentSection to the BioSection block props.
 */
export function adaptBioSection(data: AdaptedContentSection): BioSectionProps {
  return {
    animation: undefined,
    description: data.entry?.body,
    infoRows: (data.entry?.subItems || []).map((badge) => ({
      label: badge.internalName,
      value: badge.title || "",
      icon: badge.icon || { iconCode: "" },
    })),
  };
}
