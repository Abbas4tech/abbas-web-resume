import { SkillGroup } from "@lib/contentful";
import React, { memo } from "react";
import { DynamicIcon } from "@components";
import Progress from "../ui/progress";

const SkillGroupItem: React.FC<SkillGroup> = memo(
  ({ skillProgress, skillIcons, title }: SkillGroup) => {
    SkillGroupItem.displayName = "SkillGroupItem";
    return (
      <div>
        <div key={title} className="grid items-center grid-cols-2">
          <div className="flex gap-4 text-xl md:text-4xl">
            {skillIcons.map((skill) => (
              <DynamicIcon key={skill.name} {...skill} />
            ))}
          </div>
          <Progress skillProgress={skillProgress} />
        </div>
      </div>
    );
  }
);

export default SkillGroupItem;
