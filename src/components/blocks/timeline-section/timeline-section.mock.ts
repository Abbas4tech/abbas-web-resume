import { BLOCKS } from "@contentful/rich-text-types";
import type { TimelineSectionProps } from "./types";

export const baseMock: TimelineSectionProps = {
  animation: "fade-up",
  entries: [
    {
      title: "Senior Full Stack Engineer",
      indicatorIcon: { iconCode: "md/MdWork", name: "Work" },
      metaRows: [
        { text: "Tech Innovations Inc.", icon: { iconCode: "md/MdBusiness" } },
        { text: "2021 - Present", icon: { iconCode: "md/MdDateRange" } },
      ],
      description: {
        document: {
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
                    "Lead the development of a scalable e-commerce platform using Next.js and Node.js. Mentored junior developers and established CI/CD pipelines.",
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      },
    },
    {
      title: "Frontend Developer",
      indicatorIcon: { iconCode: "md/MdCode", name: "Code" },
      metaRows: [
        { text: "Creative Solutions LLC", icon: { iconCode: "md/MdBusiness" } },
        { text: "2018 - 2021", icon: { iconCode: "md/MdDateRange" } },
      ],
      description: {
        document: {
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
                    "Built responsive and accessible user interfaces for various client projects using React and TailwindCSS.",
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      },
    },
  ],
};
