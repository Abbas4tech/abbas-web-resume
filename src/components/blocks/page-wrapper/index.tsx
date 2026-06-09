import type { FC } from "react";
import { PageNavButton } from "@/components/patterns/page-nav-button";
import { cn } from "@/lib/utils";
import type { PageWrapperProps } from "./types";

const PageWrapper: FC<PageWrapperProps> = ({
  className,
  children,
  pages,
  ...props
}) => (
  <main
    className={cn("scrollbar-hide flex flex-col overflow-auto", className)}
    {...props}
  >
    {children}
    <PageNavButton pages={pages} />
  </main>
);
PageWrapper.displayName = "PageWrapper";

export { PageWrapper };
