import React from "react";
import { Metadata, NextPage } from "next";
import { ProjectsPage as ProjectsPageSchema } from "@lib/contentful";
import { DynamicIcon } from "@components";
import { fetchPageMetadata, fetchQuery } from "@lib/api";
import { Page, PageContent, PageHeading } from "src/components/ui/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "src/components/ui/card";
import Link from "next/link";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<ProjectsPageSchema>(
    process.env.CONTENTFUL_PROJECTS_PAGE_KEY!
  );
};

const ProjectsPage: NextPage = async () => {
  const {
    title,
    pageIcon,
    headingAnimation,
    contentAnimation,
    pageData: { projects },
  } = await fetchQuery<ProjectsPageSchema>(
    process.env.CONTENTFUL_PROJECTS_PAGE_KEY!
  );

  return (
    <Page>
      <PageHeading headingAnimation={headingAnimation}>
        <DynamicIcon {...pageIcon} />

        {title}
      </PageHeading>
      <PageContent
        className="grid grid-cols-1 sm:grid-cols-2 my-2 rounded-xl gap-4"
        contentAnimation={contentAnimation}
      >
        {projects.map((item, index: number) => (
          <Card key={index}>
            <CardImage
              width={item.thumbnail.file.details.image.width}
              height={item.thumbnail.file.details.image.height}
              alt={item.thumbnail.file.fileName}
              src={`https:${item.thumbnail.file.url}`}
            ></CardImage>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <CardFooter className="justify-end">
                <Link target="_blank" href={item.deployedLink}>
                  <DynamicIcon {...item.deployedLinkIcon} />
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
