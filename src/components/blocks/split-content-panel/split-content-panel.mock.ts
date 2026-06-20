import { BLOCKS } from "@contentful/rich-text-types";
import type { SplitContentPanelProps } from "./split-content-panel";

export const baseMock: SplitContentPanelProps = {
  description: {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value:
              "Hello! I am a full-stack developer passionate about building scalable, user-centric web applications. I specialize in React, Node.js, and cloud architecture.",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  },
  infoRows: [
    {
      label: "Location",
      value: "New York, USA",
      icon: { iconCode: "md/MdLocationOn" },
    },
    { label: "Experience", value: "5+ Years", icon: { iconCode: "md/MdWork" } },
    {
      label: "Availability",
      value: "Open to opportunities",
      icon: { iconCode: "md/MdEventAvailable" },
    },
  ],
};
