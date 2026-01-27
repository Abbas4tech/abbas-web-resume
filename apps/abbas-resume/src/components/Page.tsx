import { PageContent, PageHeading, Page as UIPage } from "@abbas-web-resume/ui/components/page";
import type { FC, HTMLAttributes } from "react";
import { fetchGql } from "@/lib/client";
import { GET_METAPAGES } from "@/queries/getMetapages";
import type { AppData } from "@/types/entries";
import PageChangeButton from "./PageChangeButton";

interface GetMetapageQueryResponse {
  userInfo: Pick<AppData, "pagesCollection">;
}

const Page: FC<HTMLAttributes<HTMLDivElement>> = async ({ className, children, ...props }) => {
  const data = await fetchGql<GetMetapageQueryResponse>(GET_METAPAGES, {
    id: process.env.CONTENTFUL_APPLICATION_DATA_ID,
  });

  return (
    <UIPage
      className={className}
      footer={<PageChangeButton pages={data.userInfo.pagesCollection.items} />}
      {...props}
    >
      {children}
    </UIPage>
  );
};

Page.displayName = "Page";

export { Page, PageContent, PageHeading };
