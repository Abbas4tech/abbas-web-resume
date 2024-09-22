"use client";
import { fetchProjectsPage } from "@utils/api";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const projects = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchInfo = async () => {
      const res = await fetchProjectsPage();
      console.log(res);
      setData(res);
    };
    fetchInfo();
  }, []);

  if (!data) return <div>...Loading</div>;

  return (
    <div>
      <div
        data-aos="fade-up"
        className="columns-1 md:columns-2 my-2 rounded-xl gap-4"
      >
        {data.projects.map(({ fields }) => (
          <div
            key={fields.title}
            className="hover:before:!bg-slate-900 before:!bg-transparent card image-full before:transition-colors before:ease-in-out before:duration-500"
          >
            <figure>
              <Image
                src={`https:${fields.thumbnail.fields.file.url}`}
                width={fields.thumbnail.fields.file.details.image.width}
                height={fields.thumbnail.fields.file.details.image.height}
                alt={fields.thumbnail.fields.file.fileName}
              />
            </figure>
            <div className="card-body p-4 md:p-6 opacity-0 hover:opacity-100">
              <h2 className="card-title">{fields.title}</h2>
              <p>{fields.description}</p>
              <div className="card-actions justify-end">
                <Link target="_blank" href={fields.deployedLink}>
                  <FaExternalLinkAlt className="w-6 h-6 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default projects;
