"use client";
import React from "react";
import { NextPage } from "next";
import { SkillSet } from "@utils/contentful";
import SkillSetItem from "@components/SkillSet";
import PageWrapper from "@components/PageWrapper";
import { useApplicationData } from "@context/useApplication";
import { usePathname } from "next/navigation";

const SkillsPage: NextPage = () => {
  const page = usePathname().slice(1);
  const { pagesInformation } = useApplicationData();
  const { title, contentAnimation, headingAnimation, pageData, identifier } =
    pagesInformation[page];
  const pageInfo = pageData as SkillSet[];
  return (
    <>
      <PageWrapper
        iconId={identifier}
        title={title}
        headingAnimation={headingAnimation}
      >
        <div className="flex flex-col gap-4" data-aos={contentAnimation}>
          {pageInfo.map((res: SkillSet) => (
            <SkillSetItem {...res} key={res.title} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default SkillsPage;
