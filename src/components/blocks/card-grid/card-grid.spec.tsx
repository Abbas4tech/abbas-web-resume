import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { CardGrid } from "./card-grid";

describe("CardGrid", () => {
  const mockProps = {
    animation: "fade-up",
    cards: [
      {
        title: "Project 1",
        description: "Desc 1",
        href: "/proj1",
        linkIcon: { iconCode: "fa/FaLink" },
        thumbnailSrc: "/img1.jpg",
        thumbnailAlt: "Image 1",
        thumbnailWidth: 100,
        thumbnailHeight: 100,
      },
      {
        title: "Project 2",
        description: "Desc 2",
        href: "/proj2",
        linkIcon: { iconCode: "fa/FaLink" },
        thumbnailSrc: "/img2.jpg",
        thumbnailAlt: "Image 2",
        thumbnailWidth: 100,
        thumbnailHeight: 100,
      },
    ],
  };

  it("renders a grid of project cards", () => {
    render(<CardGrid data-testid="gallery" {...mockProps} />);

    const gallery = screen.getByTestId("gallery");
    expect(gallery).toHaveAttribute("data-aos", "fade-up");
    expect(gallery).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2");

    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
    expect(screen.getByText("Desc 2")).toBeInTheDocument();
  });
});
