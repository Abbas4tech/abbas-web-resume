import type { Meta, StoryObj } from "@storybook/react";
import { SplitContentPanel } from "./split-content-panel";
import { baseMock } from "./split-content-panel.mock";

const meta = {
  title: "Blocks/SplitContentPanel",
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

export const NoAnimation: Story = {
  args: {
    ...baseMock,
    animation: undefined,
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
        icon: { iconCode: "md/MdLanguage" },
      },
      {
        label: "Timezone",
        value: "EST",
        icon: { iconCode: "md/MdAccessTime" },
      },
    ],
  },
};
