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
  | "ai"
  | "bi"
  | "bs"
  | "cg"
  | "ci"
  | "di"
  | "fa"
  | "fa6"
  | "fc"
  | "fi"
  | "gi"
  | "go"
  | "gr"
  | "hi"
  | "hi2"
  | "im"
  | "io"
  | "io5"
  | "lia"
  | "lib"
  | "lu"
  | "md"
  | "pi"
  | "ri"
  | "rx"
  | "si"
  | "sl"
  | "tb"
  | "tfi"
  | "ti"
  | "vsc"
  | "wi";
