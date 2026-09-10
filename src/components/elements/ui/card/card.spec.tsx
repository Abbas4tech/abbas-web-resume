import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "./card";

const actionRegex = /action/i;
const imageRegex = /test image/i;

describe("Card Components", () => {
  it("renders full card layout correctly", () => {
    const { container } = render(
      <Card data-testid="test-card">
        <CardImage alt="test image" height={100} src="/test.jpg" width={100} />
        <CardContent>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardFooter>
            <button type="button">Action</button>
          </CardFooter>
        </CardContent>
      </Card>
    );

    expect(screen.getByTestId("test-card")).toHaveClass("card");
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: actionRegex })
    ).toBeInTheDocument();

    const imageWrapper = container.querySelector("figure.card-image");
    expect(imageWrapper).toBeInTheDocument();

    const img = screen.getByRole("img", { name: imageRegex });
    expect(img).toBeInTheDocument();
  });

  it("applies custom class names to card components", () => {
    const { container } = render(
      <Card className="custom-card">
        <CardContent className="custom-content">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-desc">Desc</CardDescription>
          <CardFooter className="custom-footer">Footer</CardFooter>
        </CardContent>
      </Card>
    );

    expect(container.querySelector(".card")).toHaveClass("custom-card");
    expect(container.querySelector(".card-body")).toHaveClass("custom-content");
    expect(container.querySelector(".card-title")).toHaveClass("custom-title");
    expect(container.querySelector(".card-description")).toHaveClass(
      "custom-desc"
    );
    expect(container.querySelector(".card-actions")).toHaveClass(
      "custom-footer"
    );
  });
});
