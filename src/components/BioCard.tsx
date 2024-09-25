import React, { memo } from "react";
import SVGIcon from "./SVGIcon";
import { BioCard } from "@utils/contentful";

const BioCardComp = memo(({ title, value, identifier }: BioCard) => {
  BioCardComp.displayName = "BioCard";
  return (
    <div className="flex justify-center rounded-xl">
      <div className="w-full shadow stats bg-base-300">
        <div className="p-2 md:p-4 stat">
          <div className="stat-figure">
            <SVGIcon classes={"block w-6 h-6 sm:w-8 sm:h-8 xl:block lg:hidden"} icon={identifier} />
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
