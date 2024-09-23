"use client";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useUserInfo } from "@context/useInfo";
import { ProjectCard } from "@utils/contentful";

const projects = () => {
  const { projects } = useUserInfo();
  console.log(projects);
  if (!projects) return <div>No Data found</div>;
  return (
    <div>
      <div
        data-aos="fade-up"
        className="columns-1 md:columns-2 my-2 rounded-xl gap-4"
      >
        {projects.map(
          ({ title, deployedLink, description, thumbnail }: ProjectCard) => (
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
                  <Link target="_blank" href={deployedLink || ""}>
                    <FaExternalLinkAlt className="w-6 h-6 cursor-pointer" />
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default projects;
