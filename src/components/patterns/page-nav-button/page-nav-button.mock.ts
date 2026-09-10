import type { PageNavButtonProps } from "./page-nav-button";

export const baseMock: PageNavButtonProps = {
  pages: [
    { title: "Home", pageUrl: "/", isDefaultPage: true },
    { title: "Projects", pageUrl: "/projects" },
    { title: "Contact", pageUrl: "/contact" },
  ],
};
