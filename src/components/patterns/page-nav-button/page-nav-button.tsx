"use client";
import { forwardRef, memo } from "react";
import { Button } from "@/components/elements/button/button";
import { Icon } from "@/components/elements/icon/icon";
import type { PageLike, usePageProps } from "@/hooks/use-page";
import usePage from "@/hooks/use-page";
import { cn } from "@/lib/utils";

export type PageNavItem = PageLike & { title: string };

export type PageNavButtonProps = usePageProps<PageNavItem> & {
  className?: string;
};

const PageNavButton = memo(
  forwardRef<HTMLButtonElement, PageNavButtonProps>(
    ({ pages, className }, ref) => {
      const { changePage, nextPage } = usePage({ pages });
      return (
        <Button
          className={cn("mt-4 self-end justify-self-end", className)}
          onClick={changePage}
          ref={ref}
        >
          {nextPage.title}
          <Icon
            classes={[]}
            iconCode="fa/FaArrowRight"
            name="Next Page"
            showTooltip={false}
          />
        </Button>
      );
    }
  )
);
PageNavButton.displayName = "PageNavButton";

export { PageNavButton };
