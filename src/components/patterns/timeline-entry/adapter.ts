import type { IconProps } from "@/components/elements/icon/types";
import type { TimelineEntryMetaRow, TimelineEntryProps } from "./types";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Future: replace input type with Contentful SDK auto-generated JobExperience type.
 */
export function adaptTimelineEntry(input: {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  workedRemotely: boolean;
  currentlyWorking: boolean;
  companyIcon: IconProps;
  locationIcon: IconProps;
  durationIcon: IconProps;
  roleIcon: IconProps;
  techStackIcon: IconProps;
  techStack: { skillIconsCollection: { items: Array<{ name?: string }> } };
  body: import("react").ReactNode;
}): TimelineEntryProps {
  const remoteLabel = input.workedRemotely ? " - Remote" : "";
  const duration = `${formatDate(input.startDate)} - ${
    input.currentlyWorking ? "Present" : formatDate(input.endDate)
  }`;
  const techNames = input.techStack.skillIconsCollection.items
    .map((i) => i.name)
    .join(", ");

  const metaRows: TimelineEntryMetaRow[] = [
    { icon: input.locationIcon, text: `${input.location}${remoteLabel}` },
    { icon: input.durationIcon, text: duration },
    { icon: input.roleIcon, text: input.position },
    { icon: input.techStackIcon, text: techNames },
  ];

  return {
    title: input.company,
    indicatorIcon: input.companyIcon,
    metaRows,
    body: input.body,
  };
}
