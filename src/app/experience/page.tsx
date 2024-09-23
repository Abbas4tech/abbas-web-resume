"use client";
import ExperienceCard from "@components/ExperienceCard";
import React from "react";
import { useUserInfo } from "@context/useInfo";

const Experience = () => {
  const { experiences } = useUserInfo();
  return (
    <>
      <ul className="px-2 pl-4 mt-2 md:mt-4 md:px-12">
        {experiences.map((e) => (
          <ExperienceCard {...e} key={e.company} />
        ))}
      </ul>
    </>
  );
};

export default Experience;
