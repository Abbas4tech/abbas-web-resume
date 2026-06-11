import type { PanelShowcaseProps } from "./panel-showcase";

export const baseMock: PanelShowcaseProps = {
  animation: "fade-right",
  panels: [
    {
      title: "Frontend Skills",
      headingIcon: { iconCode: "md/MdCode", name: "Frontend" },
      rows: [
        {
          progress: 90,
          icons: [{ iconCode: "si/SiReact" }, { iconCode: "si/SiNextdotjs" }],
        },
        {
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
          progress: 85,
          icons: [{ iconCode: "si/SiNodedotjs" }, { iconCode: "si/SiExpress" }],
        },
        {
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
