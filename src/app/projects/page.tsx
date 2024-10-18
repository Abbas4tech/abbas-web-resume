import React from "react";
import { Metadata, NextPage } from "next";
import { ProjectsPage as ProjectsPageSchema } from "@utils/contentful";
import { ProjectCardItem, PageWrapper } from "@components";
import { fetchPageMetadata, fetchQuery } from "@utils/api";

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
    <PageWrapper
      icon={pageIcon}
      title={title}
      headingAnimation={headingAnimation}
    >
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 my-2 rounded-xl gap-4`}
        data-aos={contentAnimation}
      >
        {projects.map((item, index: number) => (
          <ProjectCardItem key={index} {...item} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
