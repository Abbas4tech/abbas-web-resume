import type { StatusColor } from "@/components/elements/ui/status/status";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { AvailabilityBannerProps } from "./availability-banner";

const STATUS_COLORS: readonly StatusColor[] = [
  "neutral",
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
];

function resolveStatusColor(tags: string[] | undefined): StatusColor {
  const tag = tags?.find((candidate): candidate is StatusColor =>
    STATUS_COLORS.includes(candidate as StatusColor)
  );
  return tag ?? "success";
}

/** Days between now and `date`, or undefined if `date` is missing or already past. */
function daysUntil(date: Date | null | undefined): number | undefined {
  if (!date) {
    return;
  }
  const diffMs = date.getTime() - Date.now();
  if (diffMs <= 0) {
    return;
  }
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Maps a single-entry AdaptedContentSection to the AvailabilityBanner block
 * props. Reuses AnnouncementBanner's tag-based color-selection convention
 * (first matching tag wins) and the entry's existing `startDate` field for
 * the optional countdown — no new Contentful fields needed.
 */
export function adaptAvailabilityBanner(
  data: AdaptedContentSection
): AvailabilityBannerProps {
  const item = data.entry?.__typename === "ContentItem" ? data.entry : null;

  return {
    message: item?.description || item?.title || "",
    statusColor: resolveStatusColor(item?.tags),
    daysUntil: daysUntil(item?.startDate),
  };
}
