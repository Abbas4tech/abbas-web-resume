import React from "react";
import { FaUser, FaRegCalendarTimes, FaUserGraduate } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import SVGIcon from "./SVGIcon";
import { Experience } from "@utils/types";

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

const ExperienceCard = ({
  company,
  position,
  description,
  location,
  startDate,
  endDate,
  workedRemotely,
}: Experience) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute z-10 h-full border-r-2 border-gray-600 left-0">
        <span className="absolute flex items-center justify-center w-8 h-8 -ml-4 rounded-full md:-ml-6 md:w-12 md:h-12 bg-base-300">
          <FaUserGraduate />
        </span>
      </div>
      <div className="mb-4 ml-8 md:ml-10">
        <p className="text-xl font-extrabold sm:text-2xl md:text-3xl">
          {company}
        </p>
        <div className="flex flex-col justify-between md:flex-row">
          <p className="flex items-center gap-">
            <span className="text-slate-500">
              <SVGIcon icon={"location"} />
            </span>
            &nbsp;{`${location} ${workedRemotely ? `- Remote` : null}`}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-slate-500">
              <FaRegCalendarTimes />
            </span>
            {`${monthNames[new Date(startDate).getMonth()]} ${new Date(
              startDate
            ).getFullYear()} - ${
              monthNames[new Date(endDate).getMonth()]
            } ${new Date(endDate).getFullYear()}`}
          </p>
        </div>
        <p className="flex items-center gap-2">
          <span className="text-slate-500">
            <FaUser />
          </span>
          {position}
        </p>
        <p className="flex items-start gap-2 mb-2 md:mb-4">
          <span className="pt-1 text-slate-500">
            <GiStack />
          </span>
          Typescript, Angular, Angular Material, Strapi, Tailwind, RxJS
        </p>
        <p className="gap-2 mb-6 text-base-content">{description}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
