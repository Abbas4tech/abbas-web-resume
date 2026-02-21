import React from "react";
import { Metadata } from "next";

import ContentfulPage from "@/components/ContentfulPage";
import fetchPageByPath from "@/gql/queries/pages/fetchPageByPath";
import { generatePageMetadata } from "@/lib/metadata";

const PATH = "/experience";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const page = await fetchPageByPath(PATH);
    return generatePageMetadata(page.pageSeo);
  } catch (error) {
    console.error("Error generating metadata for /experience:", error);
    return {
      title: "Experience | Abbas Shaikh",
      description: "Experience of Abbas Shaikh",
    };
  }
};

const Page = async (): Promise<React.JSX.Element> => {
  try {
    return <ContentfulPage path={PATH} />;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Error in /experience page:", errorMessage);
    return (
      <div className="alert alert-error">
        <span>Failed to load page: {errorMessage}</span>
      </div>
    );
  }
};

export default Page;
