"use client";

import { useEffect } from "react";
import { ServerErrorBlock } from "@/components/blocks/server-error/server-error";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ServerErrorBlock onRetry={reset} />;
}
