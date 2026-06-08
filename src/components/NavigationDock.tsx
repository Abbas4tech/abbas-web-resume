"use client";
import type React from "react";
import type { ComponentProps } from "react";
import { usePage } from "@/hooks";
import { cn } from "@/lib/utils";
import type { MetaPage } from "@/types/entries";

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
      <Dock className="bg-base-300" {...props}>
        {items.map((e) => (
          <DockButton
            className={cn(
              e.pageUrl === currentPageData.pageUrl && "dock-active"
            )}
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
