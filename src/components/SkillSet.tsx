import React from "react";
import { Entry } from "contentful";
import SVGIcon from "@components/SVGIcon";
import { SkillGroup, SkillSet } from "@utils/contentful";
import SkillGroupItem from "@components/SkillGroup";

const SkillSetItem = ({ fields }: Entry<SkillSet>) => {
  return (
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
  );
};

export default SkillSetItem;
