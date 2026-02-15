import React from "react";
import Link from "next/link";

import { ProjectsPageDataFragment } from "@/gql/sdk";
import { projectsPageDataAdapter } from "@/gql/adapters/data/projects-page-data.adapter";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "../ui/card";
import { Icon } from "../ui/icon";

interface ProjectsPageDataSectionProps {
  data: ProjectsPageDataFragment;
}

const ProjectsPageDataSection = ({
  data,
}: ProjectsPageDataSectionProps): React.JSX.Element => {
  const content = projectsPageDataAdapter(data);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {content.projects.map((item) => (
        <Card key={item.id}>
          <CardImage
            className="hidden md:block"
            loading="lazy"
            width={item.thumbnail.width}
            height={item.thumbnail.height}
            alt={item.thumbnail.fileName}
            src={item.thumbnail.url}
          />
          <CardContent className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
            <CardDescription className="text-xs md:text-base">
              {item.description}
            </CardDescription>
            <CardFooter className="justify-end">
              <Link target="_blank" href={item.deployedLink}>
                <Icon {...item.deployedLinkIcon} />
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsPageDataSection;
