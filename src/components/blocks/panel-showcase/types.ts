import type { HTMLAttributes } from "react";
import type { IconProps } from "@/components/elements/icon/types";
import type { IconProgressRowProps } from "@/components/patterns/icon-progress-row/types";

export interface PanelShowcaseRow
  extends Pick<IconProgressRowProps, "progress"> {
  icons: IconProps[];
}

export interface PanelShowcasePanel {
  headingIcon: IconProps;
  rows: PanelShowcaseRow[];
  title: string;
}

export interface PanelShowcaseProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  panels: PanelShowcasePanel[];
}
