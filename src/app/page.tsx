import React from "react";
import { Metadata, NextPage } from "next";
import { HomePage } from "@lib/contentful";
import { BioCard, RichText } from "@components";
import { fetchPageMetadata, fetchQuery } from "@lib/api";
import { Page, PageContent, PageHeading } from "src/components/ui/page";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<HomePage>(process.env.CONTENTFUL_HOME_PAGE_KEY!);
};

const Home: NextPage = async () => {
  const {
    title,
    headingAnimation,
    contentAnimation,
    pageData: { info, description },
  } = await fetchQuery<HomePage>(process.env.CONTENTFUL_HOME_PAGE_KEY!);

  return (
    <Page>
      <PageHeading headingAnimation={headingAnimation}>{title}</PageHeading>
      <PageContent contentAnimation={contentAnimation}>
        <div className="bg-base-300 p-2 md:p-4 mb-4 rounded-xl">
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
      </PageContent>
    </Page>
  );
};

export default Home;
