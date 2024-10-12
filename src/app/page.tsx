import React from "react";
import { Metadata, NextPage } from "next";
import { HomePage } from "@utils/contentful";
import { BioCard, PageWrapper, RichText } from "@components";
import { fetchPageMetadata, fetchQuery } from "@utils/api";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<HomePage>(process.env.CONTENTFUL_HOME_PAGE_KEY!);
};

const Home: NextPage = async () => {
  const { pageData, contentAnimation, headingAnimation, title } =
    await fetchQuery<HomePage>(process.env.CONTENTFUL_HOME_PAGE_KEY!);
  const { info, description } = pageData[0];
  return (
    <>
      <PageWrapper headingAnimation={headingAnimation} title={title}>
        <div
          data-aos={contentAnimation}
          className="bg-base-300 p-2 md:p-4 mb-4 rounded-xl"
        >
          <RichText
            paragraphClass="py-1.5 text-center md:text-xl"
            document={description}
          />
        </div>
        <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
          {info.map(({ title, value, icon }) => (
            <BioCard key={title} title={title} value={value} icon={icon} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default Home;
