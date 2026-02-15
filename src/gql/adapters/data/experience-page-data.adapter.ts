import { ExperiencePageDataFragment, Maybe } from "@/gql/sdk";

import {
  jobExperienceAdapter,
  AdaptedJobExperience,
} from "../content/job-experience.adapter";

export interface AdaptedExperiencePageData {
  id: string;
  title: string;
  experiences: AdaptedJobExperience[];
}

export const experiencePageDataAdapter = (
  props?: Maybe<ExperiencePageDataFragment>,
): AdaptedExperiencePageData => ({
  id: props?._id ?? "",
  title: props?.title ?? "",
  experiences:
    props?.experiencesCollection?.items
      ?.filter((e): e is NonNullable<typeof e> => !!e)
      ?.map(jobExperienceAdapter) ?? [],
});
