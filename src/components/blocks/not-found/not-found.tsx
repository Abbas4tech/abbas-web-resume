import Link from "next/link";
import { MdSearchOff } from "react-icons/md";

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
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
    <div className="mb-8 animate-pulse text-primary/80">
      <MdSearchOff aria-hidden="true" className="mx-auto" size={120} />
    </div>
    <h1 className="mb-4 font-bold text-4xl tracking-tight sm:text-5xl">
      {title}
    </h1>
    <p className="mb-8 max-w-lg text-base-content/70 text-lg">{message}</p>
    <Link className="btn btn-primary" href={actionHref}>
      {actionLabel}
    </Link>
  </div>
);
