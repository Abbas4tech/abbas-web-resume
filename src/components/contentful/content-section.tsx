import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { ContentItem } from "./content-item";

interface Props {
  className?: string;
  data: AdaptedContentSection;
}

export function ContentSection({ data, className }: Props) {
  if (!data.entry) {
    return null;
  }

  return (
    <section className={`w-full py-12 ${className || ""}`}>
      <div className="mx-auto max-w-4xl">
        {/* We reuse ContentItem but could render it differently for 'Hero' vs 'Standard' ui */}
        <ContentItem
          className="border-none bg-transparent shadow-none"
          data={data.entry}
        />
      </div>
    </section>
  );
}
