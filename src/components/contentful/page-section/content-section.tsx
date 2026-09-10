import type { ReactNode } from "react";
import { AnnouncementBanner } from "@/components/blocks/announcement-banner/announcement-banner";
import { adaptAnnouncementBanner } from "@/components/blocks/announcement-banner/announcement-banner.adapter";
import { AvailabilityBanner } from "@/components/blocks/availability-banner/availability-banner";
import { adaptAvailabilityBanner } from "@/components/blocks/availability-banner/availability-banner.adapter";
import { HeroBanner } from "@/components/blocks/hero-banner/hero-banner";
import { adaptHeroBanner } from "@/components/blocks/hero-banner/hero-banner.adapter";
import { SplitContentPanel } from "@/components/blocks/split-content-panel/split-content-panel";
import { adaptSplitContentPanelFromSection } from "@/components/blocks/split-content-panel/split-content-panel.adapter";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { BlockPlaceholder } from "../element/block-placeholder";

interface Props {
  className?: string;
  data: AdaptedContentSection;
}

const SECTION_BLOCK_REGISTRY: Record<
  string,
  (data: AdaptedContentSection, className?: string) => ReactNode
> = {
  HeroBanner: (data, className) => (
    <HeroBanner {...adaptHeroBanner(data)} className={className} />
  ),
  // SplitContentPanel already existed as a Block (used today under
  // ContentList) but was never reachable from a ContentSection, despite
  // docs/contentful/content-model.md documenting it as an intended
  // ContentSection variant since ADR 0003.
  SplitContentPanel: (data, className) => (
    <SplitContentPanel
      {...adaptSplitContentPanelFromSection(data)}
      className={className}
    />
  ),
  AnnouncementBanner: (data, className) => (
    <AnnouncementBanner
      {...adaptAnnouncementBanner(data)}
      className={className}
    />
  ),
  AvailabilityBanner: (data, className) => (
    <AvailabilityBanner
      {...adaptAvailabilityBanner(data)}
      className={className}
    />
  ),
};

export function ContentSection({ data, className }: Props) {
  const renderBlock = SECTION_BLOCK_REGISTRY[data.ui];

  if (!renderBlock) {
    return (
      <BlockPlaceholder
        blockType="ContentSection"
        id={data.id}
        uiVariant={data.ui}
      />
    );
  }

  return renderBlock(data, className);
}
