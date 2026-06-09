export type IconLibrary = "fa" | "fa6" | "io" | "io5" | "md" | "ri" | "si";

/** Plain props contract for the Icon element. No Contentful types. */
export interface IconProps {
  /** Extra CSS classes passed to the inner icon component */
  classes?: string[];
  /** Format: "library/IconName" e.g. "io5/IoMenu" */
  iconCode?: string;
  /** Accessible name / tooltip text */
  name?: string;
  /** Whether to show a tooltip on hover */
  showTooltip?: boolean;
}
