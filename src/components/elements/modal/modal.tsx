import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";
export type ModalProps = HTMLAttributes<HTMLDialogElement> & {
  open?: boolean;
  onClose?: () => void;
};
export type ModalBoxProps = HTMLAttributes<HTMLDivElement>;

const Modal = memo(
  forwardRef<HTMLDialogElement, ModalProps>(
    ({ className, children, open, onClose, ...props }, ref) => (
      <dialog
        className={cn("modal", className)}
        open={open}
        ref={ref}
        {...props}
      >
        <div className="modal-box">{children}</div>
        <form className="modal-backdrop" method="dialog">
          <button onClick={onClose} type="button">
            close
          </button>
        </form>
      </dialog>
    )
  )
);
Modal.displayName = "Modal";
const ModalBox = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("modal-box", className)} ref={ref} {...props} />
    )
  )
);
ModalBox.displayName = "ModalBox";

export { Modal, ModalBox };
