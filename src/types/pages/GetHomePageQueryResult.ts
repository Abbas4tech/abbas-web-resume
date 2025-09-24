import { Document } from "@contentful/rich-text-types";
import { Collection, Page } from "../common";
import { BioCard } from "../entries";

type HomePageQueryResult = Page<{
  infoCollection: Collection<BioCard>;
  description: {
    json: Document;
  };
}>;

export default HomePageQueryResult;
