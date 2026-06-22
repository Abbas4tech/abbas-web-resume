import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ServerErrorBlock } from "./server-error";
import { baseMock } from "./server-error.mock";

describe("ServerErrorBlock", () => {
  it("renders with default props and handles retry", () => {
    const handleRetry = vi.fn();

    render(<ServerErrorBlock {...baseMock} onRetry={handleRetry} />);

    expect(screen.getByText("500 - Server Error")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Something went wrong on our end. We're looking into it."
      )
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: "Try again" });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render retry button if onRetry is undefined", () => {
    render(<ServerErrorBlock {...baseMock} onRetry={undefined} />);

    expect(
      screen.queryByRole("button", { name: "Try again" })
    ).not.toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <ServerErrorBlock
        actionLabel="Refresh"
        message="Custom error message"
        onRetry={vi.fn()}
        title="Custom Server Error"
      />
    );

    expect(screen.getByText("Custom Server Error")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });
});
