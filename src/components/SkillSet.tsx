import React from "react";
import { DynamicIcon, SkillGroup as SkillGroupItem } from "@components";
import { SkillGroup, SkillSet } from "@utils/contentful";

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
        <div className="flex items-center mb-4 text-xl font-bold md:text-3xl">
          <DynamicIcon {...icon} />
          <h1 className="flex ml-4">{title}</h1>
        </div>
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
