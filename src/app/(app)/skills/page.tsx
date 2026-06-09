import type { Metadata, NextPage } from "next";
import { PageWrapper } from "@/components/blocks/page-wrapper";
import { adaptPageWrapper } from "@/components/blocks/page-wrapper/adapter";
import { PanelShowcase } from "@/components/blocks/panel-showcase";
import { adaptPanelShowcase } from "@/components/blocks/panel-showcase/adapter";
import { Icon } from "@/components/elements/icon";
import { SectionHeading } from "@/components/patterns/section-heading";
import { adaptSectionHeading } from "@/components/patterns/section-heading/adapter";

import { getPageMetadata } from "@/helper/get-page-metadata";
import { fetchGql } from "@/lib/client";
import { GET_METAPAGES } from "@/queries/get-metapages";
import { GET_SKILLS_PAGE } from "@/queries/get-skills-page-query";
import type { AppData } from "@/types/entries";
import type { GetSkillsPageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_SKILLS_PAGE_KEY as string);

export const revalidate = 60;

const SkillsPage: NextPage = async () => {
  const [data, metaData] = await Promise.all([
    fetchGql<GetSkillsPageQueryResult>(GET_SKILLS_PAGE, {
      id: process.env.CONTENTFUL_SKILLS_PAGE_KEY as string,
    }),
    fetchGql<{ userInfo: Pick<AppData, "pagesCollection"> }>(GET_METAPAGES, {
      id: process.env.CONTENTFUL_APPLICATION_DATA_ID,
    }),
  ]);

  const { title, contentAnimation, headingAnimation, pageData, pageIcon } =
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
      <PanelShowcase {...adaptPanelShowcase({ contentAnimation, pageData })} />
    </PageWrapper>
  );
};

export default SkillsPage;
