import React from "react";
import { NextPage } from "next";
import { ApplicationData } from "@utils/contentful";
import { BioCard } from "@components";
import { PAGE_API } from "@utils/data";

const Home: NextPage = async () => {
  const res = await fetch(
    `${PAGE_API}${process.env.CONTENTFUL_APPLICATION_DATA_ID!}`
  );
  const { info }: ApplicationData = await res.json();

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
