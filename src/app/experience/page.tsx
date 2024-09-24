"use client";
import React from "react";
import { NextPage } from "next";
import { JobExperience } from "@utils/contentful";
import { PageTemplate, ExperienceCard } from "@components";

const ExperiencePage: NextPage = () => {
  return (
    <>
      <PageTemplate<JobExperience>
        className="px-2 pl-4 mt-2 md:mt-4 md:px-12"
        renderItem={(experience: JobExperience) => (
          <ExperienceCard {...experience} key={experience.company} />
        )}
      />
    </>
  );
};

export default ExperiencePage;
