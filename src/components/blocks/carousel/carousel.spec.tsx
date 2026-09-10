import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Carousel } from "./carousel";

describe("Carousel", () => {
  const mockProps = {
    slides: [
      {
        id: "slide-1",
        title: "Slide One",
        description: "First slide",
        imageAlt: "Image 1",
        imageSrc: "/img1.jpg",
        imageWidth: 1600,
        imageHeight: 500,
      },
      {
        id: "slide-2",
        title: "Slide Two",
        description: "Second slide",
        imageAlt: "Image 2",
        imageSrc: "/img2.jpg",
        imageWidth: 1600,
        imageHeight: 500,
      },
    ],
  };

  it("renders a carousel of slides", () => {
    render(<Carousel data-testid="carousel" {...mockProps} />);

    const carousel = screen.getByTestId("carousel");
    expect(carousel).toHaveClass("carousel", "w-full");

    expect(screen.getByText("Slide One")).toBeInTheDocument();
    expect(screen.getByText("Slide Two")).toBeInTheDocument();
    expect(screen.getByText("First slide")).toBeInTheDocument();
    expect(screen.getByText("Second slide")).toBeInTheDocument();
  });

  it("renders each slide's links when provided", () => {
    render(
      <Carousel
        slides={[
          {
            id: "slide-with-link",
            title: "Linked Slide",
            imageAlt: "Image",
            imageSrc: "/img.jpg",
            imageWidth: 1600,
            imageHeight: 500,
            links: [
              {
                __typename: "Link",
                id: "link-1",
                internalName: "Case study",
                text: "View case study",
                href: "https://example.com",
                icon: undefined,
              },
            ],
          },
        ]}
      />
    );

    const link = screen.getByRole("link", { name: "View case study" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
