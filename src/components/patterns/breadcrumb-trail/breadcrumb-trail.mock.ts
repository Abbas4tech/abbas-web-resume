import type { BreadcrumbTrailProps } from "./breadcrumb-trail";

export const baseMock: BreadcrumbTrailProps = {
  items: [
    { href: "/", label: "Home", icon: { iconCode: "fa/FaHome", name: "Home" } },
    { href: "/projects", label: "Projects" },
    { href: "/projects/fixture-dashboard", label: "Fixture Dashboard" },
  ],
};
