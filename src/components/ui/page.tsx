import React from "react";
import { DynamicIcon } from "@components";
import { cn } from "@lib/utils";

const Page = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    role="main"
    ref={ref}
    className={cn("container overflow-auto mb-5 scrollbar-hide", className)}
    {...props}
  />
));

Page.displayName = "Page";

type PageContentProps = {
  contentAnimation: string;
};

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PageContentProps
>(({ contentAnimation, className, ...props }, ref) => (
  <div
    data-aos={contentAnimation}
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));

PageContent.displayName = PageContent.displayName;

type PageHeadingProps = {
  headingAnimation: string;
};

const PageHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & PageHeadingProps
>(({ className, headingAnimation, ...props }, ref) => (
  <h1
    ref={ref}
    data-aos={headingAnimation}
    className={cn(
      "flex items-center justify-center gap-2 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl",
      className
    )}
    {...props}
  />
));
PageHeading.displayName = "PageHeading";

const PageIcon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof DynamicIcon> &
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("inline-block mr-2", className)} {...props}>
    <DynamicIcon {...props} />
  </span>
));

PageIcon.displayName = "PageIcon";

export { Page, PageHeading, PageIcon, PageContent };
