import Link from "next/link";
import { MdHome, MdSearchOff } from "react-icons/md";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";

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
    <MotionWrapper animation="fade-up" className="w-full max-w-md">
      <div className="card border border-base-300 bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar placeholder mb-4">
            <div className="w-24 rounded-full bg-primary text-primary-content shadow-inner ring ring-primary ring-offset-2 ring-offset-base-100">
              <MdSearchOff aria-hidden="true" size={48} />
            </div>
          </div>

          <h1 className="card-title mb-2 font-bold text-3xl text-primary tracking-tight">
            {title}
          </h1>

          <p className="mb-6 text-base-content/80 text-lg">{message}</p>

          <div className="mb-6 w-full text-left">
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
          </div>

          <div className="card-actions w-full">
            <Link
              className="btn btn-primary w-full shadow-lg"
              href={actionHref}
            >
              <MdHome size={20} />
              {actionLabel}
            </Link>
          </div>
        </div>
      </div>
    </MotionWrapper>
  </div>
);
