"use client";
import React from "react";
import { useUserInfo } from "@context/useInfo";
import { ProjectCard } from "@utils/contentful";
import ProjectCardComp from "@components/ProjectCard";
import PageWrapper from "@components/PageWrapper";

const Projects = (): React.JSX.Element => {
  const { projects } = useUserInfo();
  return (
    <PageWrapper title="Projects" iconId="Projects">
      <div
        data-aos="fade-up"
        className="columns-1 md:columns-2 my-2 rounded-xl gap-4"
      >
        {projects.map((res: ProjectCard) => (
          <ProjectCardComp key={res.title} {...res} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Projects;
