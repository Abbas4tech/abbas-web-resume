"use client"
import React from "react";
import { NextPage } from "next";
import { useApplicationData } from "@context/useApplication";
import BioCardComp from "@components/BioCard";

const Home: NextPage = () => {
  const { info } = useApplicationData();

  return (
    <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
      {info.map(({ title, value, identifier }) => (
        <BioCardComp
          key={title}
          title={title}
          value={value}
          identifier={identifier}
        />
      ))}
    </div>
  );
};

export default Home;
