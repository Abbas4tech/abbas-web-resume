"use client";
import type React from "react";
import { Dock, DockItem } from "@/components/elements/dock";
import { useDrawer } from "@/components/elements/drawer";
import { Icon } from "@/components/elements/icon";
import usePage from "@/hooks/use-page";
import { cn } from "@/lib/utils";
import type { BottomDockProps } from "./types";

const BottomDock = ({
  items,
  ...props
}: BottomDockProps): React.JSX.Element => {
  const { variant, isMobile } = useDrawer();
  const { currentPageData } = usePage({ pages: items });

  if (variant === "dock-on-mobile" && isMobile) {
    return (
      <Dock className="bg-base-300" {...props}>
        {items.map((item) => (
          <DockItem
            className={cn(
              item.pageUrl === currentPageData.pageUrl && "dock-active"
            )}
            href={item.pageUrl}
            icon={<Icon {...item.pageIcon} showTooltip={false} />}
            key={item.title}
          >
            {item.title}
          </DockItem>
        ))}
      </Dock>
    );
  }
  return <span className="sr-only">BottomDock</span>;
};
BottomDock.displayName = "BottomDock";

export { BottomDock };
