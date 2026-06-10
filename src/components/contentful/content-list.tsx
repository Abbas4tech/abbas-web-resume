import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { ContentItem } from "./content-item";

interface Props {
  className?: string;
  data: AdaptedContentList;
}

export function ContentList({ data, className }: Props) {
  // In a real application, we would use data.ui to switch between patterns
  // e.g. if (data.ui === "Carousel") return <Carousel items={data.customEntries} />

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
