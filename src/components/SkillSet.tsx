import React from "react";
import SVGIcon from "@components/SVGIcon";
import { SkillGroup, SkillSet } from "@utils/contentful";
import SkillGroupItem from "@components/SkillGroup";

const SkillSetItem = ({ title, identifier, skillsArray }: SkillSet) => {
  return (
    <div
      key={title}
      className="mockup-window bg-base-300 border-neutral border"
    >
      <div className="p-4 bg-base-200">
        <div className="flex items-center mb-4 text-xl font-bold md:text-3xl">
          <SVGIcon icon={identifier} />
          <h1 className="flex ml-4">{title}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {skillsArray.map((res: SkillGroup) => (
            <SkillGroupItem {...res} key={res.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillSetItem;
