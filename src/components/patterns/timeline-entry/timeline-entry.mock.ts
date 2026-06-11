import React from "react";
import type { TimelineEntryProps } from "./timeline-entry";

export const baseMock: TimelineEntryProps = {
  title: "Senior Software Engineer",
  indicatorIcon: { iconCode: "md/MdWork", name: "Work" },
  metaRows: [
    { text: "Acme Corp", icon: { iconCode: "md/MdBusiness", name: "Company" } },
    {
      text: "2020 - Present",
      icon: { iconCode: "md/MdDateRange", name: "Date" },
    },
  ],
  body: React.createElement(
    "p",
    { className: "text-base-content/80" },
    "Developed robust full-stack solutions and led a team of three junior developers."
  ),
};
