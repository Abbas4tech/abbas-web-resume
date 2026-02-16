import React from "react";
import { Metadata } from "next";

import ContentfulPage from "@/components/ContentfulPage";
import { getSanitizedPath } from "@/lib/utils";
import fetchPageByPath from "@/gql/queries/pages/fetchPageByPath";
import { generatePageMetadata } from "@/lib/metadata";
import fetchAllPagePaths from "@/gql/queries/pages/fetch-all-page-path";

export const generateStaticParams = async (): Promise<
  {
    path: string;
  }[]
> => {
  const paths = (await fetchAllPagePaths()) || [];
  return paths
    .map((e) => e?.path ?? "")
    .filter(Boolean)
    .map((path) => ({ path: path.replace(/^\//, "") }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ path: string }>;
}): Promise<Metadata> => {
  let { path } = await params;
  path = getSanitizedPath(path);

  try {
    const page = await fetchPageByPath(path);
    return generatePageMetadata(page.pageSeo);
  } catch (error) {
    console.error("Error generating metadata for path:", path, error);
    return {
      title: "Page Not Found",
      description: "The requested page could not be found",
    };
  }
};

const Page = async ({
  params,
}: {
  params: Promise<{ path: string }>;
}): Promise<React.JSX.Element> => {
  let { path } = await params;
  path = getSanitizedPath(path);
  return <ContentfulPage path={path} />;
};

export default Page;
