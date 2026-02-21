import React, { FC, PropsWithChildren } from "react";

import {
  Drawer,
  DrawerPageContent,
  DRAWER_SIDES,
  DRAWER_VARIANTS,
  DrawerSide,
  DrawerProvider,
} from "@/components/ui/drawer";
import SidebarMenu from "@/components/SidebarMenu";
import { NavigationAnimation } from "@/components/ui/navigation";
import { ProfileBanner } from "@/components/ProfileBanner";
import { GlobalHeader as Header } from "@/components/GlobalHeader";
import NavigationDock from "@/components/NavigationDock";
import fetchAppData from "@/gql/queries/content/fetch-app-data";
import { appDataAdapter } from "@/gql/queries/content/fetch-app-data.adapter";

const layout: FC<PropsWithChildren> = async ({ children }) => {
  const userInfo = await fetchAppData(
    process.env.CONTENTFUL_APPLICATION_DATA_ID || "",
  );
  const appData = appDataAdapter(userInfo);

  const defaultRoute =
    appData.pages.find((page) => page.isDefaultPage)?.pageUrl || "/about";

  const variant = appData.layoutSettings.drawerVariant
    .split(" ")
    .map((i: string) => i.toLowerCase())
    .join("-") as DRAWER_VARIANTS;

  const drawerSide =
    (appData.layoutSettings.drawerSide.toLowerCase() as DRAWER_SIDES) || "left";

  return (
    <DrawerProvider variant={variant} side={drawerSide}>
      <Header
        themeIcon={appData.themeIcon}
        defaultTheme={appData.defaultTheme}
        resume={appData.resume}
        resumeIcon={appData.resumeIcon}
        themeList={appData.themeList}
        title={appData.title}
        defaultRoute={defaultRoute}
      />
      <Drawer className="scrollbar-hide overflow-hidden md:text-lg text-sm h-[calc(100vh-5rem)]">
        <DrawerPageContent>
          <NavigationAnimation
            className="scrollbar-hide overflow-auto p-4 h-[calc(100vh-5rem)]"
            options={{ easing: "ease-in-cubic" }}
          >
            <ProfileBanner bannerData={appData.bannerData} />
            {children}
          </NavigationAnimation>
        </DrawerPageContent>
        <DrawerSide>
          <SidebarMenu pages={appData.pages} />
        </DrawerSide>
        <NavigationDock items={appData.pages} />
      </Drawer>
    </DrawerProvider>
  );
};

export default layout;
