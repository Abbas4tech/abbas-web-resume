"use client";

import type { FC } from "react";

interface BlockPlaceholderProps {
  blockType: string;
  error?: string;
  id?: string;
  uiVariant?: string;
}

export const BlockPlaceholder: FC<BlockPlaceholderProps> = ({
  blockType,
  uiVariant,
  id,
  error,
}) => {
  // Silent fallback in production: only display to developers in dev mode
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="my-4 rounded-xl border-2 border-warning border-dashed bg-warning/10 p-6 text-warning-content shadow-sm">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-lg text-warning">
          ⚠️ Missing block renderer mapping
        </h4>
        <p className="text-sm">
          {error ? (
            error
          ) : (
            <>
              No registry mapping found to render Contentful entry type{" "}
              <code className="rounded bg-base-300 px-1.5 py-0.5 font-mono text-warning-content text-xs">
                {blockType}
              </code>{" "}
              with UI Variant property{" "}
              <code className="rounded bg-base-300 px-1.5 py-0.5 font-mono text-warning-content text-xs">
                {uiVariant || "undefined"}
              </code>
              .
            </>
          )}
        </p>
        {id && (
          <p className="font-medium text-warning-content/75 text-xs">
            Entry ID: <span className="font-mono">{id}</span>
          </p>
        )}
      </div>
    </div>
  );
};
