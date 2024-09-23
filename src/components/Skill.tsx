import React, { memo } from "react";
import SVGIcon from "./SVGIcon";

interface SkillsProps {
  skillName: string;
}

const Skill: React.FC<SkillsProps> = memo(({ skillName }: SkillsProps) => {
  Skill.displayName = "Skill";
  return (
    <div className="tooltip tooltip-primary" data-tip={skillName}>
      <SVGIcon classes="" icon={skillName} />
    </div>
  );
});

export default Skill;
