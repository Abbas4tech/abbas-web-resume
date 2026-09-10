import type { TechBadgeCloudProps } from "./tech-badge-cloud";

export const baseMock: TechBadgeCloudProps = {
  items: [
    { label: "React", icon: { iconCode: "si/SiReact", name: "React" } },
    {
      label: "TypeScript",
      icon: { iconCode: "si/SiTypescript", name: "TypeScript" },
    },
    {
      label: "Next.js",
      icon: { iconCode: "ri/RiNextjsFill", name: "Next.js" },
    },
    { label: "Node.js", icon: { iconCode: "si/SiNodedotjs", name: "Node.js" } },
    {
      label: "Tailwind CSS",
      icon: { iconCode: "si/SiTailwindcss", name: "Tailwind CSS" },
    },
    {
      label: "PostgreSQL",
      icon: { iconCode: "si/SiPostgresql", name: "PostgreSQL" },
    },
  ],
};
