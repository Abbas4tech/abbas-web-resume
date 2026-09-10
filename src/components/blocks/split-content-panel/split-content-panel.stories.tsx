import type { Meta, StoryObj } from "@storybook/react";
import { SplitContentPanel } from "./split-content-panel";
import { baseMock } from "./split-content-panel.mock";

const meta = {
  title: "Blocks/Split Content Panel",
  component: SplitContentPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SplitContentPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const ManyInfoRows: Story = {
  args: {
    ...baseMock,
    infoRows: [
      ...baseMock.infoRows,
      {
        label: "Languages",
        value: "English, Spanish",
        icon: { iconCode: "md/MdLanguage", name: "Languages" },
      },
      {
        label: "Timezone",
        value: "EST",
        icon: { iconCode: "md/MdAccessTime", name: "Timezone" },
      },
    ],
  },
};
