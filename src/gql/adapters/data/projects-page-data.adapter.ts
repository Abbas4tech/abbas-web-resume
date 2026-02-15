import { ProjectsPageDataFragment, Maybe } from "@/gql/sdk";

import { iconAdapter, AdaptedIcon } from "../content/icon.adapter";
import { assetAdapter, AdaptedAsset } from "../content/asset.adapter";

export interface AdaptedProject {
  id: string;
  title: string;
  description: string;
  deployedLink: string;
  deployedLinkIcon: AdaptedIcon;
  thumbnail: AdaptedAsset;
}

export interface AdaptedProjectsPageData {
  id: string;
  title: string;
  projects: AdaptedProject[];
}

export const projectsPageDataAdapter = (
  props?: Maybe<ProjectsPageDataFragment>,
): AdaptedProjectsPageData => ({
  id: props?._id ?? "",
  title: props?.title ?? "",
  projects:
    props?.projectsCollection?.items
      ?.filter((e): e is NonNullable<typeof e> => !!e)
      ?.map((project) => ({
        id: project?._id ?? "",
        title: project?.title ?? "",
        description: project?.description ?? "",
        deployedLink: project?.deployedLink ?? "",
        deployedLinkIcon: iconAdapter(project?.deployedLinkIcon),
        thumbnail: assetAdapter(project?.thumbnail),
      })) ?? [],
});
