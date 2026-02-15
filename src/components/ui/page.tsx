import React, { FC, forwardRef, HTMLAttributes, memo } from "react";

import { cn } from "@/lib/utils";
import fetchAppData from "@/gql/queries/content/fetch-app-data";
import { appDataAdapter } from "@/gql/queries/content/fetch-app-data.adapter";

import PageChangeButton from "../PageChangeButton";

const Page: FC<HTMLAttributes<HTMLDivElement>> = async ({
  className,
  children,
  ...props
}): Promise<React.JSX.Element> => {
  const userInfo = await fetchAppData(
    process.env.CONTENTFUL_APPLICATION_DATA_ID || "",
  );
  const appData = appDataAdapter(userInfo);

  return (
    <div
      role="main"
      className={cn("overflow-auto scrollbar-hide flex flex-col", className)}
      {...props}
    >
      {children}
      <PageChangeButton pages={appData.pages} />
    </div>
  );
};

Page.displayName = "Page";

const PageContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("", className)} {...props} />
    ),
  ),
);

PageContent.displayName = PageContent.displayName;

const PageHeading = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h1
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl",
          className,
        )}
        {...props}
      />
    ),
  ),
);
PageHeading.displayName = "PageHeading";

export { Page, PageHeading, PageContent };
