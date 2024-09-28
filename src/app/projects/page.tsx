import React from "react";
import { NextPage } from "next";
import { ProjectsPage as ProjectsPageSchema } from "@utils/contentful";
import { ProjectCardItem, PageWrapper } from "@components";

const ProjectsPage: NextPage = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/page?id=${process.env.CONTENTFUL_PROJECTS_PAGE_KEY}`
  );
  const data: ProjectsPageSchema = await res.json();
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
