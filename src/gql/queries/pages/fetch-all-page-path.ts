/* eslint-disable no-console */
import { cache } from "react";

import { contentful } from "@/gql/contentful";

// Actual fetch logic
const _fetchAllPagePaths = async () => {
  try {
    console.log("...Fetching Contentful Pages Paths");
    const pages = await contentful().fetchAllPagePaths();
    const page = pages.data.pageCollection?.items.filter((e) =>
      Boolean(e?.path),
    );
    console.log("Fetched Contentful Pages Paths: ", page);
    return page;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

// Cache the fetch to prevent duplicate API calls within the same request
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchAllPagePaths = cache(_fetchAllPagePaths);

export default fetchAllPagePaths;
