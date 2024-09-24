import React from "react";
import { SkillSet } from "@utils/contentful";
import SkillSetItem from "@components/SkillSet";
import { useUserInfo } from "@context/useInfo";
import PageWrapper from "@components/PageWrapper";
import { NextPage } from "next";
import { fetchSkillsPage } from "@utils/api";

const SkillsPage: NextPage = async () => {
  const { title, identifier, headingAnimation, contentAnimation, pageData } =
    await fetchSkillsPage();
  return (
    <>
      <PageWrapper title={title} headingAnimation={headingAnimation}>
        <div className="flex flex-col gap-4" data-aos={contentAnimation}>
          {pageData.map((res: SkillSet) => (
            <SkillSetItem {...res} key={res.title} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default SkillsPage;
