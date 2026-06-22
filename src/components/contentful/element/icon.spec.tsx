import { describe, expect, it } from "vitest";
import type { AdaptedIcon } from "@/contentful/adapters/icon";
import { render, screen } from "@/test/utils";
import { Icon } from "./icon";

describe("Contentful Icon", () => {
  it("renders an icon properly", async () => {
    const mockData = {
      __typename: "Icon",
      id: "1",
      name: "fa/FaReact",
      showTooltip: true,
      title: "React Icon",
    };

    render(<Icon data={mockData as unknown as AdaptedIcon} />);
    expect(
      await screen.findByRole("img", { name: "fa/FaReact" })
    ).toBeInTheDocument();
  });

  it("returns null if no name is provided", () => {
    const mockData = {
      __typename: "Icon",
      id: "2",
      name: "",
    };

    const { container } = render(
      <Icon data={mockData as unknown as AdaptedIcon} />
    );
    expect(container.querySelector(".group")).toBeEmptyDOMElement();
  });
});
