import ExperienceCard from "@components/ExperienceCard";
import React from "react";

const experience = () => {
  return (
    <>
      <ul className="px-2 pl-4 mt-2 md:mt-4 md:px-12">
        {Array.from({length:4},(_,i) => i).map((e)=> (
            <ExperienceCard key={e}/>
        ))}
      </ul>
    </>
  );
};

export default experience;
