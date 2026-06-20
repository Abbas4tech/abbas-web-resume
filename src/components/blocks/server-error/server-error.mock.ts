import type { ServerErrorBlockProps } from "./server-error";

export const baseMock: ServerErrorBlockProps = {
  title: "500 - Server Error",
  message: "Something went wrong on our end. We're looking into it.",
  actionLabel: "Try again",
  onRetry: () => console.log("Retrying..."),
};
