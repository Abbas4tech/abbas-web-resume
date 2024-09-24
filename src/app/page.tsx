"use client";
import BioCard from "@components/BioCard";
import { useUserInfo } from "@context/useInfo";
import React from "react";

const Home = () => {
  const { info } = useUserInfo();

  return (
    <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
      {info.map(({ title, value, identifier }) => (
        <BioCard
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
