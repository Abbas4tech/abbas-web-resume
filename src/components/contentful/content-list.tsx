import { CardGrid } from "@/components/blocks/card-grid/card-grid";
import { adaptCardGrid } from "@/components/blocks/card-grid/card-grid.adapter";
import { PanelShowcase } from "@/components/blocks/panel-showcase/panel-showcase";
import { adaptPanelShowcase } from "@/components/blocks/panel-showcase/panel-showcase.adapter";
import { TimelineSection } from "@/components/blocks/timeline-section/timeline-section";
import { adaptTimelineSection } from "@/components/blocks/timeline-section/timeline-section.adapter";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { SplitContentPanel } from "../blocks/split-content-panel/split-content-panel";
import { adaptSplitContentPanel } from "../blocks/split-content-panel/split-content-panel.adapter";
import { ContentItem } from "./content-item";

interface Props {
  className?: string;
  data: AdaptedContentList;
}

export function ContentList({ data, className }: Props) {
  if (data.ui === "TimelineSection") {
    return (
      <TimelineSection {...adaptTimelineSection(data)} className={className} />
    );
  }

  if (data.ui === "SplitContentPanel") {
    const splitContentPanelProps = adaptSplitContentPanel(data);
    return (
      <SplitContentPanel {...splitContentPanelProps} className={className} />
    );
  }

  if (data.ui === "CardGrid") {
    return <CardGrid {...adaptCardGrid(data)} className={className} />;
  }

  if (data.ui === "PanelShowcase") {
    return (
      <PanelShowcase {...adaptPanelShowcase(data)} className={className} />
    );
  }

  return (
    <section className={`flex w-full flex-col gap-8 ${className || ""}`}>
      {(data.title || data.description) && (
        <header className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
          {data.title && <h2 className="font-bold text-3xl">{data.title}</h2>}
          {data.description && <RichText document={data.description} />}
        </header>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.customEntries.map((item) => (
          <ContentItem className="h-full" data={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
