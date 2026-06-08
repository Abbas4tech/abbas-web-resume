import { type FC, forwardRef, type HTMLAttributes, memo } from "react";
import { fetchGql } from "@/lib/client";
import { cn } from "@/lib/utils";
import { GET_METAPAGES } from "@/queries/getMetapages";
import type { AppData } from "@/types/entries";

import PageChangeButton from "../PageChangeButton";

interface GetMetapageQueryResponse {
  userInfo: Pick<AppData, "pagesCollection">;
}

const Page: FC<HTMLAttributes<HTMLDivElement>> = async ({
  className,
  children,
  ...props
}) => {
  const data = await fetchGql<GetMetapageQueryResponse>(GET_METAPAGES, {
    id: process.env.CONTENTFUL_APPLICATION_DATA_ID,
  });

  return (
    <div
      className={cn("scrollbar-hide flex flex-col overflow-auto", className)}
      role="main"
      {...props}
    >
      {children}
      <PageChangeButton pages={data.userInfo.pagesCollection.items} />
    </div>
  );
};

Page.displayName = "Page";

const PageContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("", className)} ref={ref} {...props} />
    )
  )
);

PageContent.displayName = PageContent.displayName;

const PageHeading = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h1
        className={cn(
          "flex items-center justify-center gap-4 p-4 px-0 font-bold text-xl md:py-6 md:text-4xl",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
PageHeading.displayName = "PageHeading";

export { Page, PageContent, PageHeading };
