import { describe, expect, it } from "vitest";
import type { AdaptedImage } from "@/contentful/adapters/image";
import { render, screen } from "@/test/utils";
import { HeroBanner } from "./hero-banner";

describe("HeroBanner", () => {
  const mockBanner: AdaptedImage = {
    __typename: "Image",
    id: "banner",
    internalName: "banner",
    alternativeText: "Banner",
    caption: "",
    url: "/banner.jpg",
    title: "",
    description: "",
    width: 1200,
    height: 400,
  };

  const mockAvatar: AdaptedImage = {
    __typename: "Image",
    id: "avatar",
    internalName: "avatar",
    alternativeText: "Avatar",
    caption: "",
    url: "/avatar.jpg",
    title: "",
    description: "",
    width: 200,
    height: 200,
  };

  const mockProps = {
    bannerImage: mockBanner,
    avatarImage: mockAvatar,
    iconLinks: [
      {
        href: "/social1",
        iconHeight: 32,
        iconSrc: "/icon1.png",
        iconWidth: 32,
        label: "Social 1",
      },
      {
        href: "/social2",
        iconHeight: 32,
        iconSrc: "/icon2.png",
        iconWidth: 32,
        label: "Social 2",
      },
      {
        href: "/social3",
        iconHeight: 32,
        iconSrc: "/icon3.png",
        iconWidth: 32,
        label: "Social 3",
      },
    ],
  };

  it("renders the hero banner with images and chunked social links", () => {
    render(<HeroBanner data-testid="hero" {...mockProps} />);

    // Images
    const images = screen.getAllByRole("img");
    // Should contain banner, avatar, and 3 social icons
    expect(images.length).toBeGreaterThanOrEqual(2);

    // Links (3 social links)
    const link1 = screen.getByRole("link", { name: "Visit Social 1" });
    const link2 = screen.getByRole("link", { name: "Visit Social 2" });
    const link3 = screen.getByRole("link", { name: "Visit Social 3" });
    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
    expect(link3).toBeInTheDocument();
  });
});
