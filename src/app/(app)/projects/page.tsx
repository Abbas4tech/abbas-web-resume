import type { Metadata, NextPage } from "next";
import { CardGallery } from "@/components/blocks/card-gallery";
import { adaptCardGallery } from "@/components/blocks/card-gallery/adapter";
import { PageWrapper } from "@/components/blocks/page-wrapper";
import { adaptPageWrapper } from "@/components/blocks/page-wrapper/adapter";
import { Icon } from "@/components/elements/icon";
import { SectionHeading } from "@/components/patterns/section-heading";
import { adaptSectionHeading } from "@/components/patterns/section-heading/adapter";

import { getPageMetadata } from "@/helper/get-page-metadata";
import { fetchGql } from "@/lib/client";
import { GET_METAPAGES } from "@/queries/get-metapages";
import { GET_PROJECTS_PAGE } from "@/queries/get-projects-page-query";
import type { AppData } from "@/types/entries";
import type { GetProjectsPageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_PROJECTS_PAGE_KEY as string);

export const revalidate = 60;

const ProjectsPage: NextPage = async () => {
  const [data, metaData] = await Promise.all([
    fetchGql<GetProjectsPageQueryResult>(GET_PROJECTS_PAGE, {
      id: process.env.CONTENTFUL_PROJECTS_PAGE_KEY,
    }),
    fetchGql<{ userInfo: Pick<AppData, "pagesCollection"> }>(GET_METAPAGES, {
      id: process.env.CONTENTFUL_APPLICATION_DATA_ID,
    }),
  ]);

  const { title, contentAnimation, headingAnimation, pageIcon, pageData } =
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
      <CardGallery {...adaptCardGallery({ contentAnimation, pageData })} />
    </PageWrapper>
  );
};

export default ProjectsPage;
