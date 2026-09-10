import type { AlertVariant } from "@/components/elements/ui/alert/alert";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { AnnouncementBannerProps } from "./announcement-banner";

const ALERT_VARIANTS: readonly AlertVariant[] = [
  "info",
  "success",
  "warning",
  "error",
];

function resolveVariant(tags: string[] | undefined): AlertVariant {
  const tag = tags?.find((candidate): candidate is AlertVariant =>
    ALERT_VARIANTS.includes(candidate as AlertVariant)
  );
  return tag ?? "info";
}

/**
 * Maps a single-entry AdaptedContentSection to the AnnouncementBanner block props.
 * The entry's first matching tag ("info" | "success" | "warning" | "error")
 * selects the Alert variant; any other tags are ignored.
 */
export function adaptAnnouncementBanner(
  data: AdaptedContentSection
): AnnouncementBannerProps {
  const item = data.entry?.__typename === "ContentItem" ? data.entry : null;

  return {
    message: item?.description || item?.title || "",
    variant: resolveVariant(item?.tags),
    icon: item?.icon ?? undefined,
    link: item?.links?.[0],
  };
}
