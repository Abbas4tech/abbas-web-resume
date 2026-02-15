import { contentful } from "@/gql/contentful";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchAppData = async (id: string) => {
  try {
    console.warn("...Fetching Contentful app data");
    const result = await contentful().GetAppData({ id });
    const userInfo = result.data.userInfo;

    if (!userInfo) {
      console.error("Couldn't find the contentful app data");
      throw new Error("App data not found");
    }

    return userInfo;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default fetchAppData;
