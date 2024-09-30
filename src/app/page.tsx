import React from "react";
import { NextPage } from "next";
import { ApplicationData } from "@utils/contentful";
import { BioCard, PageWrapper } from "@components";
import { fetchQuery } from "@utils/api";
import { RichText } from "@components";

const Home: NextPage = async () => {
  const { info, description } = await fetchQuery<ApplicationData>(
    process.env.CONTENTFUL_APPLICATION_DATA_ID!
  );
  return (
    <>
      <PageWrapper>
        <div className="bg-base-300 p-2 md:p-4 mb-4 rounded-xl">
          <RichText
            paragraphClass="py-1.5 text-center md:text-xl"
            document={description}
          />
        </div>
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
      </PageWrapper>
    </>
  );
};

export default Home;
