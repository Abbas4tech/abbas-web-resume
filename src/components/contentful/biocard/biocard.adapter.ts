import { BioCard, IconFragment, Maybe } from "@/gql/sdk";

import { iconAdapter, AdaptedIcon } from "../icon/icon.adapter";

export interface AdaptedBioCard {
  __typename: string;
  value: string;
  title: string;
  icon: AdaptedIcon;
}

export type BioCardItemType = Omit<BioCard, "_id">;

export const bioCardAdapter = (
  props: Maybe<BioCardItemType>,
): AdaptedBioCard => ({
  __typename: props?.__typename ?? "",
  value: props?.value ?? "",
  title: props?.title ?? "",
  icon: iconAdapter(props?.icon as IconFragment),
});
