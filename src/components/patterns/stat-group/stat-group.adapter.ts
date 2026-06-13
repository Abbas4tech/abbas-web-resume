import type { StatGroupProps } from "./stat-group";

/**
 * Future: replace input type with Contentful SDK auto-generated Info type.
 */
export function adaptStatGroup(input: {
  title: string;
  value: string;
  icon: {
    iconCode?: string;
    classes?: string[];
    showTooltip?: boolean;
    name?: string;
  };
}): StatGroupProps {
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
