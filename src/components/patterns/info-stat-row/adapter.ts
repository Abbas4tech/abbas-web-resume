import type { InfoStatRowProps } from "./types";

/**
 * Future: replace input type with Contentful SDK auto-generated Info type.
 */
export function adaptInfoStatRow(input: {
  title: string;
  value: string;
  icon: {
    iconCode?: string;
    classes?: string[];
    showTooltip?: boolean;
    name?: string;
  };
}): InfoStatRowProps {
  return {
    label: input.title,
    value: input.value,
    icon: {
      iconCode: input.icon.iconCode,
      classes: input.icon.classes,
      showTooltip: input.icon.showTooltip,
      name: input.icon.name,
    },
  };
}
