"use client";

import { MdErrorOutline, MdRefresh } from "react-icons/md";
import {
  MockupWindow,
  MockupWindowBody,
} from "@/components/elements/mockup-window/mockup-window";

import { MotionDraggable } from "@/components/elements/motion-draggable/motion-draggable";

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
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content w-full max-w-5xl flex-col gap-8 lg:flex-row">
      <div className="flex-1 text-center lg:text-left">
        <div className="mb-4 flex items-center justify-center gap-4 lg:justify-start">
          <div className="avatar placeholder">
            <div className="w-16 rounded-full bg-error text-error-content">
              <MdErrorOutline size={32} />
            </div>
          </div>
          <h1 className="font-bold text-4xl tracking-tight lg:text-5xl">
            {title}
          </h1>
        </div>
        <p className="max-w-xl py-6 text-base-content/80 text-xl">{message}</p>
        {onRetry && (
          <button
            className="btn btn-error btn-lg shadow-xl"
            onClick={onRetry}
            type="button"
          >
            <MdRefresh size={24} />
            {actionLabel}
          </button>
        )}
      </div>
      <div className="w-full max-w-md flex-1">
        <MotionDraggable>
          <MockupWindow className="border border-base-300 bg-base-300 shadow-2xl">
            <MockupWindowBody className="flex flex-col gap-4 bg-base-100 p-6">
              <div className="flex items-center justify-between border-base-200 border-b pb-2">
                <span className="font-bold font-mono text-error text-sm">
                  Error Log
                </span>
                <span className="badge badge-error badge-sm">CRITICAL</span>
              </div>
              <div className="font-mono text-sm opacity-70">
                <p className="text-error">FATAL EXCEPTION: main</p>
                <p>Process: app.layout</p>
                <p>PID: 500</p>
                <p className="mt-2 text-warning">
                  Waiting for developer action...
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="loading loading-dots loading-sm" />
                  <span>Attempting auto-recovery</span>
                </div>
              </div>
            </MockupWindowBody>
          </MockupWindow>
        </MotionDraggable>
      </div>
    </div>
  </div>
);
