"use client";
import React from "react";
import { NextPage } from "next";
import { JobExperience } from "@utils/contentful";
import { usePathname } from "next/navigation";
import { useApplicationData } from "@context/useApplication";
import PageWrapper from "@components/PageWrapper";
import ExperienceCard from "@components/ExperienceCard";

const ExperiencePage: NextPage = () => {
  const page = usePathname().slice(1);
  const { pagesInformation } = useApplicationData();
  const { title, contentAnimation, headingAnimation, pageData, identifier } =
    pagesInformation[page];
  const pageInfo = pageData as JobExperience[];
  return (
    <>
      <PageWrapper
        iconId={identifier}
        title={title}
        headingAnimation={headingAnimation}
      >
        <ul
          data-aos={contentAnimation}
          className="px-2 pl-4 mt-2 md:mt-4 md:px-12"
        >
          {pageInfo.map((e: JobExperience) => (
            <ExperienceCard {...e} key={e.company} />
          ))}
        </ul>
      </PageWrapper>
    </>
  );
};

export default ExperiencePage;
