import React from "react";
import { Metadata, NextPage } from "next";
import { HomePage } from "@lib/contentful";
import { fetchPageMetadata, fetchQuery } from "@lib/api";
import { Page, PageContent, PageHeading } from "@components/ui/page";
import {
  Stat,
  StatDescription,
  StatFigure,
  Stats,
  StatTitle,
} from "@components/ui/stat";
import { Icon } from "@components/ui/icon";
import { RichText } from "@components/rich-text";
import { AnimatedHeading } from "@components/animated-heading";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<HomePage>(process.env.CONTENTFUL_HOME_PAGE_KEY!);
};
export const revalidate = 60;

const Home: NextPage = async () => {
  const {
    title,
    headingAnimation,
    contentAnimation,
    pageData: { info, description },
  } = await fetchQuery<HomePage>(process.env.CONTENTFUL_HOME_PAGE_KEY!);

  return (
    <Page>
      <PageHeading data-aos={headingAnimation}>
        <AnimatedHeading text={title} />
      </PageHeading>
      <PageContent data-aos={contentAnimation}>
        <div className="bg-base-300 p-2 md:p-4 mb-4 rounded-xl">
          <RichText
            paragraphClass="py-1.5 text-center lg:text-xl"
            document={description}
          />
        </div>
        <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
          {info.map(({ title, value, icon }) => (
            <Stats key={title}>
              <Stat>
                <StatFigure>
                  <Icon {...icon} />
                </StatFigure>
                <StatTitle>{title}</StatTitle>
                <StatDescription>{value}</StatDescription>
              </Stat>
            </Stats>
          ))}
        </div>
      </PageContent>
    </Page>
  );
};

export default Home;
