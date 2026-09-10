import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  MockupPhone,
  MockupPhoneCamera,
  MockupPhoneDisplay,
} from "./mockup-phone";

describe("MockupPhone", () => {
  it("renders phone frame, camera, and display content", () => {
    const { container } = render(
      <MockupPhone>
        <MockupPhoneCamera />
        <MockupPhoneDisplay>App Content</MockupPhoneDisplay>
      </MockupPhone>
    );

    expect(container.querySelector(".mockup-phone")).toBeInTheDocument();
    expect(container.querySelector(".mockup-phone-camera")).toBeInTheDocument();
    expect(screen.getByText("App Content")).toHaveClass("mockup-phone-display");
  });

  it("applies custom classes", () => {
    const { container } = render(<MockupPhone className="custom-phone" />);
    expect(container.querySelector(".mockup-phone")).toHaveClass(
      "custom-phone"
    );
  });
});
