import React, { memo } from "react";
import { BioCard } from "@utils/contentful";
import DynamicIcons from "./DynamicIcon";

const BioCardComp = memo(({ title, value, icon }: BioCard) => {
  BioCardComp.displayName = "BioCard";
  return (
    <div className="flex justify-center rounded-xl">
      <div className="w-full shadow stats bg-base-300">
        <div className="p-2 md:p-4 stat">
          <div className="stat-figure">
            <DynamicIcons {...icon} />
          </div>
          <div className="stat-title">{title}</div>
          <div className="text-lg font-normal md:font-semibold lg:text-xl xl:text-2xl stat-value">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
});

export default BioCardComp;
