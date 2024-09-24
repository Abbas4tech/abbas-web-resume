"use client";
import ExperienceCard from "@components/ExperienceCard";
import React from "react";
import { useUserInfo } from "@context/useInfo";
import PageWrapper from "@components/PageWrapper";

const Experience = () => {
  const { experiences } = useUserInfo();
  return (
    <>
      <PageWrapper title="Experiece" iconId="Experience">
        <ul className="px-2 pl-4 mt-2 md:mt-4 md:px-12">
          {experiences.map((e) => (
            <ExperienceCard {...e} key={e.company} />
          ))}
        </ul>
      </PageWrapper>
    </>
  );
};

export default Experience;
