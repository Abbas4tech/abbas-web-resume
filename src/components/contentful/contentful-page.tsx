import type { FC } from "react";
import { ContentList } from "@/components/contentful/content-list";
import { ContentSection } from "@/components/contentful/content-section";
import type { AdaptedPage } from "@/contentful/adapters/page";

export interface ContentfulPageProps {
  data: AdaptedPage;
}

export const ContentfulPage: FC<ContentfulPageProps> = ({ data }) => (
  <div className="flex flex-col gap-8 py-8">
    {data.topContentArea.map((block) => {
      if (block.__typename === "ContentSection") {
        return <ContentSection data={block} key={block.id} />;
      }
      if (block.__typename === "ContentList") {
        return <ContentList data={block} key={block.id} />;
      }
      return null;
    })}

    {data.bottomContentArea.map((block) => {
      if (block.__typename === "ContentSection") {
        return <ContentSection data={block} key={block.id} />;
      }
      if (block.__typename === "ContentList") {
        return <ContentList data={block} key={block.id} />;
      }
      return null;
    })}
  </div>
);
