import { notFound } from "next/navigation";

import { contentful } from "@/gql/contentful";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchPageByPath = async (path: string) => {
  try {
    console.warn("...Fetching Contentful page for path: ", path);
    const pages = await contentful().fetchPageByPath({ path });
    const page = pages.data.pageCollection?.items[0];
    if (!page?.pageData || !page) {
      console.error("Couldn't found the contentful page for path: ", path);
      notFound();
    }
    return page;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default fetchPageByPath;
