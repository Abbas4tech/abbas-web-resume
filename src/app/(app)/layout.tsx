import { Container } from "@/components/ui/container";
import {
  Drawer,
  DrawerPageContent,
  DRAWER_SIDES,
  DRAWER_VARIANTS,
  DrawerSide,
  DrawerProvider,
} from "@/components/ui/drawer";
import { fetchGql } from "@/lib/client";
import { GET_APPDATA } from "@/queries/getAppData";
import { AppData } from "@/types/entries";
import React, { FC, PropsWithChildren } from "react";

import SidebarMenu from "@/components/SidebarMenu";
import { NavigationAnimation } from "@/components/ui/navigation";
import { ProfileBanner } from "@/components/banner";
import { Header } from "@/components/Header";

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
    themeIcon,
    themeList,
    title,
    bannerData,
    layoutSettings,
  } = data.userInfo;

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
        data={{
          themeIcon,
          defaultTheme,
          resume,
          resumeIcon,
          themeList,
          title,
        }}
      />
      <Container className="h-[calc(100vh-5rem)]">
        <Drawer>
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
            <SidebarMenu />
          </DrawerSide>
        </Drawer>
      </Container>
    </DrawerProvider>
  );
};

export default layout;
