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
          icons: [
            { iconCode: "si/SiReact", name: "React" },
            { iconCode: "ri/RiNextjsFill", name: "Next.js" },
          ],
        },
        {
          label: "TypeScript & Tailwind",
          progress: 80,
          icons: [
            { iconCode: "si/SiTypescript", name: "TypeScript" },
            { iconCode: "si/SiTailwindcss", name: "Tailwind CSS" },
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
          icons: [
            { iconCode: "si/SiNodedotjs", name: "Node.js" },
            { iconCode: "si/SiExpress", name: "Express" },
          ],
        },
        {
          label: "Databases",
          progress: 70,
          icons: [
            { iconCode: "si/SiPostgresql", name: "PostgreSQL" },
            { iconCode: "si/SiMongodb", name: "MongoDB" },
          ],
        },
      ],
    },
  ],
};

export const radialMock: PanelShowcaseProps = {
  panels: baseMock.panels.map((panel) => ({
    ...panel,
    rows: panel.rows.map((row) => ({ ...row, variant: "radial" as const })),
  })),
};

export const tableMock: PanelShowcaseProps = {
  layout: "table",
  panels: baseMock.panels,
};
