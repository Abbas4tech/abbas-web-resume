import React from "react";
import { Metadata, NextPage } from "next";
import {
  ExperiencePage as ExperiencePageSchema,
  JobExperience,
} from "@utils/contentful";
import { PageWrapper, ExperienceCard } from "@components";
import { fetchQuery, fetchPageMetadata } from "@utils/api";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<ExperiencePageSchema>(
    process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY!
  );
};

const ExperiencePage: NextPage = async () => {
  const data: ExperiencePageSchema = await fetchQuery<ExperiencePageSchema>(
    process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY!
  );
  const { title, pageIcon, headingAnimation, contentAnimation, pageData } =
    data;
  const { experiences } = pageData;
  return (
    <>
      <PageWrapper
        icon={pageIcon}
        title={title}
        headingAnimation={headingAnimation}
      >
        <div
          className={`px-2 pl-4 mt-2 md:mt-4 md:px-12`}
          data-aos={contentAnimation}
        >
          {experiences.map((experience: JobExperience, index: number) => (
            <ExperienceCard {...experience} key={index} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default ExperiencePage;
