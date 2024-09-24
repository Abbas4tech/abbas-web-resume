import React from "react";
import { useUserInfo } from "@context/useInfo";
import { ProjectCard } from "@utils/contentful";
import ProjectCardComp from "@components/ProjectCard";
import PageWrapper from "@components/PageWrapper";
import { fetchProjectsPage } from "@utils/api";
import { NextPage } from "next";

const ProjectsPage: NextPage = async () => {
  const { title, headingAnimation, contentAnimation, pageData } =
    await fetchProjectsPage();
  return (
    <PageWrapper title={title} headingAnimation={headingAnimation}>
      <div
        data-aos={contentAnimation}
        className="columns-1 md:columns-2 my-2 rounded-xl gap-4"
      >
        {pageData.map((res: ProjectCard) => (
          <ProjectCardComp key={res.title} {...res} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
