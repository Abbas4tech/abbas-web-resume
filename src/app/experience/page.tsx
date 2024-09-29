import React from "react";
import { NextPage } from "next";
import {
  ExperiencePage as ExperiencePageSchema,
  JobExperience,
} from "@utils/contentful";
import { PageWrapper, ExperienceCard } from "@components";
import { fetchQuery } from "@utils/api";

const ExperiencePage: NextPage = async () => {
  const data: ExperiencePageSchema = await fetchQuery<ExperiencePageSchema>(
    process.env.CONTENTFUL_PROJECTS_PAGE_KEY!
  );
  const { title, identifier, headingAnimation, contentAnimation, pageData } =
    data;
  return (
    <>
      <PageWrapper
        iconId={identifier}
        title={title}
        headingAnimation={headingAnimation}
      >
        <div
          className={`px-2 pl-4 mt-2 md:mt-4 md:px-12`}
          data-aos={contentAnimation}
        >
          {pageData.map((experience: JobExperience, index: number) => (
            <ExperienceCard {...experience} key={index} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default ExperiencePage;
