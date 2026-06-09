import type { Metadata, NextPage } from "next";
import { BioSection } from "@/components/blocks/bio-section";
import { adaptBioSection } from "@/components/blocks/bio-section/adapter";
import { PageWrapper } from "@/components/blocks/page-wrapper";
import { adaptPageWrapper } from "@/components/blocks/page-wrapper/adapter";
import { SectionHeading } from "@/components/patterns/section-heading";
import { adaptSectionHeading } from "@/components/patterns/section-heading/adapter";

import { getPageMetadata } from "@/helper/get-page-metadata";
import { fetchGql } from "@/lib/client";
import { GET_HOME_PAGE } from "@/queries/get-home-page-query";
import { GET_METAPAGES } from "@/queries/get-metapages";
import type { AppData } from "@/types/entries";
import type { GetHomePageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_HOME_PAGE_KEY as string);

export const revalidate = 60;

const Home: NextPage = async () => {
  const [data, metaData] = await Promise.all([
    fetchGql<GetHomePageQueryResult>(GET_HOME_PAGE, {
      id: process.env.CONTENTFUL_HOME_PAGE_KEY as string,
    }),
    fetchGql<{ userInfo: Pick<AppData, "pagesCollection"> }>(GET_METAPAGES, {
      id: process.env.CONTENTFUL_APPLICATION_DATA_ID,
    }),
  ]);

  const { title, contentAnimation, headingAnimation, pageData } = data.page;

  return (
    <PageWrapper
      {...adaptPageWrapper({
        pagesCollection: metaData.userInfo.pagesCollection,
        children: null,
      })}
    >
      <SectionHeading
        data-aos={headingAnimation}
        {...adaptSectionHeading({ title })}
      />
      <BioSection {...adaptBioSection({ contentAnimation, pageData })} />
    </PageWrapper>
  );
};

export default Home;
