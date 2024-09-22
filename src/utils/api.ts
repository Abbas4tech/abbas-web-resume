import {
  createClient,
  Entry,
  EntryCollection,
  EntrySkeletonType,
  EntryFields,
} from "contentful";
import {
  contentful,
  convertEntry,
  getUserInfo,
  mapExperiencePage,
} from "@utils/data";
import { ContentType } from "@utils/enums";
import { UserInfo, ExperiencePage } from "@utils/types";
import { ExperiencePageType, SkillsPage } from "@utils/contentful";
import { ExperiencePageId, SkillsPageId } from "src/config/contentful";

const client = createClient({
  accessToken: contentful.accessToken,
  space: contentful.space,
});

// Function to fetch data from Contentful
export const fetchCommonCMS = async (): Promise<UserInfo> => {
  try {
    const response = await client.getEntries({
      content_type: ContentType.USERINFO,
    });
    console.log(
      response.items[0] as Entry<EntrySkeletonType, undefined, string>
    );
    return getUserInfo(
      response.items[0] as Entry<EntrySkeletonType, undefined, string>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return {} as UserInfo;
  }
};

export const fetchProjectsPage = async () => {
  const res = await client.getEntries({
    content_type: "projectsPage",
  });
  return res.items[0].fields;
};

export const fetchExperiencePages = async (): Promise<ExperiencePageType> => {
  const entries = await client.getEntry<ExperiencePageType>(ExperiencePageId);
  return convertEntry(entries);
};

export const fetchSkillsPage = async (): Promise<Entry<SkillsPage>> => {
  const entries = await client.getEntry<SkillsPage>(SkillsPageId, {
    include: 3,
  });
  console.log(entries);
  return entries;
};

export const fetchExperiencePage = async (): Promise<ExperiencePage> => {
  const data = await client.getEntries({
    content_type: ContentType.EXPERIENCE,
  });
  console.log(mapExperiencePage(data.items[0].fields));

  return convertEntry(data);
};

export const fetchAboutUsPage = async (): Promise<any> => {
  try {
    const res = await Promise.all([
      client.getEntries({
        content_type: ContentType.ABOUTUS,
        include: 2,
      }),
    ]);

    console.log(res[0].items[0].fields.technologies);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {} as any;
  }
};
fetchAboutUsPage();
fetchCommonCMS();
fetchExperiencePage();
