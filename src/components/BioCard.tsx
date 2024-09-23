import React, { memo } from "react";
import SVGIcon from "./SVGIcon";

interface BioCardProps {
  title: string;
  value: string;
  identifier: string;
}

const BioCard = memo(({ title, value, identifier }: BioCardProps) => {
  BioCard.displayName = "BioCard";
  return (
    <div className="flex justify-center rounded-xl">
      <div className="w-full shadow stats bg-base-300">
        <div className="p-2 md:p-4 stat">
          <div className="stat-figure">
            <SVGIcon classes={"w-8 h-8"} icon={identifier} />
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

export default BioCard;
