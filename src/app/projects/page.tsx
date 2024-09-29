import React from "react";
import { NextPage } from "next";
import { ProjectsPage as ProjectsPageSchema } from "@utils/contentful";
import { ProjectCardItem, PageWrapper } from "@components";
import { fetchQuery } from "@utils/api";

const ProjectsPage: NextPage = async () => {
  const data = await fetchQuery<ProjectsPageSchema>(
    process.env.CONTENTFUL_PROJECTS_PAGE_KEY!
  );
  const { title, identifier, headingAnimation, contentAnimation, pageData } =
    data;
  return (
    <PageWrapper
      iconId={identifier}
      title={title}
      headingAnimation={headingAnimation}
    >
      <div
        className={`columns-1 md:columns-2 my-2 rounded-xl gap-4`}
        data-aos={contentAnimation}
      >
        {pageData.map((item, index: number) => (
          <ProjectCardItem key={index} {...item} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
