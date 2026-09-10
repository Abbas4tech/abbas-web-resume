import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { ProcessStepsProps } from "./process-steps";

function buildSteps(data: AdaptedContentList): ProcessStepsProps["steps"] {
  return data.customEntries.map((item) => ({
    title: item.title,
    description: item.description || undefined,
    icon: item.icon ?? undefined,
  }));
}

/**
 * Maps generic AdaptedContentList to the ProcessSteps block props —
 * `ui: "ProcessSteps"`, in entry order.
 */
export function adaptProcessSteps(data: AdaptedContentList): ProcessStepsProps {
  return { steps: buildSteps(data) };
}

/**
 * Maps generic AdaptedContentList to the ProcessSteps block props —
 * `ui: "ProcessStepsWithTimeline"`. Same entries as adaptProcessSteps,
 * rendered as a native DaisyUI Timeline instead of the numbered Step list.
 */
export function adaptProcessStepsWithTimeline(
  data: AdaptedContentList
): ProcessStepsProps {
  return { layout: "timeline", steps: buildSteps(data) };
}
