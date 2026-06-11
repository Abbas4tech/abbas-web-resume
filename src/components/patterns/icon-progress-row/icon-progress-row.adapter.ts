import type { IconProgressRowProps } from "./icon-progress-row";

/**
 * Future: replace input with Contentful SDK auto-generated SkillArray type.
 */
export function adaptIconProgressRow(input: {
  skillProgress: number;
}): Pick<IconProgressRowProps, "progress"> {
  return { progress: input.skillProgress };
}
