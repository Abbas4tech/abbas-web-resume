import React, { FC } from "react";
import { Entry } from "contentful";
import { fetchSkillsPage } from "@utils/api";
import SVGIcon from "@components/SVGIcon";
import { SkillSet } from "@utils/contentful";
import SkillSetItem from "@components/SkillSet";

const Skills: FC = async () => {
  const { fields } = await fetchSkillsPage();
  const technologies = fields.technologies as Entry<SkillSet>[];

  return (
    <>
      <div className="container overflow-auto mb-5">
        <h1
          data-aos="fade-down"
          className="flex items-center justify-center gap-2 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl aos-init aos-animate"
        >
          <span className="inline-block mr-2">
            <SVGIcon classes="" icon={fields.title as string} />
          </span>
          {fields.title as string}
        </h1>
        <div className="flex flex-col gap-4" data-aos="fade-up">
          {technologies.map((res: Entry<SkillSet>) => (
            <SkillSetItem {...res} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
