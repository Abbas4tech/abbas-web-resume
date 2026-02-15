import { SkillsPageDataFragment, Maybe } from "@/gql/sdk";

import { iconAdapter, AdaptedIcon } from "../content/icon.adapter";

export interface AdaptedSkill {
  id: string;
  title: string;
  skillProgress: number;
  icons: AdaptedIcon[];
}

export interface AdaptedSkillSet {
  title: string;
  icon: AdaptedIcon;
  skills: AdaptedSkill[];
}

export interface AdaptedSkillsPageData {
  id: string;
  title: string;
  skillSets: AdaptedSkillSet[];
}

export const skillsPageDataAdapter = (
  props?: Maybe<SkillsPageDataFragment>,
): AdaptedSkillsPageData => ({
  id: props?._id ?? "",
  title: props?.title ?? "",
  skillSets:
    props?.skillsSetCollection?.items
      ?.filter((e): e is NonNullable<typeof e> => !!e)
      ?.map((skillSet) => ({
        title: skillSet?.title ?? "",
        icon: iconAdapter(skillSet?.icon),
        skills:
          skillSet?.skillsArrayCollection?.items
            ?.filter((skill): skill is NonNullable<typeof skill> => !!skill)
            ?.map((skill) => ({
              id: skill?._id ?? "",
              title: skill?.title ?? "",
              skillProgress: skill?.skillProgress ?? 0,
              icons:
                skill?.skillIconsCollection?.items
                  ?.filter((icon): icon is NonNullable<typeof icon> => !!icon)
                  ?.map(iconAdapter) ?? [],
            })) ?? [],
      })) ?? [],
});
