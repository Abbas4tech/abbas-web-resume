import React from "react";
import { Metadata } from "next";

import ContentfulPage from "@/components/ContentfulPage";
import { getSanitizedPath } from "@/lib/utils";
import fetchPageByPath from "@/gql/queries/pages/fetchPageByPath";
import { generatePageMetadata } from "@/lib/metadata";
import fetchAllPagePaths from "@/gql/queries/pages/fetch-all-page-path";

// Allow dynamic paths not in generateStaticParams to be rendered on-demand
export const dynamicParams = false;

// Revalidate every 60 seconds for ISR (Incremental Static Regeneration)
export const revalidate = 60;

export const generateStaticParams = async (): Promise<
  {
    path?: string[];
  }[]
> => {
  try {
    const paths = (await fetchAllPagePaths()) || [];
    const result = paths
      .map((e) => e?.path ?? "")
      .filter(Boolean)
      .map((path) => ({
        path: path.replace(/^\//, "").split("/").filter(Boolean),
      }));

    // Add root path (empty array for optional catch-all)
    result.push({ path: [] });

    // eslint-disable-next-line no-console
    console.log("✅ Generated static params:", result);
    return result;
  } catch (error) {
    console.error("❌ Error in generateStaticParams:", error);
    // Return empty array on error to allow on-demand rendering
    return [];
  }
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> => {
  const { path: pathArray = [] } = await params;

  // Default to /about for root
  let path = pathArray.length === 0 ? "about" : pathArray.join("/");
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
  params: Promise<{ path?: string[] }>;
}): Promise<React.JSX.Element> => {
  const { path: pathArray = [] } = await params;

  // Default to /about for root
  let path = pathArray.length === 0 ? "about" : pathArray.join("/");
  path = getSanitizedPath(path);

  try {
    return <ContentfulPage path={path} />;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Error in dynamic page:", errorMessage);
    return (
      <div className="alert alert-error">
        <span>Failed to load page: {errorMessage}</span>
      </div>
    );
  }
};

export default Page;
