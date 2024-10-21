import { IconType } from "react-icons";

export interface IconModule {
  [key: string]: IconType | any;
  default?: any;
}

export type IconLibrary = "fa" | "fa6" | "io" | "io5" | "md" | "ri" | "si";
