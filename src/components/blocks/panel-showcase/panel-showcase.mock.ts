import type { PanelShowcaseProps } from "./panel-showcase";

export const baseMock: PanelShowcaseProps = {
  panels: [
    {
      title: "Frontend Skills",
      headingIcon: { iconCode: "md/MdCode", name: "Frontend" },
      rows: [
        {
          label: "React & Next.js",
          progress: 90,
          icons: [{ iconCode: "si/SiReact" }, { iconCode: "si/SiNextdotjs" }],
        },
        {
          label: "TypeScript & Tailwind",
          progress: 80,
          icons: [
            { iconCode: "si/SiTypescript" },
            { iconCode: "si/SiTailwindcss" },
          ],
        },
      ],
    },
    {
      title: "Backend Skills",
      headingIcon: { iconCode: "md/MdStorage", name: "Backend" },
      rows: [
        {
          label: "Node.js & Express",
          progress: 85,
          icons: [{ iconCode: "si/SiNodedotjs" }, { iconCode: "si/SiExpress" }],
        },
        {
          label: "Databases",
          progress: 70,
          icons: [
            { iconCode: "si/SiPostgresql" },
            { iconCode: "si/SiMongodb" },
          ],
        },
      ],
    },
  ],
};
