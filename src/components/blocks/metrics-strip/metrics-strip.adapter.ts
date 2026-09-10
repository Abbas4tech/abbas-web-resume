import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { MetricsStripProps } from "./metrics-strip";

/**
 * Maps generic AdaptedContentList to the MetricsStrip block props.
 * title -> label (e.g. "Years of experience"), subtitle -> the headline value (e.g. "5+").
 */
export function adaptMetricsStrip(data: AdaptedContentList): MetricsStripProps {
  return {
    stats: data.customEntries.map((item) => ({
      label: item.title,
      value: item.subtitle || "",
      icon: item.icon ?? undefined,
    })),
  };
}
