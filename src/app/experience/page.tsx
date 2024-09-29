import React from "react";
import { NextPage } from "next";
import {
  ExperiencePage as ExperiencePageSchema,
  JobExperience,
} from "@utils/contentful";
import { PageWrapper, ExperienceCard } from "@components";
import { PAGE_API } from "@utils/data";

const ExperiencePage: NextPage = async () => {
  const res = await fetch(
    `${PAGE_API}${process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY!}`
  );
  const data: ExperiencePageSchema = await res.json();
  const { title, identifier, headingAnimation, contentAnimation, pageData } =
    data;
  console.log(data);
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
