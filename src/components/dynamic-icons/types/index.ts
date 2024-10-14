import { IconType } from "react-icons";

export interface IconProps {
  iconCode: string;
  classes?: string[];
  showTooltip?: boolean;
  name?: string;
}

/**
 * Interface representing the structure of the dynamically imported icon modules.
 * It includes both named exports (actual icons) and an optional default export.
 */
export interface IconModule {
  [key: string]: IconType | any;
  default?: any; // Allow for a default export if present
}

/**
 * Enum representing all supported icon libraries from react-icons.
 */
export type IconLibrary =
  | "fa"
  | "fa6"
  | "io"
  | "io5"
  | "md"
  | "ri"
  | "si";
