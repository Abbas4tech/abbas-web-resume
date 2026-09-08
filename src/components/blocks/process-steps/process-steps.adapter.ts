import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { ProcessStepsProps } from "./process-steps";

/**
 * Maps generic AdaptedContentList to the ProcessSteps block props, in entry order.
 */
export function adaptProcessSteps(data: AdaptedContentList): ProcessStepsProps {
  return {
    steps: data.customEntries.map((item) => ({
      title: item.title,
      description: item.description || undefined,
      icon: item.icon ?? undefined,
    })),
  };
}
