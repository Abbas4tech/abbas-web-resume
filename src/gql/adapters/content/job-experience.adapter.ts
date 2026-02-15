import { Document } from "@contentful/rich-text-types";

import { JobExperienceFragment, Maybe } from "@/gql/sdk";

import { iconAdapter, AdaptedIcon } from "./icon.adapter";

export interface AdaptedSkillGroup {
  id: string;
  title: string;
  skillProgress: number;
  icons: AdaptedIcon[];
}

export interface AdaptedJobExperience {
  company: string;
  position: string;
  description: Document;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workedRemotely: boolean;
  location: string;
  companyIcon: AdaptedIcon;
  roleIcon: AdaptedIcon;
  durationIcon: AdaptedIcon;
  locationIcon: AdaptedIcon;
  techStack: AdaptedSkillGroup;
  techStackIcon: AdaptedIcon;
}

export const jobExperienceAdapter = (
  props?: Maybe<JobExperienceFragment>,
): AdaptedJobExperience => ({
  company: props?.company ?? "",
  position: props?.position ?? "",
  description: (props?.description?.json as Document) ?? ({} as Document),
  startDate: props?.startDate ?? "",
  endDate: props?.endDate ?? "",
  currentlyWorking: props?.currentlyWorking ?? false,
  workedRemotely: props?.workedRemotely ?? false,
  location: props?.location ?? "",
  companyIcon: iconAdapter(props?.companyIcon),
  roleIcon: iconAdapter(props?.roleIcon),
  durationIcon: iconAdapter(props?.durationIcon),
  locationIcon: iconAdapter(props?.locationIcon),
  techStack: {
    id: props?.techStack?._id ?? "",
    title: props?.techStack?.title ?? "",
    skillProgress: props?.techStack?.skillProgress ?? 0,
    icons:
      props?.techStack?.skillIconsCollection?.items
        ?.filter((e): e is NonNullable<typeof e> => !!e)
        ?.map(iconAdapter) ?? [],
  },
  techStackIcon: iconAdapter(props?.techStackIcon),
});
