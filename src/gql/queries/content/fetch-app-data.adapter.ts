import { assetAdapter } from "@/components/contentful/asset/asset.adapter";
import { iconAdapter } from "@/components/contentful/icon/icon.adapter";
import { GetAppDataQuery } from "@/gql/sdk";

export interface MetaPage {
  pageUrl: string;
  isDefaultPage: boolean;
  title: string;
  pageIcon: ReturnType<typeof iconAdapter>;
}

export interface AdaptedAppData {
  title: string;
  name: string;
  defaultTheme: string;
  themeList: string[];
  resume: ReturnType<typeof assetAdapter>;
  resumeIcon: ReturnType<typeof iconAdapter>;
  themeIcon: ReturnType<typeof iconAdapter>;
  bannerData: {
    title: string;
    profilePicture: ReturnType<typeof assetAdapter>;
    bannerImage: ReturnType<typeof assetAdapter>;
    bannerAnimation: string;
    socialLinksCollection: {
      items: ReturnType<typeof assetAdapter>[];
    };
  };
  layoutSettings: {
    drawerVariant: string;
    drawerSide: string;
    title: string | null;
  };
  pages: MetaPage[];
}

export const appDataAdapter = (
  data: GetAppDataQuery["userInfo"],
): AdaptedAppData => {
  const resume = data?.resume;
  const resumeIcon = data?.resumeIcon;
  const themeIcon = data?.themeIcon;
  const bannerData = data?.bannerData;
  const layoutSettings = data?.layoutSettings;
  const pages = data?.pagesCollection?.items || [];

  return {
    title: data?.title ?? "",
    name: data?.name ?? "",
    defaultTheme: data?.defaultTheme ?? "light",
    themeList:
      data?.themeList?.filter((t): t is NonNullable<typeof t> => t !== null) ??
      [],
    resume: assetAdapter(resume),
    resumeIcon: iconAdapter(resumeIcon),
    themeIcon: iconAdapter(themeIcon),
    bannerData: {
      title: bannerData?.title ?? "",
      profilePicture: assetAdapter(bannerData?.profilePicture),
      bannerImage: assetAdapter(bannerData?.bannerImage),
      bannerAnimation: bannerData?.bannerAnimation ?? "",
      socialLinksCollection: {
        items:
          bannerData?.socialLinksCollection?.items
            ?.filter((item): item is NonNullable<typeof item> => item !== null)
            .map((item) => assetAdapter(item)) ?? [],
      },
    },
    layoutSettings: {
      drawerVariant: layoutSettings?.drawerVariant ?? "",
      drawerSide: layoutSettings?.drawerSide ?? "left",
      title: layoutSettings?.title ?? null,
    },
    pages: pages
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .map((page) => ({
        pageUrl: page.pageUrl ?? "",
        isDefaultPage: page.isDefaultPage ?? false,
        title: page.title ?? "",
        pageIcon: iconAdapter(page.pageIcon),
      })),
  };
};
