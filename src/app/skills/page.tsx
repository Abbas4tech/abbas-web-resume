import React from "react";
import { NextPage, Metadata } from "next";
import { DynamicIcon, SkillSetItem } from "@components";
import { SkillsPage as SkillsPageSchema } from "@lib/contentful";
import { fetchPageMetadata, fetchQuery } from "@lib/api";
import { Page, PageContent, PageHeading } from "src/components/ui/page";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<SkillsPageSchema>(
    process.env.CONTENTFUL_SKILLS_PAGE_KEY!
  );
};

const SkillsPage: NextPage = async () => {
  const {
    title,
    pageIcon,
    contentAnimation,
    headingAnimation,
    pageData: { skillsSet },
  } = await fetchQuery<SkillsPageSchema>(
    process.env.CONTENTFUL_SKILLS_PAGE_KEY!
  );

  return (
    <Page>
      <PageHeading headingAnimation={headingAnimation}>
        <DynamicIcon {...pageIcon} />

        {title}
      </PageHeading>
      <PageContent
        className="flex flex-col gap-4"
        contentAnimation={contentAnimation}
      >
        {skillsSet.map((item, index: number) => (
          <SkillSetItem {...item} key={index} />
        ))}
      </PageContent>
    </Page>
  );
};

export default SkillsPage;
