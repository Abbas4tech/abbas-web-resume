import { describe, expect, it } from "vitest";
import { Icon } from "@/components/elements/ui/icon/icon";
import { render, screen } from "@/test/utils";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("renders a heading with text and optional icon", async () => {
    render(
      <SectionHeading
        data-testid="heading"
        icon={<Icon iconCode="fa/FaStar" name="Star Icon" />}
      >
        My Section
      </SectionHeading>
    );

    const heading = screen.getByTestId("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("mb-4", "flex", "items-center");

    expect(screen.getByText("My Section")).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "Star Icon", hidden: true })
    ).toBeInTheDocument();
  });

  it("renders without an icon", () => {
    render(<SectionHeading>Just Text</SectionHeading>);
    expect(screen.getByText("Just Text")).toBeInTheDocument();
  });

  it("uses screen-reader-only element for full text accessibility", () => {
    render(<SectionHeading>Accessible Section</SectionHeading>);

    const srOnlyEl = screen.getByText("Accessible Section");
    expect(srOnlyEl).toBeInTheDocument();
    expect(srOnlyEl).toHaveClass("sr-only");
  });

  it("splits title string into character spans for typing stagger animation", () => {
    const titleText = "Typing Title";
    const { container } = render(<SectionHeading>{titleText}</SectionHeading>);

    const animatedContainer = container.querySelector('[aria-hidden="true"]');
    expect(animatedContainer).toBeInTheDocument();

    const charSpans = animatedContainer?.querySelectorAll("span");
    expect(charSpans?.length).toBe(titleText.length);
  });
});
