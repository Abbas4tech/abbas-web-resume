import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Accordion, AccordionItem } from "./accordion";

describe("Accordion", () => {
  it("renders standard accordion structure", () => {
    render(
      <Accordion>
        <AccordionItem name="test-accordion" title="Section 1">
          Content 1
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("applies radio button input for exclusive accordion behavior", () => {
    const { container } = render(
      <AccordionItem name="exclusive-accordion" title="Title">
        Content
      </AccordionItem>
    );

    const input = container.querySelector('input[type="radio"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "exclusive-accordion");
  });
});
