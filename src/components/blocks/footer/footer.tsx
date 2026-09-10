import Link from "next/link";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export interface FooterLink {
  pageUrl: string;
  title: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  email?: string;
  footerText: string;
  links: FooterLink[];
}

const Footer = memo(
  forwardRef<HTMLElement, FooterProps>(
    ({ className, footerText, email, links, ...props }, ref) => (
      <footer
        className={cn(
          "footer sm:footer-horizontal bg-base-200 p-10 text-base-content",
          className
        )}
        ref={ref}
        {...props}
      >
        {links.length > 0 && (
          <nav aria-label="Footer navigation">
            <span className="footer-title">Explore</span>
            {links.map((link) => (
              <Link
                className="link link-hover"
                href={link.pageUrl}
                key={link.pageUrl}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        )}
        <aside>
          {email && (
            <a className="link link-hover" href={`mailto:${email}`}>
              {email}
            </a>
          )}
          <p>{footerText}</p>
        </aside>
      </footer>
    )
  )
);
Footer.displayName = "Footer";

export { Footer };
