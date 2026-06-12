import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { HeroBanner } from "./hero-banner";

describe("HeroBanner", () => {
  const mockProps = {
    animation: "fade-in",
    bannerImageAlt: "Banner",
    bannerImageHeight: 400,
    bannerImageSrc: "/banner.jpg",
    bannerImageWidth: 1200,
    avatarAlt: "Avatar",
    avatarHeight: 200,
    avatarSrc: "/avatar.jpg",
    avatarWidth: 200,
    socialLinks: [
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

    const hero = screen.getByTestId("hero");
    expect(hero).toHaveAttribute("data-aos", "fade-in");

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
