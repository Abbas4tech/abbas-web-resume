/* eslint-disable no-console */
import { cache } from "react";

import { contentful } from "@/gql/contentful";

// Actual fetch logic
const _fetchPageByPath = async (path: string) => {
  try {
    console.log("...Fetching Contentful page for path: ", path);
    const pages = await contentful().fetchPageByPath({ path });
    const page = pages.data.pageCollection?.items[0];
    if (!page?.pageData || !page) {
      console.error("Couldn't found the contentful page for path: ", path);
      throw new Error("Page not found");
    }
    console.log("Fetched Contentful page: ", page);
    return page;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

// Cache the fetch to prevent duplicate API calls within the same request
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchPageByPath = cache(_fetchPageByPath);

export default fetchPageByPath;
