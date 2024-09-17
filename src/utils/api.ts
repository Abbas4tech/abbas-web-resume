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

export const fetchAboutUsPage = async (): Promise<any> => {
  const client = createClient({
    accessToken: contentful.accessToken,
    space: contentful.space,
  });

  try {
   const res =  await Promise.all([
      client.getEntries({
        content_type: ContentType.ABOUTUS,
        include: 2,
      }),
      client.getEntries({
        content_type: "experience",
      }),
    ]);

    console.log(res[0].items[0].fields.technologies)
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {} as any;
  }
};
fetchAboutUsPage()
