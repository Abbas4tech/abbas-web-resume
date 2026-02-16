/* eslint-disable no-console */

import { contentful } from "@/gql/contentful";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchAllPagePaths = async () => {
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

export default fetchAllPagePaths;
