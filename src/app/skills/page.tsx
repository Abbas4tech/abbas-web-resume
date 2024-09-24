"use client";
import React, { FC } from "react";
import { SkillSet } from "@utils/contentful";
import SkillSetItem from "@components/SkillSet";
import { useUserInfo } from "@context/useInfo";
import PageWrapper from "@components/PageWrapper";

const Skills: FC = () => {
  const { technologies } = useUserInfo();
  return (
    <>
      <PageWrapper title="Skills" iconId="Skills">
        <div className="flex flex-col gap-4" data-aos="fade-up">
          {technologies.map((res: SkillSet) => (
            <SkillSetItem {...res} key={res.title} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default Skills;
