import { describe, expect, it } from "vitest";
import type { AdaptedBadge } from "@/contentful/adapters/badge";
import { render, screen } from "@/test/utils";
import { Badge } from "./badge";

describe("Contentful Badge", () => {
  it("renders badge with title and icon", async () => {
    const mockData = {
      __typename: "Badge",
      id: "1",
      title: "My Badge",
      icon: { __typename: "Icon", id: "i1", name: "fa/FaStar" },
    };

    render(<Badge data={mockData as unknown as AdaptedBadge} />);

    expect(screen.getByText("My Badge")).toBeInTheDocument();

    // Check if icon is rendered
    expect(
      await screen.findByRole("img", { name: "fa/FaStar" })
    ).toBeInTheDocument();
  });

  it("renders badge without icon", () => {
    const mockData = {
      __typename: "Badge",
      id: "2",
      title: "No Icon",
    };

    render(<Badge data={mockData as unknown as AdaptedBadge} />);
    expect(screen.getByText("No Icon")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
