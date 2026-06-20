import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Avatar, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("renders a wrapper with the avatar class", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage alt="Test Avatar" height={40} src="/test.jpg" width={40} />
      </Avatar>
    );
    expect(container.querySelector(".avatar")).toBeInTheDocument();
  });

  it("renders an image avatar correctly", () => {
    render(
      <Avatar>
        <AvatarImage alt="Test Avatar" height={40} src="/test.jpg" width={40} />
      </Avatar>
    );
    const img = screen.getByRole("img", { name: "Test Avatar" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src");
  });

  it("applies ring styles correctly", () => {
    const { container } = render(
      <Avatar ring="primary">
        <AvatarImage alt="Test Avatar" height={40} src="/test.jpg" width={40} />
      </Avatar>
    );
    expect(container.querySelector(".avatar")).toHaveClass(
      "ring",
      "ring-primary"
    );
  });
});
