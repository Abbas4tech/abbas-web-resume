import type { FC, HTMLAttributes, ReactNode } from "react";
import type { PageNavButtonProps } from "@/components/patterns/page-nav-button/page-nav-button";
import { PageNavButton } from "@/components/patterns/page-nav-button/page-nav-button";
import { cn } from "@/lib/utils";

export interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pages: PageNavButtonProps["pages"];
}

const PageWrapper: FC<PageWrapperProps> = ({
  className,
  children,
  pages,
  ...props
}) => (
  <main className={cn("scrollbar-hide flex flex-col", className)} {...props}>
    {children}
    <PageNavButton pages={pages} />
  </main>
);
PageWrapper.displayName = "PageWrapper";

export { PageWrapper };
