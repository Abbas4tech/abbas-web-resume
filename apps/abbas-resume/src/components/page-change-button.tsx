"use client";

import { Button, type ButtonProps } from "@abbas-web-resume/ui/components/button";
import { Icon } from "@abbas-web-resume/ui/components/icon";
import { cn } from "@abbas-web-resume/ui/lib/utils";
import { type ComponentRef, forwardRef, memo } from "react";
import { usePage, type usePageProps } from "@/hooks/use-page";

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
