import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MediaCard } from "./media-card";

describe("MediaCard", () => {
  const mockProps = {
    title: "Test Project",
    description: "This is a test project description.",
    thumbnailSrc: "/test-image.jpg",
    thumbnailAlt: "Test Thumbnail",
    thumbnailWidth: 400,
    thumbnailHeight: 300,
    links: [
      {
        __typename: "Link" as const,
        id: "link-1",
        internalName: "Link 1",
        text: "GitHub Link",
        href: "https://example.com",
        icon: {
          __typename: "Icon" as const,
          id: "icon-1",
          internalName: "Icon 1",
          name: "GitHub Link",
          library: "fa",
          title: "GitHub Link",
          color: "currentColor",
          iconCode: "fa/FaGithub",
          showTooltip: false,
        },
      },
    ],
  };

  it("renders card content correctly", () => {
    render(<MediaCard {...mockProps} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test project description.")
    ).toBeInTheDocument();

    const image = screen.getByRole("img", { name: "Test Thumbnail" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
    // Next/Image modifies the src, so we just check it contains the filename or is an image
  });

  it("renders the external link correctly", async () => {
    render(<MediaCard {...mockProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");

    // The icon within the link
    const icon = await screen.findByRole("img", { name: "GitHub Link" });
    expect(icon).toBeInTheDocument();
  });
});
