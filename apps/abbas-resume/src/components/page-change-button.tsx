"use client";

import { type ComponentRef, forwardRef, memo } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { usePage, type usePageProps } from "@/hooks/use-page";
import { cn } from "@/lib/utils";

type PageChangeButtonProps = Extract<ButtonProps, { asLink?: false }> & usePageProps;

const PageChangeButton = memo(
  forwardRef<ComponentRef<typeof Button>, PageChangeButtonProps>(
    ({ pages, className, ...props }, ref) => {
      const { changePage, nextPage } = usePage({ pages });
      return (
        <Button
          className={cn("mt-4 self-end justify-self-end", className)}
          onClick={changePage}
          ref={ref}
          {...props}
        >
          {nextPage.title}
          <Icon classes={[]} iconCode="fa/FaArrowRight" name="Next Page" showTooltip={false} />
        </Button>
      );
    }
  )
);

export default PageChangeButton;
