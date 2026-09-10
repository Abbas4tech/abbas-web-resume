import { BLOCKS } from "@contentful/rich-text-types";
import type { FaqAccordionProps } from "./faq-accordion";

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
  };
}

export const baseMock: FaqAccordionProps = {
  items: [
    {
      question: "What technologies do you specialize in?",
      answer: paragraph(
        "React, Next.js, TypeScript, and Node.js, with a focus on accessible, well-tested component systems."
      ) as FaqAccordionProps["items"][number]["answer"],
    },
    {
      question: "Are you available for freelance work?",
      answer: paragraph(
        "Yes — open to contract and consulting engagements. Reach out via the contact page."
      ) as FaqAccordionProps["items"][number]["answer"],
    },
    {
      question: "Where can I see your resume?",
      answer: paragraph(
        "Use the download link in the header, or browse the Experience section on this site."
      ) as FaqAccordionProps["items"][number]["answer"],
    },
  ],
};
