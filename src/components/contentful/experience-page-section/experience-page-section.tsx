import React from "react";

import { ExperiencePageDataFragment } from "@/gql/sdk";
import { experiencePageDataAdapter } from "@/components/contentful/experience-page-section/experience-page-data.adapter";

import ExperienceCard from "../job-experience/job-experience";

interface ExperiencePageDataSectionProps {
  data: ExperiencePageDataFragment;
}

const ExperiencePageDataSection = ({
  data,
}: ExperiencePageDataSectionProps): React.JSX.Element => {
  const content = experiencePageDataAdapter(data);
  return (
    <div className="px-2 pl-4 mt-2 md:mt-4 md:px-12">
      {content.experiences.map((experience, index: number) => (
        <ExperienceCard
          key={index}
          company={experience.company}
          position={experience.position}
          description={experience.description}
          location={experience.location}
          startDate={experience.startDate}
          endDate={experience.endDate}
          workedRemotely={experience.workedRemotely}
          currentlyWorking={experience.currentlyWorking}
          techStack={{
            id: experience.techStack.id,
            title: experience.techStack.title,
            skillProgress: experience.techStack.skillProgress,
            icons: experience.techStack.icons.map((icon) => ({
              id: icon.id,
              name: icon.name,
              classes: icon.classes,
              showTooltip: icon.showTooltip,
              iconCode: icon.iconCode,
            })),
          }}
          companyIcon={experience.companyIcon}
          durationIcon={experience.durationIcon}
          roleIcon={experience.roleIcon}
          techStackIcon={experience.techStackIcon}
          locationIcon={experience.locationIcon}
        />
      ))}
    </div>
  );
};

export default ExperiencePageDataSection;
