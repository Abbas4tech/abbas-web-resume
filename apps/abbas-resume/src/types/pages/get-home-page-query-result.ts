import type { Document } from "@contentful/rich-text-types";

import type { Collection, Page } from "../common";
import type { BioCard } from "../entries";

type HomePageQueryResult = Page<{
  infoCollection: Collection<BioCard>;
  description: {
    json: Document;
  };
}>;

export default HomePageQueryResult;
