import React from "react";
import { Metadata, NextPage } from "next";

import { Page, PageContent, PageHeading } from "@/components/ui/page";
import {
  Stat,
  StatDescription,
  StatFigure,
  Stats,
  StatTitle,
} from "@/components/ui/stat";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/RichText";
import { getPageMetadata } from "@/helper/getPageMetadata";
import { fetchGql } from "@/lib/client";
import { GET_HOME_PAGE } from "@/queries/getHomePageQuery";
import { GetHomePageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_HOME_PAGE_KEY as string);

export const revalidate = 60;

const Home: NextPage = async () => {
  const data = await fetchGql<GetHomePageQueryResult>(GET_HOME_PAGE, {
    id: process.env.CONTENTFUL_HOME_PAGE_KEY as string,
  });

  const { title, contentAnimation, headingAnimation, pageData } = data.page;

  return (
    <Page>
      <PageHeading data-aos={headingAnimation}>{title}</PageHeading>
      <PageContent data-aos={contentAnimation}>
        <div className="bg-base-300 p-4 mb-4 rounded-xl">
          <RichText
            paragraphClass="py-1.5 text-center lg:text-xl"
            document={pageData.description.json}
          />
        </div>
        <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
          {pageData.infoCollection.items.map(({ title, value, icon }) => (
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
