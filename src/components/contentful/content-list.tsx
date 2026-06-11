import { CardGallery } from "@/components/blocks/card-gallery/card-gallery";
import { adaptCardGallery } from "@/components/blocks/card-gallery/card-gallery.adapter";
import { PanelShowcase } from "@/components/blocks/panel-showcase/panel-showcase";
import { adaptPanelShowcase } from "@/components/blocks/panel-showcase/panel-showcase.adapter";
import { TimelineSection } from "@/components/blocks/timeline-section/timeline-section";
import { adaptTimelineSection } from "@/components/blocks/timeline-section/timeline-section.adapter";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { ContentItem } from "./content-item";

interface Props {
  className?: string;
  data: AdaptedContentList;
}

export function ContentList({ data, className }: Props) {
  // Map data.ui to specific Blocks
  if (data.ui === "TimelineSection") {
    return (
      <TimelineSection {...adaptTimelineSection(data)} className={className} />
    );
  }

  if (data.ui === "CardGallery") {
    return <CardGallery {...adaptCardGallery(data)} className={className} />;
  }

  if (data.ui === "PanelShowcase") {
    return (
      <PanelShowcase {...adaptPanelShowcase(data)} className={className} />
    );
  }

  // Default fallback rendering
  return (
    <section className={`flex w-full flex-col gap-8 ${className || ""}`}>
      {(data.title || data.description) && (
        <header className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
          {data.title && <h2 className="font-bold text-3xl">{data.title}</h2>}
          {data.description && (
            <p className="text-base-content/70 text-lg">{data.description}</p>
          )}
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
