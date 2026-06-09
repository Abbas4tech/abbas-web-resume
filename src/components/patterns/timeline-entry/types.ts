import type { ReactNode } from "react";
import type { IconProps } from "@/components/elements/icon/types";

export interface TimelineEntryMetaRow {
  icon: IconProps;
  text: string;
}

export interface TimelineEntryProps {
  body: ReactNode;
  indicatorIcon: IconProps;
  metaRows: TimelineEntryMetaRow[];
  title: string;
}
