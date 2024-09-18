import React from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaUser, FaRegCalendarTimes,FaUserGraduate } from "react-icons/fa";
import { GiStack } from "react-icons/gi";

const ExperienceCard: React.FC = () => {
  return (
    <div className="relative flex items-center">
      <div className="absolute z-10 h-full border-r-2 border-gray-600 left-0">
        <span className="absolute flex items-center justify-center w-8 h-8 -ml-4 rounded-full md:-ml-6 md:w-12 md:h-12 bg-base-300">
          <FaUserGraduate />
        </span>
      </div>
      <div className="mb-4 ml-8 md:ml-10">
        <p className="text-xl font-extrabold sm:text-2xl md:text-3xl">
          iSchoolConnect Technologies
        </p>
        <div className="flex flex-col justify-between md:flex-row">
          <p className="flex items-center gap-">
            <span className="text-slate-500">
              <FaLocationCrosshairs />
            </span>
            &nbsp;Mumbai, Maharashtra - Remote
          </p>
          <p className="flex items-center gap-2">
            <span className="text-slate-500">
              <FaRegCalendarTimes />
            </span>
            March 2022 - July 2023
          </p>
        </div>
        <p className="flex items-center gap-2">
          <span className="text-slate-500">
            <FaUser />
          </span>
          Frontend Developer
        </p>
        <p className="flex items-start gap-2 mb-2 md:mb-4">
          <span className="pt-1 text-slate-500">
            <GiStack />
          </span>
          Typescript, Angular, Angular Material, Strapi, Tailwind, RxJS
        </p>
        <p className="gap-2 mb-6 text-base-content">
          Worked on creating and maintaing features for student and advisor dashboards including landing pages. Crafted a new dashbaord for mid level user which reduces the load of division admins by 50%
        </p>
      </div>
    </div>
  );
};

export default ExperienceCard;
