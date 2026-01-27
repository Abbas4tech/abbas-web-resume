import { type FC, forwardRef, type HTMLAttributes, memo, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  footer?: ReactNode;
}

const Page: FC<PageProps> = ({ className, children, footer, ...props }) => {
  return (
    <main className={cn("scrollbar-hide flex flex-col overflow-auto", className)} {...props}>
      {children}
      {footer}
    </main>
  );
};

Page.displayName = "Page";

const PageContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("", className)} ref={ref} {...props} />
  ))
);

PageContent.displayName = "PageContent";

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

export { Page, PageHeading, PageContent };
