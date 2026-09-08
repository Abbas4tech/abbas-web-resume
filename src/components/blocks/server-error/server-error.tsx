"use client";

import { MotionDraggable } from "@/components/elements/behavior/motion-draggable/motion-draggable";
import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import { Button } from "@/components/elements/ui/button/button";
import { Icon } from "@/components/elements/ui/icon/icon";
import {
  MockupWindow,
  MockupWindowBody,
} from "@/components/elements/ui/mockup-window/mockup-window";

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
      <MotionStaggerContainer
        as="div"
        className="flex-1 text-center lg:text-left"
      >
        <MotionStaggerItem
          as="div"
          className="mb-4 flex items-center justify-center gap-4 lg:justify-start"
        >
          <div className="avatar placeholder">
            <div className="w-16 rounded-full bg-error text-error-content shadow-inner ring ring-error ring-offset-2 ring-offset-base-200">
              <Icon
                iconCode="md/MdError"
                name="Server error"
                showTooltip={false}
                size="32"
              />
            </div>
          </div>
          <h1 className="font-bold text-4xl tracking-tight lg:text-5xl">
            {title}
          </h1>
        </MotionStaggerItem>

        <MotionStaggerItem
          as="p"
          className="max-w-xl py-6 text-base-content/80 text-xl"
        >
          {message}
        </MotionStaggerItem>

        {onRetry && (
          <MotionStaggerItem as="div">
            <MotionHover className="inline-block" scale={1.03} tapScale={0.96}>
              <Button
                className="btn-error btn-lg shadow-xl transition-shadow duration-300 hover:shadow-error/40 hover:shadow-xl"
                onClick={onRetry}
                type="button"
              >
                <MotionHover rotate={180} scale={1} tapScale={1}>
                  <Icon
                    iconCode="md/MdRefresh"
                    name="Retry"
                    showTooltip={false}
                    size="24"
                  />
                </MotionHover>
                {actionLabel}
              </Button>
            </MotionHover>
          </MotionStaggerItem>
        )}
      </MotionStaggerContainer>

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
