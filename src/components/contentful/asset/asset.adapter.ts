import { AssetFragment } from "@/gql/sdk";

export interface AdaptedAsset {
  url: string;
  width: number;
  height: number;
  fileName: string;
  title: string;
  description: string;
}

export const assetAdapter = (
  props?:
    | AssetFragment
    | {
        description?: string | null;
        fileName?: string | null;
        title?: string | null;
        url?: string | null;
        width?: number | null;
        height?: number | null;
      }
    | null,
): AdaptedAsset => ({
  url: props?.url ?? "",
  width: props?.width ?? 0,
  height: props?.height ?? 0,
  fileName: props?.fileName ?? "",
  title: props?.title ?? "",
  description: props?.description ?? "",
});
