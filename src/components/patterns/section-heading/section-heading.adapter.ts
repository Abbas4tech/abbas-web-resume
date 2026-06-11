import type { SectionHeadingProps } from "./section-heading";

/** Passthrough — callers pass icon and title as React props directly */
export function adaptSectionHeading(input: {
  title: string;
}): Pick<SectionHeadingProps, "children"> {
  return { children: input.title };
}
