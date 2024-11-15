import React, { memo, useMemo } from "react";
import { JobExperience } from "@utils/contentful";
import { DynamicIcon } from "@components";

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
      <div className="relative flex items-center">
        <div className="absolute z-10 h-full border-r-2 border-gray-600 left-0">
          <span className="absolute flex items-center justify-center w-8 h-8 -ml-4 rounded-full md:-ml-6 md:w-12 md:h-12 bg-base-300">
            <DynamicIcon {...companyIcon} />
          </span>
        </div>
        <div className="mb-4 ml-8 md:ml-10">
          <p className="text-xl font-extrabold sm:text-2xl md:text-3xl">
            {company}
          </p>
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">
                <DynamicIcon {...locationIcon} />
              </span>
              &nbsp;{`${location}${remoteLabel}`}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">
                <DynamicIcon {...durationIcon} />
              </span>
              {`${formattedStartDate} - ${
                currentlyWorking ? "Present" : formattedEndDate
              }`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">
              <DynamicIcon {...roleIcon} />
            </span>
            {position}
          </div>
          <div className="flex items-start gap-2 mb-2 md:mb-4">
            <span className="pt-1 text-slate-500">
              <DynamicIcon {...techStackIcon} />
            </span>
            {techStack.skillIcons.map((i) => i.name).join(", ")}
          </div>
          <p className="gap-2 mb-6 text-base-content">{description}</p>
        </div>
      </div>
    );
  }
);

export default ExperienceCard;
