import React, { FC, memo, useMemo } from "react";

import { AdaptedJobExperience } from "./job-experience.adapter";
import {
  Step,
  StepBody,
  StepContent,
  StepIndicator,
  StepSeparator,
  StepTitle,
} from "../../ui/stepper";
import { Icon } from "../icon/icon";
import { RichText } from "../../RichText";

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

type ExperienceCardProps = AdaptedJobExperience;

const ExperienceCard: FC<ExperienceCardProps> = memo(
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
  }: ExperienceCardProps) => {
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
      () => (workedRemotely ? " - Remote" : ""),
      [workedRemotely],
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
            <div className="flex items-center list-sty gap-2 leading- mb-2 md:mb-4">
              <Icon {...techStackIcon} />
              {techStack.icons.map((i) => i.name).join(", ")}
            </div>
          </StepContent>
          <RichText className="description" document={description} />
        </StepBody>
      </Step>
    );
  },
);

export default ExperienceCard;
