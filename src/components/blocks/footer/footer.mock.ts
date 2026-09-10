import type { FooterProps } from "./footer";

export const baseMock: FooterProps = {
  footerText:
    "© 2026 Ada Sparkline — synthetic fixture data, not a real person.",
  email: "ada@fixture.dev",
  links: [
    { title: "Home", pageUrl: "/" },
    { title: "About", pageUrl: "/about" },
    { title: "Experience", pageUrl: "/experience" },
    { title: "Projects", pageUrl: "/projects" },
    { title: "Skills", pageUrl: "/skills" },
  ],
};
