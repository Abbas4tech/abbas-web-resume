import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MockupGallery } from "./mockup-gallery";

describe("MockupGallery", () => {
  const mockProps = {
    frame: "browser" as const,
    items: [
      {
        id: "item-1",
        title: "Project One",
        description: "Desc 1",
        imageAlt: "Image 1",
        imageSrc: "/img1.jpg",
        imageWidth: 800,
        imageHeight: 600,
      },
    ],
  };

  it("renders each item inside a browser frame by default", () => {
    const { container } = render(
      <MockupGallery data-testid="gallery" {...mockProps} />
    );

    expect(screen.getByTestId("gallery")).toBeInTheDocument();
    expect(container.querySelector(".mockup-browser")).toBeInTheDocument();
    expect(screen.getByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
  });

  it("renders each item inside a phone frame when frame='phone'", () => {
    const { container } = render(
      <MockupGallery {...mockProps} frame="phone" />
    );
    expect(container.querySelector(".mockup-phone")).toBeInTheDocument();
  });
});
