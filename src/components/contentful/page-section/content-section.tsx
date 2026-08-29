import type { ReactNode } from "react";
import { HeroBanner } from "@/components/blocks/hero-banner/hero-banner";
import { adaptHeroBanner } from "@/components/blocks/hero-banner/hero-banner.adapter";
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
