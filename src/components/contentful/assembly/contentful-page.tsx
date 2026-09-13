import type { FC, PropsWithChildren } from "react";
import type { AdaptedPage } from "@/contentful/adapters/page";
import { ContentList } from "../page-section/content-list";
import { ContentSection } from "../page-section/content-section";
export interface ContentfulPageProps extends PropsWithChildren {
  data: AdaptedPage;
}

export const ContentfulPage: FC<ContentfulPageProps> = ({
  data,
  children,
}: ContentfulPageProps) => (
  <div className="flex flex-col gap-4 pb-8 md:gap-8">
    {data.topContentArea.map((block) => {
      if (block.__typename === "ContentSection") {
        return <ContentSection data={block} key={block.id} />;
      }
      if (block.__typename === "ContentList") {
        return <ContentList data={block} key={block.id} />;
      }
      return null;
    })}
    {children}
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
