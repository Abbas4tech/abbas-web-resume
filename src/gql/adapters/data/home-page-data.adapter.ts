import { Document } from "@contentful/rich-text-types";

import { HomePageDataFragment, Maybe } from "@/gql/sdk";

import {
  bioCardAdapter,
  type AdaptedBioCard,
  type BioCardItemType,
} from "../content/biocard.adapter";

export interface AdaptedHomePageData {
  id: string;
  title: string;
  description: Document;
  infoCollection: AdaptedBioCard[];
}

export const homePageDataAdapter = (
  props?: Maybe<HomePageDataFragment>,
): AdaptedHomePageData => ({
  id: props?._id ?? "",
  title: props?.title ?? "",
  description: (props?.description?.json as Document) ?? ({} as Document),
  infoCollection:
    props?.infoCollection?.items
      ?.filter((e): e is NonNullable<typeof e> => !!e)
      ?.map((item) => bioCardAdapter(item as BioCardItemType)) ?? [],
});
