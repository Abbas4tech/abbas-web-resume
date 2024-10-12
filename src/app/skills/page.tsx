import React from "react";
import { NextPage, Metadata } from "next";
import { SkillSetItem, PageWrapper } from "@components";
import { SkillsPage as SkillsPageSchema } from "@utils/contentful";
import { fetchPageMetadata, fetchQuery } from "@utils/api";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<SkillsPageSchema>(
    process.env.CONTENTFUL_SKILLS_PAGE_KEY!
  );
};

const SkillsPage: NextPage = async () => {
  const data = await fetchQuery<SkillsPageSchema>(
    process.env.CONTENTFUL_SKILLS_PAGE_KEY!
  );
  const { title, pageIcon, contentAnimation, headingAnimation, pageData } =
    data;
  return (
    <>
      <PageWrapper
        icon={pageIcon}
        title={title}
        headingAnimation={headingAnimation}
      >
        <div className={`flex flex-col gap-4`} data-aos={contentAnimation}>
          {pageData.map((item, index: number) => (
            <SkillSetItem {...item} key={index} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default SkillsPage;
