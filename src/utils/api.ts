import { createClient, Entry, EntrySkeletonType } from "contentful";
import { contentful, getUserInfo } from "@utils/data";
import { ContentType } from "@utils/enums";
import { UserInfo } from "@utils/types";

// Function to fetch data from Contentful
export const fetchCommonCMS = async (): Promise<UserInfo> => {
  const client = createClient({
    accessToken: contentful.accessToken,
    space: contentful.space,
  });

  try {
    const response = await client.getEntries({
      content_type: ContentType.USERINFO,
    });

    return getUserInfo(
      response.items[0] as Entry<EntrySkeletonType, undefined, string>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return {} as UserInfo;
  }
};

export const fetchAboutUsPage = async (): Promise<any> => {
  const client = createClient({
    accessToken: contentful.accessToken,
    space: contentful.space,
  });

  try {
    return await Promise.all([
      client.getEntries({
        content_type: ContentType.ABOUTUS,
        include: 2,
      }),
      client.getEntries({
        content_type: "experience",
      }),
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    return {} as any;
  }
};
