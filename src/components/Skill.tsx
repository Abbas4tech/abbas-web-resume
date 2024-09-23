import React from "react";
import SVGIcon from "./SVGIcon";

interface SkillsProps {
  skillName: string;
}

const Skill = ({ skillName }: SkillsProps) => {
  return (
    <div className="tooltip tooltip-primary" data-tip={skillName}>
      <SVGIcon classes="" icon={skillName} />
    </div>
  );
};

export default Skill;
