"use client";

import { MdErrorOutline } from "react-icons/md";

export interface ServerErrorBlockProps {
  actionLabel?: string;
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export const ServerErrorBlock = ({
  title = "500 - Server Error",
  message = "Something went wrong on our end. We're looking into it.",
  onRetry,
  actionLabel = "Try again",
}: ServerErrorBlockProps) => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
    <div className="mb-8 animate-bounce text-error/80">
      <MdErrorOutline aria-hidden="true" className="mx-auto" size={120} />
    </div>
    <h1 className="mb-4 font-bold text-4xl tracking-tight sm:text-5xl">
      {title}
    </h1>
    <p className="mb-8 max-w-lg text-base-content/70 text-lg">{message}</p>
    {onRetry && (
      <button
        className="btn btn-error btn-outline gap-2 rounded-full px-8"
        onClick={onRetry}
        type="button"
      >
        {actionLabel}
      </button>
    )}
  </div>
);
