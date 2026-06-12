import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { AppHeader } from "./app-header";

const OpenDrawerRegex = /Open drawer/i;

describe("AppHeader", () => {
  const mockProps = {
    title: "Abbas Resume",
    resumeUrl: "/resume.pdf",
    resumeIcon: { iconCode: "fa/FaFilePdf", name: "Resume PDF" },
    themes: ["light", "dark", "cupcake"],
    defaultTheme: "dark",
    defaultRoute: "/home",
  };

  it("renders header with title and links", async () => {
    render(<AppHeader {...mockProps} />);

    // Title button
    const titleLink = screen.getByRole("link", { name: "Abbas Resume" });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", "/home");

    // Drawer button toggle
    const toggleLabel = await screen.findByText(OpenDrawerRegex);
    expect(toggleLabel).toBeInTheDocument();

    // Resume button
    const links = screen.getAllByRole("link");
    const resumeLink = links.find(
      (link) => link.getAttribute("href") === "/resume.pdf"
    );
    expect(resumeLink).toBeDefined();
    expect(resumeLink).toHaveAttribute("target", "_blank");
  });
});
