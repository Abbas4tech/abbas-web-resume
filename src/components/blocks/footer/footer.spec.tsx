import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Footer } from "./footer";
import { baseMock } from "./footer.mock";

describe("Footer", () => {
  it("renders footer text, email, and nav links", () => {
    render(<Footer {...baseMock} />);

    expect(screen.getByText(baseMock.footerText)).toBeInTheDocument();

    const emailLink = screen.getByRole("link", { name: baseMock.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${baseMock.email}`);

    for (const link of baseMock.links) {
      const navLink = screen.getByRole("link", { name: link.title });
      expect(navLink).toHaveAttribute("href", link.pageUrl);
    }
  });

  it("omits the email link when no email is provided", () => {
    render(<Footer {...baseMock} email={undefined} />);

    expect(
      screen.queryByRole("link", { name: baseMock.email })
    ).not.toBeInTheDocument();
  });

  it("omits the nav landmark when there are no links", () => {
    render(<Footer {...baseMock} links={[]} />);

    expect(
      screen.queryByRole("navigation", { name: "Footer navigation" })
    ).not.toBeInTheDocument();
  });
});
