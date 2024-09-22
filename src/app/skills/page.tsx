import React, { FC } from "react";
import { Entry } from "contentful";
import { fetchSkillsPage } from "@utils/api";
import SVGIcon from "@components/SVGIcon";
import { SkillGroup, SkillSet } from "@utils/contentful";
import SkillGroupItem from "@components/SkillGroup";

const Skills: FC = async () => {
  const { fields } = await fetchSkillsPage();
  const technologies = fields.technologies as Entry<SkillSet>[];

  return (
    <>
      <div className="container overflow-auto mb-5">
        <h1
          data-aos="fade-down"
          className="flex items-center justify-center gap-2 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl aos-init aos-animate"
        >
          <span className="inline-block mr-2">
            <SVGIcon classes="" icon={fields.title as string} />
          </span>
          {fields.title as string}
        </h1>
        <div className="flex flex-col gap-4" data-aos="fade-up">
          {technologies.map(({ fields }: Entry<SkillSet>) => (
            <div
              key={fields.title as string}
              className="mockup-window bg-base-300 border-neutral border"
            >
              <div className="p-4 bg-base-200">
                <div className="flex items-center mb-4 text-xl font-bold md:text-3xl">
                  <SVGIcon icon={fields.identifier as string} />
                  <h1 className="flex ml-4">{fields.title as string}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {(fields.skillsArray as Entry<SkillGroup>[]).map(
                    ({ fields }: Entry<SkillGroup>) => (
                      <SkillGroupItem
                        key={fields.title as string}
                        title={fields.title as string}
                        fields={fields}
                        skillProgress={fields.skillProgress as number}
                        skills={fields.skills as string[]}
                        contentTypeId={fields.contentTypeId as string}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
