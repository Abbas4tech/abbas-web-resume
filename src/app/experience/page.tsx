import React from "react";
import { Metadata, NextPage } from "next";
import {
  ExperiencePage as ExperiencePageSchema,
  JobExperience,
} from "@lib/contentful";
import { fetchQuery, fetchPageMetadata } from "@lib/api";
import { Page, PageContent, PageHeading } from "src/components/ui/page";
import { Icon } from "src/components/ui/icon";
import ExperienceCard from "src/components/experience-card";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<ExperiencePageSchema>(
    process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY!
  );
};

const ExperiencePage: NextPage = async () => {
  const {
    title,
    pageIcon,
    headingAnimation,
    contentAnimation,
    pageData: { experiences },
  }: ExperiencePageSchema = await fetchQuery<ExperiencePageSchema>(
    process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY!
  );

  return (
    <Page>
      <PageHeading headingAnimation={headingAnimation}>
        <Icon {...pageIcon} />
        {title}
      </PageHeading>
      <PageContent
        contentAnimation={contentAnimation}
        className="px-2 pl-4 mt-2 md:mt-4 md:px-12"
      >
        {experiences.map((experience: JobExperience, index: number) => (
          <ExperienceCard {...experience} key={index} />
        ))}
      </PageContent>
    </Page>
  );
};

export default ExperiencePage;
