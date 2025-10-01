"use client";
import React, { ComponentProps } from "react";

import { MetaPage } from "@/types/entries";
import { usePage } from "@/hooks";
import { cn } from "@/lib/utils";

import { Dock, DockButton } from "./ui/dock";
import { useDrawer } from "./ui/drawer";

type NavigationDockProps = ComponentProps<typeof Dock> & {
  items: MetaPage[];
};

const NavigationDock = ({
  items,
  ...props
}: NavigationDockProps): React.JSX.Element => {
  const { variant, isMobile } = useDrawer();
  const { currentPageData } = usePage({ pages: items });
  if (variant === "dock-on-mobile" && isMobile) {
    return (
      <Dock {...props}>
        {items.map((e) => (
          <DockButton
            href={e.pageUrl}
            className={cn(
              e.pageUrl === currentPageData.pageUrl && "dock-active"
            )}
            key={e.title}
            icon={e.pageIcon}
          >
            {e.title}
          </DockButton>
        ))}
      </Dock>
    );
  } else {
    return <span className="sr-only">NavigationDock is not available!</span>;
  }
};

export default NavigationDock;
