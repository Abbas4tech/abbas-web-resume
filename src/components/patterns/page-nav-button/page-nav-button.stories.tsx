import type { Meta, StoryObj } from "@storybook/react";
import { PageNavButton } from "./index";
import { baseMock } from "./page-nav-button.mock";

const meta = {
  title: "Patterns/PageNavButton",
  component: PageNavButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageNavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
