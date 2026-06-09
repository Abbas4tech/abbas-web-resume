import type { Metadata, NextPage } from "next";
import { PageWrapper } from "@/components/blocks/page-wrapper";
import { adaptPageWrapper } from "@/components/blocks/page-wrapper/adapter";
import { TimelineSection } from "@/components/blocks/timeline-section";
import { adaptTimelineSection } from "@/components/blocks/timeline-section/adapter";
import { Icon } from "@/components/elements/icon";
import { SectionHeading } from "@/components/patterns/section-heading";
import { adaptSectionHeading } from "@/components/patterns/section-heading/adapter";

import { getPageMetadata } from "@/helper/get-page-metadata";
import { fetchGql } from "@/lib/client";
import { GET_EXPERIENCE_PAGE } from "@/queries/get-experience-page-query";
import { GET_METAPAGES } from "@/queries/get-metapages";
import type { AppData } from "@/types/entries";
import type { GetExperiencePageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY as string);

export const revalidate = 60;

const ExperiencePage: NextPage = async () => {
  const [data, metaData] = await Promise.all([
    fetchGql<GetExperiencePageQueryResult>(GET_EXPERIENCE_PAGE, {
      id: process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY as string,
    }),
    fetchGql<{ userInfo: Pick<AppData, "pagesCollection"> }>(GET_METAPAGES, {
      id: process.env.CONTENTFUL_APPLICATION_DATA_ID,
    }),
  ]);

  const { title, headingAnimation, contentAnimation, pageIcon, pageData } =
    data.page;

  return (
    <PageWrapper
      {...adaptPageWrapper({
        pagesCollection: metaData.userInfo.pagesCollection,
        children: null,
      })}
    >
      <SectionHeading
        data-aos={headingAnimation}
        icon={<Icon {...pageIcon} />}
        {...adaptSectionHeading({ title })}
      />
      <TimelineSection
        {...adaptTimelineSection({ contentAnimation, pageData })}
      />
    </PageWrapper>
  );
};

export default ExperiencePage;
