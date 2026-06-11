export type IconLibrary =
  | "fa"
  | "fa6"
  | "io"
  | "io5"
  | "md"
  | "ri"
  | "si"
  | "pi";

/** Plain props contract for the Icon element. No Contentful types. */
export interface IconProps {
  /** Extra CSS classes passed to the inner icon component */
  classes?: string[];
  /** Hex color string e.g., '#000' */
  color?: string;
  /** Format: "library/IconName" e.g. "io5/IoMenu" (legacy fallback) */
  iconCode?: string;
  /** The icon name e.g., 'PiFlagBannerFill' */
  iconName?: string;
  /** The icon library e.g., 'pi' */
  library?: string;
  /** Accessible name / tooltip text */
  name?: string;
  /** Whether to show a tooltip on hover */
  showTooltip?: boolean;
  size?: string;
}
