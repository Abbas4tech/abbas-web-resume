import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { SplitContentPanel } from "./split-content-panel";

describe("SplitContentPanel", () => {
  const mockProps = {
    description: {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            { nodeType: "text", value: "This is my bio.", marks: [], data: {} },
          ],
        },
      ],
    } as any,
    infoRows: [
      {
        label: "Experience",
        value: "5+ Years",
        icon: { iconCode: "fa/FaCode", name: "Code Icon" },
      },
    ],
  };

  it("renders bio section with rich text and info rows", async () => {
    render(<SplitContentPanel data-testid="bio-sec" {...mockProps} />);

    const wrapper = screen.getByTestId("bio-sec");
    expect(wrapper).toHaveClass("flex", "flex-col", "gap-4");

    // Rich text rendering
    expect(screen.getByText("This is my bio.")).toBeInTheDocument();

    // Info rows
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("5+ Years")).toBeInTheDocument();

    const icon = await screen.findByRole("img", { name: "Code Icon" });
    expect(icon).toBeInTheDocument();
  });
});
