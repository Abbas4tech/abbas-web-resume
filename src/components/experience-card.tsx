import React, { memo, useMemo } from "react";
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

const ExperienceCard: React.FC<JobExperience> = memo(
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

    const formattedStartDate = useMemo(() => {
      const date = new Date(startDate);
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }, [startDate]);

    const formattedEndDate = useMemo(() => {
      const date = new Date(endDate);
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }, [endDate]);

    const remoteLabel = useMemo(
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
                <span className="">
                  <Icon {...locationIcon} />
                </span>
                &nbsp;{`${location}${remoteLabel}`}
              </div>
              <div className="flex items-center gap-2">
                <span className="">
                  <Icon {...durationIcon} />
                </span>
                {`${formattedStartDate} - ${
                  currentlyWorking ? "Present" : formattedEndDate
                }`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="">
                <Icon {...roleIcon} />
              </span>
              {position}
            </div>
            <div className="flex items-start gap-2 mb-2 md:mb-4">
              <span className="pt-1 ">
                <Icon {...techStackIcon} />
              </span>
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
