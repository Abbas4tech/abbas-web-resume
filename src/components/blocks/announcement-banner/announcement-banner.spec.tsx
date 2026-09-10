import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { AnnouncementBanner } from "./announcement-banner";

describe("AnnouncementBanner", () => {
  it("renders the message and applies the variant class", () => {
    render(<AnnouncementBanner message="Open to work" variant="success" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert-success");
    expect(screen.getByText("Open to work")).toBeInTheDocument();
  });

  it("renders a CTA link when provided", () => {
    render(
      <AnnouncementBanner
        link={{
          __typename: "Link",
          id: "cta",
          internalName: "CTA",
          text: "Get in touch",
          href: "/contact",
          icon: undefined,
        }}
        message="Open to work"
      />
    );

    const link = screen.getByRole("link", { name: "Get in touch" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("omits the CTA when no link is given", () => {
    render(<AnnouncementBanner message="Open to work" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
