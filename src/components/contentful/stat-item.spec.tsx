import { describe, expect, it } from "vitest";
import type { AdaptedStatItem } from "@/contentful/adapters/stat-item";
import { render, screen } from "@/test/utils";
import { StatItem } from "./stat-item";

describe("Contentful StatItem", () => {
  it("renders stat item with title and icons", async () => {
    const mockData: AdaptedStatItem = {
      __typename: "StatItem",
      id: "1",
      title: "My Stat Item",
      internalName: "my-stat",
      progress: 0,
      icons: [
        {
          __typename: "Icon",
          id: "i1",
          internalName: "icon",
          name: "fa/FaStar",
          title: "Star",
          library: "fa",
          color: "",
          iconCode: "FaStar",
          showTooltip: false,
        },
      ],
    };

    render(<StatItem data={mockData} />);

    expect(screen.getByText("My Stat Item")).toBeInTheDocument();

    // Check if icon is rendered
    expect(
      await screen.findByRole("img", { name: "fa/FaStar" })
    ).toBeInTheDocument();
  });

  it("renders stat item without icons", () => {
    const mockData: AdaptedStatItem = {
      __typename: "StatItem",
      id: "2",
      title: "No Icon",
      internalName: "no-icon",
      progress: 0,
      icons: [],
    };

    render(<StatItem data={mockData} />);
    expect(screen.getByText("No Icon")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
