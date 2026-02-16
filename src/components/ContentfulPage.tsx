import React from "react";

import { Page, PageContent, PageHeading } from "@/components/ui/page";
import fetchPageByPath from "@/gql/queries/pages/fetchPageByPath";

import HomePageDataSection from "./contentful/home-page-section/home-page-section";
import ExperiencePageDataSection from "./contentful/experience-page-section/experience-page-section";
import SkillsPageDataSection from "./contentful/skills-page-section/skills-page-section";
import ProjectsPageDataSection from "./contentful/projects-page-section/projects-page-section";

interface ContentfulPageProps {
  path: string;
}

const ContentfulPage = async ({
  path,
}: ContentfulPageProps): Promise<React.JSX.Element | null> => {
  try {
    console.warn("Fetching page for path:", path);
    const page = await fetchPageByPath(path);

    console.warn("Page fetched successfully:", {
      path,
      title: page.title,
      hasPageData: !!page.pageData,
      typename: page.pageData?.__typename,
    });

    if (!page.pageData || !page.pageData.__typename) {
      const typename = (
        page.pageData as { __typename?: string } | null | undefined
      )?.__typename;
      console.error("No _typename found for PageSection: ", {
        pageData: page.pageData,
        typename,
      });
      return null;
    }

    const Fixtures = {
      HomePageData: HomePageDataSection,
      ExperiencePageData: ExperiencePageDataSection,
      SkillsPageData: SkillsPageDataSection,
      ProjectsPageData: ProjectsPageDataSection,
    };

    const Fixture = Fixtures[page.pageData.__typename] as React.ComponentType<{
      data: typeof page.pageData;
    }>;

    if (!Fixture) {
      console.error(
        `No component found for typename: ${page.pageData.__typename}`,
      );
      return null;
    }

    return (
      <Page>
        {page.headingAnimation && page.title && (
          <PageHeading data-aos={page.headingAnimation}>
            {page.title}
          </PageHeading>
        )}
        <PageContent
          {...(page.contentAnimation && { "data-aos": page.contentAnimation })}
        >
          <Fixture data={page.pageData} />
        </PageContent>
      </Page>
    );
  } catch (error) {
    console.error("Error rendering ContentfulPage:", {
      path,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export default ContentfulPage;
