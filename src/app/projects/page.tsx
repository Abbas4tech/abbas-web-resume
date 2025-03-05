import React from "react";
import { Metadata, NextPage } from "next";
import { ProjectsPage as ProjectsPageSchema } from "@lib/contentful";
import { ProjectCardItem } from "@components";
import { fetchPageMetadata, fetchQuery } from "@lib/api";
import {
  Page,
  PageContent,
  PageHeading,
  PageIcon,
} from "src/components/ui/page";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<ProjectsPageSchema>(
    process.env.CONTENTFUL_PROJECTS_PAGE_KEY!
  );
};

const ProjectsPage: NextPage = async () => {
  const {
    title,
    pageIcon,
    headingAnimation,
    contentAnimation,
    pageData: { projects },
  } = await fetchQuery<ProjectsPageSchema>(
    process.env.CONTENTFUL_PROJECTS_PAGE_KEY!
  );

  return (
    <Page>
      <PageHeading headingAnimation={headingAnimation}>
        <PageIcon {...pageIcon}></PageIcon>
        {title}
      </PageHeading>
      <PageContent
        className="grid grid-cols-1 sm:grid-cols-2 my-2 rounded-xl gap-4"
        contentAnimation={contentAnimation}
      >
        {projects.map((item, index: number) => (
          <ProjectCardItem key={index} {...item} />
        ))}
      </PageContent>
    </Page>
  );
};

export default ProjectsPage;
