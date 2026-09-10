import { BLOCKS } from "@contentful/rich-text-types";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { FaqAccordionProps } from "./faq-accordion";

/**
 * Maps generic AdaptedContentList to the FaqAccordion block props.
 * Each customEntry's title is the question, body is the rich-text answer.
 */
export function adaptFaqAccordion(data: AdaptedContentList): FaqAccordionProps {
  return {
    items: data.customEntries.map((item) => ({
      question: item.title,
      answer: item.body || {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [],
      },
    })),
  };
}
