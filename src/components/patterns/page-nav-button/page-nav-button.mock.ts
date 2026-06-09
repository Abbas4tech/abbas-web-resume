import type { PageNavButtonProps } from "./types";

export const baseMock: PageNavButtonProps = {
  pages: [
    { title: "Home", pageUrl: "/", isDefaultPage: true },
    { title: "Projects", pageUrl: "/projects" },
    { title: "Contact", pageUrl: "/contact" },
  ],
};
