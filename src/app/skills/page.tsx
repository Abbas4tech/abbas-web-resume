"use client";
import React, { FC } from "react";
import { Entry, EntrySkeletonType } from "contentful"; // Use Entry and EntrySkeletonType from Contentful SDK
import { fetchAboutUsPage } from "@utils/api";
import SVGIcon from "@components/SVGIcon";

// Define skeletons for Contentful types
type TechnologyFields = EntrySkeletonType & {
  fields: {
    title: string;
    identifier: string;
    skillsArray: Entry<SkillFields>[];
  };
};

type SkillFields = EntrySkeletonType & {
  fields: {
    title: string;
    skills: string[];
    skillProgress: number;
  };
};

// Define the AboutUs data type with nested fields
type AboutUsData = EntrySkeletonType & {
  fields: {
    title: string;
    technologies: Entry<TechnologyFields>[];
  };
};

// Type guard to ensure data conforms to AboutUsData
const isAboutUsData = (data: any): data is AboutUsData =>
  data &&
  typeof data.fields?.title === "string" &&
  Array.isArray(data.fields?.technologies);

// Fetch the Contentful data and return the structured fields
const fetchData = async (): Promise<AboutUsData | null> => {
  try {
    const res = await fetchAboutUsPage();
    const fetchedData = res[0].items[0] as AboutUsData;

    // Type guard to validate the data structure
    if (isAboutUsData(fetchedData)) {
      return fetchedData;
    }

    console.error("Invalid data structure", fetchedData);
    return null;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

// Component to render the technologies section
const Technologies: FC = React.memo(() => {
  const [data, setData] = React.useState<AboutUsData | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    loadData();
  }, []);

  if (!data) return null;

  return (
    <>
      <div className="container overflow-auto mb-5">
        <h1
          data-aos="fade-down"
          className="flex items-center justify-center gap-2 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl aos-init aos-animate"
        >
          <span className="inline-block mr-2">
            <SVGIcon classes="" icon={data.fields.title} />
          </span>
          {data.fields.title}
        </h1>
        <div className="flex flex-col gap-4" data-aos="fade-up">
          {data.fields.technologies.map(({ fields }) => (
            <div
              key={fields?.title || ""}
              className="mockup-window bg-base-300 border-neutral border"
            >
              <div className="p-4 bg-base-200">
                <div className="flex items-center mb-4 text-xl font-bold md:text-3xl">
                  <SVGIcon icon={fields?.identifier || ""} classes={""} />
                  <h1 className="flex ml-4">{fields?.title || ""}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {fields?.skillsArray?.map(({ fields }) => (
                    <div
                      key={fields.title}
                      className="grid items-center grid-cols-2 p-1 py-4 md:p-4 md:px-4 lg:px-5"
                    >
                      <div className="flex gap-4 text-xl md:text-4xl">
                        {fields.skills.map((icon: string) => (
                          <div
                            key={icon}
                            className="tooltip tooltip-primary"
                            data-tip={icon}
                          >
                            <SVGIcon classes="" icon={icon} />
                          </div>
                        ))}
                      </div>
                      <div className="relative w-full h-1 bg-gray-600 rounded-2xl">
                        <div
                          className="absolute top-0 left-0 bg-warning rounded-2xl h-full"
                          style={{ width: `${fields.skillProgress}%` }}
                        >
                          <span className="absolute px-1 py-1 mb-2 text-xs text-white rounded-sm bg-slate-900 -right-4 bottom-full animate-pulse">
                            {fields.skillProgress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default Technologies;
