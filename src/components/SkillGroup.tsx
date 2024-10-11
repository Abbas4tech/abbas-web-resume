import { SkillGroup } from "@utils/contentful";
import React, { memo } from "react";
import DynamicIcons from "./DynamicIcon";

const SkillGroupItem: React.FC<SkillGroup> = memo(
  ({ skillProgress, skillIcons, title }: SkillGroup) => {
    SkillGroupItem.displayName = "SkillGroupItem";
    return (
      <div>
        <div key={title} className="grid items-center grid-cols-2">
          <div className="flex gap-4 text-xl md:text-4xl">
            {skillIcons.map((skill) => (
              <DynamicIcons key={skill.name} {...skill} />
            ))}
          </div>
          <div className="relative w-full h-1 bg-gray-600 rounded-2xl">
            <div
              className="absolute top-0 left-0 bg-warning rounded-2xl h-full"
              style={{ width: `${skillProgress}%` }}
            >
              <span className="absolute px-1 py-1 mb-2 text-xs text-white rounded-sm bg-slate-900 -right-4 bottom-full animate-pulse">
                {skillProgress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SkillGroupItem;
