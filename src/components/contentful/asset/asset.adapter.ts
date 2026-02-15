import { AssetFragment, Maybe } from "@/gql/sdk";

export interface AdaptedAsset {
  url: string;
  width: number;
  height: number;
  fileName: string;
  title: string;
  description: string;
}

export const assetAdapter = (props?: Maybe<AssetFragment>): AdaptedAsset => ({
  url: props?.url ?? "",
  width: props?.width ?? 0,
  height: props?.height ?? 0,
  fileName: props?.fileName ?? "",
  title: props?.title ?? "",
  description: props?.description ?? "",
});
