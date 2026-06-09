import type { HTMLAttributes } from "react";
export type ModalProps = HTMLAttributes<HTMLDialogElement> & {
  open?: boolean;
  onClose?: () => void;
};
export type ModalBoxProps = HTMLAttributes<HTMLDivElement>;
