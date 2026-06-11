import type { Meta, StoryObj } from "@storybook/react";
import { BioSection } from "./bio-section";
import { baseMock } from "./bio-section.mock";

const meta = {
  title: "Blocks/BioSection",
  component: BioSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BioSection>;

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
