"use client";
import React from "react";
import { NextPage } from "next";
import { ProjectCard } from "@utils/contentful";
import ProjectCardComp from "@components/ProjectCard";
import PageTemplate from "@components/PageTemplate";

const ProjectsPage: NextPage = () => {
  return (
    <PageTemplate<ProjectCard>
      renderItem={(item: ProjectCard) => <ProjectCardComp key={item.title} {...item} />}
      className="columns-1 md:columns-2 my-2 rounded-xl gap-4"
    />
  );
};

export default ProjectsPage;
