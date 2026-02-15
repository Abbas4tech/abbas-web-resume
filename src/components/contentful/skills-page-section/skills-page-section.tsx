import React from "react";

import { SkillsPageDataFragment } from "@/gql/sdk";
import { skillsPageDataAdapter } from "@/components/contentful/skills-page-section/skills-page-data.adapter";

import {
  Skill,
  SkillsContent,
  SkillTitle,
  SkillGroup,
  SkillGroupContent,
  SkillList,
} from "../../ui/skill";
import { Icon } from "../icon/icon";
import Progress from "../../ui/progress";

interface SkillsPageDataSectionProps {
  data: SkillsPageDataFragment;
}

const SkillsPageDataSection = ({
  data,
}: SkillsPageDataSectionProps): React.JSX.Element => {
  const content = skillsPageDataAdapter(data);

  return (
    <div className="grid gap-4">
      {content.skillSets.map((skillSet) => (
        <Skill key={skillSet.title}>
          <SkillsContent>
            <SkillTitle>
              <Icon {...skillSet.icon} />
              {skillSet.title}
            </SkillTitle>
            <SkillGroup>
              {skillSet.skills.map((skill) => (
                <SkillGroupContent key={skill.title}>
                  <SkillList>
                    {skill.icons.map((i) => (
                      <Icon key={i.id} {...i} />
                    ))}
                  </SkillList>
                  <Progress count={skill.skillProgress} />
                </SkillGroupContent>
              ))}
            </SkillGroup>
          </SkillsContent>
        </Skill>
      ))}
    </div>
  );
};

export default SkillsPageDataSection;
