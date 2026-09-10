import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { TechBadgeCloud } from "./tech-badge-cloud";

describe("TechBadgeCloud", () => {
  it("renders a badge for every item", () => {
    render(
      <TechBadgeCloud
        items={[
          { label: "React", icon: { iconCode: "si/SiReact", name: "React" } },
          { label: "TypeScript" },
        ]}
      />
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "React" })).toBeInTheDocument();
  });
});
