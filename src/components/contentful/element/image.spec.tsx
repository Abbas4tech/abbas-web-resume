import { describe, expect, it } from "vitest";
import type { AdaptedImage } from "@/contentful/adapters/image";
import { render, screen } from "@/test/utils";
import { Image } from "./image";

describe("Contentful Image", () => {
  it("renders a next image properly", () => {
    const mockData = {
      __typename: "Image",
      id: "1",
      url: "/test-image.jpg",
      title: "Test Image",
      alternativeText: "Alt Text",
      width: 100,
      height: 100,
    };

    render(<Image data={mockData as unknown as AdaptedImage} />);
    const img = screen.getByRole("img", { name: "Alt Text" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("test-image.jpg")
    );
  });

  it("returns null if no url is provided", () => {
    const mockData = {
      __typename: "Image",
      id: "2",
      url: "",
      title: "Test Image",
    };

    const { container } = render(
      <Image data={mockData as unknown as AdaptedImage} />
    );
    expect(container.querySelector(".group")).toBeEmptyDOMElement();
  });
});
