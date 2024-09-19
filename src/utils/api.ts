import { createClient, Entry, EntrySkeletonType } from "contentful";
import { contentful, getUserInfo, mapExperiencePage } from "@utils/data";
import { ContentType } from "@utils/enums";
import { ExperiencePage, UserInfo } from "@utils/types";

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

export const fetchExperiencePage = async (): Promise<ExperiencePage> => {
  const data = await client.getEntries({
    content_type: ContentType.EXPERIENCE,
  });
  console.log(mapExperiencePage(data.items[0].fields));
  return mapExperiencePage(data.items[0].fields);
};

export const fetchAboutUsPage = async (): Promise<any> => {
  try {
    const res = await Promise.all([
      client.getEntries({
        content_type: ContentType.ABOUTUS,
        include: 2,
      }),
      client.getEntries({
        content_type: "experience",
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
