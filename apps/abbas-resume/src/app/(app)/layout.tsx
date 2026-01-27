import React, { type FC, type PropsWithChildren } from "react";

import { GlobalHeader as Header } from "@/components/GlobalHeader";
import NavigationDock from "@/components/NavigationDock";
import { ProfileBanner } from "@/components/ProfileBanner";
import SidebarMenu from "@/components/SidebarMenu";
import { fetchGql } from "@/lib/client";
import { GET_APPDATA } from "@/queries/getAppData";
import type { AppData } from "@/types/entries";
import {
  type DRAWER_SIDES,
  type DRAWER_VARIANTS,
  Drawer,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
} from "@abbas-web-resume/ui/components/drawer";
import { NavigationAnimation } from "@abbas-web-resume/ui/components/navigation";

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
    pagesCollection.items.find(({ isDefaultPage }) => isDefaultPage)?.pageUrl || "/about";

  const variant = layoutSettings.drawerVariant
    .split(" ")
    .map((i) => i.toLowerCase())
    .join("-") as DRAWER_VARIANTS;

  return (
    <DrawerProvider
      variant={variant}
      side={layoutSettings.drawerSide.toLowerCase() as DRAWER_SIDES}
    >
      <Header
        themeIcon={themeIcon}
        defaultTheme={defaultTheme}
        resume={resume}
        resumeIcon={resumeIcon}
        themeList={themeList}
        title={title}
        defaultRoute={defaultRoute}
      />
      <Drawer className="scrollbar-hide overflow-hidden md:text-lg text-sm h-[calc(100vh-5rem)]">
        <DrawerPageContent>
          <NavigationAnimation
            className="scrollbar-hide overflow-auto p-4 h-[calc(100vh-5rem)]"
            options={{ easing: "ease-in-cubic" }}
          >
            <ProfileBanner bannerData={bannerData} />
            {children}
          </NavigationAnimation>
        </DrawerPageContent>
        <DrawerSide>
          <SidebarMenu pages={pagesCollection.items} />
        </DrawerSide>
        <NavigationDock items={pagesCollection.items} />
      </Drawer>
    </DrawerProvider>
  );
};

export default layout;
