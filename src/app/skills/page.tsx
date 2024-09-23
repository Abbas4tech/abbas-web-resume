"use client"
import React, { FC } from "react";
import SVGIcon from "@components/SVGIcon";
import { SkillSet } from "@utils/contentful";
import SkillSetItem from "@components/SkillSet";
import { useUserInfo } from "@context/useInfo";

const Skills: FC = () => {
  const { technologies } = useUserInfo();

  return (
    <>
      <div className="container overflow-auto mb-5">
        <h1
          data-aos="fade-down"
          className="flex items-center justify-center gap-2 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl aos-init aos-animate"
        >
          <span className="inline-block mr-2">
            <SVGIcon classes="" icon={"Skills"} />
          </span>
          {"Skills"}
        </h1>
        <div className="flex flex-col gap-4" data-aos="fade-up">
          {technologies.map((res: SkillSet) => (
            <SkillSetItem {...res} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
