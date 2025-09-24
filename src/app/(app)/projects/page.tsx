import React from "react";
import { Metadata, NextPage } from "next";
import Link from "next/link";

import { Page, PageContent, PageHeading } from "@/components/ui/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { getPageMetadata } from "@/helper/getPageMetadata";
import { fetchGql } from "@/lib/client";
import { GET_PROJECTS_PAGE } from "@/queries/getProjectsPageQuery";
import { ProjectsPage as ProjectsPageQueryResponse } from "@/types/generic";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_PROJECTS_PAGE_KEY!);

export const revalidate = 60;

const ProjectsPage: NextPage = async () => {
  const data = await fetchGql<ProjectsPageQueryResponse>(GET_PROJECTS_PAGE, {
    id: process.env.CONTENTFUL_PROJECTS_PAGE_KEY,
  });

  const { title, contentAnimation, headingAnimation, pageIcon, pageData } =
    data.page;

  return (
    <Page>
      <PageHeading data-aos={headingAnimation}>
        <Icon {...pageIcon} />
        {title}
      </PageHeading>
      <PageContent
        className="grid grid-cols-1 sm:grid-cols-2 my-2 rounded-xl gap-4"
        data-aos={contentAnimation}
      >
        {pageData.projectsCollection.items.map((item, index: number) => (
          <Card key={index}>
            <CardImage
              width={item.thumbnail.width}
              height={item.thumbnail.height}
              alt={item.thumbnail.fileName}
              src={item.thumbnail.url}
            ></CardImage>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <CardFooter className="justify-end">
                <Link target="_blank" href={item.deployedLink}>
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
