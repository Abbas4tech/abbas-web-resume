import React from "react";
import { NextPage, Metadata } from "next";
import { SkillSetItem, PageWrapper } from "@components";
import { SkillsPage as SkillsPageSchema } from "@utils/contentful";
import { PAGE_API } from "@utils/data";

export const metadata: Metadata = {
  title: "Abbas | Skills",
};

const SkillsPage: NextPage = async () => {
  const res = await fetch(
    `${PAGE_API}${process.env.CONTENTFUL_SKILLS_PAGE_KEY!}`
  );
  const data: SkillsPageSchema = await res.json();
  const { title, identifier, contentAnimation, headingAnimation, pageData } =
    data;
  return (
    <>
      <PageWrapper
        iconId={identifier}
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
