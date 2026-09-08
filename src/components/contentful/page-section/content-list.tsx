import type { ReactNode } from "react";
import { CardGrid } from "@/components/blocks/card-grid/card-grid";
import { adaptCardGrid } from "@/components/blocks/card-grid/card-grid.adapter";
import { ContentTabs } from "@/components/blocks/content-tabs/content-tabs";
import { adaptContentTabs } from "@/components/blocks/content-tabs/content-tabs.adapter";
import { FaqAccordion } from "@/components/blocks/faq-accordion/faq-accordion";
import { adaptFaqAccordion } from "@/components/blocks/faq-accordion/faq-accordion.adapter";
import { MetricsStrip } from "@/components/blocks/metrics-strip/metrics-strip";
import { adaptMetricsStrip } from "@/components/blocks/metrics-strip/metrics-strip.adapter";
import { PanelShowcase } from "@/components/blocks/panel-showcase/panel-showcase";
import { adaptPanelShowcase } from "@/components/blocks/panel-showcase/panel-showcase.adapter";
import { ProcessSteps } from "@/components/blocks/process-steps/process-steps";
import { adaptProcessSteps } from "@/components/blocks/process-steps/process-steps.adapter";
import { SplitContentPanel } from "@/components/blocks/split-content-panel/split-content-panel";
import { adaptSplitContentPanel } from "@/components/blocks/split-content-panel/split-content-panel.adapter";
import { adaptTechBadgeCloud } from "@/components/blocks/tech-badge-cloud/tech-badge-cloud.adapter";
import { TimelineSection } from "@/components/blocks/timeline-section/timeline-section";
import { adaptTimelineSection } from "@/components/blocks/timeline-section/timeline-section.adapter";
import { TechBadgeCloud } from "@/components/patterns/tech-badge-cloud/tech-badge-cloud";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { BlockPlaceholder } from "../element/block-placeholder";

interface Props {
  className?: string;
  data: AdaptedContentList;
}

const LIST_BLOCK_REGISTRY: Record<
  string,
  (data: AdaptedContentList, className?: string) => ReactNode
> = {
  TimelineSection: (data, className) => (
    <TimelineSection {...adaptTimelineSection(data)} className={className} />
  ),
  SplitContentPanel: (data, className) => (
    <SplitContentPanel
      {...adaptSplitContentPanel(data)}
      className={className}
    />
  ),
  CardGrid: (data, className) => (
    <CardGrid {...adaptCardGrid(data)} className={className} />
  ),
  PanelShowcase: (data, className) => (
    <PanelShowcase {...adaptPanelShowcase(data)} className={className} />
  ),
  FaqAccordion: (data, className) => (
    <FaqAccordion {...adaptFaqAccordion(data)} className={className} />
  ),
  MetricsStrip: (data, className) => (
    <MetricsStrip {...adaptMetricsStrip(data)} className={className} />
  ),
  ProcessSteps: (data, className) => (
    <ProcessSteps {...adaptProcessSteps(data)} className={className} />
  ),
  ContentTabs: (data, className) => (
    <ContentTabs {...adaptContentTabs(data)} className={className} />
  ),
  TechBadgeCloud: (data, className) => (
    <TechBadgeCloud {...adaptTechBadgeCloud(data)} className={className} />
  ),
};

export function ContentList({ data, className }: Props) {
  const renderBlock = LIST_BLOCK_REGISTRY[data.ui];

  if (!renderBlock) {
    return (
      <BlockPlaceholder
        blockType="ContentList"
        id={data.id}
        uiVariant={data.ui}
      />
    );
  }

  return renderBlock(data, className);
}
