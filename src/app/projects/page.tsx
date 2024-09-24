"use client";
import React from "react";
import { NextPage } from "next";
import { ProjectCard } from "@utils/contentful";
import ProjectCardComp from "@components/ProjectCard";
import PageWrapper from "@components/PageWrapper";
import { useApplicationData } from "@context/useApplication";
import { usePathname } from "next/navigation";

const ProjectsPage: NextPage = () => {
  const page = usePathname().slice(1);
  const { pagesInformation } = useApplicationData();
  const { title, contentAnimation, headingAnimation, pageData, identifier } =
    pagesInformation[page];
  const pageInfo = pageData as ProjectCard[];
  return (
    <PageWrapper
      iconId={identifier}
      title={title}
      headingAnimation={headingAnimation}
    >
      <div
        data-aos={contentAnimation}
        className="columns-1 md:columns-2 my-2 rounded-xl gap-4"
      >
        {pageInfo.map((res: ProjectCard) => (
          <ProjectCardComp key={res.title} {...res} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
