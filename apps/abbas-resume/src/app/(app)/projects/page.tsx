import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@abbas-web-resume/ui/components/card";
import { Icon } from "@abbas-web-resume/ui/components/icon";
import type { Metadata, NextPage } from "next";
import Link from "next/link";
import { Page, PageContent, PageHeading } from "@/components/Page";
import { getPageMetadata } from "@/helper/getPageMetadata";
import { fetchGql } from "@/lib/client";
import { GET_PROJECTS_PAGE } from "@/queries/getProjectsPageQuery";
import type { GetProjectsPageQueryResult } from "@/types/pages";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_PROJECTS_PAGE_KEY as string);

export const revalidate = 60;

const ProjectsPage: NextPage = async () => {
  const data = await fetchGql<GetProjectsPageQueryResult>(GET_PROJECTS_PAGE, {
    id: process.env.CONTENTFUL_PROJECTS_PAGE_KEY,
  });

  const { title, contentAnimation, headingAnimation, pageIcon, pageData } = data.page;

  return (
    <Page>
      <PageHeading data-aos={headingAnimation}>
        <Icon {...pageIcon} />
        {title}
      </PageHeading>
      <PageContent
        className="my-2 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2"
        data-aos={contentAnimation}
      >
        {pageData.projectsCollection.items.map((item, index: number) => (
          <Card key={index}>
            <CardImage
              alt={item.thumbnail.fileName}
              className="hidden md:block"
              height={item.thumbnail.height}
              loading="lazy"
              src={item.thumbnail.url}
              width={item.thumbnail.width}
            />
            <CardContent className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
              <CardDescription className="text-xs md:text-base">{item.description}</CardDescription>
              <CardFooter className="justify-end">
                <Link href={item.deployedLink} target="_blank">
                  <Icon {...item.deployedLinkIcon} />
                </Link>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </PageContent>
    </Page>
  );
};

export default ProjectsPage;
