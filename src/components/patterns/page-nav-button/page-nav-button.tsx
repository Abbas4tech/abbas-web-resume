"use client";
import { forwardRef, memo } from "react";
import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import { Button } from "@/components/elements/ui/button/button";
import { Icon } from "@/components/elements/ui/icon/icon";
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
      const { nextPage, defaultPage } = usePage({ pages });
      return (
        <MotionHover className="self-end justify-self-end" scale={1.05}>
          <Button
            asLink={true}
            className={cn("mt-4 w-full", className)}
            href={
              nextPage.pageUrl === defaultPage.pageUrl
                ? defaultPage.pageUrl
                : nextPage.pageUrl
            }
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
        </MotionHover>
      );
    }
  )
);
PageNavButton.displayName = "PageNavButton";

export { PageNavButton };
