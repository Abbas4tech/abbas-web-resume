"use client";
import type React from "react";
import type { ComponentProps } from "react";

import { usePage } from "@/hooks";
import type { MetaPage } from "@/types/entries";
import { cn } from "@abbas-web-resume/ui/lib/utils";

import { Dock, DockButton } from "@abbas-web-resume/ui/components/dock";
import { useDrawer } from "@abbas-web-resume/ui/components/drawer";

type NavigationDockProps = ComponentProps<typeof Dock> & {
  items: MetaPage[];
};

const NavigationDock = ({ items, ...props }: NavigationDockProps): React.JSX.Element => {
  const { variant, isMobile } = useDrawer();
  const { currentPageData } = usePage({ pages: items });
  if (variant === "dock-on-mobile" && isMobile) {
    return (
      <Dock className="bg-base-300" {...props}>
        {items.map((e) => (
          <DockButton
            href={e.pageUrl}
            className={cn(e.pageUrl === currentPageData.pageUrl && "dock-active")}
            key={e.title}
            icon={e.pageIcon}
          >
            {e.title}
          </DockButton>
        ))}
      </Dock>
    );
  } else {
    return <span className="sr-only">NavigationDock</span>;
  }
};

export default NavigationDock;
