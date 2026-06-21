import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/utils";
import { Modal, ModalBox } from "./modal";

const closeRegex = /close/i;

describe("Modal Components", () => {
  it("renders modal structure correctly", () => {
    const { container } = render(
      <Modal open={true}>
        <ModalBox>Modal Content</ModalBox>
      </Modal>
    );

    const dialog = container.querySelector("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("open");

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    // Verify the backdrop and close button render
    expect(
      screen.getByRole("button", { name: closeRegex })
    ).toBeInTheDocument();
  });

  it("fires onClose when backdrop close button is clicked", () => {
    const onCloseMock = vi.fn();
    render(
      <Modal onClose={onCloseMock} open={true}>
        <ModalBox>Content</ModalBox>
      </Modal>
    );

    const closeBtn = screen.getByRole("button", { name: closeRegex });
    closeBtn.click();
    expect(onCloseMock).toHaveBeenCalledOnce();
  });
});
