"use client";
import { memo, forwardRef, ComponentRef } from "react";

import { cn } from "@/lib/utils";
import { usePage, usePageProps } from "@/hooks";

import { Button, ButtonProps } from "./ui/button";
import { Icon } from "./ui/icon";

type PageChangeButtonProps = Extract<ButtonProps, { asLink?: false }> &
  usePageProps;

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
          <Icon
            classes={[]}
            showTooltip={false}
            name="Next Page"
            iconCode="fa/FaArrowRight"
          />
        </Button>
      );
    }
  )
);

export default PageChangeButton;
