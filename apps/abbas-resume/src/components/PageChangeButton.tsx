"use client";
import { type ComponentRef, forwardRef, memo } from "react";

import { usePage, type usePageProps } from "@/hooks";
import { cn } from "@abbas-web-resume/ui/lib/utils";

import { Button, type ButtonProps } from "@abbas-web-resume/ui/components/button";
import { Icon } from "@abbas-web-resume/ui/components/icon";

type PageChangeButtonProps = Extract<ButtonProps, { asLink?: false }> & usePageProps;

const PageChangeButton = memo(
  forwardRef<ComponentRef<typeof Button>, PageChangeButtonProps>(
    ({ pages, className, ...props }, ref) => {
      const { changePage, nextPage } = usePage({ pages });
      return (
        <Button
          className={cn("mt-4 justify-self-end self-end", className)}
          onClick={changePage}
          ref={ref}
          {...props}
        >
          {nextPage.title}
          <Icon classes={[]} showTooltip={false} name="Next Page" iconCode="fa/FaArrowRight" />
        </Button>
      );
    }
  )
);

export default PageChangeButton;
