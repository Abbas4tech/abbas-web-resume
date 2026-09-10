"use client";
import { m } from "motion/react";
import type React from "react";
import type { ComponentProps } from "react";
import { Dock, DockItem } from "@/components/elements/ui/dock/dock";
import { useDrawer } from "@/components/elements/ui/drawer/drawer";
import { Icon } from "@/components/elements/ui/icon/icon";
import usePage from "@/hooks/use-page";
import { cn } from "@/lib/utils";

export interface BottomDockItem {
  isDefaultPage?: boolean;
  pageIcon: {
    iconCode?: string;
    classes?: string[];
    name?: string;
    showTooltip?: boolean;
  };
  pageUrl: string;
  title: string;
}

export type BottomDockProps = ComponentProps<typeof Dock> & {
  items: BottomDockItem[];
};

const BottomDock = ({
  items,
  ...props
}: BottomDockProps): React.JSX.Element => {
  const { variant, isMobile } = useDrawer();
  const { currentPageData } = usePage({ pages: items });

  if (variant === "dock-on-mobile" && isMobile) {
    return (
      <m.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </m.div>
    );
  }
  return <span className="sr-only">BottomDock</span>;
};
BottomDock.displayName = "BottomDock";

export { BottomDock };
