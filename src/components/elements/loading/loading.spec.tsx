import { describe, expect, it } from "vitest";
import { render } from "@/test/utils";
import { Loading } from "./loading";

describe("Loading", () => {
  it("renders default spinner", () => {
    const { container } = render(<Loading />);
    const el = container.querySelector(".loading");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("loading-spinner");
  });

  it("renders specific variant and size", () => {
    const { container } = render(<Loading size="lg" variant="dots" />);
    const el = container.querySelector(".loading");
    expect(el).toHaveClass("loading-dots", "loading-lg");
  });
});
