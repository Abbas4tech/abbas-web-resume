import React from "react";
import { JobExperience } from "@lib/contentful";

import {
  Step,
  StepBody,
  StepContent,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
} from "./ui/stepper";
import { Icon } from "./ui/icon";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ExperienceCard: React.FC<JobExperience> = React.memo(
  ({
    company,
    position,
    description,
    location,
    startDate,
    endDate,
    workedRemotely,
    currentlyWorking,
    techStack,
    companyIcon,
    durationIcon,
    roleIcon,
    techStackIcon,
    locationIcon,
  }: JobExperience) => {
    ExperienceCard.displayName = "ExperienceCard";

    const formattedStartDate = React.useMemo(() => {
      const date = new Date(startDate);
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }, [startDate]);

    const formattedEndDate = React.useMemo(() => {
      const date = new Date(endDate);
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }, [endDate]);

    const remoteLabel = React.useMemo(
      () => (workedRemotely ? ` - Remote` : ""),
      [workedRemotely]
    );

    return (
      <Step>
        <StepSeparator>
          <StepIndicator>
            <Icon {...companyIcon} />
          </StepIndicator>
        </StepSeparator>
        <StepBody>
          <StepTitle>{company}</StepTitle>
          <StepContent>
            <div className="flex flex-col justify-between md:flex-row">
              <div className="flex items-center gap-2">
                <Icon {...locationIcon} />
                &nbsp;{`${location}${remoteLabel}`}
              </div>
              <div className="flex items-center gap-2">
                <Icon {...durationIcon} />
                {`${formattedStartDate} - ${
                  currentlyWorking ? "Present" : formattedEndDate
                }`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon {...roleIcon} />
              {position}
            </div>
            <div className="flex items-start gap-2 mb-2 md:mb-4">
              <Icon {...techStackIcon} />
              {techStack.skillIcons.map((i) => i.name).join(", ")}
            </div>
          </StepContent>
          <StepDescription>{description}</StepDescription>
        </StepBody>
      </Step>
    );
  }
);

export default ExperienceCard;
