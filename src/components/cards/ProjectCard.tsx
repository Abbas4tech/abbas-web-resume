import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@lib/contentful";
import { DynamicIcon } from "@components";

const ProjectCardComp: React.FC<ProjectCard> = ({
  title,
  thumbnail,
  deployedLink,
  description,
  deployedLinkIcon,
}: ProjectCard) => {
  return (
    <>
      <div
        key={title}
        className="hover:before:!bg-slate-900 before:!bg-transparent card image-full before:transition-colors before:ease-in-out before:duration-500"
      >
        <figure>
          <Image
            src={`https:${thumbnail.file.url}`}
            width={thumbnail.file.details.image.width}
            height={thumbnail.file.details.image.height}
            alt={thumbnail.file.fileName}
          />
        </figure>
        <div className="card-body p-4 md:p-6 opacity-0 hover:opacity-100">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <Link target="_blank" href={deployedLink}>
              <DynamicIcon {...deployedLinkIcon} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCardComp;
