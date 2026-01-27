"use client";

import { Dock, DockButton } from "@abbas-web-resume/ui/components/dock";
import { useDrawer } from "@abbas-web-resume/ui/components/drawer";
import { cn } from "@abbas-web-resume/ui/lib/utils";
import type React from "react";
import type { ComponentProps } from "react";
import { usePage } from "@/hooks";
import type { MetaPage } from "@/types/entries";

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
            className={cn(e.pageUrl === currentPageData.pageUrl && "dock-active")}
            href={e.pageUrl}
            icon={e.pageIcon}
            key={e.title}
          >
            {e.title}
          </DockButton>
        ))}
      </Dock>
    );
  }
  return <span className="sr-only">NavigationDock</span>;
};

export default NavigationDock;
