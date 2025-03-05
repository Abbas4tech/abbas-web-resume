import React from "react";
import { cn } from "@lib/utils";

const Page = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        role="main"
        ref={ref}
        className={cn("container overflow-auto mb-5 scrollbar-hide", className)}
        {...props}
      />
    )
  )
);

Page.displayName = "Page";

type PageContentProps = React.HTMLAttributes<HTMLDivElement> & {
  contentAnimation: string;
};

const PageContent = React.memo(
  React.forwardRef<HTMLDivElement, PageContentProps>(
    ({ contentAnimation, className, ...props }, ref) => (
      <div
        data-aos={contentAnimation}
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    )
  )
);

PageContent.displayName = PageContent.displayName;

type PageHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  headingAnimation: string;
};

const PageHeading = React.memo(
  React.forwardRef<HTMLHeadingElement, PageHeadingProps>(
    ({ className, headingAnimation, ...props }, ref) => (
      <h1
        ref={ref}
        data-aos={headingAnimation}
        className={cn(
          "flex items-center justify-center gap-4 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl",
          className
        )}
        {...props}
      />
    )
  )
);
PageHeading.displayName = "PageHeading";

export { Page, PageHeading, PageContent };
export type { PageHeadingProps, PageContentProps };
