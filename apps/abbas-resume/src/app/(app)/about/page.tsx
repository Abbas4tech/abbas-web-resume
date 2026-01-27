import type { Metadata, NextPage } from "next";
import { Icon } from "@/components/ui/icon";
import { Page, PageContent, PageHeading } from "@/components/ui/page";
import { RichText } from "@/components/ui/rich-text";
import { Stat, StatDescription, StatFigure, Stats, StatTitle } from "@/components/ui/stat";
import { getPageMetadata } from "@/helper/get-page-metadata";
import { fetchGql } from "@/lib/client";
import { GET_HOME_PAGE } from "@/queries/get-home-page-query";
import type { GetHomePageQueryResult } from "@/types/pages";

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
        <div className="mb-4 rounded-xl bg-base-300 p-4">
          <RichText
            document={pageData.description.json}
            paragraphClass="py-1.5 text-center lg:text-xl"
          />
        </div>
        <div className="my-2 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2">
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
