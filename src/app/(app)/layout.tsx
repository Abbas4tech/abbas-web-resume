import type { FC, PropsWithChildren } from "react";
import { AppHeader } from "@/components/blocks/app-header";
import { adaptAppHeader } from "@/components/blocks/app-header/adapter";
import { BottomDock } from "@/components/blocks/bottom-dock";
import { adaptBottomDock } from "@/components/blocks/bottom-dock/adapter";
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
import { adaptLayout } from "@/contentful/adapters/layout";
import { contentfulSdk } from "@/contentful/lib/client";

const layout: FC<PropsWithChildren> = async ({ children }) => {
  const response = await contentfulSdk.GetLayout();
  const rawLayout = response.data?.layoutCollection?.items?.[0];
  const layoutData = adaptLayout(rawLayout);

  if (!layoutData) {
    return <div>Layout data missing</div>;
  }

  const {
    resume,
    defaultTheme,
    resumeIcon,
    themeList,
    title,
    themeIcon,
    drawerVariant,
    drawerSide,
    navigation,
  } = layoutData;

  const defaultRoute = "/about"; // This could be fetched dynamically if needed

  const variant = drawerVariant
    .split(" ")
    .map((i) => i.toLowerCase())
    .join("-") as DrawerVariants;

  const mappedNavItems = (navigation?.customEntries || []).map((item) => ({
    pageUrl:
      item.links?.[0]?.href || `/${item.entryField.toLowerCase()}` || "/",
    title: item.title,
    pageIcon: item.icon
      ? {
          iconCode: item.icon.iconCode,
          name: item.icon.name,
          showTooltip: item.icon.showTooltip,
        }
      : { iconCode: "" },
  }));

  return (
    <DrawerProvider
      side={(drawerSide?.toLowerCase() || "left") as DrawerSides}
      variant={variant}
    >
      <AppHeader
        {...adaptAppHeader({
          title,
          resume: resume || { url: "" },
          resumeIcon: resumeIcon
            ? {
                iconCode: resumeIcon.iconCode,
                name: resumeIcon.name,
                showTooltip: resumeIcon.showTooltip,
              }
            : {},
          themeList: themeList || [],
          themeIcon: themeIcon
            ? {
                iconCode: themeIcon.iconCode,
                name: themeIcon.name,
                showTooltip: themeIcon.showTooltip,
              }
            : undefined,
          defaultTheme: defaultTheme || "light",
          defaultRoute,
        })}
      />
      <Drawer className="scrollbar-hide h-[calc(100vh-5rem)] overflow-hidden text-sm md:text-lg">
        <DrawerPageContent>
          <NavigationAnimation
            className="scrollbar-hide h-[calc(100vh-5rem)] overflow-auto p-4"
            options={{ easing: "ease-in-cubic" }}
          >
            {children}
          </NavigationAnimation>
        </DrawerPageContent>
        <DrawerSide>
          <SidebarNav {...adaptSidebarNav(mappedNavItems)} />
        </DrawerSide>
        <BottomDock {...adaptBottomDock(mappedNavItems)} />
      </Drawer>
    </DrawerProvider>
  );
};

export default layout;
