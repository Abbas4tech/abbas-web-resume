import { Icon } from "@abbas-web-resume/ui/components/icon";
import { PageContent, PageHeading } from "@abbas-web-resume/ui/components/page";
import type { Metadata, NextPage } from "next";
import ExperienceCard from "@/components/experience-card";
import { Page } from "@/components/page";
import { getPageMetadata } from "@/helper/get-page-metadata";
import { fetchGql } from "@/lib/client";
import { GET_EXPERIENCE_PAGE } from "@/queries/get-experience-page-query";
import type { GetExperiencePageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY as string);

export const revalidate = 60;

const ExperiencePage: NextPage = async () => {
  const data = await fetchGql<GetExperiencePageQueryResult>(GET_EXPERIENCE_PAGE, {
    id: process.env.CONTENTFUL_EXPERIENCE_PAGE_KEY as string,
  });
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
      <PageContent className="mt-2 px-2 pl-4 md:mt-4 md:px-12" data-aos={contentAnimation}>
        {experiencesCollection.items.map((experience, index: number) => (
          <ExperienceCard {...experience} key={`${index}+${experience.company}`} />
        ))}
      </PageContent>
    </Page>
  );
};

export default ExperiencePage;
