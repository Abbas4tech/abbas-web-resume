import React from "react";
import { DynamicIcon, SkillGroup as SkillGroupItem } from "@components";
import { SkillGroup, SkillSet } from "@lib/contentful";

const SkillSetItem: React.FC<SkillSet> = ({
  title,
  icon,
  skillsArray,
}: SkillSet) => {
  return (
    <div
      key={title}
      className="mockup-window bg-base-300 border-neutral border"
    >
      <div className="p-4 bg-base-200">
        <h1 className="flex text-xl font-bold items-center md:text-3xl gap-4 mb-4 ">
          <DynamicIcon {...icon} />
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 md:p-4">
          {skillsArray.map((res: SkillGroup, i: number) => (
            <SkillGroupItem {...res} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillSetItem;
