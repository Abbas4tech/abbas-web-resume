import React, { type FC, forwardRef, type HTMLAttributes, memo, type ReactNode } from "react";

import { cn } from "../lib/utils";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  footer?: ReactNode;
}

const Page: FC<PageProps> = ({ className, children, footer, ...props }) => {
  return (
    <div
      role="main"
      className={cn("overflow-auto scrollbar-hide flex flex-col", className)}
      {...props}
    >
      {children}
      {footer}
    </div>
  );
};

Page.displayName = "Page";

const PageContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ))
);

PageContent.displayName = PageContent.displayName;

const PageHeading = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h1
        ref={ref}
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
