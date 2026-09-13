import type { FC, ReactNode } from "react";
import { AppHeader } from "@/components/blocks/app-header/app-header";
import { adaptAppHeader } from "@/components/blocks/app-header/app-header.adapter";
import { BottomDock } from "@/components/blocks/bottom-dock/bottom-dock";
import { adaptBottomDock } from "@/components/blocks/bottom-dock/bottom-dock.adapter";
import { PageWrapper } from "@/components/blocks/page-wrapper/page-wrapper";
import { adaptPageWrapper } from "@/components/blocks/page-wrapper/page-wrapper.adapter";
import { SidebarNav } from "@/components/blocks/sidebar-nav/sidebar-nav";
import { adaptSidebarNav } from "@/components/blocks/sidebar-nav/sidebar-nav.adapter";
import {
  Drawer,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
  type DrawerSides,
  type DrawerVariants,
} from "@/components/elements/ui/drawer/drawer";

import type { AdaptedLayout } from "@/contentful/adapters/layout";

export interface ContentfulLayoutProps {
  children: ReactNode;
  data: AdaptedLayout;
}

export const ContentfulLayout: FC<ContentfulLayoutProps> = ({
  data,
  children,
}) => {
  const variant = data.drawerVariant
    .split(" ")
    .map((i) => i.toLowerCase())
    .join("-") as DrawerVariants;

  const defaultRoute = "/about";

  return (
    <DrawerProvider
      side={data.drawerSide.toLowerCase() as DrawerSides}
      variant={variant}
    >
      <AppHeader {...adaptAppHeader(data, defaultRoute)} />
      <Drawer className="scrollbar-hide h-[calc(100vh-5rem)] overflow-hidden text-sm md:text-lg">
        <DrawerPageContent>
          <div className="scrollbar-hide relative h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden p-4">
            <PageWrapper {...adaptPageWrapper(data, children)} />
          </div>
        </DrawerPageContent>
        <DrawerSide>
          <SidebarNav {...adaptSidebarNav(data)} />
        </DrawerSide>
        <BottomDock {...adaptBottomDock(data)} />
      </Drawer>
    </DrawerProvider>
  );
};
