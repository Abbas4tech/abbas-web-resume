import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import type { FaqAccordionItem } from "./faq-accordion";
import { FaqAccordion } from "./faq-accordion";

describe("FaqAccordion", () => {
  const mockProps = {
    items: [
      {
        question: "Is this accessible?",
        answer: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: "text",
                  value: "Yes, via a native radio-driven collapse.",
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        } as FaqAccordionItem["answer"],
      },
    ],
  };

  it("renders each question and its rich-text answer", () => {
    render(<FaqAccordion {...mockProps} />);

    expect(screen.getByText("Is this accessible?")).toBeInTheDocument();
    expect(
      screen.getByText("Yes, via a native radio-driven collapse.")
    ).toBeInTheDocument();
  });

  it("gives each question's radio input an accessible name", () => {
    render(<FaqAccordion {...mockProps} />);

    expect(
      screen.getByRole("radio", { name: "Is this accessible?" })
    ).toBeInTheDocument();
  });
});
