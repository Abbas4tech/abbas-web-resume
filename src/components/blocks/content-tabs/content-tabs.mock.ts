import { BLOCKS } from "@contentful/rich-text-types";
import type { ContentTabsProps } from "./content-tabs";

function paragraph(text: string) {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [{ nodeType: "text", value: text, marks: [], data: {} }],
      },
    ],
  } as ContentTabsProps["tabs"][number]["content"];
}

export const baseMock: ContentTabsProps = {
  tabs: [
    {
      label: "Summary",
      content: paragraph(
        "Full-stack engineer with 5+ years building accessible, component-driven web applications."
      ),
    },
    {
      label: "Experience",
      content: paragraph(
        "Senior Full Stack Engineer at Tech Innovations Inc. since 2021, previously Frontend Developer at Creative Solutions LLC."
      ),
    },
    {
      label: "Education",
      content: paragraph("B.S. in Computer Science."),
    },
  ],
};
