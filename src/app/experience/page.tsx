import ExperienceCard from "@components/ExperienceCard";
import React, { useEffect } from "react";
import { fetchExperiencePage } from "@utils/api";



const experience = async () => {
  const { title, experiences } = await fetchExperiencePage();
  return (
    <>
      <ul className="px-2 pl-4 mt-2 md:mt-4 md:px-12">
        {experiences.map((e) => (
          <ExperienceCard {...e} />
        ))}
      </ul>
    </>
  );
};

export default experience;
