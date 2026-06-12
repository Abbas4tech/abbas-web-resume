import { describe, expect, it } from "vitest";
import { Icon } from "@/components/elements/icon/icon";
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
      await screen.findByRole("img", { name: "Star Icon" })
    ).toBeInTheDocument();
  });

  it("renders without an icon", () => {
    render(<SectionHeading>Just Text</SectionHeading>);
    expect(screen.getByText("Just Text")).toBeInTheDocument();
  });
});
