"use client";

import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import { Button } from "@/components/elements/ui/button/button";
import { Icon } from "@/components/elements/ui/icon/icon";

export interface NotFoundBlockProps {
  actionHref?: string;
  actionLabel?: string;
  message?: string;
  title?: string;
}

export const NotFoundBlock = ({
  title = "404 - Page Not Found",
  message = "Oops! The page you are looking for doesn't exist or has been moved.",
  actionLabel = "Go back home",
  actionHref = "/",
}: NotFoundBlockProps) => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
    <MotionStaggerContainer
      as="div"
      className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl"
    >
      <div className="card-body items-center text-center">
        <MotionStaggerItem className="avatar avatar-placeholder mb-4">
          <div className="w-24 rounded-full bg-primary text-primary-content shadow-inner ring ring-primary ring-offset-2 ring-offset-base-100">
            <Icon
              iconCode="md/MdSearchOff"
              name="Page not found"
              showTooltip={false}
              size="48"
            />
          </div>
        </MotionStaggerItem>

        <MotionStaggerItem
          as="h1"
          className="card-title mb-2 font-bold text-3xl text-primary tracking-tight"
        >
          {title}
        </MotionStaggerItem>

        <MotionStaggerItem as="p" className="mb-6 text-base-content/80 text-lg">
          {message}
        </MotionStaggerItem>

        <MotionStaggerItem as="div" className="mb-6 w-full text-left">
          <div className="mockup-code bg-base-300 text-base-content text-sm before:hidden">
            <pre data-prefix=">">
              <code>Status: 404 Not Found</code>
            </pre>
            <pre className="text-warning" data-prefix=">">
              <code>Route: Unmatched</code>
            </pre>
            <pre className="text-success" data-prefix=">">
              <code>Action: Redirecting...</code>
            </pre>
          </div>
        </MotionStaggerItem>

        <MotionStaggerItem as="div" className="card-actions w-full">
          <MotionHover className="block w-full" scale={1.02} tapScale={0.97}>
            <Button
              asLink
              className="btn btn-primary btn-lg w-full shadow-lg transition-shadow duration-300 hover:shadow-primary/40 hover:shadow-xl"
              href={actionHref}
            >
              <Icon
                iconCode="md/MdHome"
                name="Home"
                showTooltip={false}
                size="20"
              />
              {actionLabel}
            </Button>
          </MotionHover>
        </MotionStaggerItem>
      </div>
    </MotionStaggerContainer>
  </div>
);
