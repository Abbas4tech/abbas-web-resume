import type { Meta, StoryObj } from "@storybook/react";
import { linkMock, nativeMock } from "./button.mock";
import { Button } from "./index";

const meta = {
  title: "Elements/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...nativeMock,
  },
};

export const AsLink: Story = {
  args: {
    ...linkMock,
  },
};
