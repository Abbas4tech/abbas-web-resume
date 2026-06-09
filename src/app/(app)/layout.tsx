import type { FC, PropsWithChildren } from "react";
import { AppHeader } from "@/components/blocks/app-header";
import { adaptAppHeader } from "@/components/blocks/app-header/adapter";
import { BottomDock } from "@/components/blocks/bottom-dock";
import { adaptBottomDock } from "@/components/blocks/bottom-dock/adapter";
import { HeroBanner } from "@/components/blocks/hero-banner";
import { adaptHeroBanner } from "@/components/blocks/hero-banner/adapter";
import { SidebarNav } from "@/components/blocks/sidebar-nav";
import { adaptSidebarNav } from "@/components/blocks/sidebar-nav/adapter";

import {
  Drawer,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
  type DrawerSides,
  type DrawerVariants,
} from "@/components/elements/drawer";
import { NavigationAnimation } from "@/components/elements/navigation";
import { fetchGql } from "@/lib/client";
import { GET_APPDATA } from "@/queries/get-app-data";
import type { AppData } from "@/types/entries";

interface GetAppDataQueryResult {
  userInfo: AppData;
}

const layout: FC<PropsWithChildren> = async ({ children }) => {
  const data = await fetchGql<GetAppDataQueryResult>(GET_APPDATA, {
    id: process.env.CONTENTFUL_APPLICATION_DATA_ID,
  });

  const {
    resume,
    defaultTheme,
    resumeIcon,
    themeList,
    title,
    bannerData,
    themeIcon,
    layoutSettings,
    pagesCollection,
  } = data.userInfo;

  const defaultRoute =
    pagesCollection.items.find(({ isDefaultPage }) => isDefaultPage)?.pageUrl ||
    "/about";

  const variant = layoutSettings.drawerVariant
    .split(" ")
    .map((i) => i.toLowerCase())
    .join("-") as DrawerVariants;

  return (
    <DrawerProvider
      side={layoutSettings.drawerSide.toLowerCase() as DrawerSides}
      variant={variant}
    >
      <AppHeader
        {...adaptAppHeader({
          title,
          resume,
          resumeIcon,
          themeList,
          themeIcon,
          defaultTheme,
          defaultRoute,
        })}
      />
      <Drawer className="scrollbar-hide h-[calc(100vh-5rem)] overflow-hidden text-sm md:text-lg">
        <DrawerPageContent>
          <NavigationAnimation
            className="scrollbar-hide h-[calc(100vh-5rem)] overflow-auto p-4"
            options={{ easing: "ease-in-cubic" }}
          >
            <HeroBanner {...adaptHeroBanner(bannerData)} />
            {children}
          </NavigationAnimation>
        </DrawerPageContent>
        <DrawerSide>
          <SidebarNav {...adaptSidebarNav(pagesCollection.items)} />
        </DrawerSide>
        <BottomDock {...adaptBottomDock(pagesCollection.items)} />
      </Drawer>
    </DrawerProvider>
  );
};

export default layout;
