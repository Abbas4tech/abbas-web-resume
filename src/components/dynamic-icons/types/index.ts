import { IconType } from "react-icons";

export interface IconProps {
  iconCode: string;
  classes?: string[];
  showTooltip?: boolean;
  name?: string;
}

export interface IconModule {
  [key: string]: IconType | any;
  default?: any;
}

export type IconLibrary = "fa" | "fa6" | "io" | "io5" | "md" | "ri" | "si";
