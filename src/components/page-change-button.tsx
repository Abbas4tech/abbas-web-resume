"use client";
import { memo, forwardRef, ComponentRef } from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { Icon } from "./ui/icon";

import { MetaPage } from "@/types/entries";
import { usePage } from "@/hooks";

type PageChangeButtonProps = Extract<ButtonProps, { asLink?: false }> & {
  pages: Omit<MetaPage, "pageIcon">[];
};

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
