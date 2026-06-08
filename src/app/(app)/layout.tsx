import type { FC, PropsWithChildren } from "react";
import { GlobalHeader as Header } from "@/components/GlobalHeader";
import NavigationDock from "@/components/NavigationDock";
import { ProfileBanner } from "@/components/ProfileBanner";
import SidebarMenu from "@/components/SidebarMenu";
import {
  type DRAWER_SIDES,
  type DRAWER_VARIANTS,
  Drawer,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
} from "@/components/ui/drawer";
import { NavigationAnimation } from "@/components/ui/navigation";
import { fetchGql } from "@/lib/client";
import { GET_APPDATA } from "@/queries/getAppData";
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
    .join("-") as DRAWER_VARIANTS;

  return (
    <DrawerProvider
      side={layoutSettings.drawerSide.toLowerCase() as DRAWER_SIDES}
      variant={variant}
    >
      <Header
        defaultRoute={defaultRoute}
        defaultTheme={defaultTheme}
        resume={resume}
        resumeIcon={resumeIcon}
        themeIcon={themeIcon}
        themeList={themeList}
        title={title}
      />
      <Drawer className="scrollbar-hide h-[calc(100vh-5rem)] overflow-hidden text-sm md:text-lg">
        <DrawerPageContent>
          <NavigationAnimation
            className="scrollbar-hide h-[calc(100vh-5rem)] overflow-auto p-4"
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
