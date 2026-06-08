import type { Metadata, NextPage } from "next";
import ExperienceCard from "@/components/ExperienceCard";
import { Icon } from "@/components/ui/icon";
import { Page, PageContent, PageHeading } from "@/components/ui/page";
import { getPageMetadata } from "@/helper/getPageMetadata";
import { fetchGql } from "@/lib/client";
import { GET_EXPERIENCE_PAGE } from "@/queries/getExperiencePageQuery";
import type { GetExperiencePageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY as string);

export const revalidate = 60;

const ExperiencePage: NextPage = async () => {
  const data = await fetchGql<GetExperiencePageQueryResult>(
    GET_EXPERIENCE_PAGE,
    {
      id: process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY as string,
    }
  );
  const {
    title,
    headingAnimation,
    contentAnimation,
    pageIcon,
    pageData: { experiencesCollection },
  } = data.page;

  return (
    <Page>
      <PageHeading data-aos={headingAnimation}>
        <Icon {...pageIcon} />
        {title}
      </PageHeading>
      <PageContent
        className="mt-2 px-2 pl-4 md:mt-4 md:px-12"
        data-aos={contentAnimation}
      >
        {experiencesCollection.items.map((experience, index: number) => (
          <ExperienceCard {...experience} key={index} />
        ))}
      </PageContent>
    </Page>
  );
};

export default ExperiencePage;
