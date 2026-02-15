import React from "react";

import { HomePageDataFragment } from "@/gql/sdk";
import { homePageDataAdapter } from "@/components/contentful/home-page-section/home-page-data.adapter";

import {
  Stat,
  StatFigure,
  Stats,
  StatTitle,
  StatDescription,
} from "../../ui/stat";
import { RichText } from "../../RichText";
import { Icon } from "../icon/icon";

interface HomePageDataSectionProps {
  data: HomePageDataFragment;
}

const HomePageDataSection = ({
  data,
}: HomePageDataSectionProps): React.JSX.Element => {
  const content = homePageDataAdapter(data);
  return (
    <>
      <div className="bg-base-300 p-4 mb-4 rounded-xl">
        <RichText
          paragraphClass="py-1.5 text-center lg:text-xl"
          document={content.description}
        />
      </div>
      <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
        {content.infoCollection.map(({ title, value, icon }) => (
          <Stats key={title}>
            <Stat>
              <StatFigure>
                <Icon {...icon} />
              </StatFigure>
              <StatTitle>{title}</StatTitle>
              <StatDescription>{value}</StatDescription>
            </Stat>
          </Stats>
        ))}
      </div>
    </>
  );
};

export default HomePageDataSection;
