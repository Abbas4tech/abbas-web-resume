import { IconFragment, Maybe } from "@/gql/sdk";

export interface AdaptedIcon {
  id: string;
  classes: string[];
  showTooltip: boolean;
  iconCode: string;
  name: string;
}

export const iconAdapter = (props?: Maybe<IconFragment>): AdaptedIcon => ({
  id: props?._id ?? "",
  classes: props?.classes?.filter((e): e is NonNullable<typeof e> => !!e) ?? [],
  showTooltip: Boolean(props?.showTooltip),
  iconCode: props?.iconCode ?? "md/MdError",
  name: props?.name ?? "Tooltip",
});
