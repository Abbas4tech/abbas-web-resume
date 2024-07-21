
import { createClient, Entry, EntrySkeletonType } from "contentful";
import { contentful, getCommonInfo } from "@utils/data"; 
import { ContentType } from "@utils/enums"; 
import { CommonData } from "@utils/types"; 

// Function to fetch data from Contentful
export const fetchData = async (): Promise<CommonData> => {
    const client = createClient({
      accessToken: contentful.accessToken,
      space: contentful.space,
    });
  
    try {
      const response = await client.getEntries({
        content_type: ContentType.USERINFO,
      });
  
      return getCommonInfo(
        response.items[0] as Entry<EntrySkeletonType, undefined, string>
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return {} as CommonData;
    }
  };