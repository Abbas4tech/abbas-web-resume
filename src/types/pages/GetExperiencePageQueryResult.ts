import { Document } from "@contentful/rich-text-types";

import { Collection, Icon, Page } from "../common";

type ExperincePageQueryResult = Page<{
  experiencesCollection: Collection<{
    company: string;
    companyIcon: Icon;
    description: {
      json: Document;
    };
    position: string;
    roleIcon: Icon;
    workedRemotely: boolean;
    startDate: string;
    endDate: string;
    durationIcon: Icon;
    location: string;
    locationIcon: Icon;
    currentlyWorking: boolean;
    techStack: {
      title: string;
      skillProgress: number;
      skillIconsCollection: Collection<Pick<Icon, "name">>;
    };
    techStackIcon: Icon;
  }>;
}>;

export default ExperincePageQueryResult;
