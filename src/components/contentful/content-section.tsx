import { HeroBanner } from "@/components/blocks/hero-banner/hero-banner";
import { adaptHeroBanner } from "@/components/blocks/hero-banner/hero-banner.adapter";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { ContentItem } from "./content-item";
import { StatItem } from "./stat-item";

interface Props {
  className?: string;
  data: AdaptedContentSection;
}

export function ContentSection({ data, className }: Props) {
  if (!data.entry) {
    return null;
  }

  // Map data.ui to specific Blocks
  if (data.ui === "HeroBanner") {
    return <HeroBanner {...adaptHeroBanner(data)} className={className} />;
  }

  // Default fallback rendering
  return (
    <section className={`w-full py-12 ${className || ""}`}>
      <div className="mx-auto max-w-4xl">
        {data.entry.__typename === "ContentItem" ? (
          <ContentItem
            className="border-none bg-transparent shadow-none"
            data={data.entry}
          />
        ) : (
          <StatItem data={data.entry} />
        )}
      </div>
    </section>
  );
}
